/**
 * docusaurus-plugin-search-local only writes search-index.json in postBuild.
 * During `docusaurus start`, missing index URLs fall through to the SPA HTML
 * shell and search returns no results. Keep a copy under static/ so both
 * start and serve can load a real index.
 *
 * Usage: node scripts/sync-search-index.mjs
 * Prefer running after `npm run build` (wired as postbuild).
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const from = path.join(root, 'build', 'search-index.json');
const to = path.join(root, 'static', 'search-index.json');

if (!fs.existsSync(from)) {
  if (fs.existsSync(to)) {
    console.log(
      '[sync-search-index] build/search-index.json missing; keeping existing static/search-index.json',
    );
    process.exit(0);
  }
  console.warn(
    '[sync-search-index] No search index found. Run `npm run build` once to generate static/search-index.json.',
  );
  process.exit(0);
}

fs.mkdirSync(path.dirname(to), {recursive: true});
fs.copyFileSync(from, to);
console.log(
  `[sync-search-index] Copied build/search-index.json → static/search-index.json (${fs.statSync(to).size} bytes)`,
);
