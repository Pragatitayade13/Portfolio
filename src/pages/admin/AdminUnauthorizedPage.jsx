import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminUnauthorizedPage = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await logout();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '90vh', padding: '24px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '36px', textAlign: 'center', boxShadow: 'var(--shadow-xl)' }}>
        <span style={{ fontSize: '3rem' }} role="img" aria-label="Warning emoji">⚠️</span>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '16px', letterSpacing: '-0.5px' }}>Access Denied</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.6' }}>
          Your account ({currentUser?.email}) does not have administrative privileges. Please contact the administrator to grant access.
        </p>

        <div style={{ marginTop: '28px', display: 'flex', gap: '14px', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleLogoutClick}
            style={{ padding: '10px 20px' }}
          >
            Sign Out &amp; Switch Account
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/')}
            style={{ padding: '10px 20px' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminUnauthorizedPage;
