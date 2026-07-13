import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { FileDown } from 'lucide-react';

const AdminResumePage = () => {
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Resume Configuration" 
        description="Configure your active CV download file and track downloads."
      />
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileDown size={18} /> Active CV Reference
        </h3>
        
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Current File Name</label>
            <input className="form-input" defaultValue="Pragati_Tayade_Resume.pdf" disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Upload New CV Document</label>
            <input type="file" disabled style={{ fontSize: '0.85rem' }} />
          </div>
          <button className="btn btn-primary" disabled style={{ justifySelf: 'start', opacity: 0.5 }}>
            Upload &amp; Replace (Disabled)
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminResumePage;
