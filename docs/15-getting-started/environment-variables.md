---
id: environment-variables
title: Environment Variables (Dev)
sidebar_label: Env Vars (Dev)
---

# Environment Variables (Dev)

Copy examples — never commit real secrets or PHI.

## Backend categories

| Category | Examples |
|---|---|
| App / CORS | `PORT`, `CORS_ORIGINS`, `FRONTEND_URL`, `LOG_LEVEL` |
| Database | `DATABASE_URL`, `DATABASE_SSL` |
| Redis | `REDIS_URL`, `REDIS_LOOKUP_DB`, `LOOKUP_CACHE_*` |
| Queues | `USE_QUEUE`, `QUEUE_MODE`, `BULLMQ_CONCURRENCY`, `PARALLEL_VALIDATE` |
| NPI sync | `NPI_SYNC_SCHEDULE_ENABLED`, `NPI_ORDERING_REFERRING_*` (see [Background Jobs](../observability/background-jobs)) |
| Auth | `JWT_*`, `API_TOKEN_EXPIRATION_MINUTES` |
| Storage / EDI | `STORAGE_DRIVER`, `S3_*`, `EDI_*` |
| Mail | `SENDGRID_*` / `RESEND_*` |
| Support | `SUPPORT_INBOX`, `INQUIRY_ATTACHMENT_MAX_BYTES` |

Full list: backend `.env.example`. Also see [Infrastructure → Environment Variables](../infrastructure/environment-variables).

## Frontend

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Nest base including `/api/v1` |
| `NEXT_PUBLIC_EMAIL_VERIFICATION_REQUIRED` | No | Soft-gate mirror |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Mailto fallback |

