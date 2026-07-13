import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { FileText } from 'lucide-react';

const AdminPublicationsPage = () => {
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Manage Publications" 
        description="Edit academic research papers and technical writeups."
      />
      
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileText size={18} /> Research Papers List
        </h3>
        
        <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Certificate of Publication – Research Paper</h4>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>Published: April 2026</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '8px', lineHeight: 1.5 }}>
            Conducted in-depth academic research on software security, network vulnerability scanning, and cybersecurity defenses, highlighting modern attack vectors and active mitigation architectures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPublicationsPage;
