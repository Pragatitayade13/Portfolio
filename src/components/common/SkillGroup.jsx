import React from 'react';
import { motion } from 'framer-motion';

const SkillGroup = ({ categoryName, skillsList }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card skill-category-card"
      style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)'
      }}
    >
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 800,
        color: 'var(--accent)',
        fontFamily: 'var(--font-heading)',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '10px',
        letterSpacing: '-0.3px'
      }}>
        {categoryName}
      </h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {skillsList.map((skill, idx) => (
          <motion.span 
            key={idx}
            whileHover={{ scale: 1.05, y: -2 }}
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '6px 14px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: '30px',
              transition: 'background-color 0.25s, color 0.25s'
            }}
            className="skill-badge"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillGroup;
