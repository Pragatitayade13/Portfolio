import React from 'react';
import SectionHeading from '../common/SectionHeading';
import ExternalLink from '../common/ExternalLink';
import DocumentLink from '../common/DocumentLink';
import publicationCert from '../../assets/images/publication.png';
import publishedPaperPdf from '../../assets/documents/Published paper.pdf';

const Publications = () => {
  return (
    <section id="publications" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <SectionHeading 
          label="Research" 
          title="Publications" 
          subtitle="Academic research papers and technical publications."
        />

        <div className="certs-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
          <div className="cert-card reveal" style={{ borderLeftColor: '#8B5CF6' }}>
            <ExternalLink 
              href={publicationCert} 
              className="cert-thumbnail" 
              style={{ aspectRatio: '16/7' }} 
              aria-label="View publication certificate"
            >
              <img src={publicationCert} alt="Research Paper Publication Certificate" loading="lazy" />
              <div className="cert-thumbnail-overlay">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View Full Certificate
              </div>
            </ExternalLink>
            
            <div>
              <h3 className="cert-title">Certificate of Publication – Research Paper</h3>
              <div className="cert-issuer">International Journal / Conference Research</div>
              <div className="cert-date">Published: April 2026</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '12px', lineHeight: '1.65' }}>
                Conducted in-depth academic research on software security, network vulnerability scanning, and cybersecurity defenses, highlighting modern attack vectors and active mitigation architectures.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '14px', marginTop: '20px', flexWrap: 'wrap' }}>
              <ExternalLink href={publicationCert} className="cert-link">
                View Certificate
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </ExternalLink>
              <DocumentLink href={publishedPaperPdf} className="cert-link">
                Read Full Paper
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </DocumentLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
