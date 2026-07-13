import React from 'react';

const AdminEmptyState = ({ title = "No items found", description = "Get started by adding a new record to this collection.", actionLabel, onAction }) => {
  return (
    <div style={{
      border: '1px dashed var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '48px 24px',
      textAlign: 'center',
      backgroundColor: 'var(--bg-card)',
      color: 'var(--text-primary)'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📂</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '320px', margin: '0 auto 20px', lineHeight: 1.5 }}>{description}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction} style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default AdminEmptyState;
