---
id: documentation-conventions
title: Documentation Conventions
sidebar_label: Conventions
---

# Documentation Conventions

## 1. Folder and ID rules

- Folders use numeric prefixes (`00-` … `25-`) for editor ordering.
- Docusaurus strips those prefixes from doc IDs — sidebar entries omit them.
- Prefer `index.md` hubs per section with relative links to child pages.

## 2. Frontmatter

Every page includes:

```yaml
---
id: <slug>
title: <page title>
sidebar_label: <nav label>
---
```

## 3. Writing standards

- One primary topic per page
- Evidence-based claims only; mark **Unverified** when needed
- Synthetic EDI/JSON examples — never real PHI or production secrets
- Prefer admonitions for Purpose / Critical / No secrets
- Link instead of duplicating long catalogs

## 4. Adding content

| Change | Where |
|---|---|
| New product module | New numbered section or page under the closest domain |
| New API surface | [API endpoint catalog](../api/endpoint-catalog) + OpenAPI export |
| New validation rule | [Business rule catalog](../validation/business-rule-catalog) or [structural validation](../edi-837p/structural-validation), plus the [source-file map](../validation/rule-catalog) |
| New env var | [Environment variables](../infrastructure/environment-variables) |

## 5. Validation before merge

```bash
npm run build
npm run typecheck
```

Broken internal links fail the build (`onBrokenLinks: 'throw'`).

