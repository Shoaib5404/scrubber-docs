---
id: request-lifecycle
title: Request Lifecycle
sidebar_label: Request Lifecycle
---

# Request Lifecycle

Simplified path:

HTTP → Nest guards/pipes → module services → Prisma / Redis / S3 → Problem Details or batch-specific error envelopes.

Global prefix: `/api/v1` (health excluded). Swagger at `/api/docs`.

