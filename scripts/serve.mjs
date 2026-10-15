import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { root } from './check.mjs';

const port = Number(process.env.PORT || 4173);
const types = { 'index.html': 'text/html; charset=utf-8', 'styles.css': 'text/css; charset=utf-8', 'app.js': 'text/javascript; charset=utf-8' };
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let path;
  try { path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end('Bad request'); return; }
  const asset = path === '/' ? 'index.html' : path.slice(1);
  try {
    // Read the latest build's allowlist so new images work without restarting preview.
    const assets = JSON.parse(await readFile(resolve(root, 'dist/asset-manifest.json'), 'utf8'));
    if (!assets.includes(asset)) { response.writeHead(404).end('Not found'); return; }
    const body = await readFile(resolve(root, 'dist', asset));
    response.writeHead(200, { 'Content-Type': (types[asset] || ({'.png':'image/png','.jpg':'image/jpeg'})[extname(asset)]), 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch { response.writeHead(500).end('Build missing. Run npm run build.'); }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${port} is already in use. Stop the existing preview or set PORT to another port.` : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`Portfolio preview: http://127.0.0.1:${port}`));
