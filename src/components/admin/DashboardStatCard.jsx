import React from 'react';

const DashboardStatCard = ({ title, value, icon: Icon, description }) => {
  return (
    <div className="card" style={{
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-between',
      padding: '24px',
      transition: 'var(--transition)'
    }}>
      <div style={{ display: 'grid', gap: '8px' }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'var(--text-muted)'
        }}>{title}</span>
        <h4 style={{
          fontSize: '2rem',
          fontWeight: 800,
          lineHeight: 1,
          color: 'var(--text-primary)',
          letterSpacing: '-1px'
        }}>{value}</h4>
        {description && (
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--accent-secondary)',
            fontWeight: 500
          }}>{description}</p>
        )}
      </div>
      {Icon && (
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--accent)'
        }}>
          <Icon size={20} />
        </div>
      )}
    </div>
  );
};

export default DashboardStatCard;
