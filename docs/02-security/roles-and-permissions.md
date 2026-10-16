---
id: roles-and-permissions
title: Roles & Permissions
sidebar_label: Roles & Permissions
---

# Roles & Permissions

## 1. Surfaces

| Surface | Who | Notes |
|---|---|---|
| Customer portal | Tenant users / tenant admins | Data scoped to tenant |
| Staff dashboard | Platform staff roles | Cross-tenant ops; permission gated |
| Super admin | Elevated staff | Permissions UI, audit category toggles |

## 2. Permission examples (Implemented)

| Permission | Typical use |
|---|---|
| `inquiries.view` | Staff support inbox |
| `audit.view` | View audit events |
| Reference / admin permissions | Reference admin domains |

Exact seeded grants live in the backend permissions / seed path. Super admin bypasses checks where implemented.

## 3. Management UI

Staff with access manage grants at `/dashboard/permissions`.

