---
id: claim-mapping
title: Claim Mapping
sidebar_label: Claim Mapping
---

# Claim Mapping

Parser output maps EDI claim content into:

- `Claim` — header / subscriber / payer / provider fields used by rules
- `ClaimDiagnosis` — diagnosis codes and pointers
- `ServiceLine` — procedure lines, modifiers, units, amounts

Illustrative (synthetic) shape — **not** a live payload:

```json
{
  "patientControlNumber": "SYNTH-001",
  "billingNpi": "1234567893",
  "diagnoses": [{"code": "E11.9"}],
  "serviceLines": [{"cpt": "99213", "units": 1}]
}
```

For authoritative field lists, read Prisma models and parser DTOs.

