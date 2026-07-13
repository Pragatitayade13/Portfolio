import React from 'react';

const SectionHeading = ({ label, title, subtitle }) => {
  return (
    <div className="section-header reveal">
      {label && <span className="section-label">{label}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
