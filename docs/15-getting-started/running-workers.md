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
| Scheduler | `npm run start:scheduler:dev` | Stalled-queue detection; optional NPI sync |

Local default: `USE_QUEUE=false` (inline validation). Enable queue + worker to test async paths.

