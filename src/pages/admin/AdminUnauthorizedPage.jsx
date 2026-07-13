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

  const handleCreateAdminDoc = async () => {
    if (!currentUser) return;
    try {
      const { createRecord } = await import('../../services/portfolioService');
      await createRecord('adminUsers', {
        email: currentUser.email,
        role: 'admin',
        active: true
      }, currentUser.uid);
      
      alert("✓ Admin document initialized successfully! Please refresh or re-login to enter the dashboard.");
      window.location.reload();
    } catch (err) {
      alert(`Initialization error: ${err.message}`);
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

        {import.meta.env.DEV && (
          <div style={{ marginTop: '20px', padding: '16px', border: '1px dashed var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', marginBottom: '12px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              [DEV MODE] Initialize admin document in Firestore for this account UID: <code>{currentUser?.uid}</code>
            </p>
            <button 
              className="btn btn-primary" 
              onClick={handleCreateAdminDoc}
              style={{ padding: '8px 16px', fontSize: '0.8rem' }}
            >
              ⚙️ Create adminUsers Doc
            </button>
          </div>
        )}

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
