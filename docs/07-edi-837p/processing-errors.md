---
id: processing-errors
title: Processing Errors
sidebar_label: Processing Errors
---

# Processing Errors

| Stage | Typical outcome |
|---|---|
| Upload / HeadObject | HTTP error; object cleaned up on failed complete |
| Structural validation | No `BatchFile` row; error logged |
| Parse mapping | Fail batch accept or partial depending on code path — verify in services |
| Business validation | Claim/line issues stored; batch remains for review |

Troubleshooting: [Getting Started](../getting-started/troubleshooting-setup) and backend README table.

