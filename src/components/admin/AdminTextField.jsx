import React from 'react';

const AdminTextField = ({ label, id, value, onChange, placeholder, required = false, type = "text", error, disabled = false }) => {
  return (
    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label className="form-label" htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {label}
        {required && <span style={{ color: 'var(--danger)' }}>*</span>}
      </label>
      <input 
        className="form-input"
        id={id}
        type={type}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={{
          borderColor: error ? 'var(--danger)' : 'var(--border-color)',
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

export default AdminTextField;
