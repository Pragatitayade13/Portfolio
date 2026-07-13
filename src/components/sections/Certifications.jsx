import React from 'react';
import SectionHeading from '../common/SectionHeading';
import ExternalLink from '../common/ExternalLink';

// Asset imports
import vaultOfCodesCert from '../../assets/certificates/vaultofcodes_python_certificate.png';
import apexPlanetCert from '../../assets/certificates/apexplanet_webdev_certificate.png';
import seedJavaCert from '../../assets/certificates/seed_java_sql_certificate.png';
import gradGuruCert from '../../assets/certificates/grad_guru_certificate.png';
import ciscoCyberCert from '../../assets/certificates/cyber.png';

const Certifications = () => {
  const certificationsData = [
    {
      title: "Python Programming Internship",
      issuer: "VaultofCodes.in · Google Partner",
      date: "July – August 2025",
      image: vaultOfCodesCert,
      link: vaultOfCodesCert,
      borderColor: "#8B5CF6",
      ariaLabel: "View VaultofCodes Python certificate"
    },
    {
      title: "Web Development Internship",
      issuer: "ApexPlanet Software Pvt. Ltd.",
      date: "Jul 2025 – Aug 2025 | ID: APSPL2510660",
      image: apexPlanetCert,
      link: apexPlanetCert,
      borderColor: "#14B8A6",
      ariaLabel: "View ApexPlanet Web Dev certificate"
    },
    {
      title: "Training on SQL, Core & Advanced Java",
      issuer: "SEED Infotech Ltd. · COET, Akola",
      date: "Aug – Oct 2025 | COET/Java/2025",
      image: seedJavaCert,
      link: seedJavaCert,
      borderColor: "#8B5CF6",
      ariaLabel: "View SEED Java SQL certificate"
    },
    {
      title: "Webinar – Career Guidance Session",
      issuer: "Grad Guru Innovation · ISO Certified",
      date: "31 December 2025",
      image: gradGuruCert,
      link: gradGuruCert,
      borderColor: "#F59E0B",
      ariaLabel: "View Grad Guru webinar certificate"
    },
    {
      title: "Introduction to CyberSecurity",
      issuer: "CISCO Networking Academy",
      date: "Issued: 2025",
      image: ciscoCyberCert,
      link: ciscoCyberCert,
      borderColor: "#10B981",
      ariaLabel: "View CISCO Cybersecurity certificate"
    }
  ];

  return (
    <section id="certifications">
      <div className="container">
        <SectionHeading 
          label="Credentials" 
          title="Certifications" 
          subtitle="Specialized course completions, webinar sessions, and professional internships."
        />

        <div className="certs-grid">
          {certificationsData.map((cert, idx) => (
            <div 
              className="cert-card reveal" 
              style={{ borderLeftColor: cert.borderColor }}
              key={idx}
            >
              <ExternalLink 
                href={cert.link} 
                className="cert-thumbnail"
                aria-label={cert.ariaLabel}
              >
                <img src={cert.image} alt={cert.title} loading="lazy" />
                <div className="cert-thumbnail-overlay">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Document
                </div>
              </ExternalLink>
              <div>
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-date">{cert.date}</div>
              </div>
              <ExternalLink href={cert.link} className="cert-link">
                View Certificate 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </ExternalLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
