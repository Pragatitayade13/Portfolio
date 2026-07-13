import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { Settings } from 'lucide-react';

const AdminSettingsPage = () => {
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Global Settings" 
        description="Toggle maintenance profiles, default themes, and system configurations."
      />
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings size={18} /> Global Variables Configuration
        </h3>
        
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '20px' }}>
          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" id="maintenanceMode" disabled />
            <label className="form-label" htmlFor="maintenanceMode" style={{ cursor: 'pointer', marginBottom: 0 }}>
              Enable Maintenance Mode (locks public site detail views)
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Default Theme Mode</label>
            <select className="form-input" defaultValue="dark" disabled style={{ maxWidth: '200px' }}>
              <option value="dark">Dark Theme (Default)</option>
              <option value="light">Light Theme</option>
            </select>
          </div>

          <button className="btn btn-primary" disabled style={{ justifySelf: 'start', opacity: 0.5 }}>
            Update Configurations (Disabled)
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
