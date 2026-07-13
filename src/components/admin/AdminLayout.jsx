import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminMobileNavigation from './AdminMobileNavigation';

const PAGE_TITLES = {
  '/admin': 'Dashboard Overview',
  '/admin/profile': 'Edit Profile',
  '/admin/projects': 'Manage Projects',
  '/admin/skills': 'Manage Skills',
  '/admin/experience': 'Work Experience',
  '/admin/education': 'Education History',
  '/admin/certificates': 'Manage Certificates',
  '/admin/publications': 'Manage Publications',
  '/admin/resume': 'Resume Configuration',
  '/admin/settings': 'Global Settings'
};

const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile navigation drawer on route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const activeTitle = PAGE_TITLES[location.pathname] || 'Admin Portal';

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      transition: 'background-color 0.4s ease'
    }}>
      {/* Desktop Sidebar (automatically hidden on mobile via CSS) */}
      <AdminSidebar />

      {/* Mobile Drawer Navigation */}
      <AdminMobileNavigation 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
      />

      {/* Main Right Side Content Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minWidth: 0 // Prevents grid/flex item child overflow
      }}>
        {/* Top Header */}
        <AdminHeader 
          title={activeTitle} 
          onMenuToggle={() => setIsMobileOpen(!isMobileOpen)} 
        />

        {/* Scrollable Subpage Content Outlet */}
        <main style={{
          padding: 'clamp(24px, 4vw, 40px)',
          flexGrow: 1,
          overflowY: 'auto'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
