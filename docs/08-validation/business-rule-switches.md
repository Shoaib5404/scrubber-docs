---
id: business-rule-switches
title: Business Rule Switches
sidebar_label: Rule Switches
---

# Business Rule Switches

**Status:** Implemented (`business-rules`)

The [298 business rules](./business-rule-catalog) can be turned on or off without a deploy. The 39 structural file checks stay on for every upload.

Settings are stored in PostgreSQL. Claim validation reads them once at the start of each claim and keeps that set until the claim finishes. A queue retry reads again.

## Who can change a switch

| Person | What they can change |
|---|---|
| Staff super admin | The platform default for every rule, and who else may set a personal switch. |
| Staff admin, staff user, or tenant admin with a grant | Their own switch only. |
| Anyone else | Nothing. Their uploads follow the platform default. |

A personal switch applies to batches uploaded by that user. It does not change another person in the same organization.

When a personal row exists, it wins. Otherwise the platform row wins. If neither row exists, the rule stays on, which is how scrubbing worked before this feature.

## What off means

A disabled rule does not add a new finding. Other rules still run. Findings already saved on a claim stay until that claim is validated again.

Two rules also change what happens next:

- **`DOS-FUT-001` off.** A future date of service does not stop the rest of the business rules.
- **`CPT-001` or `REQ-007` off.** The line still continues into later clinical checks, and the missing or unknown procedure is not reported by that rule.

Turning a rule off asks for confirmation. The platform default and each personal switch are written to the audit log.
