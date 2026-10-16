---
id: inquiry-workflow
title: Inquiry Workflow
sidebar_label: Inquiry Workflow
---

# Inquiry Workflow

## Behavior (v1)

- Landing **Request a Demo** and `/contact` submit to `POST /support/public` (text-only)
- Email on submit **only** for category `sales_demo`, and only to `SUPPORT_INBOX`
- Staff replies always save; emailed to requester **only** for `sales_demo`
- Customers may attach **one** allowlisted file when `STORAGE_DRIVER=s3`

## Env

| Variable | Purpose |
|---|---|
| `SUPPORT_INBOX` | Staff inbox for demo alerts; empty = store only |
| `INQUIRY_ATTACHMENT_MAX_BYTES` | Max attachment (default 5 MiB) |

## Attachments

- Keys: `inquiries/{tenantId}/{userId}/{uuid}{ext}`
- Allowed: `.edi`, `.x12`, `.txt`, `.png`, `.jpg`, `.jpeg`
- Never attached to outbound email

