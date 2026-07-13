import React from 'react';

const AdminLoadingState = ({ message = "Loading dashboard data..." }) => {
  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      minHeight: '240px',
      color: 'var(--text-muted)'
    }}>
      <div>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--accent)',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }}></div>
        <p style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.5px' }}>{message}</p>
      </div>
    </div>
  );
};

export default AdminLoadingState;
