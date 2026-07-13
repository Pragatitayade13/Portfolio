import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { Code } from 'lucide-react';

const AdminSkillsPage = () => {
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Manage Skills" 
        description="Update or group your core programming languages and framework competencies."
      />
      
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Code size={18} /> Skill Categories
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
          Skills are grouped by category and managed dynamically. This view will connect to your Firestore database collections in future waves.
        </p>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>Backend &amp; Systems</h4>
            <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>Java, OOPs, Spring Boot, REST APIs, C/C++, Python</p>
          </div>
          <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>Frontend Technologies</h4>
            <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>React.js, JavaScript, HTML5, CSS3, Bootstrap</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSkillsPage;
