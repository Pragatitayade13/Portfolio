import React from 'react';
import SectionHeading from '../common/SectionHeading';
import DocumentCard from '../common/DocumentCard';
import publicationCert from '../../assets/images/publication.png';
import publishedPaperPdf from '../../assets/documents/Published paper.pdf';

const Publications = () => {
  return (
    <section id="achievements" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <SectionHeading 
          label="Research &amp; Contributions" 
          title="Achievements &amp; Publications" 
          subtitle="Academic research papers and technical publication certificates."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginTop: '40px',
          maxWidth: '100%'
        }} className="achievements-grid">
          
          <DocumentCard 
            title="Certificate of Publication – Research Paper"
            publisher="International Journal / Conference Research"
            date="April 2026"
            description="Conducted in-depth academic research on software security, network vulnerability scanning, and cybersecurity defenses, highlighting modern attack vectors and active mitigation architectures."
            url={publicationCert}
            fileUrl={publishedPaperPdf}
          />

        </div>
      </div>
    </section>
  );
};

export default Publications;
