import React from 'react';

const AdminErrorState = ({ title = "Connection Error", message = "We encountered an issue fetching database documents. Please check your credentials.", onRetry }) => {
  return (
    <div style={{
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: 'var(--radius-md)',
      padding: '40px 24px',
      textAlign: 'center',
      backgroundColor: 'rgba(239, 68, 68, 0.04)',
      color: 'var(--text-primary)'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚠️</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', color: 'var(--danger)' }}>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '360px', margin: '0 auto 20px', lineHeight: 1.5 }}>{message}</p>
      {onRetry && (
        <button className="btn btn-secondary" onClick={onRetry} style={{ fontSize: '0.8rem', padding: '8px 16px', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
          🔄 Retry Connection
        </button>
      )}
    </div>
  );
};

export default AdminErrorState;
