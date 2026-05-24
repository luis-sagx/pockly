import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = resolve(process.cwd());
const packageJsonPath = resolve(root, 'package.json');
const registerPath = resolve(root, 'docs/license-register.md');

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});

const readLicense = (name) => {
  try {
    const output = execSync(`npm view ${JSON.stringify(name)} license --json`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
    if (!output) return 'UNKNOWN';

    try {
      const parsed = JSON.parse(output);
      if (Array.isArray(parsed)) return parsed.join(', ');
      if (typeof parsed === 'string') return parsed;
      return JSON.stringify(parsed);
    } catch {
      return output;
    }
  } catch {
    return 'UNKNOWN';
  }
};

const sortByName = (a, b) => a.name.localeCompare(b.name);

const runtimeRows = dependencies
  .map((name) => ({ name, license: readLicense(name) }))
  .sort(sortByName);
const devRows = devDependencies
  .map((name) => ({ name, license: readLicense(name) }))
  .sort(sortByName);

const today = new Date().toISOString().slice(0, 10);
const args = process.argv.slice(2).filter((arg) => arg !== '--');
const releaseTag = args[0] || packageJson.version || 'unreleased';

const row = ({ name, license }) => `| ${name} | ${license} |`;

const section = `\n## Release ${releaseTag} (${today})\n\n### Runtime dependencies\n| Package | License |\n| --- | --- |\n${runtimeRows.map(row).join('\n')}\n\n### Dev dependencies\n| Package | License |\n| --- | --- |\n${devRows.map(row).join('\n')}\n`;

mkdirSync(dirname(registerPath), { recursive: true });

let current = '';
try {
  current = readFileSync(registerPath, 'utf8');
} catch {
  current = '# License Register\n\nThis file stores dependency-license snapshots per release.\n';
}

writeFileSync(registerPath, `${current.trimEnd()}\n${section}`);
console.log(`Updated ${registerPath} with release ${releaseTag}.`);
