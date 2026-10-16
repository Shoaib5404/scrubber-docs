---
id: failure-strategy
title: Failure Strategy
sidebar_label: Failure Strategy
---

# Failure Strategy

Guidance for integrators:

1. Treat `4xx` as client/contract issues (fix payload, auth, validation)
2. Treat `5xx` / network as retryable with backoff (avoid duplicate completes without idempotency checks)
3. Distinguish structural upload failures from business validation findings
4. Prefer Problem Details / documented error envelopes (see [API Errors](../api/errors))

Exact retry budgets are **Unverified** unless encoded in a client SDK (none required by the API itself).

