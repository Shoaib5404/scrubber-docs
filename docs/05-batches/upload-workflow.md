---
id: upload-workflow
title: Upload Workflow
sidebar_label: Upload Workflow
---

# Upload Workflow

**Status:** Implemented

## Web (presigned S3/MinIO)

Requires `STORAGE_DRIVER=s3`.

1. `POST /api/v1/batches/upload-url` — Nest mints object key + short-lived PUT URL
2. Browser `PUT` file to MinIO
3. `POST /api/v1/batches/complete` — HeadObject verify → structural validate/parse → `BatchFile` row

Object key conventions:

- Staff uploads: `edi/0/{userId}/…` with `BatchFile.tenantId = null`
- Tenant uploads: `edi/{tenantId}/{userId}/…`

## API clients (multipart)

`POST /api/v1/batches` multipart uses the same key convention.

## Notes

- Integer IDs only (no UUIDs for batch PKs)
- Failed completes delete the MinIO object; no pending `BatchFile` before validation succeeds
- Viewer: `GET /api/v1/batches/:id/edi/viewer` (Nest-proxied)
- Optional download URL: `GET /api/v1/batches/:id/edi/download-url`

