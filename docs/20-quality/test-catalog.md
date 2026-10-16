---
id: test-catalog
title: Test Catalog
sidebar_label: Test Catalog
---

# Test Catalog

Organize new tests by domain:

| Domain | Prefer |
|---|---|
| Parser / structural | Golden + unit fixtures (synthetic EDI) |
| Validation rules | Unit per rule file + golden snapshots |
| HTTP contract | Contract tests vs OpenAPI |
| Upload flow | Integration with MinIO test config |
| UI critical paths | Playwright login → batch list |

Keep fixtures synthetic.

