import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ role, company, date, location, desc, techs = [] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'relative',
        paddingLeft: '32px',
        paddingBottom: '40px'
      }}
      className="timeline-item"
    >
      {/* Node Dot */}
      <div style={{
        position: 'absolute',
        left: '-6px',
        top: '6px',
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent)',
        border: '3px solid var(--bg-primary)',
        zIndex: 5
      }} />

      <div className="card" style={{ padding: '24px', position: 'relative' }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--accent)',
          fontFamily: 'var(--font-code)',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {date}
        </span>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 800,
          marginTop: '6px',
          letterSpacing: '-0.3px'
        }}>
          {role}
        </h3>
        <p style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          marginTop: '2px'
        }}>
          {company} {location && `| ${location}`}
        </p>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
          marginTop: '12px',
          lineHeight: 1.6
        }}>
          {desc}
        </p>

        {techs.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '16px'
          }}>
            {techs.map((t, idx) => (
              <span 
                key={idx} 
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '3px 10px',
                  borderRadius: '4px',
                  color: 'var(--text-muted)'
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TimelineItem;
