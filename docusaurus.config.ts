import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Scrubber',
  tagline: 'Product & Engineering Specification',
  favicon: 'img/favicon.ico',

  // Keep numeric folder prefixes available for editor ordering / stable IDs.
  future: {
    v4: false,
  },

  url: 'https://scrubber.example.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 20,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Scrubber',
      logo: {
        alt: 'Scrubber',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'scrubberSidebar',
          position: 'left',
          label: 'Specification',
        },
        {
          to: '/docs/getting-started/local-development',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: '/docs/glossary',
          label: 'Glossary',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {label: 'Product Overview', to: '/docs/product-overview/'},
            {label: 'Requirements Traceability', to: '/docs/requirements/requirements-traceability'},
            {label: 'Roadmap', to: '/docs/roadmap/'},
          ],
        },
        {
          title: 'Engineering',
          items: [
            {label: 'Architecture', to: '/docs/architecture/'},
            {label: 'API', to: '/docs/api/'},
            {label: 'Data Model', to: '/docs/data-model/'},
            {label: 'EDI 837P', to: '/docs/edi-837p/'},
          ],
        },
        {
          title: 'Operations',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started/local-development'},
            {label: 'Security', to: '/docs/security/security-overview'},
            {label: 'Infrastructure', to: '/docs/infrastructure/'},
            {label: 'Open Decisions', to: '/docs/decisions/open-decisions'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Scrubber. Internal Product & Engineering Specification.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'typescript', 'sql', 'http'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
