import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, currentUser, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated as administrator, redirect directly to dashboard
  useEffect(() => {
    if (!loading && currentUser) {
      if (isAdmin) {
        const from = location.state?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } else {
        navigate('/admin/unauthorized', { replace: true });
      }
    }
  }, [currentUser, isAdmin, loading, navigate, location]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Input validations
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      // Success redirection is handled by the useEffect observer above
    } catch (error) {
      setSubmitting(false);
      // Map Firebase auth errors to readable messages
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setFormError('Invalid email or password. Please try again.');
      } else {
        setFormError('An unexpected authentication error occurred. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
        <p style={{ fontWeight: 600 }}>Loading...</p>
      </div>
    );
  }

  return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '90vh', padding: '24px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '36px', boxShadow: 'var(--shadow-xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '2.5rem' }} role="img" aria-label="Lock emoji">🔒</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '12px', letterSpacing: '-0.5px' }}>Admin Portal</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Sign in to manage portfolio content</p>
        </div>

        <form onSubmit={handleLoginSubmit} noValidate style={{ display: 'grid', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="loginEmail">Email Address</label>
            <input 
              className="form-input"
              id="loginEmail"
              type="email"
              placeholder="admin@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="loginPassword">Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                className="form-input"
                id="loginPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                style={{ width: '100%', paddingRight: '48px' }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  outline: 'none'
                }}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {formError && (
            <div 
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid var(--danger)',
                color: 'var(--danger)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
              role="alert"
            >
              {formError}
            </div>
          )}

          <button 
            className="btn btn-primary" 
            type="submit" 
            disabled={submitting}
            style={{ width: '100%', marginTop: '8px', padding: '12px' }}
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLoginPage;
