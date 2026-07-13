import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboardPage = () => {
  const { currentUser, adminProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error("Sign out failed:", error.message);
    }
  };

  return (
    <main style={{ padding: '40px 24px', minHeight: '80vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
      <div className="container">
        
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.75px' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Welcome back, {adminProfile?.email || currentUser?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>View Site</button>
            <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px' }}>Admin Profile</h3>
            <div style={{ display: 'grid', gap: '10px', fontSize: '0.9rem' }}>
              <div><strong>Email:</strong> {adminProfile?.email}</div>
              <div><strong>Role:</strong> <span style={{ color: 'var(--accent)' }}>{adminProfile?.role}</span></div>
              <div><strong>Status:</strong> <span style={{ color: 'var(--success)', fontWeight: 600 }}>Active</span></div>
              <div><strong>UID:</strong> <code style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px' }}>{currentUser?.uid}</code></div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px' }}>System Status</h3>
            <div style={{ display: 'grid', gap: '10px', fontSize: '0.9rem' }}>
              <div><strong>Database:</strong> Cloud Firestore Connected</div>
              <div><strong>Storage Bucket:</strong> Connected</div>
              <div><strong>CRUD Actions:</strong> Disabled (Foundation Phase)</div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
};

export default AdminDashboardPage;
