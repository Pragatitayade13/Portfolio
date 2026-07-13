import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderGit2, 
  Code, 
  Award, 
  FileText, 
  Clock, 
  Plus, 
  UserCheck, 
  FileEdit 
} from 'lucide-react';
import DashboardStatCard from '../../components/admin/DashboardStatCard';
import AdminPageHeader from '../../components/admin/AdminPageHeader';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Projects", value: "3", icon: FolderGit2, desc: "3 Published / 0 Drafts" },
    { title: "Mastered Skills", value: "20", icon: Code, desc: "Across 4 categories" },
    { title: "Certificates", value: "5", icon: Award, desc: "Active & Verified" },
    { title: "Publications", value: "1", icon: FileText, desc: "Research paper" }
  ];

  const quickActions = [
    { title: "Update Profile Info", desc: "Modify hero titles, tagline details, and stats.", icon: UserCheck, path: "/admin/profile" },
    { title: "Manage Projects", desc: "Add new projects, screenshots, and edit slugs.", icon: FileEdit, path: "/admin/projects" },
    { title: "Configure Settings", desc: "Toggle maintenance controls or change themes.", icon: FolderGit2, path: "/admin/settings" }
  ];

  const recentActivities = [
    { message: "Administrator Pragati Tayade authenticated successfully.", time: "Just now", type: "auth" },
    { message: "Initial portfolio data migrated to Firestore collections successfully.", time: "1 hour ago", type: "db" },
    { message: "Vite production bundle compiled with zero compiler warnings.", time: "2 hours ago", type: "build" }
  ];

  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      
      <AdminPageHeader 
        title="Dashboard Overview" 
        description="General metrics, administrative actions, and system connection logs."
      />

      {/* Grid of Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {stats.map((stat, idx) => (
          <DashboardStatCard 
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.desc}
          />
        ))}
      </div>

      {/* Main Grid: Quick Actions + Recent Activity */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '32px',
        alignItems: 'start'
      }} className="admin-dashboard-split-grid">
        
        {/* Left: Quick Actions */}
        <div style={{ display: 'grid', gap: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.25px' }}>Quick Operations</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {quickActions.map((action, idx) => (
              <div 
                key={idx}
                className="card"
                onClick={() => navigate(action.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  cursor: 'pointer',
                  padding: '20px'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent-muted)',
                  color: 'var(--accent)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  <action.icon size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{action.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{action.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Activity */}
        <div style={{ display: 'grid', gap: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.25px' }}>System Logs</h2>
          <div className="card" style={{ padding: '24px', display: 'grid', gap: '18px' }}>
            {recentActivities.map((act, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '12px',
                  borderBottom: idx < recentActivities.length - 1 ? '1px solid var(--border-color)' : 'none',
                  paddingBottom: idx < recentActivities.length - 1 ? '14px' : '0'
                }}
              >
                <Clock size={14} style={{ color: 'var(--accent)', marginTop: '4px', flexShrink: 0 }} />
                <div style={{ display: 'grid' }}>
                  <span style={{ fontSize: '0.825rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    {act.message}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardPage;
