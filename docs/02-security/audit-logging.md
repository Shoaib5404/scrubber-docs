---
id: audit-logging
title: Audit Logging
sidebar_label: Audit Logging
---

# Audit Logging

**Status:** Implemented

The platform records append-only **audit events** for auth, admin mutations, batch pipeline steps, reference-admin changes, and credential operations.

## Access

| Role | View events | Toggle categories |
|---|---|---|
| Super Admin | Yes (all) | Yes (`/dashboard/audit-settings`) |
| Staff with `audit.view` | Yes (all) | No |
| Customer / Tenant Admin | Own tenant only; platform-only categories hidden | No |

## Retention

Indefinite. No automatic purge (**Implemented** as of current docs).

## Privacy

Metadata must not include EDI payloads, PHI, passwords, secrets, or tokens. Upload success logs store filename and size only.

## APIs

- `GET/PATCH /api/v1/admin/audit/categories` — Super Admin
- `GET /api/v1/admin/audit/events` — `audit.view`
- `GET /api/v1/audit/events` — tenant-scoped customer list

UI: `/dashboard/audit-logs`, `/portal/audit-logs`.

