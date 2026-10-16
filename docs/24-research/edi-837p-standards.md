---
id: edi-837p-standards
title: EDI 837P Standards Notes
sidebar_label: EDI 837P Standards
---

# EDI 837P Standards Notes

:::info
Summaries only. Do not reproduce copyrighted X12 implementation guides. Link to authorized sources your organization licenses.
:::

Scrubber implements an application-specific subset of 837P processing (parse, structural checks, business edits). When researching:

1. Confirm which IG/version the parser models target in `edi/837p/`
2. Prefer tests + models over external blogs
3. Keep synthetic samples in fixtures — never production extractions

