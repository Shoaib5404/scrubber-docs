---
id: user-sessions
title: User Sessions
sidebar_label: User Sessions
---

# User Sessions

- Access tokens authorize `Authorization: Bearer …` calls to `/api/v1`
- Refresh tokens rotate sessions (Prisma `RefreshToken`)
- Frontend stores session tokens via Zustand helpers — secrets never go in `NEXT_PUBLIC_*`

Configure lifetimes with backend `JWT_*` and related env vars (see [Environment Variables](../infrastructure/environment-variables)).

