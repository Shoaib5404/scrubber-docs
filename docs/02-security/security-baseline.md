---
id: security-baseline
title: Security Baseline
sidebar_label: Security Baseline
---

# Security Baseline

Checklist for environments:

- [ ] Strong unique `JWT_*` secrets (not defaults)
- [ ] `CORS_ORIGINS` limited to real UI origins
- [ ] Database and Redis not exposed publicly without controls
- [ ] `STORAGE_DRIVER` and S3 credentials scoped least-privilege
- [ ] Mail provider keys only on API hosts
- [ ] Rate limiting enabled (Nest throttler)
- [ ] No PHI in application logs
- [ ] Migrations run only against intended databases

Production hosting details beyond the repository READMEs are **Unverified** here.

