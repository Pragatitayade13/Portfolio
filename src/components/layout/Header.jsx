import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveNavHighlight } from '../../hooks/useActiveNavHighlight';
import ThemeToggle from '../common/ThemeToggle';
import resumePdf from '../../assets/documents/Pragati_Tayade_Resume.pdf';
import DocumentLink from '../common/DocumentLink';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activeSection = useActiveNavHighlight([
    'home',
    'about',
    'projects',
    'skills',
    'experience',
    'achievements',
    'contact'
  ]);

  // Track window scroll to toggle background blurring styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`site-header ${scrolled ? 'scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(7, 10, 18, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-bottom-color 0.3s ease, backdrop-filter 0.3s ease'
      }}
    >
      {/* Light theme override for header background wrapper */}
      <style>{`
        body.theme-light .site-header.scrolled {
          background-color: rgba(247, 248, 252, 0.8) !important;
        }
      `}</style>

      <div className="container nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Monogram wordmark */}
        <a className="brand" href="#/#home" onClick={closeMenu} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent)', borderRadius: '50%' }}></span>
          PT
        </a>

        {/* Desktop Links */}
        <nav className="nav-links desktop-only" style={{ display: 'flex', gap: '6px' }} aria-label="Main Navigation">
          {navItems.map((item) => (
            <a 
              href={`#/#${item.id}`} 
              key={item.id}
              className={`nav-item-link ${activeSection === item.id ? 'active' : ''}`}
              style={{
                position: 'relative',
                padding: '8px 16px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: activeSection === item.id ? 'var(--text-primary)' : 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.25s'
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span 
                  layoutId="activeUnderline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '16px',
                    right: '16px',
                    height: '2px',
                    backgroundColor: 'var(--accent)',
                    borderRadius: '2px'
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Action button row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <ThemeToggle />
          
          <DocumentLink 
            className="btn btn-secondary btn-resume-header" 
            href={resumePdf} 
            downloadName="Pragati_Tayade_Resume.pdf"
            style={{ padding: '8px 16px', fontSize: '0.8rem', fontWeight: 600 }}
          >
            Resume
          </DocumentLink>

          {/* Hamburger trigger menu for mobile viewports */}
          <button 
            className="hamburger" 
            onClick={toggleMenu} 
            aria-expanded={isOpen} 
            aria-label="Toggle navigation drawer"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '6px',
              display: 'none'
            }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu slideout overlay drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: '76px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-card)',
              borderBottom: '1px solid var(--border-color)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              zIndex: 99
            }}
            className="mobile-menu-drawer"
          >
            {navItems.map((item) => (
              <a 
                href={`#/#${item.id}`} 
                key={item.id}
                onClick={closeMenu}
                style={{
                  padding: '12px 16px',
                  color: activeSection === item.id ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activeSection === item.id ? 'var(--accent-muted)' : 'transparent'
                }}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#/#contact" 
              onClick={closeMenu}
              className="btn btn-primary"
              style={{ textAlign: 'center', marginTop: '12px', padding: '12px' }}
            >
              Hire Me <ArrowUpRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
