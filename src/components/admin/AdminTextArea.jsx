import React from 'react';

const AdminTextArea = ({ label, id, value, onChange, placeholder, required = false, rows = 4, error, disabled = false }) => {
  return (
    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label className="form-label" htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {label}
        {required && <span style={{ color: 'var(--danger)' }}>*</span>}
      </label>
      <textarea 
        className="form-input"
        id={id}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        disabled={disabled}
        style={{
          borderColor: error ? 'var(--danger)' : 'var(--border-color)',
          minHeight: '100px',
          opacity: disabled ? 0.6 : 1
        }}
      />
      {error && (
        <span style={{ color: 'var(--danger)', fontSize: '0.725rem', fontWeight: 600 }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default AdminTextArea;
