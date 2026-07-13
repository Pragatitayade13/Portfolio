import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { FolderGit2, Plus } from 'lucide-react';

const AdminProjectsPage = () => {
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Manage Projects" 
        description="Add, edit, rearrange, or delete your featured projects case studies."
      >
        <button className="btn btn-primary" disabled style={{ opacity: 0.5 }}>
          <Plus size={16} /> Add Project
        </button>
      </AdminPageHeader>
      
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FolderGit2 size={18} /> Active Projects List
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
          Database operations are disabled in this wave. You will be able to manage Firestore records here in future waves.
        </p>

        {/* Responsive Table Mock */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Title</th>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Hotel Order Management System</td>
                <td style={{ padding: '12px' }}>Web App</td>
                <td style={{ padding: '12px', color: 'var(--success)' }}>Completed</td>
                <td style={{ padding: '12px' }}>2025</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Personal Portfolio Website</td>
                <td style={{ padding: '12px' }}>Web App</td>
                <td style={{ padding: '12px', color: 'var(--success)' }}>Completed</td>
                <td style={{ padding: '12px' }}>2025</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>NoteVault</td>
                <td style={{ padding: '12px' }}>Tool</td>
                <td style={{ padding: '12px', color: 'var(--success)' }}>Completed</td>
                <td style={{ padding: '12px' }}>2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage;
