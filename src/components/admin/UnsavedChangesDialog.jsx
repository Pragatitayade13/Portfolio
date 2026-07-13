import React from 'react';

const UnsavedChangesDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      display: 'grid',
      placeItems: 'center',
      backgroundColor: 'rgba(8, 11, 18, 0.8)',
      backdropFilter: 'blur(4px)',
      padding: '24px'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '32px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⚠️</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Unsaved Changes</h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          marginBottom: '28px'
        }}>
          You have unsaved form edits. Navigating away will permanently discard all unsaved changes. Are you sure you want to proceed?
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={onConfirm} style={{ backgroundColor: 'var(--danger)' }}>
            Yes, Discard Changes
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Keep Editing
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesDialog;
