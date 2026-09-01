const fs = require('fs');
const path = require('path');

function findFiles(dir, ext, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, ext, fileList);
    } else if (filePath.endsWith(ext)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const cssFiles = findFiles('./src', '.module.css');
let changedFiles = 0;

cssFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let blocks = content.split('@media (prefers-color-scheme: dark) {');
  
  if (blocks.length > 1) {
    let newContent = blocks[0];
    for (let i = 1; i < blocks.length; i++) {
      let block = blocks[i];
      let braceCount = 1;
      let j = 0;
      for (; j < block.length; j++) {
        if (block[j] === '{') braceCount++;
        if (block[j] === '}') braceCount--;
        if (braceCount === 0) break;
      }
      
      let mediaBody = block.substring(0, j);
      let rest = block.substring(j + 1);
      
      let transformedBody = mediaBody.replace(/^\s*\.([a-zA-Z0-9_-]+)\s*\{([^}]*)\}/gm, ':global([data-theme="dark"]) .$1 {$2}');
      
      newContent += transformedBody + rest;
    }
    fs.writeFileSync(file, newContent);
    changedFiles++;
    console.log('Updated: ' + file);
  }
});

console.log('Total changed: ' + changedFiles);
