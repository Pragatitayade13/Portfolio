import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  FileDown, 
  Settings, 
  Globe, 
  LogOut 
} from 'lucide-react';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure you want to sign out of the Admin Portal?");
    if (!confirm) return;

    try {
      await logout();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const menuItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Profile', path: '/admin/profile', icon: User },
    { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Skills', path: '/admin/skills', icon: Code },
    { label: 'Experience', path: '/admin/experience', icon: Briefcase },
    { label: 'Education', path: '/admin/education', icon: GraduationCap },
    { label: 'Certificates', path: '/admin/certificates', icon: Award },
    { label: 'Publications', path: '/admin/publications', icon: FileText },
    { label: 'Resume', path: '/admin/resume', icon: FileDown },
    { label: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <aside style={{
      width: '240px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      backgroundColor: 'var(--bg-card)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px'
    }} className="admin-desktop-sidebar">
      <div>
        {/* Brand/Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '1.25rem',
          color: 'var(--text-primary)',
          marginBottom: '32px',
          paddingLeft: '8px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--accent)',
            borderRadius: '50%'
          }}></span>
          Admin Panel
        </div>

        {/* Navigation links */}
        <nav style={{ display: 'grid', gap: '4px' }}>
          {menuItems.map((item, idx) => (
            <NavLink 
              key={idx}
              to={item.path}
              end={item.end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--accent-muted)' : 'transparent',
                transition: 'var(--transition)'
              })}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <item.icon size={16} style={{ color: 'inherit' }} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom links (View Site, Log Out) */}
      <div style={{ display: 'grid', gap: '4px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            transition: 'var(--transition)'
          }}
          className="admin-nav-link"
        >
          <Globe size={16} />
          View Portfolio
        </a>
        <a 
          href="#logout"
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--danger)',
            transition: 'var(--transition)'
          }}
          className="admin-nav-link"
        >
          <LogOut size={16} />
          Logout
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
