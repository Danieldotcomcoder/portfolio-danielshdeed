import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { assets, check, root } from './check.mjs';

check();
mkdirSync(resolve(root, 'dist'), { recursive: true });
for (const asset of assets) copyFileSync(resolve(root, 'src', asset), resolve(root, 'dist', asset));
writeFileSync(resolve(root, 'dist/.nojekyll'), '');
console.log('Built dist/ — ready for static hosting.');
