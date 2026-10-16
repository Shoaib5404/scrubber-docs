---
id: security-overview
title: Security Overview
sidebar_label: Overview
---

# Security Overview

## 1. Controls (Implemented)

- JWT access + refresh for interactive users; API client tokens for machines
- Role / permission checks and tenant scoping in Nest modules
- Helmet, CORS allow-list, validation pipes (`whitelist` / `forbidNonWhitelisted`)
- Rate limiting via `@nestjs/throttler`
- Append-only audit events (category toggles for Super Admin)

## 2. Sensitive data

Scrubber handles healthcare **claims EDI**. Treat uploads and claim fields as sensitive:

- Never commit real EDI containing PHI
- Never log passwords, tokens, or full sensitive payloads
- Docs and tests use **synthetic** samples only

:::danger Compliance
Do **not** claim HIPAA certification solely because the app handles healthcare data. Any compliance statement needs explicit authoritative evidence and approval.
:::

## 3. Related pages

- [Roles & Permissions](./roles-and-permissions)
- [Endpoint Authorization](./endpoint-authorization)
- [Audit Logging](./audit-logging)
- [Data Privacy](./data-privacy)
- [Security Baseline](./security-baseline)

