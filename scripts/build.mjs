import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { assets, check, root } from './check.mjs';

check();
mkdirSync(resolve(root, 'dist'), { recursive: true });
for (const asset of assets) { const target=resolve(root, 'dist', asset); mkdirSync(dirname(target), {recursive:true}); copyFileSync(resolve(root, 'src', asset), target); }
writeFileSync(resolve(root, 'dist/.nojekyll'), '');
console.log('Built dist/ — ready for static hosting.');
