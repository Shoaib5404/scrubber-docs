---
id: frontend
title: Frontend Architecture
sidebar_label: Frontend
---

# Frontend Architecture

```text
scrubber-frontend/src/
├── app/           # App Router pages and layouts
├── components/    # Shared UI primitives
├── hooks/
├── lib/           # API client, auth tokens, datetime helpers
├── modules/       # Feature modules
└── types/         # Generated OpenAPI types
```

- Talks **only** to Nest over `NEXT_PUBLIC_API_URL`
- Never connects to Postgres/Redis directly
- Types from `openapi-typescript` against backend OpenAPI JSON

