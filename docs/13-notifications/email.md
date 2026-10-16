---
id: email
title: Email
sidebar_label: Email
---

# Email

Configure provider keys in backend `.env` (`SENDGRID_*` or `RESEND_*`, `MAIL_FROM*`).

Local development can omit mail keys; flows that require mail will no-op or fail gracefully depending on the code path — check logs rather than disabling auth.

Support email rules are category-specific (see [Inquiry Workflow](../support/inquiry-workflow)).

