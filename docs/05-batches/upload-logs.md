---
id: upload-logs
title: Upload Logs
sidebar_label: Upload Logs
---

# Upload Logs

**Status:** Implemented

Operational views for upload attempts and errors:

- Portal: `/portal/upload-logs`
- Staff: `/dashboard/upload-logs`

Backend module: `upload-logs`. Related persistence includes `EdiUploadErrorLog` for structural/upload failures.

Do not store full PHI payloads in log UIs — prefer filenames, sizes, and error summaries.

