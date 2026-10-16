---
id: lifecycle
title: Data Lifecycle
sidebar_label: Lifecycle
---

# Data Lifecycle

1. **Upload** — object storage bytes + eventual `BatchFile`
2. **Parse** — claims/diagnoses/lines inserted
3. **Validate** — statuses/issues updated on claims/lines
4. **Review** — users read via API/UI
5. **Audit** — append-only events for sensitive actions
6. **Support** — tickets/messages; attachments in object storage

Retention for audit is indefinite (no auto-purge). Broader retention/legal hold policies are **Unverified** unless published by the business.

