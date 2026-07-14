import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';

const DocumentCard = ({ title, publisher, date, description, url, fileUrl }) => {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="card doc-card"
      style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: 'var(--accent-muted)',
          color: 'var(--accent)',
          display: 'grid',
          placeItems: 'center',
          marginBottom: '20px'
        }}>
          <FileText size={20} />
        </div>

        <h3 style={{
          fontSize: '1.15rem',
          fontWeight: 800,
          lineHeight: 1.4,
          letterSpacing: '-0.3px',
          marginBottom: '6px'
        }}>
          {title}
        </h3>

        <div style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--accent)',
          fontFamily: 'var(--font-code)',
          textTransform: 'uppercase',
          marginBottom: '14px'
        }}>
          {publisher} {date && `| ${date}`}
        </div>

        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '24px'
        }}>
          {description}
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '16px'
      }}>
        {fileUrl && (
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            View PDF
          </a>
        )}
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            External Link <ExternalLink size={12} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default DocumentCard;
