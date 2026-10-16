---
id: backend
title: Backend Architecture
sidebar_label: Backend
---

# Backend Architecture

```text
scrubber-backend/
├── src/main.ts worker.ts scheduler.ts cli.ts
├── src/config/ common/ modules/
├── prisma/
├── docs/openapi/
└── docker-compose.yml
```

Major modules: `auth`, `batches`, `claims`, `claim-validation`, `edi-parser`, `edi-structural-validation`, `queue`, `cache`, `references`, `reference-admin`, `tenants`, `users-admin`, `audit`, `support`, `mail`, `integrations`, …

