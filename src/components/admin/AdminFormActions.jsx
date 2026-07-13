import React from 'react';

const AdminFormActions = ({ onSave, onReset, submitting = false, isDirty = false }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginTop: '32px',
      borderTop: '1px solid var(--border-color)',
      paddingTop: '20px'
    }}>
      <button 
        type="button" 
        onClick={onSave} 
        disabled={submitting || !isDirty}
        className="btn btn-primary"
        style={{ opacity: (submitting || !isDirty) ? 0.6 : 1 }}
      >
        {submitting ? 'Saving Changes...' : 'Save Changes'}
      </button>
      <button 
        type="button" 
        onClick={onReset} 
        disabled={submitting || !isDirty}
        className="btn btn-secondary"
        style={{ opacity: (submitting || !isDirty) ? 0.6 : 1 }}
      >
        Reset to Loaded
      </button>
      {!isDirty && !submitting && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          All changes saved.
        </span>
      )}
      {isDirty && !submitting && (
        <span style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>
          ● You have unsaved changes.
        </span>
      )}
    </div>
  );
};

export default AdminFormActions;
