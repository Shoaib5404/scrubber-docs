import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Manually curated sidebar for the Scrubber specification.
// Docusaurus strips leading "NN-" numeric prefixes from folder names
// when generating doc IDs, so the IDs below omit those prefixes.

const sidebars: SidebarsConfig = {
  scrubberSidebar: [
    {
      type: 'category',
      label: '00 · Product Overview',
      collapsed: false,
      items: [
        'product-overview/index',
        'product-overview/documentation-conventions',
      ],
    },
    {
      type: 'category',
      label: '01 · Requirements',
      collapsed: false,
      items: [
        'requirements/requirements-traceability',
        'requirements/requirement-ids',
        'requirements/priorities',
      ],
    },
    {
      type: 'category',
      label: '02 · Roles & Security',
      items: [
        'security/security-overview',
        'security/roles-and-permissions',
        'security/endpoint-authorization',
        'security/audit-logging',
        'security/data-privacy',
        'security/security-baseline',
      ],
    },
    {
      type: 'category',
      label: '03 · Authentication',
      items: [
        'authentication/index',
        'authentication/user-sessions',
        'authentication/invites-and-verification',
        'authentication/api-client-tokens',
      ],
    },
    {
      type: 'category',
      label: '04 · Dashboard',
      items: ['dashboard/index'],
    },
    {
      type: 'category',
      label: '05 · Batches',
      items: [
        'batches/index',
        'batches/upload-workflow',
        'batches/batch-lifecycle',
        'batches/upload-logs',
      ],
    },
    {
      type: 'category',
      label: '06 · Claims',
      items: [
        'claims/index',
        'claims/diagnoses-and-service-lines',
        'claims/results-ui',
      ],
    },
    {
      type: 'category',
      label: '07 · EDI 837P',
      items: [
        'edi-837p/index',
        'edi-837p/parsing-pipeline',
        'edi-837p/structural-validation',
        'edi-837p/claim-mapping',
        'edi-837p/processing-errors',
      ],
    },
    {
      type: 'category',
      label: '08 · Validation',
      items: [
        'validation/index',
        'validation/how-claim-rules-run',
        'validation/business-rule-catalog',
        'validation/business-rule-switches',
        'validation/lifecycle',
        'validation/rule-catalog',
        'validation/ncci-and-mue',
        'validation/results',
      ],
    },
    {
      type: 'category',
      label: '09 · References',
      items: [
        'references/index',
        'references/cpt-and-icd',
        'references/reference-admin',
      ],
    },
    {
      type: 'category',
      label: '10 · Tenants',
      items: [
        'tenants/index',
        'tenants/isolation',
        'tenants/members',
        'tenants/service-clients',
      ],
    },
    {
      type: 'category',
      label: '11 · Integrations',
      items: [
        'integrations/index',
        'integrations/api-clients',
        'integrations/failure-strategy',
      ],
    },
    {
      type: 'category',
      label: '12 · Support',
      items: [
        'support/index',
        'support/inquiry-workflow',
      ],
    },
    {
      type: 'category',
      label: '13 · Notifications',
      items: [
        'notifications/index',
        'notifications/email',
      ],
    },
    {
      type: 'category',
      label: '14 · Architecture',
      items: [
        'architecture/index',
        'architecture/frontend',
        'architecture/backend',
        'architecture/request-lifecycle',
        'architecture/data-flow',
      ],
    },
    {
      type: 'category',
      label: '15 · Getting Started',
      items: [
        'getting-started/prerequisites',
        'getting-started/local-development',
        'getting-started/environment-variables',
        'getting-started/running-workers',
        'getting-started/troubleshooting-setup',
      ],
    },
    {
      type: 'category',
      label: '16 · Frontend',
      items: [
        'frontend/index',
        'frontend/routing',
        'frontend/auth-client',
        'frontend/portal-vs-staff',
      ],
    },
    {
      type: 'category',
      label: '17 · Data Model',
      items: [
        'data-model/index',
        'data-model/erd',
        'data-model/data-dictionary',
        'data-model/lifecycle',
      ],
    },
    {
      type: 'category',
      label: '18 · API',
      items: [
        'api/index',
        'api/endpoint-catalog',
        'api/authentication',
        'api/errors',
        'api/file-uploads',
      ],
    },
    {
      type: 'category',
      label: '19 · Reporting',
      items: ['reporting/index'],
    },
    {
      type: 'category',
      label: '20 · Quality & Testing',
      items: [
        'quality/testing-strategy',
        'quality/test-catalog',
        'quality/validation-rules',
        'quality/edge-cases',
        'quality/acceptance-criteria',
      ],
    },
    {
      type: 'category',
      label: '21 · Observability',
      items: [
        'observability/index',
        'observability/background-jobs',
        'observability/health',
      ],
    },
    {
      type: 'category',
      label: '22 · Infrastructure',
      items: [
        'infrastructure/index',
        'infrastructure/environment-variables',
        'infrastructure/local-compose',
      ],
    },
    {
      type: 'category',
      label: '23 · UI Specification',
      items: [
        'ui/ui-principles',
        'ui/staff-and-portal-ia',
      ],
    },
    {
      type: 'category',
      label: '24 · Research',
      items: ['research/edi-837p-standards'],
    },
    {
      type: 'category',
      label: '25 · Roadmap & Decisions',
      items: [
        'roadmap/index',
        'roadmap/implementation-phases',
        'decisions/open-decisions',
      ],
    },
    'glossary',
  ],
};

export default sidebars;
