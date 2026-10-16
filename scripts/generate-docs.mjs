/**
 * One-shot generator for Scrubber documentation pages.
 * Run: node scripts/generate-docs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs');

function write(rel, body) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), {recursive: true});
  fs.writeFileSync(full, body.trimStart() + '\n', 'utf8');
}

function page(id, title, sidebarLabel, content) {
  return `---
id: ${id}
title: ${title}
sidebar_label: ${sidebarLabel}
---

${content.trim()}
`;
}

// ── 00 Product Overview ──────────────────────────────────────────────
write(
  '00-product-overview/index.md',
  page(
    'index',
    'Product Overview',
    'Product Overview',
    `
# Scrubber — Product Overview

## 1. Purpose

Scrubber (Neo Scrubber) is an **EDI 837P claims scrubber**. Organizations upload professional claim files, the platform parses and validates them against structural and business rules, and users review batch/claim results in a web UI.

## 2. Users

| Audience | Surface | Typical work |
|---|---|---|
| Tenant customers | \`/portal\` | Upload batches, review claims, team members, support, tenant audit |
| Platform staff | \`/dashboard\` | Cross-tenant batches, tenants/users, references, inquiries, audit |
| API clients | Machine tokens | Programmatic batch upload / integration |
| Super admins | Staff + settings | Permissions, audit categories, service clients |

See [Roles & Permissions](../security/roles-and-permissions).

## 3. System boundary

| In scope (implemented stack) | Out of scope for this site |
|---|---|
| NestJS API + Next.js UI under \`C:\\\\sites\\\\Scrubber\` | Speculating about unverified production infrastructure |
| EDI 837P parse, structural validation, claim validation | Claiming HIPAA certification without evidence |
| Tenants, auth, support, audit, references | Inventing endpoints or rules not in code |

## 4. Architecture (summary)

\`\`\`mermaid
flowchart LR
  UI[Next.js UI :3010] --> API[NestJS API :3011]
  API --> PG[(PostgreSQL)]
  API --> Redis[(Redis)]
  API --> S3[(MinIO / S3)]
  Worker[BullMQ Worker] --> Redis
  Worker --> PG
  Sched[Scheduler] --> Redis
\`\`\`

Details: [Architecture](../architecture/) · [Getting Started](../getting-started/local-development).

## 5. Source of truth

1. Executable code in \`scrubber-backend\` and \`scrubber-frontend\`
2. Prisma schema and Nest routes / OpenAPI export
3. App READMEs and feature notes under frontend \`docs/\`

This site expands verified behavior. Status labels (**Implemented** / **Partial** / **Planned** / **Unverified**) appear where assumptions would otherwise mislead.

## 6. How to navigate

- New engineers → [Local Development](../getting-started/local-development)
- Product flow → [Batches](../batches/) → [EDI 837P](../edi-837p/) → [Validation](../validation/)
- Contracts → [API](../api/) · [Data Model](../data-model/)
- Gaps → [Open Decisions](../decisions/open-decisions)
`,
  ),
);

write(
  '00-product-overview/documentation-conventions.md',
  page(
    'documentation-conventions',
    'Documentation Conventions',
    'Conventions',
    `
# Documentation Conventions

## 1. Folder and ID rules

- Folders use numeric prefixes (\`00-\` … \`25-\`) for editor ordering.
- Docusaurus strips those prefixes from doc IDs — sidebar entries omit them.
- Prefer \`index.md\` hubs per section with relative links to child pages.

## 2. Frontmatter

Every page includes:

\`\`\`yaml
---
id: <slug>
title: <page title>
sidebar_label: <nav label>
---
\`\`\`

## 3. Writing standards

- One primary topic per page
- Evidence-based claims only; mark **Unverified** when needed
- Synthetic EDI/JSON examples — never real PHI or production secrets
- Prefer admonitions for Purpose / Critical / No secrets
- Link instead of duplicating long catalogs

## 4. Adding content

| Change | Where |
|---|---|
| New product module | New numbered section or page under the closest domain |
| New API surface | [API endpoint catalog](../api/endpoint-catalog) + OpenAPI export |
| New validation rule | [Rule catalog](../validation/rule-catalog) with source file pointer |
| New env var | [Environment variables](../infrastructure/environment-variables) |

## 5. Validation before merge

\`\`\`bash
npm run build
npm run typecheck
\`\`\`

Broken internal links fail the build (\`onBrokenLinks: 'throw'\`).
`,
  ),
);

// ── 01 Requirements ──────────────────────────────────────────────────
write(
  '01-requirements/requirements-traceability.md',
  page(
    'requirements-traceability',
    'Requirements Traceability',
    'Traceability',
    `
# Requirements Traceability

:::info Purpose
Map high-level product capabilities to implementation surfaces so gaps are visible.
:::

| ID | Capability | Status | Evidence |
|---|---|---|---|
| SCR-001 | EDI 837P upload (presigned + multipart) | Implemented | \`batches\` module, backend README |
| SCR-002 | Structural EDI validation / parse | Implemented | \`edi-structural-validation\`, \`edi-parser\` |
| SCR-003 | Persist batch / claim / DX / lines | Implemented | Prisma \`BatchFile\`, \`Claim\`, … |
| SCR-004 | Business claim validation rules | Implemented | \`claim-validation\` rule files |
| SCR-005 | Async validation via BullMQ | Partial | \`USE_QUEUE\` + worker; default inline |
| SCR-006 | Tenant isolation | Implemented | Tenant-scoped APIs + storage keys |
| SCR-007 | Staff vs portal UI | Implemented | Next.js \`/dashboard\` vs \`/portal\` |
| SCR-008 | JWT + API client auth | Implemented | \`auth\` module |
| SCR-009 | Support inquiries | Implemented | \`support\` module |
| SCR-010 | Audit events | Implemented | \`audit\` module |
| SCR-011 | Reference libraries (CPT/ICD/NCCI/…) | Implemented | \`references\`, Prisma ref tables |
| SCR-012 | Lookup Redis cache | Implemented | Redis DB 1 + CLI warm/flush |
| SCR-013 | Production Azure runbook | Unverified | Not fully specified in-repo |

See [Requirement IDs](./requirement-ids) and [Priorities](./priorities).
`,
  ),
);

write(
  '01-requirements/requirement-ids.md',
  page(
    'requirement-ids',
    'Requirement IDs',
    'Requirement IDs',
    `
# Requirement IDs

## Naming

\`SCR-<domain>-<nnn>\` or short \`SCR-nnn\` for cross-cutting capabilities.

| Prefix | Domain |
|---|---|
| SCR | Cross-cutting / product |
| BAT | Batches / upload |
| EDI | EDI parse & structure |
| VAL | Validation rules |
| TEN | Tenants |
| AUT | Authentication |
| SUP | Support |
| AUD | Audit |

## Usage

- Traceability tables reference IDs
- New features should claim an ID in PR notes when useful
- Do not invent IDs for unimplemented marketing claims
`,
  ),
);

write(
  '01-requirements/priorities.md',
  page(
    'priorities',
    'Priorities',
    'Priorities',
    `
# Priorities

Documentation and product priority order (aligned with the build prompt):

1. **Accuracy** — document verified behavior
2. **Security & PHI protection** — no secrets or real claim payloads in docs
3. **Preserve application behavior** — docs site must not change FE/BE
4. **Developer onboarding** — local setup and core flows first
5. **Completeness** — catalogs and edge cases after hubs
6. **Maintainability** — conventions and OpenAPI linkage
7. **Visual polish** — brand-consistent docs shell
`,
  ),
);

// ── 02 Security ──────────────────────────────────────────────────────
write(
  '02-security/security-overview.md',
  page(
    'security-overview',
    'Security Overview',
    'Overview',
    `
# Security Overview

## 1. Controls (Implemented)

- JWT access + refresh for interactive users; API client tokens for machines
- Role / permission checks and tenant scoping in Nest modules
- Helmet, CORS allow-list, validation pipes (\`whitelist\` / \`forbidNonWhitelisted\`)
- Rate limiting via \`@nestjs/throttler\`
- Append-only audit events (category toggles for Super Admin)

## 2. Sensitive data

Scrubber handles healthcare **claims EDI**. Treat uploads and claim fields as sensitive:

- Never commit real EDI containing PHI
- Never log passwords, tokens, or full sensitive payloads
- Docs and tests use **synthetic** samples only

:::danger Compliance
Do **not** claim HIPAA certification solely because the app handles healthcare data. Any compliance statement needs explicit authoritative evidence and approval.
:::

## 3. Related pages

- [Roles & Permissions](./roles-and-permissions)
- [Endpoint Authorization](./endpoint-authorization)
- [Audit Logging](./audit-logging)
- [Data Privacy](./data-privacy)
- [Security Baseline](./security-baseline)
`,
  ),
);

write(
  '02-security/roles-and-permissions.md',
  page(
    'roles-and-permissions',
    'Roles & Permissions',
    'Roles & Permissions',
    `
# Roles & Permissions

## 1. Surfaces

| Surface | Who | Notes |
|---|---|---|
| Customer portal | Tenant users / tenant admins | Data scoped to tenant |
| Staff dashboard | Platform staff roles | Cross-tenant ops; permission gated |
| Super admin | Elevated staff | Permissions UI, audit category toggles |

## 2. Permission examples (Implemented)

| Permission | Typical use |
|---|---|
| \`inquiries.view\` | Staff support inbox |
| \`audit.view\` | View audit events |
| Reference / admin permissions | Reference admin domains |

Exact seeded grants live in the backend permissions / seed path. Super admin bypasses checks where implemented.

## 3. Management UI

Staff with access manage grants at \`/dashboard/permissions\`.
`,
  ),
);

write(
  '02-security/endpoint-authorization.md',
  page(
    'endpoint-authorization',
    'Endpoint Authorization',
    'Endpoint Authorization',
    `
# Endpoint Authorization

## Patterns

1. **Public** — e.g. login, password reset, public support demo submit
2. **Authenticated user JWT** — portal and staff session APIs
3. **Permission-gated** — staff admin routes require specific permissions
4. **API client token** — machine-to-machine batch/integration calls
5. **Tenant scope** — customer routes filter by \`tenantId\` from the session

:::warning
Never document production-only internal endpoints or break-glass procedures in public hosting without approval.
:::

Authoritative matrix: Nest controllers + guards. Prefer [Swagger](http://localhost:3011/api/docs) locally for method-level detail.
`,
  ),
);

write(
  '02-security/audit-logging.md',
  page(
    'audit-logging',
    'Audit Logging',
    'Audit Logging',
    `
# Audit Logging

**Status:** Implemented

The platform records append-only **audit events** for auth, admin mutations, batch pipeline steps, reference-admin changes, and credential operations.

## Access

| Role | View events | Toggle categories |
|---|---|---|
| Super Admin | Yes (all) | Yes (\`/dashboard/audit-settings\`) |
| Staff with \`audit.view\` | Yes (all) | No |
| Customer / Tenant Admin | Own tenant only; platform-only categories hidden | No |

## Retention

Indefinite. No automatic purge (**Implemented** as of current docs).

## Privacy

Metadata must not include EDI payloads, PHI, passwords, secrets, or tokens. Upload success logs store filename and size only.

## APIs

- \`GET/PATCH /api/v1/admin/audit/categories\` — Super Admin
- \`GET /api/v1/admin/audit/events\` — \`audit.view\`
- \`GET /api/v1/audit/events\` — tenant-scoped customer list

UI: \`/dashboard/audit-logs\`, \`/portal/audit-logs\`.
`,
  ),
);

write(
  '02-security/data-privacy.md',
  page(
    'data-privacy',
    'Data Privacy',
    'Data Privacy',
    `
# Data Privacy

## Principles

1. Minimize PHI in logs and tickets
2. Tenant isolation for customer data
3. Synthetic fixtures for docs, demos, and tests
4. Secrets only in server env — never in frontend \`NEXT_PUBLIC_*\`

## Storage

| Data | Store |
|---|---|
| EDI bytes | Local disk or S3/MinIO object keys |
| Claim structured fields | PostgreSQL |
| Lookup caches | Redis DB 1 |
| Inquiry attachments | Object storage under \`inquiries/…\` |

## Documentation rule

Examples in this site use placeholders such as \`PATIENT_SYNTHETIC\` and fake NPIs. Do not paste production exports into Markdown.
`,
  ),
);

write(
  '02-security/security-baseline.md',
  page(
    'security-baseline',
    'Security Baseline',
    'Security Baseline',
    `
# Security Baseline

Checklist for environments:

- [ ] Strong unique \`JWT_*\` secrets (not defaults)
- [ ] \`CORS_ORIGINS\` limited to real UI origins
- [ ] Database and Redis not exposed publicly without controls
- [ ] \`STORAGE_DRIVER\` and S3 credentials scoped least-privilege
- [ ] Mail provider keys only on API hosts
- [ ] Rate limiting enabled (Nest throttler)
- [ ] No PHI in application logs
- [ ] Migrations run only against intended databases

Production hosting details beyond the repository READMEs are **Unverified** here.
`,
  ),
);

// ── 03 Authentication ────────────────────────────────────────────────
write(
  '03-authentication/index.md',
  page(
    'index',
    'Authentication',
    'Overview',
    `
# Authentication

**Status:** Implemented (Nest \`auth\` module + Next.js auth routes)

## Mechanisms

| Mechanism | Use |
|---|---|
| JWT access + refresh | Interactive users (portal/staff) |
| Password reset tokens | Forgot / reset password flows |
| Email verification | Optional soft-gate via env flags |
| Tenant invites | Accept-invite onboarding |
| API client tokens | Machine clients |

## UI routes

\`/login\`, forgot/reset password, \`/verify-email\`, \`/accept-invite\`, \`/confirm-password\`, \`/profile\`.

## Related

- [User Sessions](./user-sessions)
- [Invites & Verification](./invites-and-verification)
- [API Client Tokens](./api-client-tokens)
`,
  ),
);

write(
  '03-authentication/user-sessions.md',
  page(
    'user-sessions',
    'User Sessions',
    'User Sessions',
    `
# User Sessions

- Access tokens authorize \`Authorization: Bearer …\` calls to \`/api/v1\`
- Refresh tokens rotate sessions (Prisma \`RefreshToken\`)
- Frontend stores session tokens via Zustand helpers — secrets never go in \`NEXT_PUBLIC_*\`

Configure lifetimes with backend \`JWT_*\` and related env vars (see [Environment Variables](../infrastructure/environment-variables)).
`,
  ),
);

write(
  '03-authentication/invites-and-verification.md',
  page(
    'invites-and-verification',
    'Invites & Verification',
    'Invites & Verification',
    `
# Invites & Verification

## Tenant invites

- Prisma \`TenantInvite\` backs invite acceptance
- UI: \`/accept-invite\`
- Mail delivery requires configured SendGrid or Resend

## Email verification

- Backend \`EMAIL_VERIFICATION_REQUIRED\` mirrored by frontend \`NEXT_PUBLIC_EMAIL_VERIFICATION_REQUIRED\`
- Soft-gates unverified users toward \`/verify-email\` when enabled

Mail failures should be treated as operational issues — do not weaken auth to “fix” local setup.
`,
  ),
);

write(
  '03-authentication/api-client-tokens.md',
  page(
    'api-client-tokens',
    'API Client Tokens',
    'API Client Tokens',
    `
# API Client Tokens

**Status:** Implemented via \`ApiClient\` model and service-client admin UI.

- Staff manage clients under \`/dashboard/service-clients\`
- Tokens authenticate machine integrations (batch upload, etc.)
- Expiration controlled by \`API_TOKEN_EXPIRATION_MINUTES\` (and related config)

:::warning
Treat client tokens like passwords. Rotate on leak. Never commit tokens into docs or git.
:::
`,
  ),
);

// ── 04 Dashboard ─────────────────────────────────────────────────────
write(
  '04-dashboard/index.md',
  page(
    'index',
    'Dashboard',
    'Dashboard',
    `
# Dashboard

Scrubber exposes two operational homes:

| Home | Route | Audience |
|---|---|---|
| Customer portal | \`/portal\` | Tenant KPIs, recent batches |
| Staff dashboard | \`/dashboard\` | Platform overview, cross-tenant activity |

Both are desktop-first claim-ops surfaces (see [UI Principles](../ui/ui-principles)). Deep links continue into batches, claims, references, support, and admin areas.
`,
  ),
);

// ── 05 Batches ───────────────────────────────────────────────────────
write(
  '05-batches/index.md',
  page(
    'index',
    'Batches',
    'Overview',
    `
# Batches

A **batch** is an uploaded EDI file plus derived claim records and processing status.

## Primary flows

1. [Upload workflow](./upload-workflow) — presigned MinIO PUT or multipart API
2. [Batch lifecycle](./batch-lifecycle) — parse → persist → validate → review
3. [Upload logs](./upload-logs) — operational visibility into upload attempts

## UI

- Portal: \`/portal/batches\`, claim drill-downs, EDI viewer
- Staff: \`/dashboard/batches\` (includes tenant filters)

## Modules

Backend: \`batches\`, \`imports\`, \`upload-logs\`, \`edi-parser\`, \`edi-structural-validation\`, \`claim-validation\`.
`,
  ),
);

write(
  '05-batches/upload-workflow.md',
  page(
    'upload-workflow',
    'Upload Workflow',
    'Upload Workflow',
    `
# Upload Workflow

**Status:** Implemented

## Web (presigned S3/MinIO)

Requires \`STORAGE_DRIVER=s3\`.

1. \`POST /api/v1/batches/upload-url\` — Nest mints object key + short-lived PUT URL
2. Browser \`PUT\` file to MinIO
3. \`POST /api/v1/batches/complete\` — HeadObject verify → structural validate/parse → \`BatchFile\` row

Object key conventions:

- Staff uploads: \`edi/0/{userId}/…\` with \`BatchFile.tenantId = null\`
- Tenant uploads: \`edi/{tenantId}/{userId}/…\`

## API clients (multipart)

\`POST /api/v1/batches\` multipart uses the same key convention.

## Notes

- Integer IDs only (no UUIDs for batch PKs)
- Failed completes delete the MinIO object; no pending \`BatchFile\` before validation succeeds
- Viewer: \`GET /api/v1/batches/:id/edi/viewer\` (Nest-proxied)
- Optional download URL: \`GET /api/v1/batches/:id/edi/download-url\`
`,
  ),
);

write(
  '05-batches/batch-lifecycle.md',
  page(
    'batch-lifecycle',
    'Batch Lifecycle',
    'Batch Lifecycle',
    `
# Batch Lifecycle

\`\`\`mermaid
flowchart TD
  A[Upload bytes] --> B[Structural validate / parse]
  B -->|fail| X[Error + cleanup object]
  B -->|ok| C[Persist BatchFile + Claims]
  C --> D{USE_QUEUE?}
  D -->|false default| E[Inline claim validation]
  D -->|true| F[Enqueue BullMQ jobs]
  F --> G[Worker validates]
  E --> H[Results on claim/line fields]
  G --> H
  H --> I[UI lists batches / claims]
\`\`\`

Exact status enums live on Prisma models and batch services — inspect \`BatchFile\` / \`Claim\` fields when extending UI badges.
`,
  ),
);

write(
  '05-batches/upload-logs.md',
  page(
    'upload-logs',
    'Upload Logs',
    'Upload Logs',
    `
# Upload Logs

**Status:** Implemented

Operational views for upload attempts and errors:

- Portal: \`/portal/upload-logs\`
- Staff: \`/dashboard/upload-logs\`

Backend module: \`upload-logs\`. Related persistence includes \`EdiUploadErrorLog\` for structural/upload failures.

Do not store full PHI payloads in log UIs — prefer filenames, sizes, and error summaries.
`,
  ),
);

// ── 06 Claims ────────────────────────────────────────────────────────
write(
  '06-claims/index.md',
  page(
    'index',
    'Claims',
    'Overview',
    `
# Claims

Claims are parsed from 837P batches and stored as Prisma \`Claim\` rows with related diagnoses and service lines.

## Related pages

- [Diagnoses & Service Lines](./diagnoses-and-service-lines)
- [Results UI](./results-ui)
- [Validation](../validation/)

## UI

- Portal and staff claim lists under batches
- Coding search helpers: \`/search\`, \`/cpt/[code]\`, \`/icd10-cm/…\`
`,
  ),
);

write(
  '06-claims/diagnoses-and-service-lines.md',
  page(
    'diagnoses-and-service-lines',
    'Diagnoses & Service Lines',
    'Diagnoses & Service Lines',
    `
# Diagnoses & Service Lines

| Entity | Prisma model | Role |
|---|---|---|
| Diagnosis | \`ClaimDiagnosis\` | ICD pointers / codes on the claim |
| Service line | \`ServiceLine\` | CPT/HCPCS, modifiers, units, charges, validation status |

Mapping from EDI loops/segments is described under [Claim Mapping](../edi-837p/claim-mapping).
`,
  ),
);

write(
  '06-claims/results-ui.md',
  page(
    'results-ui',
    'Results UI',
    'Results UI',
    `
# Results UI

After validation, the UI surfaces claim and line-level findings (errors/warnings/status).

Guidelines from the product design system:

- Status always **color + label** (and icon where space allows)
- Dense tables with sticky headers for batch/claim grids
- Smart datetime formatting for audit/ops timestamps

Error envelope conventions: frontend \`docs/error-handling.md\` (source app).
`,
  ),
);

// ── 07 EDI ───────────────────────────────────────────────────────────
write(
  '07-edi-837p/index.md',
  page(
    'index',
    'EDI 837P',
    'Overview',
    `
# EDI 837P

Scrubber targets **professional claims (837P)**. Structural models live under backend \`edi/837p/\`.

:::note
Document application behavior, not the entire X12 standard. Do not paste copyrighted implementation-guide text.
:::

## Pages

- [Parsing Pipeline](./parsing-pipeline)
- [Structural Validation](./structural-validation)
- [Claim Mapping](./claim-mapping)
- [Processing Errors](./processing-errors)
`,
  ),
);

write(
  '07-edi-837p/parsing-pipeline.md',
  page(
    'parsing-pipeline',
    'Parsing Pipeline',
    'Parsing Pipeline',
    `
# Parsing Pipeline

**Status:** Implemented

1. File enters via presigned upload + \`complete\`, or multipart \`POST /batches\`
2. Structural validation / parse run against EDI 837P models (\`edi/837p/\`)
3. Batch, claim, diagnosis, and service-line records persist in Postgres
4. Business validation runs inline by default (\`USE_QUEUE=false\`)
5. Status and findings exposed through batch/claim APIs

Modules: \`edi-parser\`, \`edi-structural-validation\`, \`batches\`, \`claim-validation\`.
`,
  ),
);

write(
  '07-edi-837p/structural-validation.md',
  page(
    'structural-validation',
    'Structural Validation',
    'Structural Validation',
    `
# Structural Validation

**Status:** Implemented (\`edi-structural-validation\`)

Structural checks run before (or as part of) accepting a batch into durable \`BatchFile\` state. Failures surface through upload/complete errors and upload-log pathways.

Business rules (NCCI, MUE, ICD/CPT libraries, payer-specific edits) are separate — see [Validation](../validation/).
`,
  ),
);

write(
  '07-edi-837p/claim-mapping.md',
  page(
    'claim-mapping',
    'Claim Mapping',
    'Claim Mapping',
    `
# Claim Mapping

Parser output maps EDI claim content into:

- \`Claim\` — header / subscriber / payer / provider fields used by rules
- \`ClaimDiagnosis\` — diagnosis codes and pointers
- \`ServiceLine\` — procedure lines, modifiers, units, amounts

Illustrative (synthetic) shape — **not** a live payload:

\`\`\`json
{
  "patientControlNumber": "SYNTH-001",
  "billingNpi": "1234567893",
  "diagnoses": [{"code": "E11.9"}],
  "serviceLines": [{"cpt": "99213", "units": 1}]
}
\`\`\`

For authoritative field lists, read Prisma models and parser DTOs.
`,
  ),
);

write(
  '07-edi-837p/processing-errors.md',
  page(
    'processing-errors',
    'Processing Errors',
    'Processing Errors',
    `
# Processing Errors

| Stage | Typical outcome |
|---|---|
| Upload / HeadObject | HTTP error; object cleaned up on failed complete |
| Structural validation | No \`BatchFile\` row; error logged |
| Parse mapping | Fail batch accept or partial depending on code path — verify in services |
| Business validation | Claim/line issues stored; batch remains for review |

Troubleshooting: [Getting Started](../getting-started/troubleshooting-setup) and backend README table.
`,
  ),
);

// ── 08 Validation ────────────────────────────────────────────────────
write(
  '08-validation/index.md',
  page(
    'index',
    'Validation',
    'Overview',
    `
# Validation

Business claim validation lives in \`scrubber-backend/src/modules/claim-validation\`.

Orchestration: \`claim-validation.service.ts\` imports focused rule modules under \`rules/\`.

## Pages

- [Lifecycle](./lifecycle)
- [Rule Catalog](./rule-catalog)
- [NCCI & MUE](./ncci-and-mue)
- [Results](./results)
`,
  ),
);

write(
  '08-validation/lifecycle.md',
  page(
    'lifecycle',
    'Validation Lifecycle',
    'Lifecycle',
    `
# Validation Lifecycle

1. Claim (+ lines/diagnoses) available after parse
2. \`ClaimRuleLookupService\` preloads reference rows / caches (CPT, ICD, NCCI, …)
3. Rule functions emit \`ClaimIssue\` entries
4. Service-line status updates applied via \`buildServiceLineStatusUpdates\`
5. UI reads persisted findings

**Queue mode:** when \`USE_QUEUE=true\` (and optionally \`PARALLEL_VALIDATE=true\`), validation can fan out through BullMQ; run \`npm run start:worker:dev\`.
`,
  ),
);

write(
  '08-validation/rule-catalog.md',
  page(
    'rule-catalog',
    'Rule Catalog',
    'Rule Catalog',
    `
# Rule Catalog

**Status:** Implemented modules listed below. Behavior details belong in code + tests — this catalog is a navigation map.

| Area | Source files (under \`claim-validation/rules/\`) |
|---|---|
| Claim fields / filing indicator | \`claim-field.rules.ts\`, \`claim-filing-indicator.rules.ts\` |
| BCBS routing | \`bcbs-claim-routing.rules.ts\` |
| Payer / EDI-specific | \`payer-edi-specific.rules.ts\`, \`payer-edi-claim-rules.ts\`, handlers |
| CPT core / add-on / POS / modifiers | \`cpt.rules.ts\` |
| ICD diagnosis / body side | \`icd-diagnosis.rules.ts\`, \`icd-body-sidewise.rules.ts\` |
| Medicare NCD ICD-10 | \`medicare-ncd-icd10.rules.ts\` |
| NPI provider | \`npi-provider.rules.ts\` |
| Service line basics / NDC / I-codes | \`service-line-basics.rules.ts\`, \`ndc.rules.ts\`, \`icode.rules.ts\` |
| Anesthesia / E&M / bundling | \`anesthesia.rules.ts\`, \`enm.rules.ts\`, \`em-bundling.rules.ts\` |
| Global surgical modifiers | \`global-surgical-modifier.rules.ts\` |
| Radiology TC | \`radiology-tc-modifier.rules.ts\` |
| Modifier sequence | \`modifier-sequence.rules.ts\` |
| NCCI | \`ncci.rules.ts\` |
| MUE practitioner / UHC Oxford | \`mue-practitioner.rules.ts\`, \`mue-uhc-oxford.rules.ts\` |
| Aetna LCD / Cigna 62308 / UHC POS | \`aetna-lcd.rules.ts\`, \`cigna-62308.rules.ts\`, \`uhc-87726-pos.rules.ts\` |

When documenting a single rule in depth, include: ID/name, category, trigger, inputs, result severity, scope, and source path.
`,
  ),
);

write(
  '08-validation/ncci-and-mue.md',
  page(
    'ncci-and-mue',
    'NCCI & MUE',
    'NCCI & MUE',
    `
# NCCI & MUE

**Status:** Implemented

| Concern | Code | Data |
|---|---|---|
| NCCI edits | \`ncci.rules.ts\` + \`NcciRulesCacheService\` | Prisma \`Ncci\` (+ Redis warm helpers) |
| MUE practitioner | \`mue-practitioner.rules.ts\` | \`MuePractitioner\` |
| MUE UHC/Oxford specialty | \`mue-uhc-oxford.rules.ts\` | Related MUE tables |

CLI helpers (backend):

\`\`\`bash
npm run cli -- ncci:rules-cache-fetch --warm
\`\`\`

Exact edit messages and MAI handling: read the rule implementations and golden/unit tests — do not invent severities here.
`,
  ),
);

write(
  '08-validation/results.md',
  page(
    'results',
    'Validation Results',
    'Results',
    `
# Validation Results

Issues are represented as structured \`ClaimIssue\` values and persisted onto claim/line status fields for API/UI consumption.

Consumers:

- Staff/portal claim detail views
- Batch summary badges
- Potential future exports (**Planned/Partial** unless a specific export exists in code)

Always distinguish **validation findings** (business scrub results) from **infrastructure failures** (DB/Redis/MinIO down).
`,
  ),
);

// ── 09 References ────────────────────────────────────────────────────
write(
  '09-references/index.md',
  page(
    'index',
    'References',
    'Overview',
    `
# References

Large coding and edit libraries back validation (CPT, ICD-10, modifiers, NCCI, MUE, contractors/articles, payer crosswalks, NPI ordering/referring, etc.).

See Prisma schema for the full table list. Admin UI: \`/dashboard/references\`.

- [CPT & ICD](./cpt-and-icd)
- [Reference Admin](./reference-admin)
`,
  ),
);

write(
  '09-references/cpt-and-icd.md',
  page(
    'cpt-and-icd',
    'CPT & ICD',
    'CPT & ICD',
    `
# CPT & ICD

## UI search

- \`/search\` — coding search
- \`/cpt/[code]\` — CPT detail
- \`/icd10-cm/…\` — ICD-10-CM navigation

## Data

- \`CptCode\`, modifier tables, CPT/POS/modifier rules
- \`Icd10TabularCode\` (+ descriptions), gender/age ICD rules, unacceptable principal DX, body-sidewise helpers

Lookup responses may include \`Cache: HIT|MISS|BYPASS|ERROR\` when Redis lookup cache is enabled.
`,
  ),
);

write(
  '09-references/reference-admin.md',
  page(
    'reference-admin',
    'Reference Admin',
    'Reference Admin',
    `
# Reference Admin

Staff manage reference domains at \`/dashboard/references\` and \`/dashboard/references/[domain]\`.

Bulk Excel library imports are primarily Nest CLI; some domains also support web import/export on the reference admin page.

Modules: \`references\`, \`reference-admin\`.
`,
  ),
);

// ── 10 Tenants ───────────────────────────────────────────────────────
write(
  '10-tenants/index.md',
  page(
    'index',
    'Tenants',
    'Overview',
    `
# Tenants

Multi-tenant customers are first-class (\`Tenant\`, \`TenantFeature\`, \`TenantInvite\`).

- [Isolation](./isolation)
- [Members](./members)
- [Service Clients](./service-clients)
`,
  ),
);

write(
  '10-tenants/isolation.md',
  page(
    'isolation',
    'Tenant Isolation',
    'Isolation',
    `
# Tenant Isolation

**Status:** Implemented (verify per endpoint when extending)

- Customer APIs scope queries by tenant from the authenticated principal
- EDI object keys include \`tenantId\` for customer uploads
- Staff uploads may use platform path \`edi/0/…\` with \`tenantId = null\`
- Audit events for customers hide platform-only categories

Never rely on UI hiding alone — authorization must enforce scope server-side.
`,
  ),
);

write(
  '10-tenants/members.md',
  page(
    'members',
    'Members',
    'Members',
    `
# Members

Portal team management: \`/portal/members\` (tenant admin).

Staff manage users/tenants under \`/dashboard/tenants\` and \`/dashboard/users\`.

Invites use \`TenantInvite\` + mail templates when providers are configured.
`,
  ),
);

write(
  '10-tenants/service-clients.md',
  page(
    'service-clients',
    'Service Clients',
    'Service Clients',
    `
# Service Clients

Staff UI: \`/dashboard/service-clients\`.

Backed by \`ApiClient\` records for machine authentication. See [API Client Tokens](../authentication/api-client-tokens).
`,
  ),
);

// ── 11 Integrations ──────────────────────────────────────────────────
write(
  '11-integrations/index.md',
  page(
    'index',
    'Integrations',
    'Overview',
    `
# Integrations

Portal integrations UI: \`/portal/integrations\`.

Backend modules include \`integrations\` and \`api-clients\` for outbound/partner and machine-client concerns.

- [API Clients](./api-clients)
- [Failure Strategy](./failure-strategy)
`,
  ),
);

write(
  '11-integrations/api-clients.md',
  page(
    'api-clients',
    'API Clients',
    'API Clients',
    `
# API Clients

Machine clients authenticate with API tokens and call versioned REST under \`/api/v1\`.

Typical integration path: obtain token → upload batch (multipart or complete flow) → poll batch/claim status.

Contract source: OpenAPI export + Swagger UI.
`,
  ),
);

write(
  '11-integrations/failure-strategy.md',
  page(
    'failure-strategy',
    'Failure Strategy',
    'Failure Strategy',
    `
# Failure Strategy

Guidance for integrators:

1. Treat \`4xx\` as client/contract issues (fix payload, auth, validation)
2. Treat \`5xx\` / network as retryable with backoff (avoid duplicate completes without idempotency checks)
3. Distinguish structural upload failures from business validation findings
4. Prefer Problem Details / documented error envelopes (see [API Errors](../api/errors))

Exact retry budgets are **Unverified** unless encoded in a client SDK (none required by the API itself).
`,
  ),
);

// ── 12 Support ───────────────────────────────────────────────────────
write(
  '12-support/index.md',
  page(
    'index',
    'Support',
    'Overview',
    `
# Support

**Status:** Implemented

- Public demo/contact → \`POST /support/public\`
- Authenticated customers → \`/portal/support\` (\`POST /support\`, replies under \`/support/mine…\`)
- Staff → \`/dashboard/inquiries\` with \`inquiries.view\`

See [Inquiry Workflow](./inquiry-workflow).
`,
  ),
);

write(
  '12-support/inquiry-workflow.md',
  page(
    'inquiry-workflow',
    'Inquiry Workflow',
    'Inquiry Workflow',
    `
# Inquiry Workflow

## Behavior (v1)

- Landing **Request a Demo** and \`/contact\` submit to \`POST /support/public\` (text-only)
- Email on submit **only** for category \`sales_demo\`, and only to \`SUPPORT_INBOX\`
- Staff replies always save; emailed to requester **only** for \`sales_demo\`
- Customers may attach **one** allowlisted file when \`STORAGE_DRIVER=s3\`

## Env

| Variable | Purpose |
|---|---|
| \`SUPPORT_INBOX\` | Staff inbox for demo alerts; empty = store only |
| \`INQUIRY_ATTACHMENT_MAX_BYTES\` | Max attachment (default 5 MiB) |

## Attachments

- Keys: \`inquiries/{tenantId}/{userId}/{uuid}{ext}\`
- Allowed: \`.edi\`, \`.x12\`, \`.txt\`, \`.png\`, \`.jpg\`, \`.jpeg\`
- Never attached to outbound email
`,
  ),
);

// ── 13 Notifications ─────────────────────────────────────────────────
write(
  '13-notifications/index.md',
  page(
    'index',
    'Notifications',
    'Overview',
    `
# Notifications

Transactional email is handled by the Nest \`mail\` module (SendGrid or Resend).

Primary uses: invites, password reset, verification, support demo alerts/replies.

SMS / push: **not documented as implemented** unless discovered in code later.
`,
  ),
);

write(
  '13-notifications/email.md',
  page(
    'email',
    'Email',
    'Email',
    `
# Email

Configure provider keys in backend \`.env\` (\`SENDGRID_*\` or \`RESEND_*\`, \`MAIL_FROM*\`).

Local development can omit mail keys; flows that require mail will no-op or fail gracefully depending on the code path — check logs rather than disabling auth.

Support email rules are category-specific (see [Inquiry Workflow](../support/inquiry-workflow)).
`,
  ),
);

// ── 14 Architecture ──────────────────────────────────────────────────
write(
  '14-architecture/index.md',
  page(
    'index',
    'Architecture',
    'Overview',
    `
# Architecture

Sibling apps under \`C:\\\\sites\\\\Scrubber\`:

| App | Stack | Port |
|---|---|---|
| \`scrubber-backend\` | NestJS 10, Prisma, BullMQ | 3011 |
| \`scrubber-frontend\` | Next.js 16 App Router | 3010 |

\`\`\`mermaid
flowchart TB
  subgraph clients [Clients]
    Browser[Browser]
    Machine[API Client]
  end
  subgraph fe [scrubber-frontend]
    Next[Next.js]
  end
  subgraph be [scrubber-backend]
    API[Nest API]
    Worker[Worker]
    Sched[Scheduler]
  end
  Browser --> Next
  Next --> API
  Machine --> API
  API --> PG[(Postgres)]
  API --> Redis[(Redis)]
  API --> Obj[(MinIO/S3)]
  Worker --> Redis
  Worker --> PG
  Sched --> Redis
\`\`\`

- [Frontend](./frontend)
- [Backend](./backend)
- [Request Lifecycle](./request-lifecycle)
- [Data Flow](./data-flow)
`,
  ),
);

write(
  '14-architecture/frontend.md',
  page(
    'frontend',
    'Frontend Architecture',
    'Frontend',
    `
# Frontend Architecture

\`\`\`text
scrubber-frontend/src/
├── app/           # App Router pages and layouts
├── components/    # Shared UI primitives
├── hooks/
├── lib/           # API client, auth tokens, datetime helpers
├── modules/       # Feature modules
└── types/         # Generated OpenAPI types
\`\`\`

- Talks **only** to Nest over \`NEXT_PUBLIC_API_URL\`
- Never connects to Postgres/Redis directly
- Types from \`openapi-typescript\` against backend OpenAPI JSON
`,
  ),
);

write(
  '14-architecture/backend.md',
  page(
    'backend',
    'Backend Architecture',
    'Backend',
    `
# Backend Architecture

\`\`\`text
scrubber-backend/
├── src/main.ts worker.ts scheduler.ts cli.ts
├── src/config/ common/ modules/
├── prisma/
├── docs/openapi/
└── docker-compose.yml
\`\`\`

Major modules: \`auth\`, \`batches\`, \`claims\`, \`claim-validation\`, \`edi-parser\`, \`edi-structural-validation\`, \`queue\`, \`cache\`, \`references\`, \`reference-admin\`, \`tenants\`, \`users-admin\`, \`audit\`, \`support\`, \`mail\`, \`integrations\`, …
`,
  ),
);

write(
  '14-architecture/request-lifecycle.md',
  page(
    'request-lifecycle',
    'Request Lifecycle',
    'Request Lifecycle',
    `
# Request Lifecycle

Simplified path:

HTTP → Nest guards/pipes → module services → Prisma / Redis / S3 → Problem Details or batch-specific error envelopes.

Global prefix: \`/api/v1\` (health excluded). Swagger at \`/api/docs\`.
`,
  ),
);

write(
  '14-architecture/data-flow.md',
  page(
    'data-flow',
    'Data Flow',
    'Data Flow',
    `
# Data Flow — EDI Batch

\`\`\`mermaid
sequenceDiagram
  participant UI as Next.js
  participant API as Nest API
  participant S3 as MinIO
  participant DB as Postgres
  participant Q as Redis/BullMQ
  UI->>API: POST /batches/upload-url
  API-->>UI: PUT URL + key
  UI->>S3: PUT EDI bytes
  UI->>API: POST /batches/complete
  API->>S3: HeadObject
  API->>API: Structural validate + parse
  API->>DB: BatchFile + Claims
  alt USE_QUEUE=false
    API->>API: Inline validation
  else USE_QUEUE=true
    API->>Q: Enqueue jobs
    Q->>API: Worker validates
  end
  UI->>API: GET batch/claims
\`\`\`
`,
  ),
);

// ── 15 Getting Started ───────────────────────────────────────────────
write(
  '15-getting-started/prerequisites.md',
  page(
    'prerequisites',
    'Prerequisites',
    'Prerequisites',
    `
# Prerequisites

- Node.js **20+**
- npm
- Docker Desktop (or compatible) for Postgres, Redis, MinIO
- Optional: SendGrid or Resend keys for mail flows
- Git access to \`scrubber-backend\` and \`scrubber-frontend\`
`,
  ),
);

write(
  '15-getting-started/local-development.md',
  page(
    'local-development',
    'Local Development',
    'Local Development',
    `
# Local Development

## 1. Backend

\`\`\`bash
cd C:\\\\sites\\\\Scrubber\\\\scrubber-backend
cp .env.example .env
docker compose up -d postgres redis minio
npm install
npx prisma generate
npm run prisma:migrate
npm run start:dev
\`\`\`

- API: http://localhost:3011
- Health: http://localhost:3011/health
- Swagger: http://localhost:3011/api/docs

Compose host ports: Postgres **5433**, Redis **6381**, MinIO API **9020**, console **9021**.

## 2. Frontend

\`\`\`bash
cd C:\\\\sites\\\\Scrubber\\\\scrubber-frontend
cp .env.example .env.local
npm install
npm run dev
\`\`\`

- UI: http://localhost:3010
- Set \`NEXT_PUBLIC_API_URL=http://localhost:3011/api/v1\` (or \`127.0.0.1\` for Playwright)

## 3. Smoke check

1. Open UI login
2. Hit health endpoint
3. Upload a **synthetic** EDI (with \`STORAGE_DRIVER=s3\` configured) or use multipart API client path

Optional seed: \`npm run prisma:seed\` in backend.
`,
  ),
);

write(
  '15-getting-started/environment-variables.md',
  page(
    'environment-variables',
    'Environment Variables (Dev)',
    'Env Vars (Dev)',
    `
# Environment Variables (Dev)

Copy examples — never commit real secrets or PHI.

## Backend categories

| Category | Examples |
|---|---|
| App / CORS | \`PORT\`, \`CORS_ORIGINS\`, \`FRONTEND_URL\`, \`LOG_LEVEL\` |
| Database | \`DATABASE_URL\`, \`DATABASE_SSL\` |
| Redis | \`REDIS_URL\`, \`REDIS_LOOKUP_DB\`, \`LOOKUP_CACHE_*\` |
| Queues | \`USE_QUEUE\`, \`QUEUE_MODE\`, \`BULLMQ_CONCURRENCY\`, \`PARALLEL_VALIDATE\` |
| Auth | \`JWT_*\`, \`API_TOKEN_EXPIRATION_MINUTES\` |
| Storage / EDI | \`STORAGE_DRIVER\`, \`S3_*\`, \`EDI_*\` |
| Mail | \`SENDGRID_*\` / \`RESEND_*\` |
| Support | \`SUPPORT_INBOX\`, \`INQUIRY_ATTACHMENT_MAX_BYTES\` |

Full list: backend \`.env.example\`. Also see [Infrastructure → Environment Variables](../infrastructure/environment-variables).

## Frontend

| Variable | Required | Purpose |
|---|---|---|
| \`NEXT_PUBLIC_API_URL\` | Yes | Nest base including \`/api/v1\` |
| \`NEXT_PUBLIC_EMAIL_VERIFICATION_REQUIRED\` | No | Soft-gate mirror |
| \`NEXT_PUBLIC_CONTACT_EMAIL\` | No | Mailto fallback |
`,
  ),
);

write(
  '15-getting-started/running-workers.md',
  page(
    'running-workers',
    'Running Workers',
    'Running Workers',
    `
# Running Workers

| Process | Command | Role |
|---|---|---|
| API | \`npm run start:dev\` | HTTP |
| Worker | \`npm run start:worker:dev\` | BullMQ consumer |
| Scheduler | \`npm run start:scheduler:dev\` | Stalled-queue detection; optional NPI sync |

Local default: \`USE_QUEUE=false\` (inline validation). Enable queue + worker to test async paths.
`,
  ),
);

write(
  '15-getting-started/troubleshooting-setup.md',
  page(
    'troubleshooting-setup',
    'Troubleshooting Setup',
    'Troubleshooting',
    `
# Troubleshooting Setup

| Symptom | Likely cause | Check |
|---|---|---|
| DB connection errors | Compose down / wrong port | \`docker compose ps\`; port **5433** |
| Redis / queue errors | Redis down | \`REDIS_URL\` port **6381**; do not flush DB 0 for cache experiments |
| Presigned upload fails | MinIO CORS / endpoints | \`STORAGE_DRIVER=s3\`, \`S3_PUBLIC_ENDPOINT\`, \`MINIO_API_CORS_ALLOW_ORIGIN\` |
| CORS from UI | Origin missing | \`CORS_ORIGINS\` includes UI origin(s) |
| Validation never async | Queue disabled | \`USE_QUEUE\` + worker |
| Mail not sent | Provider unset | SendGrid/Resend keys |

Never log credentials, patient data, or full sensitive claim payloads.
`,
  ),
);

// ── 16 Frontend ──────────────────────────────────────────────────────
write(
  '16-frontend/index.md',
  page(
    'index',
    'Frontend',
    'Overview',
    `
# Frontend

Next.js 16 App Router UI — React 19, Tailwind 4, Radix/shadcn, Zustand, Zod, TanStack Table, Playwright.

- [Routing](./routing)
- [Auth Client](./auth-client)
- [Portal vs Staff](./portal-vs-staff)
`,
  ),
);

write(
  '16-frontend/routing.md',
  page(
    'routing',
    'Routing',
    'Routing',
    `
# Routing

| Area | Pattern |
|---|---|
| Landing / contact | \`/\`, \`/contact\` |
| Auth | \`/login\`, forgot/reset, verify-email, accept-invite |
| Portal | \`/portal/*\` |
| Staff | \`/dashboard/*\` |
| Coding | \`/search\`, \`/cpt/[code]\`, \`/icd10-cm/…\` |
| Profile | \`/profile\` |
`,
  ),
);

write(
  '16-frontend/auth-client.md',
  page(
    'auth-client',
    'Auth Client',
    'Auth Client',
    `
# Auth Client

- API base from \`src/lib/api/config.ts\` + \`NEXT_PUBLIC_API_URL\`
- Session tokens in client state (Zustand) — not in public env secrets
- OpenAPI types regenerated with \`npm run openapi:types\` after backend \`openapi:export\`
`,
  ),
);

write(
  '16-frontend/portal-vs-staff.md',
  page(
    'portal-vs-staff',
    'Portal vs Staff',
    'Portal vs Staff',
    `
# Portal vs Staff

| | Portal | Staff |
|---|---|---|
| Audience | Tenant users | Platform operators |
| Data scope | Single tenant | Cross-tenant (authorized) |
| Examples | Batches, members, support | Tenants, users, references, inquiries |

IA details: [Staff & Portal IA](../ui/staff-and-portal-ia).
`,
  ),
);

// ── 17 Data Model ────────────────────────────────────────────────────
write(
  '17-data-model/index.md',
  page(
    'index',
    'Data Model',
    'Overview',
    `
# Data Model

Source of truth: \`scrubber-backend/prisma/schema.prisma\`.

Core operational entities: \`Tenant\`, \`User\`, \`BatchFile\`, \`Claim\`, \`ClaimDiagnosis\`, \`ServiceLine\`, \`AuditEvent\`, \`SupportTicket\`, \`ApiClient\`, plus extensive reference tables.

- [ERD](./erd)
- [Data Dictionary](./data-dictionary)
- [Lifecycle](./lifecycle)
`,
  ),
);

write(
  '17-data-model/erd.md',
  page(
    'erd',
    'ERD',
    'ERD',
    `
# ERD (Core)

Simplified conceptual diagram — not every reference table:

\`\`\`mermaid
erDiagram
  Tenant ||--o{ User : has
  Tenant ||--o{ BatchFile : owns
  User ||--o{ BatchFile : uploads
  BatchFile ||--o{ Claim : contains
  Claim ||--o{ ClaimDiagnosis : has
  Claim ||--o{ ServiceLine : has
  Tenant ||--o{ SupportTicket : opens
  SupportTicket ||--o{ SupportMessage : thread
  User ||--o{ AuditEvent : performs
\`\`\`

Regenerate mental models from Prisma when relationships change.
`,
  ),
);

write(
  '17-data-model/data-dictionary.md',
  page(
    'data-dictionary',
    'Data Dictionary',
    'Data Dictionary',
    `
# Data Dictionary (Core)

| Model | Purpose |
|---|---|
| \`Tenant\` | Customer organization |
| \`TenantFeature\` | Feature flags per tenant |
| \`User\` | Interactive user |
| \`RolePermission\` | Permission grants |
| \`BatchFile\` | Uploaded EDI batch metadata |
| \`Claim\` | Parsed claim |
| \`ClaimDiagnosis\` | Diagnosis rows |
| \`ServiceLine\` | Procedure lines |
| \`EdiUploadErrorLog\` | Upload/structural errors |
| \`AuditEvent\` / \`AuditCategory\` | Audit trail |
| \`SupportTicket\` / \`SupportMessage\` | Inquiries |
| \`ApiClient\` | Machine clients |
| \`CptCode\`, \`Icd10TabularCode\`, \`Ncci\`, \`MuePractitioner\`, … | Reference libraries |

Column-level detail: Prisma schema.
`,
  ),
);

write(
  '17-data-model/lifecycle.md',
  page(
    'lifecycle',
    'Data Lifecycle',
    'Lifecycle',
    `
# Data Lifecycle

1. **Upload** — object storage bytes + eventual \`BatchFile\`
2. **Parse** — claims/diagnoses/lines inserted
3. **Validate** — statuses/issues updated on claims/lines
4. **Review** — users read via API/UI
5. **Audit** — append-only events for sensitive actions
6. **Support** — tickets/messages; attachments in object storage

Retention for audit is indefinite (no auto-purge). Broader retention/legal hold policies are **Unverified** unless published by the business.
`,
  ),
);

// ── 18 API ───────────────────────────────────────────────────────────
write(
  '18-api/index.md',
  page(
    'index',
    'API',
    'Overview',
    `
# API

- Base: \`/api/v1\`
- Swagger UI: http://localhost:3011/api/docs
- Checked-in OpenAPI: \`scrubber-backend/docs/openapi/openapi.json\`
- Export: \`npm run openapi:export\`

Nest routes/DTOs are authoritative. This section curates navigation — do not invent endpoints.

- [Endpoint Catalog](./endpoint-catalog)
- [Authentication](./authentication)
- [Errors](./errors)
- [File Uploads](./file-uploads)
`,
  ),
);

write(
  '18-api/endpoint-catalog.md',
  page(
    'endpoint-catalog',
    'Endpoint Catalog',
    'Endpoint Catalog',
    `
# Endpoint Catalog

High-level groups (see OpenAPI for full paths):

| Group | Examples |
|---|---|
| Health | \`GET /health\` (outside \`/api/v1\` prefix) |
| Auth | login, refresh, password reset, verify, invites |
| Batches | upload-url, complete, multipart create, EDI viewer |
| Claims | list/detail under batch context |
| Support | public, mine, admin inquiries |
| Audit | admin events/categories; tenant events |
| Admin | tenants, users, permissions, service-clients, references |
| Integrations | portal integration settings / clients as implemented |

Prefer Swagger “Try it out” locally with a Bearer token.
`,
  ),
);

write(
  '18-api/authentication.md',
  page(
    'authentication',
    'API Authentication',
    'Authentication',
    `
# API Authentication

| Scheme | Header / use |
|---|---|
| User JWT | \`Authorization: Bearer <access_token>\` |
| API client token | Bearer token issued for \`ApiClient\` |

Obtain user tokens via auth login endpoints; refresh as documented in OpenAPI.
`,
  ),
);

write(
  '18-api/errors.md',
  page(
    'errors',
    'API Errors',
    'Errors',
    `
# API Errors

Nest returns Problem Details-style or batch-specific envelopes depending on the route. Frontend guidance lives in \`scrubber-frontend/docs/error-handling.md\`.

Integrators should branch on HTTP status + documented body fields — do not scrape UI toast strings.
`,
  ),
);

write(
  '18-api/file-uploads.md',
  page(
    'file-uploads',
    'File Uploads',
    'File Uploads',
    `
# File Uploads

## EDI batches

See [Upload Workflow](../batches/upload-workflow).

## Support attachments

Presigned upload under \`inquiries/…\` when \`STORAGE_DRIVER=s3\`. Allowlisted extensions only; max bytes via \`INQUIRY_ATTACHMENT_MAX_BYTES\`.
`,
  ),
);

// ── 19 Reporting ─────────────────────────────────────────────────────
write(
  '19-reporting/index.md',
  page(
    'index',
    'Reporting',
    'Reporting',
    `
# Reporting & Analytics

Current product surfaces emphasize **operational dashboards** (portal/staff KPIs, recent batches) and coding search — not a separate BI warehouse.

Advanced analytics exports are **Unverified/Partial** unless a specific endpoint exists in OpenAPI.
`,
  ),
);

// ── 20 Quality ───────────────────────────────────────────────────────
write(
  '20-quality/testing-strategy.md',
  page(
    'testing-strategy',
    'Testing Strategy',
    'Testing Strategy',
    `
# Testing Strategy

## Backend

| Suite | Command |
|---|---|
| Unit | \`npm test\` |
| Coverage | \`npm run test:cov\` |
| Integration | \`npm run test:integration\` |
| Contract | \`npm run test:contract\` |
| E2E | \`npm run test:e2e\` |
| Golden | \`npm run test:golden\` |

Many suites expect local Postgres/Redis (sometimes Testcontainers). Never point tests at production.

## Frontend

- Node test runner (unit)
- Playwright (e2e) — prefer \`127.0.0.1\` API URL to avoid localhost flakes
`,
  ),
);

write(
  '20-quality/test-catalog.md',
  page(
    'test-catalog',
    'Test Catalog',
    'Test Catalog',
    `
# Test Catalog

Organize new tests by domain:

| Domain | Prefer |
|---|---|
| Parser / structural | Golden + unit fixtures (synthetic EDI) |
| Validation rules | Unit per rule file + golden snapshots |
| HTTP contract | Contract tests vs OpenAPI |
| Upload flow | Integration with MinIO test config |
| UI critical paths | Playwright login → batch list |

Keep fixtures synthetic.
`,
  ),
);

write(
  '20-quality/validation-rules.md',
  page(
    'validation-rules',
    'Validation Rules (QA)',
    'Validation Rules',
    `
# Validation Rules (QA View)

QA should map each critical edit to:

1. Rule source file
2. Representative synthetic claim
3. Expected severity / message class
4. Regression test name

Engineering catalog: [Validation Rule Catalog](../validation/rule-catalog).
`,
  ),
);

write(
  '20-quality/edge-cases.md',
  page(
    'edge-cases',
    'Edge Cases',
    'Edge Cases',
    `
# Edge Cases

Documented operational edges:

- \`USE_QUEUE=false\` vs async worker lag
- Presigned URL expiry before PUT/complete
- Redis lookup cache bypass/error headers
- Tenant vs staff EDI key prefixes
- Support mail only for \`sales_demo\`
- Audit category disabled → no new writes

Add new edges here when incidents teach them — with evidence.
`,
  ),
);

write(
  '20-quality/acceptance-criteria.md',
  page(
    'acceptance-criteria',
    'Acceptance Criteria',
    'Acceptance Criteria',
    `
# Acceptance Criteria (Docs Site)

- [x] Docusaurus site in \`scrubber-documentation\`
- [ ] Production \`npm run build\` succeeds
- [ ] Core onboarding + EDI + validation + API pages present
- [ ] No secrets/PHI in Markdown
- [ ] FE/BE application code unchanged by docs work
`,
  ),
);

// ── 21 Observability ─────────────────────────────────────────────────
write(
  '21-observability/index.md',
  page(
    'index',
    'Observability',
    'Overview',
    `
# Observability

- Structured logging via Nest (\`LOG_LEVEL\`)
- Health endpoint for liveness
- Audit trail for security-relevant actions
- BullMQ for background work when enabled

- [Background Jobs](./background-jobs)
- [Health](./health)
`,
  ),
);

write(
  '21-observability/background-jobs.md',
  page(
    'background-jobs',
    'Background Jobs',
    'Background Jobs',
    `
# Background Jobs

| Component | Role |
|---|---|
| BullMQ on Redis DB 0 | Queues + scheduler locks |
| \`start:worker:dev\` | Consumes jobs (\`QueueWorkerHost\`) |
| \`start:scheduler:dev\` | Stalled detection; optional NPI daily sync |

Do **not** flush Redis DB 0 when experimenting with lookup cache (DB 1).
`,
  ),
);

write(
  '21-observability/health.md',
  page(
    'health',
    'Health',
    'Health',
    `
# Health

\`GET http://localhost:3011/health\` — excluded from the \`/api/v1\` prefix.

Use for local smoke checks and as a minimum production probe. Deeper dependency probes are **Unverified** unless added in code.
`,
  ),
);

// ── 22 Infrastructure ────────────────────────────────────────────────
write(
  '22-infrastructure/index.md',
  page(
    'index',
    'Infrastructure',
    'Overview',
    `
# Infrastructure

Local supported path: **Docker Compose for dependencies** + **host Node processes** for API/worker/scheduler/UI.

Compose may include commented \`api\` / \`worker\` / \`scheduler\` services for future containerized deploys.

Production hosting/runbooks: **Unverified** in-repo — document only team-verified steps.

- [Environment Variables](./environment-variables)
- [Local Compose](./local-compose)
`,
  ),
);

write(
  '22-infrastructure/environment-variables.md',
  page(
    'environment-variables',
    'Environment Variables',
    'Environment Variables',
    `
# Environment Variables

Authoritative templates:

- Backend: \`scrubber-backend/.env.example\`
- Frontend: \`scrubber-frontend/.env.example\`

:::danger
Never commit production \`.env\` files, API keys, or database URLs with credentials into this documentation repo.
:::

See also the curated [Getting Started env page](../getting-started/environment-variables).
`,
  ),
);

write(
  '22-infrastructure/local-compose.md',
  page(
    'local-compose',
    'Local Compose',
    'Local Compose',
    `
# Local Compose

From \`scrubber-backend\`:

\`\`\`bash
docker compose up -d postgres redis minio
\`\`\`

| Service | Host port |
|---|---|
| Postgres 16 | 5433 → 5432 |
| Redis 7 | 6381 → 6379 |
| MinIO API | 9020 → 9000 |
| MinIO console | 9021 → 9001 |

Presigned uploads need \`STORAGE_DRIVER=s3\` and CORS allowing the UI origin. Nest auto-creates the bucket on boot when configured.
`,
  ),
);

// ── 23 UI ────────────────────────────────────────────────────────────
write(
  '23-ui/ui-principles.md',
  page(
    'ui-principles',
    'UI Principles',
    'UI Principles',
    `
# UI Principles

From the Scrubber design system:

- Professional healthcare EDI operations — accurate, trustworthy, clear, efficient
- Neutral cool slate + restrained teal primary (\`#0F766E\`)
- Geist Sans / Geist Mono; tabular nums for IDs and counts
- Status always color + label
- Desktop-first claim review density
- Avoid purple gradients, glow, cream+serif terracotta aesthetics
`,
  ),
);

write(
  '23-ui/staff-and-portal-ia.md',
  page(
    'staff-and-portal-ia',
    'Staff & Portal IA',
    'Staff & Portal IA',
    `
# Staff & Portal IA

## Staff workspace

Dashboard, batches, upload logs, coding search, ICD-10-CM, references.

## Staff administration (permission-gated)

Tenants, users, service clients, permissions (super admin), inquiries, audit.

## Portal workspace

Dashboard, batches, upload logs, team members, integrations, support, audit logs.
`,
  ),
);

// ── 24 Research ──────────────────────────────────────────────────────
write(
  '24-research/edi-837p-standards.md',
  page(
    'edi-837p-standards',
    'EDI 837P Standards Notes',
    'EDI 837P Standards',
    `
# EDI 837P Standards Notes

:::info
Summaries only. Do not reproduce copyrighted X12 implementation guides. Link to authorized sources your organization licenses.
:::

Scrubber implements an application-specific subset of 837P processing (parse, structural checks, business edits). When researching:

1. Confirm which IG/version the parser models target in \`edi/837p/\`
2. Prefer tests + models over external blogs
3. Keep synthetic samples in fixtures — never production extractions
`,
  ),
);

// ── 25 Roadmap / Decisions ───────────────────────────────────────────
write(
  '25-roadmap/index.md',
  page(
    'index',
    'Roadmap',
    'Overview',
    `
# Roadmap

Scrubber is a NestJS + Next.js EDI 837P claims scrubber. Use this section for documentation delivery phases and open product/engineering decisions.

- [Implementation Phases](./implementation-phases)
- [Open Decisions](../decisions/open-decisions)
`,
  ),
);

write(
  '25-roadmap/implementation-phases.md',
  page(
    'implementation-phases',
    'Implementation Phases',
    'Implementation Phases',
    `
# Implementation Phases (Docs)

| Phase | Deliverable |
|---|---|
| A | Docusaurus scaffold + brand + search + Mermaid |
| B | Numbered IA + sidebars + hubs |
| C | Evidence-based deep pages (EDI, validation, API, data model) |
| D | Build QA + secret scan + gap list |

Product feature phases should be maintained by the engineering team in issue trackers; link them from [Open Decisions](../decisions/open-decisions) when useful.
`,
  ),
);

write(
  '25-decisions/open-decisions.md',
  page(
    'open-decisions',
    'Open Decisions',
    'Open Decisions',
    `
# Open Decisions

| Topic | Status | Notes |
|---|---|---|
| Public docs hosting URL | Open | Config uses \`https://scrubber.example.com\` placeholder |
| Production deploy runbook | Open / Unverified | Not fully specified in app repos |
| Docs CI workflow | Proposed | Add \`npm run build\` for this repo when authorized |
| Docusaurus versioning | Deferred | Single current set until release process needs snapshots |
| OpenAPI embedding in Docusaurus | Proposed | Currently link to Swagger + checked-in JSON |
`,
  ),
);

// ── Glossary ─────────────────────────────────────────────────────────
write(
  'glossary.md',
  page(
    'glossary',
    'Glossary',
    'Glossary',
    `
# Glossary

| Term | Meaning |
|---|---|
| **837P** | X12 Professional Claims transaction set |
| **Batch** | One uploaded EDI file and its derived claims |
| **BullMQ** | Redis-backed job queue used when \`USE_QUEUE=true\` |
| **Claim scrubbing** | Running structural + business edits before payer submission |
| **MUE** | Medically Unlikely Edits |
| **NCCI** | National Correct Coding Initiative |
| **Portal** | Tenant customer UI under \`/portal\` |
| **Staff dashboard** | Platform operator UI under \`/dashboard\` |
| **Structural validation** | EDI shape/syntax checks before durable batch accept |
| **Tenant** | Customer organization boundary |
`,
  ),
);

console.log('Wrote documentation pages under', root);
