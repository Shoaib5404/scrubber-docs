---
id: invites-and-verification
title: Invites & Verification
sidebar_label: Invites & Verification
---

# Invites & Verification

## Tenant invites

- Prisma `TenantInvite` backs invite acceptance
- UI: `/accept-invite`
- Mail delivery requires configured SendGrid or Resend

## Email verification

- Backend `EMAIL_VERIFICATION_REQUIRED` mirrored by frontend `NEXT_PUBLIC_EMAIL_VERIFICATION_REQUIRED`
- Soft-gates unverified users toward `/verify-email` when enabled

Mail failures should be treated as operational issues — do not weaken auth to “fix” local setup.

