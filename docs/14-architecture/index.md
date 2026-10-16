---
id: index
title: Architecture
sidebar_label: Overview
---

# Architecture

Sibling apps under `C:\\sites\\Scrubber`:

| App | Stack | Port |
|---|---|---|
| `scrubber-backend` | NestJS 10, Prisma, BullMQ | 3011 |
| `scrubber-frontend` | Next.js 16 App Router | 3010 |

```mermaid
flowchart TB
  subgraph clients [Clients]
    Browser[Browser]
    Machine[API Client]
  end
  subgraph fe [scrubber-frontend]
    Next[Next.js]
  end
  subgraph be [scrubber-backend]
    API[Nest API]
    Worker[Worker]
    Sched[Scheduler]
  end
  Browser --> Next
  Next --> API
  Machine --> API
  API --> PG[(Postgres)]
  API --> Redis[(Redis)]
  API --> Obj[(MinIO/S3)]
  Worker --> Redis
  Worker --> PG
  Sched --> Redis
```

- [Frontend](./frontend)
- [Backend](./backend)
- [Request Lifecycle](./request-lifecycle)
- [Data Flow](./data-flow)

