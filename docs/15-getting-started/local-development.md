---
id: local-development
title: Local Development
sidebar_label: Local Development
---

# Local Development

## 1. Backend

```bash
cd C:\\sites\\Scrubber\\scrubber-backend
cp .env.example .env
docker compose up -d postgres redis minio
npm install
npx prisma generate
npm run prisma:migrate
npm run start:dev
```

- API: http://localhost:3011
- Health: http://localhost:3011/health
- Swagger: http://localhost:3011/api/docs

Compose host ports: Postgres **5433**, Redis **6381**, MinIO API **9020**, console **9021**.

## 2. Frontend

```bash
cd C:\\sites\\Scrubber\\scrubber-frontend
cp .env.example .env.local
npm install
npm run dev
```

- UI: http://localhost:3010
- Set `NEXT_PUBLIC_API_URL=http://localhost:3011/api/v1` (or `127.0.0.1` for Playwright)

## 3. Smoke check

1. Open UI login
2. Hit health endpoint
3. Upload a **synthetic** EDI (with `STORAGE_DRIVER=s3` configured) or use multipart API client path

Optional seed: `npm run prisma:seed` in backend.

