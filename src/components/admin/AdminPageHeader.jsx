import React from 'react';

const AdminPageHeader = ({ title, description, children }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      flexWrap: 'wrap',
      gap: '16px',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '20px'
    }}>
      <div>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: 'var(--text-primary)'
        }}>{title}</h1>
        {description && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            marginTop: '4px'
          }}>{description}</p>
        )}
      </div>
      {children && (
        <div style={{ display: 'flex', gap: '12px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default AdminPageHeader;
