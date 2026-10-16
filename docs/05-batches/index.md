---
id: index
title: Batches
sidebar_label: Overview
---

# Batches

A **batch** is an uploaded EDI file plus derived claim records and processing status.

## Primary flows

1. [Upload workflow](./upload-workflow) — presigned MinIO PUT or multipart API
2. [Batch lifecycle](./batch-lifecycle) — parse → persist → validate → review
3. [Upload logs](./upload-logs) — operational visibility into upload attempts

## UI

- Portal: `/portal/batches`, claim drill-downs, EDI viewer
- Staff: `/dashboard/batches` (includes tenant filters)

## Modules

Backend: `batches`, `imports`, `upload-logs`, `edi-parser`, `edi-structural-validation`, `claim-validation`.

