---
id: background-jobs
title: Background Jobs
sidebar_label: Background Jobs
---

# Background Jobs

| Component | Role |
|---|---|
| BullMQ on Redis DB 0 | Queues + scheduler locks |
| `start:worker:dev` | Consumes jobs (`QueueWorkerHost`) |
| `start:scheduler:dev` | Stalled detection; optional NPI daily sync |

Do **not** flush Redis DB 0 when experimenting with lookup cache (DB 1).

