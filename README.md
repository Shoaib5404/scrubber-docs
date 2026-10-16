# Scrubber Documentation

Internal **Product & Engineering Specification** for the EDI 837P claims scrubber (NestJS + Next.js).

Sibling of `scrubber-backend` and `scrubber-frontend` under `C:\sites\Scrubber`. Format aligned with TeleWound’s Docusaurus documentation site (numbered sections, Mermaid, local search).

## Prerequisites

- Node.js 20+
- npm

## Quick start

```bash
cd C:\sites\Scrubber\scrubber-documentation
npm install
npm start
```

- Local site: http://localhost:3000

## Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Dev server |
| `npm run build` | Production build (broken links throw); also syncs search index into `static/` |
| `npm run sync-search-index` | Copy `build/search-index.json` → `static/search-index.json` (needed for search during `npm start`) |
| `npm run serve` | Preview production build |
| `npm run typecheck` | TypeScript check for config/pages |
| `npm run clear` | Clear Docusaurus cache |

Local search indexes HTML only during production build. `postbuild` copies the index into `static/` so the search bar works under `npm start` as well. After large docs edits, run `npm run build` (or `npm run sync-search-index` if `build/` is already fresh) to refresh the index.

## Content rules

- Document **verified** behavior from `scrubber-backend` / `scrubber-frontend`
- Use synthetic EDI/JSON only — no PHI or production secrets
- Prefer OpenAPI/Swagger for full API schemas; this site holds curated workflows
- Application source code is out of scope for this repository

## Structure

```text
docs/
  00-product-overview/ … 25-roadmap/ 25-decisions/
  glossary.md
src/pages/          # Custom homepage
src/css/custom.css  # Scrubber teal/slate + Geist
sidebars.ts
docusaurus.config.ts
```
