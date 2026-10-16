---
id: endpoint-authorization
title: Endpoint Authorization
sidebar_label: Endpoint Authorization
---

# Endpoint Authorization

## Patterns

1. **Public** — e.g. login, password reset, public support demo submit
2. **Authenticated user JWT** — portal and staff session APIs
3. **Permission-gated** — staff admin routes require specific permissions
4. **API client token** — machine-to-machine batch/integration calls
5. **Tenant scope** — customer routes filter by `tenantId` from the session

:::warning
Never document production-only internal endpoints or break-glass procedures in public hosting without approval.
:::

Authoritative matrix: Nest controllers + guards. Prefer [Swagger](http://localhost:3011/api/docs) locally for method-level detail.

