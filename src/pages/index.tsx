import type {ReactElement} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Home(): ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Scrubber — Product & Engineering Specification for the EDI 837P claims scrubber">
      <main className={styles.main}>
        <div className={styles.hero}>
          <p className={styles.brand}>Scrubber</p>
          <Heading as="h1" className={styles.title}>
            Product &amp; Engineering Specification
          </Heading>
          <p className={styles.description}>
            Complete, evidence-based documentation for the NestJS + Next.js EDI 837P
            claims scrubber — architecture, batch workflows, validation rules, API,
            data model, security, and local setup.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/product-overview/">
              Read the Specification
            </Link>
            <Link
              className={clsx('button', 'button--secondary', 'button--lg')}
              to="/docs/getting-started/local-development">
              Local Setup
            </Link>
          </div>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <Heading as="h3">For Product</Heading>
            <p>Overview, requirements traceability, roadmap, and open decisions.</p>
            <Link to="/docs/roadmap/">View roadmap →</Link>
          </div>
          <div className={styles.card}>
            <Heading as="h3">For Engineers</Heading>
            <p>Architecture, EDI pipeline, validation catalog, API, and data model.</p>
            <Link to="/docs/architecture/">Explore architecture →</Link>
          </div>
          <div className={styles.card}>
            <Heading as="h3">For Operations</Heading>
            <p>Local setup, workers, infrastructure notes, and troubleshooting.</p>
            <Link to="/docs/getting-started/local-development">Get started →</Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
