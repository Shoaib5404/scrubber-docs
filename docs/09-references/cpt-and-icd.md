---
id: cpt-and-icd
title: CPT & ICD
sidebar_label: CPT & ICD
---

# CPT & ICD

## UI search

- `/search` — coding search
- `/cpt/[code]` — CPT detail
- `/icd10-cm/…` — ICD-10-CM navigation

## Data

- `CptCode`, modifier tables, CPT/POS/modifier rules
- `Icd10TabularCode` (+ descriptions), gender/age ICD rules, unacceptable principal DX, body-sidewise helpers

Lookup responses may include `Cache: HIT|MISS|BYPASS|ERROR` when Redis lookup cache is enabled.

