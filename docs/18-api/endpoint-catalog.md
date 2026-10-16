---
id: endpoint-catalog
title: Endpoint Catalog
sidebar_label: Endpoint Catalog
---

# Endpoint Catalog

High-level groups (see OpenAPI for full paths):

| Group | Examples |
|---|---|
| Health | `GET /health` (outside `/api/v1` prefix) |
| Auth | login, refresh, password reset, verify, invites |
| Batches | upload-url, complete, multipart create, EDI viewer |
| Claims | list/detail under batch context |
| Support | public, mine, admin inquiries |
| Audit | admin events/categories; tenant events |
| Admin | tenants, users, permissions, service-clients, references |
| Integrations | portal integration settings / clients as implemented |

Prefer Swagger “Try it out” locally with a Bearer token.

