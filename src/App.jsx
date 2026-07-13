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

// Admin layout shell
import AdminLayout from './components/admin/AdminLayout';

// Admin pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminUnauthorizedPage from './pages/admin/AdminUnauthorizedPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminSkillsPage from './pages/admin/AdminSkillsPage';
import AdminExperiencePage from './pages/admin/AdminExperiencePage';
import AdminEducationPage from './pages/admin/AdminEducationPage';
import AdminCertificatesPage from './pages/admin/AdminCertificatesPage';
import AdminPublicationsPage from './pages/admin/AdminPublicationsPage';
import AdminResumePage from './pages/admin/AdminResumePage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

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
              
              {/* Protected Administration Routes (Wrapped in AdminLayout) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminOnlyRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="admin" element={<AdminDashboardPage />} />
                    <Route path="admin/profile" element={<AdminProfilePage />} />
                    <Route path="admin/projects" element={<AdminProjectsPage />} />
                    <Route path="admin/skills" element={<AdminSkillsPage />} />
                    <Route path="admin/experience" element={<AdminExperiencePage />} />
                    <Route path="admin/education" element={<AdminEducationPage />} />
                    <Route path="admin/certificates" element={<AdminCertificatesPage />} />
                    <Route path="admin/publications" element={<AdminPublicationsPage />} />
                    <Route path="admin/resume" element={<AdminResumePage />} />
                    <Route path="admin/settings" element={<AdminSettingsPage />} />
                  </Route>
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
