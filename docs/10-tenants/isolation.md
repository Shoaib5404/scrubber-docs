---
id: isolation
title: Tenant Isolation
sidebar_label: Isolation
---

# Tenant Isolation

**Status:** Implemented (verify per endpoint when extending)

- Customer APIs scope queries by tenant from the authenticated principal
- EDI object keys include `tenantId` for customer uploads
- Staff uploads may use platform path `edi/0/…` with `tenantId = null`
- Audit events for customers hide platform-only categories

Never rely on UI hiding alone — authorization must enforce scope server-side.

