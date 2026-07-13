import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { Award, Plus } from 'lucide-react';

const AdminCertificatesPage = () => {
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Manage Certificates" 
        description="Configure verified certifications, webinar details, and credentials."
      >
        <button className="btn btn-primary" disabled style={{ opacity: 0.5 }}>
          <Plus size={16} /> Add Certificate
        </button>
      </AdminPageHeader>
      
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award size={18} /> Credentials List
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Certificate Title</th>
                <th style={{ padding: '12px' }}>Issuer</th>
                <th style={{ padding: '12px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Python Programming Internship</td>
                <td style={{ padding: '12px' }}>VaultofCodes.in</td>
                <td style={{ padding: '12px' }}>July – August 2025</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Web Development Internship</td>
                <td style={{ padding: '12px' }}>ApexPlanet Software Pvt. Ltd.</td>
                <td style={{ padding: '12px' }}>Jul 2025 – Aug 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificatesPage;
