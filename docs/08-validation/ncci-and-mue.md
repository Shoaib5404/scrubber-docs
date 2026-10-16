---
id: ncci-and-mue
title: NCCI & MUE
sidebar_label: NCCI & MUE
---

# NCCI & MUE

**Status:** Implemented

| Concern | Code | Data |
|---|---|---|
| NCCI edits | `ncci.rules.ts` + `NcciRulesCacheService` | Prisma `Ncci` (+ Redis warm helpers) |
| MUE practitioner | `mue-practitioner.rules.ts` | `MuePractitioner` |
| MUE UHC/Oxford specialty | `mue-uhc-oxford.rules.ts` | Related MUE tables |

CLI helpers (backend):

```bash
npm run cli -- ncci:rules-cache-fetch --warm
```

Exact edit messages and MAI handling: read the rule implementations and golden/unit tests — do not invent severities here.

