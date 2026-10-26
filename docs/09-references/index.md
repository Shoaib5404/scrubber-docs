---
id: index
title: References
sidebar_label: Overview
---

# References

Large coding and edit libraries back validation (CPT, ICD-10, modifiers, NCCI, MUE, contractors/articles, payer crosswalks, NPI ordering/referring, etc.).

See Prisma schema for the full table list. Admin UI: `/dashboard/references`.

CMS **Order and Referring** NPIs (`npi_ordering_referrings`) sync via Nest scheduler / CLI — twice daily at **00:00** and **12:00** `America/New_York` when `NPI_SYNC_SCHEDULE_ENABLED=true`. See [Background Jobs](../observability/background-jobs).

- [CPT & ICD](./cpt-and-icd)
- [Reference Admin](./reference-admin)

