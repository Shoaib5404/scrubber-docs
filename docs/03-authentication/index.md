---
id: index
title: Authentication
sidebar_label: Overview
---

# Authentication

**Status:** Implemented (Nest `auth` module + Next.js auth routes)

## Mechanisms

| Mechanism | Use |
|---|---|
| JWT access + refresh | Interactive users (portal/staff) |
| Password reset tokens | Forgot / reset password flows |
| Email verification | Optional soft-gate via env flags |
| Tenant invites | Accept-invite onboarding |
| API client tokens | Machine clients |

## UI routes

`/login`, forgot/reset password, `/verify-email`, `/accept-invite`, `/confirm-password`, `/profile`.

## Related

- [User Sessions](./user-sessions)
- [Invites & Verification](./invites-and-verification)
- [API Client Tokens](./api-client-tokens)

