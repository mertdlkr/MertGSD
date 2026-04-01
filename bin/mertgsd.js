#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PKG_DIR = path.resolve(__dirname, '..');
const AGENT_SRC = path.join(PKG_DIR, '.agent');
const VERSION = require(path.join(PKG_DIR, 'package.json')).version;

const DIRS = ['agents', 'workflows', 'templates', 'references'];

// ── Colors ──
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  red: '\x1b[31m',
  bg: '\x1b[44m',
};

const LINE = `${c.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`;

const HELP = `
${LINE}
 ${c.bold}${c.cyan}MertGSD${c.reset} ${c.dim}v${VERSION}${c.reset}
${LINE}

 ${c.bold}Usage:${c.reset}
   ${c.cyan}mertgsd init${c.reset} [path]      Install .agent/ to a project
   ${c.cyan}mertgsd update${c.reset} [path]    Update .agent/ to latest version
   ${c.cyan}mertgsd info${c.reset}             Show installed agent/workflow counts
   ${c.cyan}mertgsd --version${c.reset}        Show version
   ${c.cyan}mertgsd --help${c.reset}           Show this help

 ${c.bold}Examples:${c.reset}
   ${c.dim}$${c.reset} mertgsd init             ${c.dim}# Install to current directory${c.reset}
   ${c.dim}$${c.reset} mertgsd init ./my-app    ${c.dim}# Install to ./my-app${c.reset}
   ${c.dim}$${c.reset} mertgsd update           ${c.dim}# Update current project${c.reset}

 ${c.bold}${c.cyan}After install — open any AI coding tool:${c.reset}

   ${c.green}1.${c.reset} ${c.yellow}/mertgsd-new-project${c.reset}     ${c.dim}Plan your project — it will ask you questions${c.reset}
   ${c.green}2.${c.reset} ${c.yellow}/mertgsd-super${c.reset}          ${c.dim}Then build it autonomously${c.reset}

   ${c.dim}Or skip planning:${c.reset}
   ${c.dim}$${c.reset} ${c.yellow}/mertgsd-super "Build a SaaS dashboard"${c.reset}

   ${c.magenta}/mertgsd-help${c.reset}            ${c.dim}See all 39 commands${c.reset}
${LINE}
`;

function createGitignore(targetDir) {
  const gitignorePath = path.join(targetDir, '.gitignore');
  const planningIgnore = '.planning/';

  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf-8');
    if (!content.includes(planningIgnore)) {
      fs.appendFileSync(gitignorePath, `\n# MertGSD planning files (local only)\n${planningIgnore}\n`);
    }
  } else {
    fs.writeFileSync(gitignorePath, `# MertGSD planning files (local only)\n${planningIgnore}\n`);
  }
}

