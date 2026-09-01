import re
import sys

def fix_unused(log_file):
    with open(log_file, 'r', encoding='utf-8') as f:
        log_content = f.read()

    file_blocks = log_content.split('\n\n')
    for block in file_blocks:
        lines = block.split('\n')
        if not lines or not lines[0].startswith('C:\\'):
            continue
            
        file_path = lines[0].strip()
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                code_lines = f.readlines()
        except Exception:
            continue
            
        modified = False
        # Process from bottom to top to avoid line shifting
        warnings = []
        for line in lines[1:]:
            match = re.search(r'^\s*(\d+):\d+\s+warning\s+\'(.*?)\' is (?:defined|assigned a value) but never used', line)
            if match:
                line_num = int(match.group(1)) - 1
                var_name = match.group(2)
                warnings.append((line_num, var_name))
        
        # Sort reverse
        warnings.sort(key=lambda x: x[0], reverse=True)
        
        for line_num, var_name in warnings:
            if line_num < len(code_lines):
                # Try to remove the variable from the line
                code_line = code_lines[line_num]
                # If it's an import like: import { X, Y } from
                # Or just assigned like const [user, setUser] = 
                
                # Simple import removal
                new_line = re.sub(r'\b' + var_name + r'\b\s*,?', '', code_line)
                # Cleanup empty imports: import { } from '...'
                new_line = re.sub(r'\{\s*,\s*', '{ ', new_line)
                new_line = re.sub(r',\s*\}', ' }', new_line)
                new_line = re.sub(r'import\s*\{\s*\}\s*from.*?;?', '', new_line)
                
                if new_line != code_line:
                    code_lines[line_num] = new_line
                    modified = True
        
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.writelines(code_lines)
            print(f"Fixed {file_path}")

if __name__ == '__main__':
    fix_unused('eslint_output.txt')
