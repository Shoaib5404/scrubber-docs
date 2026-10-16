---
id: errors
title: API Errors
sidebar_label: Errors
---

# API Errors

Nest returns Problem Details-style or batch-specific envelopes depending on the route. Frontend guidance lives in `scrubber-frontend/docs/error-handling.md`.

Integrators should branch on HTTP status + documented body fields — do not scrape UI toast strings.

