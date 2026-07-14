import React from 'react';
import { Github, Linkedin, ArrowUp, Mail } from 'lucide-react';
import resumePdf from '../../assets/documents/Pragati_Tayade_Resume.pdf';
import './Footer.css';

const Footer = () => {
  const handleMigrate = async () => {
    const confirm = window.confirm("Are you sure you want to run the Firestore database migration?");
    if (!confirm) return;

    try {
      const { runMigration } = await import('../../scripts/migrateInitialData');
      const result = await runMigration();
      alert(result.logs.join('\n'));
    } catch (err) {
      alert(`Migration error: ${err.message}`);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '48px 0 24px',
      position: 'relative'
    }}>
      <div className="container" style={{ display: 'grid', gap: '32px' }}>
        
        {/* Top footer row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }} className="footer-top-row">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
              Pragati Tayade
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Java Full-Stack Developer &amp; Software Developer
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <a 
              href="https://github.com/Pragatitayade13" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', display: 'grid', placeItems: 'center', transition: 'var(--transition)' }}
              className="footer-social-icon"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a 
              href="https://www.linkedin.com/in/pragati-tayade-644636283" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', display: 'grid', placeItems: 'center', transition: 'var(--transition)' }}
              className="footer-social-icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Middle row containing navigation links */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '24px'
        }} className="footer-middle-row">
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }} className="footer-nav">
            <a href="#/#home" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>Home</a>
            <a href="#/#about" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>About</a>
            <a href="#/#projects" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>Projects</a>
            <a href="#/#skills" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>Skills</a>
            <a href="#/#experience" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>Experience</a>
            <a href="#/#contact" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</a>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            {import.meta.env.DEV && (
              <button 
                onClick={handleMigrate}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.7rem', fontWeight: 700 }}
              >
                ⚙️ Migrate Initial Data
              </button>
            )}

            <button 
              onClick={handleScrollToTop}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                color: '#FFF',
                border: 'none',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition)'
              }}
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Copyright banner */}
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          textAlign: 'center',
          marginTop: '16px'
        }}>
          &copy; {new Date().getFullYear()} Pragati Tayade. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
