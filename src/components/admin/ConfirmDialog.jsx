import React from 'react';

const ConfirmDialog = ({ isOpen, title = "Confirm Action", message = "Are you sure you want to proceed?", confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel, destructive = false }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 400,
      display: 'grid',
      placeItems: 'center',
      backgroundColor: 'rgba(8, 11, 18, 0.8)',
      backdropFilter: 'blur(4px)',
      padding: '24px'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '400px',
        padding: '28px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>{title}</h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          marginBottom: '24px'
        }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary" 
            onClick={onConfirm}
            style={{ backgroundColor: destructive ? 'var(--danger)' : 'var(--accent)' }}
          >
            {confirmLabel}
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
