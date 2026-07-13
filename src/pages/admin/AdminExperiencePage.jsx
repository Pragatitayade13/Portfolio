import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { Briefcase, Plus } from 'lucide-react';

const AdminExperiencePage = () => {
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Work Experience" 
        description="Add, edit, or remove your professional positions and developer internships."
      >
        <button className="btn btn-primary" disabled style={{ opacity: 0.5 }}>
          <Plus size={16} /> Add Position
        </button>
      </AdminPageHeader>
      
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Briefcase size={18} /> Experience Records
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
          Your professional history items are presented in timeline sequences. Edits will write directly to Firestore in future waves.
        </p>

        <div style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '20px', marginLeft: '10px' }}>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--accent-secondary)' }}>Web Development Intern</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>ApexPlanet Software Pvt. Ltd. | July 2025 – August 2025</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '8px', lineHeight: 1.5 }}>
              Developed responsive web pages and components using HTML, CSS, and JavaScript. Tested interface layouts, optimized loading times, and gained practical web development experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExperiencePage;