function copyAgent(targetDir) {
  const target = path.resolve(targetDir || '.');
  const agentTarget = path.join(target, '.agent');

  if (!fs.existsSync(AGENT_SRC)) {
    console.error(`${c.red}✗${c.reset} .agent/ not found in MertGSD package.`);
    process.exit(1);
  }

  if (!fs.existsSync(target)) {
    console.error(`${c.red}✗${c.reset} Target directory does not exist: ${target}`);
    process.exit(1);
  }

  console.log('');
  console.log(LINE);
  console.log(` ${c.bold}${c.cyan}⚡ MertGSD${c.reset} ${c.dim}v${VERSION}${c.reset} ${c.dim}→${c.reset} ${c.white}${target}${c.reset}`);
  console.log(LINE);
  console.log('');

  // Create .agent/ and copy subdirs (clean reinstall)
  if (!fs.existsSync(agentTarget)) {
    fs.mkdirSync(agentTarget, { recursive: true });
  }

  for (const dir of DIRS) {
    const src = path.join(AGENT_SRC, dir);
    const dst = path.join(agentTarget, dir);
    if (!fs.existsSync(src)) continue;
    if (fs.existsSync(dst)) {
      fs.rmSync(dst, { recursive: true, force: true });
    }
    copyDirRecursive(src, dst);
  }

  // Create/update .gitignore
  createGitignore(target);

  // Count files
  let agentCount = 0;
  let workflowCount = 0;
  try {
    agentCount = fs.readdirSync(path.join(agentTarget, 'agents')).filter(f => f.endsWith('.md')).length;
    workflowCount = fs.readdirSync(path.join(agentTarget, 'workflows')).filter(f => f.endsWith('.md')).length;
  } catch {}

  console.log(` ${c.green}✓${c.reset} Agents:    ${c.bold}${agentCount}${c.reset}`);
  console.log(` ${c.green}✓${c.reset} Workflows: ${c.bold}${workflowCount}${c.reset}`);
  console.log(` ${c.green}✓${c.reset} Version:   ${c.dim}${VERSION}${c.reset}`);
  console.log(` ${c.green}✓${c.reset} .gitignore ${c.dim}(.planning/ excluded from git)${c.reset}`);
  console.log('');
  console.log(` ${c.bold}${c.cyan}Next steps:${c.reset}`);
  console.log(`   ${c.dim}$${c.reset} cd ${c.white}${target}${c.reset}`);
  console.log('');
  console.log(`   ${c.green}1.${c.reset} ${c.yellow}/mertgsd-new-project${c.reset}   ${c.dim}Plan your project — it will ask you questions${c.reset}`);
  console.log(`   ${c.green}2.${c.reset} ${c.yellow}/mertgsd-super${c.reset}          ${c.dim}Then run this to build it autonomously${c.reset}`);
  console.log('');
  console.log(`   ${c.dim}Or skip planning and go full autonomous with a prompt:${c.reset}`);
  console.log(`   ${c.dim}$${c.reset} ${c.yellow}/mertgsd-super "Build a SaaS dashboard with auth and billing"${c.reset}`);
  console.log('');
  console.log(`   ${c.magenta}/mertgsd-help${c.reset}            ${c.dim}See all 39 commands${c.reset}`);
  console.log('');
  console.log(LINE);
  console.log(` ${c.green}${c.bold}MertGSD installed successfully ✓${c.reset}`);
  console.log(LINE);
}

function showInfo(targetDir) {
  const target = path.resolve(targetDir || '.');
  const agentTarget = path.join(target, '.agent');

  if (!fs.existsSync(agentTarget)) {
    console.log(`${c.red}✗${c.reset} No .agent/ found here. Run: ${c.cyan}mertgsd init${c.reset}`);
    process.exit(1);
  }

  let agentCount = 0, workflowCount = 0, templateCount = 0, refCount = 0;
  try {
    agentCount = fs.readdirSync(path.join(agentTarget, 'agents')).filter(f => f.endsWith('.md')).length;
    workflowCount = fs.readdirSync(path.join(agentTarget, 'workflows')).filter(f => f.endsWith('.md')).length;
    templateCount = fs.readdirSync(path.join(agentTarget, 'templates')).filter(f => f.endsWith('.md')).length;
    refCount = fs.readdirSync(path.join(agentTarget, 'references')).filter(f => f.endsWith('.md')).length;
  } catch {}

  console.log(`${c.bold}${c.cyan}MertGSD${c.reset} ${c.dim}v${VERSION}${c.reset}`);
  console.log(`  ${c.green}●${c.reset} Agents:     ${c.bold}${agentCount}${c.reset}`);
  console.log(`  ${c.green}●${c.reset} Workflows:  ${c.bold}${workflowCount}${c.reset}`);
  console.log(`  ${c.green}●${c.reset} Templates:  ${c.bold}${templateCount}${c.reset}`);
  console.log(`  ${c.green}●${c.reset} References: ${c.bold}${refCount}${c.reset}`);
}

function copyDirRecursive(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

// ── CLI ──
const args = process.argv.slice(2);
const cmd = args[0];

if (!cmd || cmd === '--help' || cmd === '-h') {
  console.log(HELP);
} else if (cmd === '--version' || cmd === '-v') {
  console.log(`${c.cyan}mertgsd${c.reset} ${c.dim}v${VERSION}${c.reset}`);
} else if (cmd === 'init' || cmd === 'install') {
  copyAgent(args[1]);
} else if (cmd === 'update') {
  console.log(`${c.cyan}Updating MertGSD...${c.reset}`);
  try {
    execSync('npm update -g mertgsd', { stdio: 'inherit' });
    copyAgent(args[1]);
  } catch (e) {
    console.log(`${c.yellow}Tip:${c.reset} npm i -g mertgsd@latest`);
    copyAgent(args[1]);
  }
} else if (cmd === 'info') {
  showInfo(args[1]);
} else {
  console.error(`${c.red}Unknown command:${c.reset} ${cmd}`);
  console.log(HELP);
  process.exit(1);
}
