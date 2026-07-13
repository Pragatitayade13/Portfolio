import React from 'react';

const AdminSelect = ({ label, id, value, onChange, options = [], required = false, error, disabled = false }) => {
  return (
    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label className="form-label" htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {label}
        {required && <span style={{ color: 'var(--danger)' }}>*</span>}
      </label>
      <select 
        className="form-input"
        id={id}
        value={value ?? ''}
        onChange={onChange}
        required={required}
        disabled={disabled}
        style={{
          borderColor: error ? 'var(--danger)' : 'var(--border-color)',
          opacity: disabled ? 0.6 : 1,
          cursor: 'pointer'
        }}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ color: 'var(--danger)', fontSize: '0.725rem', fontWeight: 600 }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default AdminSelect;
