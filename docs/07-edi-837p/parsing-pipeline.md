---
id: parsing-pipeline
title: Parsing Pipeline
sidebar_label: Parsing Pipeline
---

# Parsing Pipeline

**Status:** Implemented

1. File enters via presigned upload + `complete`, or multipart `POST /batches`
2. Structural validation / parse run against EDI 837P models (`edi/837p/`)
3. Batch, claim, diagnosis, and service-line records persist in Postgres
4. Business validation runs inline by default (`USE_QUEUE=false`)
5. Status and findings exposed through batch/claim APIs

Modules: `edi-parser`, `edi-structural-validation`, `batches`, `claim-validation`.

