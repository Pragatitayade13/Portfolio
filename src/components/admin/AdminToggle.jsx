import React from 'react';

const AdminToggle = ({ label, id, checked, onChange, disabled = false }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-sm)',
      opacity: disabled ? 0.6 : 1
    }}>
      <label className="form-label" htmlFor={id} style={{ cursor: 'pointer', marginBottom: 0, userSelect: 'none' }}>
        {label}
      </label>
      <input 
        id={id}
        type="checkbox"
        checked={!!checked}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: '40px',
          height: '20px',
          cursor: 'pointer',
          accentColor: 'var(--accent)'
        }}
      />
    </div>
  );
};

export default AdminToggle;
