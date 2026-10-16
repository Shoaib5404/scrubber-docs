---
id: diagnoses-and-service-lines
title: Diagnoses & Service Lines
sidebar_label: Diagnoses & Service Lines
---

# Diagnoses & Service Lines

| Entity | Prisma model | Role |
|---|---|---|
| Diagnosis | `ClaimDiagnosis` | ICD pointers / codes on the claim |
| Service line | `ServiceLine` | CPT/HCPCS, modifiers, units, charges, validation status |

Mapping from EDI loops/segments is described under [Claim Mapping](../edi-837p/claim-mapping).

