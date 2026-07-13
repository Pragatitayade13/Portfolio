import React, { useState } from 'react';
import { useActiveNavHighlight } from '../../hooks/useActiveNavHighlight';
import ThemeToggle from '../common/ThemeToggle';
import MobileNavigation from './MobileNavigation';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveNavHighlight([
    'home',
    'projects',
    'about',
    'experience',
    'education',
    'certifications',
    'contact'
  ]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="site-header">
      <div className="container nav-container">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-dot" aria-hidden="true"></span>
          Pragati
        </a>

        <button 
          className="hamburger" 
          onClick={toggleMenu} 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Desktop Links */}
        <nav className="nav-links desktop-only" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a 
              href={`#${item.id}`} 
              key={item.id}
              className={activeSection === item.id ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation overlay drawer */}
        <MobileNavigation isOpen={isOpen} onClose={closeMenu} />

        <div className="nav-actions">
          <ThemeToggle />
          <a className="btn btn-hire" href="#contact" onClick={closeMenu}>Hire Me</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
