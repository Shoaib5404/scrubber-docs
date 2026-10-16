---
id: requirements-traceability
title: Requirements Traceability
sidebar_label: Traceability
---

# Requirements Traceability

:::info Purpose
Map high-level product capabilities to implementation surfaces so gaps are visible.
:::

| ID | Capability | Status | Evidence |
|---|---|---|---|
| SCR-001 | EDI 837P upload (presigned + multipart) | Implemented | `batches` module, backend README |
| SCR-002 | Structural EDI validation / parse | Implemented | `edi-structural-validation`, `edi-parser` |
| SCR-003 | Persist batch / claim / DX / lines | Implemented | Prisma `BatchFile`, `Claim`, … |
| SCR-004 | Business claim validation rules | Implemented | `claim-validation` rule files |
| SCR-005 | Async validation via BullMQ | Partial | `USE_QUEUE` + worker; default inline |
| SCR-006 | Tenant isolation | Implemented | Tenant-scoped APIs + storage keys |
| SCR-007 | Staff vs portal UI | Implemented | Next.js `/dashboard` vs `/portal` |
| SCR-008 | JWT + API client auth | Implemented | `auth` module |
| SCR-009 | Support inquiries | Implemented | `support` module |
| SCR-010 | Audit events | Implemented | `audit` module |
| SCR-011 | Reference libraries (CPT/ICD/NCCI/…) | Implemented | `references`, Prisma ref tables |
| SCR-012 | Lookup Redis cache | Implemented | Redis DB 1 + CLI warm/flush |
| SCR-013 | Production Azure runbook | Unverified | Not fully specified in-repo |

See [Requirement IDs](./requirement-ids) and [Priorities](./priorities).

