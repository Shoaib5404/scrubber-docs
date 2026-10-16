---
id: results
title: Validation Results
sidebar_label: Results
---

# Validation Results

Issues are represented as structured `ClaimIssue` values and persisted onto claim/line status fields for API/UI consumption.

Consumers:

- Staff/portal claim detail views
- Batch summary badges
- Potential future exports (**Planned/Partial** unless a specific export exists in code)

Always distinguish **validation findings** (business scrub results) from **infrastructure failures** (DB/Redis/MinIO down).

