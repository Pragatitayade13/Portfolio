import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <p>&copy; {new Date().getFullYear()} Pragati Tayade. All rights reserved.</p>
        <p className="footer-credits">Built with React &amp; Vite</p>
      </div>
    </footer>
  );
};

export default Footer;
