---
id: data-privacy
title: Data Privacy
sidebar_label: Data Privacy
---

# Data Privacy

## Principles

1. Minimize PHI in logs and tickets
2. Tenant isolation for customer data
3. Synthetic fixtures for docs, demos, and tests
4. Secrets only in server env — never in frontend `NEXT_PUBLIC_*`

## Storage

| Data | Store |
|---|---|
| EDI bytes | Local disk or S3/MinIO object keys |
| Claim structured fields | PostgreSQL |
| Lookup caches | Redis DB 1 |
| Inquiry attachments | Object storage under `inquiries/…` |

## Documentation rule

Examples in this site use placeholders such as `PATIENT_SYNTHETIC` and fake NPIs. Do not paste production exports into Markdown.

