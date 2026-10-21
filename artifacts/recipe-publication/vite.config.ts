import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';

/*
 * The Sunday Table is a plain static site (HTML + CSS + vanilla JS).
 * Vite is used only as a local preview server and as a copy step for
 * production. No framework, bundle, or runtime is added to the pages.
 * - HTML pages live in this folder (index.html, recipes/*.html, ...)
 * - css/, js/ and robots.txt live in public/; sitemap.xml is generated when a public origin is configured
 */
const rawPort = process.env.PORT;
if (!rawPort) throw new Error('PORT environment variable is required but was not provided.');
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT value: "${rawPort}"`);
const basePath = process.env.BASE_PATH;
if (!basePath) throw new Error('BASE_PATH environment variable is required but was not provided.');

const root = path.resolve(import.meta.dirname);
const outDir = path.resolve(root, 'dist/public');

function htmlFiles(dir: string, rel = ''): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'public', 'scripts', '.replit-artifact'].includes(e.name)) continue;
    if (e.isDirectory()) out.push(...htmlFiles(path.join(dir, e.name), path.join(rel, e.name)));
    else if (e.name.endsWith('.html')) out.push(path.join(rel, e.name));
  }
  return out;
}

function staticCopy(): Plugin {
  return {
    name: 'sunday-table-static-copy',
    apply: 'build',
    closeBundle() {
      for (const f of fs.readdirSync(outDir)) {
        if (f.startsWith('__noop')) fs.rmSync(path.join(outDir, f), { force: true });
      }
      fs.rmSync(path.join(outDir, 'assets'), { recursive: true, force: true });
      for (const f of htmlFiles(root)) {
        const dest = path.join(outDir, f);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(path.join(root, f), dest);
      }
    },
  };
}

export default defineConfig({
  base: basePath,
  appType: 'mpa',
  plugins: [staticCopy()],
  root,
  publicDir: 'public',
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: { input: { __noop: path.resolve(root, 'scripts/noop.js') } },
  },
  server: { port, strictPort: true, host: '0.0.0.0', allowedHosts: true },
  preview: { port, host: '0.0.0.0', allowedHosts: true },
});
