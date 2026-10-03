import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const assets = ['index.html', 'styles.css', 'app.js'];

export function check() {
  for (const asset of assets) {
    if (!existsSync(resolve(root, 'src', asset))) throw new Error(`Missing source: ${asset}`);
  }
  execFileSync(process.execPath, ['--check', resolve(root, 'src/app.js')], { stdio: 'inherit' });
  const html = readFileSync(resolve(root, 'src/index.html'), 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, reference] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|data:)/.test(reference) || reference === '#') continue;
    if (reference.startsWith('#')) {
      if (!ids.has(reference.slice(1))) throw new Error(`Missing anchor: ${reference}`);
    } else if (!assets.includes(reference)) {
      throw new Error(`Unpackaged local asset: ${reference}`);
    }
  }
  const script = readFileSync(resolve(root, 'src/app.js'), 'utf8');
  for (const [, key] of html.matchAll(/data-case="([^"]+)"/g)) {
    if (!script.includes(`${key}: {`)) throw new Error(`Missing case study: ${key}`);
  }
  console.log('Checked JavaScript syntax, local assets, section anchors, and case-study references.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) check();
