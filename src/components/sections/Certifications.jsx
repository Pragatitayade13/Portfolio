import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import TiltCard from '../common/TiltCard';
import Modal from '../common/Modal';
import { Eye, ExternalLink } from 'lucide-react';

// Asset imports
import vaultOfCodesCert from '../../assets/certificates/vaultofcodes_python_certificate.png';
import apexPlanetCert from '../../assets/certificates/apexplanet_webdev_certificate.png';
import seedJavaCert from '../../assets/certificates/seed_java_sql_certificate.png';
import gradGuruCert from '../../assets/certificates/grad_guru_certificate.png';
import ciscoCyberCert from '../../assets/certificates/cyber.png';

const Certifications = () => {
  const [zoomedCert, setZoomedCert] = useState(null);

  const certificationsData = [
    {
      title: "Python Programming Internship",
      issuer: "VaultofCodes.in · Google Partner",
      date: "July – August 2025",
      image: vaultOfCodesCert,
      borderColor: "#9B7CFF"
    },
    {
      title: "Web Development Internship",
      issuer: "ApexPlanet Software Pvt. Ltd.",
      date: "Jul 2025 – Aug 2025 | ID: APSPL2510660",
      image: apexPlanetCert,
      borderColor: "#2DD4BF"
    },
    {
      title: "Training on SQL, Core & Advanced Java",
      issuer: "SEED Infotech Ltd. · COET, Akola",
      date: "Aug – Oct 2025 | COET/Java/2025",
      image: seedJavaCert,
      borderColor: "#9B7CFF"
    },
    {
      title: "Webinar – Career Guidance Session",
      issuer: "Grad Guru Innovation · ISO Certified",
      date: "31 December 2025",
      image: gradGuruCert,
      borderColor: "#FBBF24"
    },
    {
      title: "Introduction to CyberSecurity",
      issuer: "CISCO Networking Academy",
      date: "Issued: 2025",
      image: ciscoCyberCert,
      borderColor: "#10B981"
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginTop: '40px'
        }} className="certs-grid">
          
          {certificationsData.map((cert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              onClick={() => setZoomedCert(cert)}
              style={{ cursor: 'pointer' }}
            >
              <TiltCard maxRotation={4} style={{ height: '100%' }}>
                <SpotlightCard style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-color)',
                  borderTop: `4px solid ${cert.borderColor}`,
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden'
                }}>
                  
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      loading="lazy" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(7, 10, 18, 0.4)',
                      opacity: 0,
                      display: 'grid',
                      placeItems: 'center',
                      color: '#FFF',
                      transition: 'opacity 0.25s ease'
                    }} className="cert-hover-overlay">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                        <Eye size={16} /> Preview Document
                      </span>
                    </div>
                  </div>

                  {/* Body details */}
                  <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '-0.3px', margin: 0 }}>
                        {cert.title}
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {cert.issuer}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-code)', color: 'var(--accent)', marginTop: '12px' }}>
                      {cert.date}
                    </div>
                  </div>

                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}

        </div>
      </div>

      {/* Styles for hover display */}
      <style>{`
        .certs-grid > div:hover .cert-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>

      {/* Document Zoom Modal */}
      <Modal 
        isOpen={zoomedCert !== null} 
        onClose={() => setZoomedCert(null)}
        title={zoomedCert?.title || "Certificate Document"}
      >
        {zoomedCert && (
          <div style={{ display: 'grid', gap: '20px', textAlign: 'center' }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <img 
                src={zoomedCert.image} 
                alt={zoomedCert.title} 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontWeight: 800, fontSize: '1rem' }}>{zoomedCert.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{zoomedCert.issuer}</p>
              </div>
              <a 
                href={zoomedCert.image} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '0.8rem' }}
              >
                Open Full Document <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Certifications;
