---
id: testing-strategy
title: Testing Strategy
sidebar_label: Testing Strategy
---

# Testing Strategy

## Backend

| Suite | Command |
|---|---|
| Unit | `npm test` |
| Coverage | `npm run test:cov` |
| Integration | `npm run test:integration` |
| Contract | `npm run test:contract` |
| E2E | `npm run test:e2e` |
| Golden | `npm run test:golden` |

Many suites expect local Postgres/Redis (sometimes Testcontainers). Never point tests at production.

## Frontend

- Node test runner (unit)
- Playwright (e2e) — prefer `127.0.0.1` API URL to avoid localhost flakes

