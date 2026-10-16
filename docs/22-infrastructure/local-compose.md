---
id: local-compose
title: Local Compose
sidebar_label: Local Compose
---

# Local Compose

From `scrubber-backend`:

```bash
docker compose up -d postgres redis minio
```

| Service | Host port |
|---|---|
| Postgres 16 | 5433 → 5432 |
| Redis 7 | 6381 → 6379 |
| MinIO API | 9020 → 9000 |
| MinIO console | 9021 → 9001 |

Presigned uploads need `STORAGE_DRIVER=s3` and CORS allowing the UI origin. Nest auto-creates the bucket on boot when configured.

