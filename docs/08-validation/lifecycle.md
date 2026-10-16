---
id: lifecycle
title: Validation Lifecycle
sidebar_label: Lifecycle
---

# Validation Lifecycle

Structural checks run first and are listed in [Structural validation](../edi-837p/structural-validation). The steps below start only after a claim has been saved. The gate that can stop the clinical rules is described in [How claim rules run](./how-claim-rules-run).

1. Claim (+ lines/diagnoses) available after parse
2. `ClaimRuleLookupService` preloads reference rows / caches (CPT, ICD, NCCI, …)
3. Rule functions emit `ClaimIssue` entries
4. Service-line status updates applied via `buildServiceLineStatusUpdates`
5. UI reads persisted findings

**Queue mode:** when `USE_QUEUE=true` (and optionally `PARALLEL_VALIDATE=true`), validation can fan out through BullMQ; run `npm run start:worker:dev`.

