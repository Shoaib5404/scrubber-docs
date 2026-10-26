---
id: running-workers
title: Running Workers
sidebar_label: Running Workers
---

# Running Workers

| Process | Command | Role |
|---|---|---|
| API | `npm run start:dev` | HTTP |
| Worker | `npm run start:worker:dev` | BullMQ consumer |
| Scheduler | `npm run start:scheduler:dev` | Stalled-queue detection; optional NPI sync at **00:00** and **12:00** `America/New_York` when `NPI_SYNC_SCHEDULE_ENABLED=true` |

Local default: `USE_QUEUE=false` (inline validation). Enable queue + worker to test async paths.

For NPI schedule details, CLI, Redis slot keys, and production journal logs, see [Background Jobs](../observability/background-jobs).
