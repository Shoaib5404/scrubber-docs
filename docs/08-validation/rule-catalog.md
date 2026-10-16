---
id: rule-catalog
title: Rule Catalog
sidebar_label: Rule Catalog
---

# Rule Catalog

**Status:** Implemented modules listed below.

For what each rule means to a reviewer, use the [business rule catalog](./business-rule-catalog). File-format checks are documented separately in [structural validation](../edi-837p/structural-validation). This page is only a map from topic to source file.

| Area | Source files (under `claim-validation/rules/`) |
|---|---|
| Claim fields / filing indicator | `claim-field.rules.ts`, `claim-filing-indicator.rules.ts` |
| BCBS routing | `bcbs-claim-routing.rules.ts` |
| Payer / EDI-specific | `payer-edi-specific.rules.ts`, `payer-edi-claim-rules.ts`, handlers |
| CPT core / add-on / POS / modifiers | `cpt.rules.ts` |
| ICD diagnosis / body side | `icd-diagnosis.rules.ts`, `icd-body-sidewise.rules.ts` |
| Medicare NCD ICD-10 | `medicare-ncd-icd10.rules.ts` |
| NPI provider | `npi-provider.rules.ts` |
| Service line basics / NDC / I-codes | `service-line-basics.rules.ts`, `ndc.rules.ts`, `icode.rules.ts` |
| Anesthesia / E&M / bundling | `anesthesia.rules.ts`, `enm.rules.ts`, `em-bundling.rules.ts` |
| Global surgical modifiers | `global-surgical-modifier.rules.ts` |
| Radiology TC | `radiology-tc-modifier.rules.ts` |
| Modifier sequence | `modifier-sequence.rules.ts` |
| NCCI | `ncci.rules.ts` |
| MUE practitioner / UHC Oxford | `mue-practitioner.rules.ts`, `mue-uhc-oxford.rules.ts` |
| Aetna LCD / Cigna 62308 / UHC POS | `aetna-lcd.rules.ts`, `cigna-62308.rules.ts`, `uhc-87726-pos.rules.ts` |

When documenting a single rule in depth, include: ID/name, category, trigger, inputs, result severity, scope, and source path.

