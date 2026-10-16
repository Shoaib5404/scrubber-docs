---
id: troubleshooting-setup
title: Troubleshooting Setup
sidebar_label: Troubleshooting
---

# Troubleshooting Setup

| Symptom | Likely cause | Check |
|---|---|---|
| DB connection errors | Compose down / wrong port | `docker compose ps`; port **5433** |
| Redis / queue errors | Redis down | `REDIS_URL` port **6381**; do not flush DB 0 for cache experiments |
| Presigned upload fails | MinIO CORS / endpoints | `STORAGE_DRIVER=s3`, `S3_PUBLIC_ENDPOINT`, `MINIO_API_CORS_ALLOW_ORIGIN` |
| CORS from UI | Origin missing | `CORS_ORIGINS` includes UI origin(s) |
| Validation never async | Queue disabled | `USE_QUEUE` + worker |
| Mail not sent | Provider unset | SendGrid/Resend keys |

Never log credentials, patient data, or full sensitive claim payloads.

