import React from 'react';

const DocumentLink = ({ href, downloadName, children, className = '' }) => {
  return (
    <a 
      href={href} 
      download={downloadName}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
};

export default DocumentLink;
