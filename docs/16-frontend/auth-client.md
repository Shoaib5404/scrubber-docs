---
id: auth-client
title: Auth Client
sidebar_label: Auth Client
---

# Auth Client

- API base from `src/lib/api/config.ts` + `NEXT_PUBLIC_API_URL`
- Session tokens in client state (Zustand) — not in public env secrets
- OpenAPI types regenerated with `npm run openapi:types` after backend `openapi:export`

