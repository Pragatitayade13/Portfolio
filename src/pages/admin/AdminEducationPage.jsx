import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { GraduationCap } from 'lucide-react';

const AdminEducationPage = () => {
  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Education History" 
        description="Configure your degrees, certificate milestones, scores, and schools."
      />
      
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <GraduationCap size={18} /> Education Timeline
        </h3>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Bachelor of Engineering (CSE)</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>S.G.B Amravati University | 2022 - 2026</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '6px' }}>CGPA: 8.51</p>
          </div>
          <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Higher Secondary Certificate (HSC)</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>Maharashtra State Board, Pune | 2020 - 2022</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '6px' }}>Score: 70.83%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEducationPage;
