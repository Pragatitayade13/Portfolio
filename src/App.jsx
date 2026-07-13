import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Layout & public pages
import AppLayout from './components/layout/AppLayout';
import PortfolioPage from './pages/PortfolioPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminUnauthorizedPage from './pages/admin/AdminUnauthorizedPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Protection guards
import ProtectedRoute from './routes/ProtectedRoute';
import AdminOnlyRoute from './routes/AdminOnlyRoute';

import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {/* Public Layout and Routes */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<PortfolioPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="admin/login" element={<AdminLoginPage />} />
              <Route path="admin/unauthorized" element={<AdminUnauthorizedPage />} />
              
              {/* Protected Administration Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminOnlyRoute />}>
                  <Route path="admin" element={<AdminDashboardPage />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
