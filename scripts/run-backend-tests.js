/**
 * Cross-platform runner for Agrotech Venezuela backend Pytest suite.
 * Detects available Python binary across Windows ('py'), Linux, macOS, WSL, and CI ('python3', 'python').
 */
const { spawnSync } = require('child_process');
const path = require('path');

function getAvailablePython() {
  const isWindows = process.platform === 'win32';
  const candidates = isWindows ? ['py', 'python', 'python3'] : ['python3', 'python', 'py'];

  for (const cmd of candidates) {
    try {
      const check = spawnSync(cmd, ['--version'], { stdio: 'ignore', shell: true });
      if (check.status === 0) {
        return cmd;
      }
    } catch {
      // Continue searching candidates
    }
  }
  return null;
}

const pythonCmd = getAvailablePython();
if (!pythonCmd) {
  console.error('\n❌ [Agrotech Test Runner] Python 3.13+ was not found on your PATH.');
  console.error('• Windows: Ensure Python or the "py" launcher is installed.');
  console.error('• Linux / macOS: Run "sudo apt install python3" or "brew install python3".\n');
  process.exit(1);
}

const backendDir = path.resolve(__dirname, '..', 'backend');
const testArgs = ['-m', 'pytest', 'tests', ...process.argv.slice(2)];

const result = spawnSync(pythonCmd, testArgs, {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status !== null ? result.status : 1);
