import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { User } from 'lucide-react';

const AdminProfilePage = () => {
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Admin Profile" 
        description="Edit your professional roles, rotating titles, greeting headers, and profile screenshots."
      />
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <User size={18} /> Profile Configuration
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
          Database read/write actions are disabled in this foundation wave. You will be able to edit and update your Firestore document records here in future waves.
        </p>

        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" defaultValue="Pragati Tayade" disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Professional Subtitle</label>
            <input className="form-input" defaultValue="Java Full-Stack Developer" disabled />
          </div>
          <button className="btn btn-primary" disabled style={{ justifySelf: 'start', opacity: 0.5 }}>
            Save Changes (Disabled)
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfilePage;
