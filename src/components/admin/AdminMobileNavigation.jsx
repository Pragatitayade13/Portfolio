import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { X, LayoutDashboard, User, FolderGit2, Code, Briefcase, GraduationCap, Award, FileText, FileDown, Settings, Globe, LogOut } from 'lucide-react';

const AdminMobileNavigation = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    onClose();
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
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'auto' : 'none',
      transition: 'opacity 0.25s ease',
      display: 'flex'
    }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(8, 11, 18, 0.8)',
          backdropFilter: 'blur(4px)'
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'relative',
        width: '280px',
        height: '100%',
        backgroundColor: 'var(--bg-card)',
        borderRight: '1px solid var(--border-color)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease'
      }}>
        <div>
          {/* Close Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: 'var(--text-primary)'
            }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent)', borderRadius: '50%' }}></span>
              Admin Menu
            </div>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '8px'
              }}
              aria-label="Close menu drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav style={{ display: 'grid', gap: '4px' }}>
            {menuItems.map((item, idx) => (
              <NavLink 
                key={idx}
                to={item.path}
                end={item.end}
                onClick={onClose}
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
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'grid', gap: '4px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-muted)'
            }}
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
              color: 'var(--danger)'
            }}
          >
            <LogOut size={16} />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminMobileNavigation;
