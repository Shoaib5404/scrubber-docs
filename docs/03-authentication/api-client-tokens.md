---
id: api-client-tokens
title: API Client Tokens
sidebar_label: API Client Tokens
---

# API Client Tokens

**Status:** Implemented via `ApiClient` model and service-client admin UI.

- Staff manage clients under `/dashboard/service-clients`
- Tokens authenticate machine integrations (batch upload, etc.)
- Expiration controlled by `API_TOKEN_EXPIRATION_MINUTES` (and related config)

:::warning
Treat client tokens like passwords. Rotate on leak. Never commit tokens into docs or git.
:::

