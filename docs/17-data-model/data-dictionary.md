---
id: data-dictionary
title: Data Dictionary
sidebar_label: Data Dictionary
---

# Data Dictionary (Core)

| Model | Purpose |
|---|---|
| `Tenant` | Customer organization |
| `TenantFeature` | Feature flags per tenant |
| `User` | Interactive user |
| `RolePermission` | Permission grants |
| `BatchFile` | Uploaded EDI batch metadata |
| `Claim` | Parsed claim |
| `ClaimDiagnosis` | Diagnosis rows |
| `ServiceLine` | Procedure lines |
| `EdiUploadErrorLog` | Upload/structural errors |
| `AuditEvent` / `AuditCategory` | Audit trail |
| `SupportTicket` / `SupportMessage` | Inquiries |
| `ApiClient` | Machine clients |
| `CptCode`, `Icd10TabularCode`, `Ncci`, `MuePractitioner`, … | Reference libraries |

Column-level detail: Prisma schema.

