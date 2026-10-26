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
| `start:scheduler:dev` | Stalled detection; optional NPI ordering/referring sync |

Do **not** flush Redis DB 0 when experimenting with lookup cache (DB 1).

## NPI ordering / referring sync

CMS **Order and Referring** data backs Medicare NPI provider rules (`npi_ordering_referrings`).

| Item | Detail |
|---|---|
| Process | Nest `scrubber-scheduler` (`SchedulerHost`) — **not** OS crontab |
| Gate | `NPI_SYNC_SCHEDULE_ENABLED=true` (default `false`) |
| Schedule | **00:00** and **12:00** `America/New_York` (every ~12 hours) |
| Poll | Scheduler ticks every **5 minutes**; a run starts on the first tick after each wall clock |
| Slot keys | Redis `scrubber:scheduler:npi-sync:last-run-date` stores `YYYY-MM-DDT00` or `YYYY-MM-DDT12` |
| Overlap lock | Redis `scrubber:scheduler:npi-sync` (TTL 4 hours) |
| Work | Same as CLI: fetch CMS zip → import CSV → lookup cache invalidate + warm (`LOOKUP_CACHE_WARM_ON_IMPORT`) |

### Manual CLI (any environment)

```bash
cd scrubber-backend
npm run build
npm run cli -- npi-ordering-referrings:sync
# or lean script:
# npx ts-node --transpile-only scripts/npi-ordering-referrings-sync.ts
# npx ts-node --transpile-only scripts/npi-ordering-referrings-sync.ts --force
```

Related: `npi-ordering-referrings:fetch`, `npi-ordering-referrings:import`.

After a successful import, Redis lookup for `npi_ordering_referrings` is refreshed automatically when `LOOKUP_CACHE_ENABLED=true` and `LOOKUP_CACHE_WARM_ON_IMPORT=true`. Manual warm if needed:

```bash
npm run cli -- redis:seed-lookups npi_ordering_referrings --warm
```

### Production (systemd)

On the VPS, enable in `/opt/scrubber/backend/.env`, keep `scrubber-scheduler` running, then:

```bash
sudo journalctl -u scrubber-scheduler -f
sudo journalctl -u scrubber-scheduler --since today | grep -i npi
```

Expect lines such as `ENABLED @ 00:00 and 12:00 America/New_York`, `Starting scheduled NPI…`, `Scheduled NPI sync finished…`.

Sync history also lives in Postgres (`npi_ordering_referring_syncs`). Do **not** also add an OS crontab for the same job.
