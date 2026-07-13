import React from 'react';

const MobileNavigation = ({ isOpen, onClose }) => {
  const navLinks = [
    { label: 'Projects', href: '#/#projects' },
    { label: 'About', href: '#/#about' },
    { label: 'Experience', href: '#/#experience' },
    { label: 'Education', href: '#/#education' },
    { label: 'Certifications', href: '#/#certifications' },
    { label: 'Contact', href: '#/#contact' }
  ];

  return (
    <nav className={`nav-links ${isOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
      {navLinks.map((link, idx) => (
        <a href={link.href} key={idx} onClick={onClose}>
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default MobileNavigation;
