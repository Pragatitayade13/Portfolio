import React from 'react';
import { Menu, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ title, onMenuToggle }) => {
  const { adminProfile, currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    const confirm = window.confirm("Are you sure you want to sign out of the Admin Portal?");
    if (!confirm) return;

    try {
      await logout();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 90,
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 24px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={onMenuToggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'block' // Show on mobile, hide via css on desktop if needed, but sidebar is desktop-only so header menu toggle works on mobile
          }}
          className="admin-menu-toggle-btn"
          aria-label="Toggle navigation drawer"
        >
          <Menu size={20} />
        </button>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'var(--text-primary)'
        }}>{title}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Theme Toggler */}
        <button 
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'grid',
            placeItems: 'center'
          }}
          aria-label="Switch theme mode"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* User profile details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="admin-header-profile">
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-muted)',
            border: '1px solid var(--accent)',
            display: 'grid',
            placeItems: 'center',
            color: 'var(--accent)',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            PT
          </div>
          <div style={{ display: 'grid', textAlign: 'left' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Pragati Tayade
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {adminProfile?.role || 'admin'}
            </span>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogoutClick}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--danger)',
            cursor: 'pointer',
            padding: '8px',
            display: 'grid',
            placeItems: 'center'
          }}
          aria-label="Log out from session"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
