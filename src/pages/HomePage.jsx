import React from 'react';
import './Pages.css';

const HomePage = () => {
  return (
    <div className="page-container container">
      <section className="hero-placeholder">
        <span className="section-label">Welcome</span>
        <h1 className="page-title">Pragati Tayade</h1>
        <p className="page-description">
          Java Full-Stack Developer &amp; Backend Engineer. Building robust and scalable web applications.
        </p>
        <div className="badge-available">
          <span className="badge-dot"></span> Available for Work
        </div>
      </section>
    </div>
  );
};

export default HomePage;
