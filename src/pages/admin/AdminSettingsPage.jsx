import React, { useState, useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTextField from '../../components/admin/AdminTextField';
import AdminTextArea from '../../components/admin/AdminTextArea';
import AdminSelect from '../../components/admin/AdminSelect';
import AdminToggle from '../../components/admin/AdminToggle';
import AdminFormActions from '../../components/admin/AdminFormActions';
import UnsavedChangesDialog from '../../components/admin/UnsavedChangesDialog';
import AdminLoadingState from '../../components/admin/AdminLoadingState';
import { readDocument, updateRecord } from '../../services/portfolioService';
import { logAdminAction } from '../../services/auditService';
import { useAuth } from '../../hooks/useAuth';
import { initialPortfolioData } from '../../data/initialPortfolioData';

const AdminSettingsPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  // 1. General Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    websiteTitle: '',
    metaDescription: '',
    defaultTheme: 'dark',
    maintenanceMode: false,
    showHero: true,
    showAbout: true,
    showSkills: true,
    showProjects: true,
    showExperience: true,
    showEducation: true,
    showCertifications: true,
    showPublications: true,
    showContact: true
  });
  const [loadedSettings, setLoadedSettings] = useState(null);

  // 2. Contact Settings Form State
  const [contactForm, setContactForm] = useState({
    recruiterCta: '',
    email: '',
    location: ''
  });
  const [loadedContact, setLoadedContact] = useState(null);

  // Load Firestore data on mount
  const loadPageData = async () => {
    setLoading(true);
    setSaveSuccess('');
    setSaveError('');
    try {
      // General Settings
      let settingsDoc = await readDocument('portfolioSettings', 'main');
      if (!settingsDoc) {
        settingsDoc = {
          websiteTitle: 'Pragati Tayade | Portfolio',
          metaDescription: 'Java Full-Stack Developer Portfolio',
          themeDefault: 'dark',
          maintenanceMode: false,
          sectionVisibility: {
            hero: true, about: true, skills: true, projects: true,
            experience: true, education: true, certifications: true,
            publications: true, contact: true
          }
        };
      }
      setLoadedSettings(settingsDoc);
      setSettingsForm({
        websiteTitle: settingsDoc.websiteTitle || 'Pragati Tayade | Portfolio',
        metaDescription: settingsDoc.metaDescription || 'Java Full-Stack Developer Portfolio',
        defaultTheme: settingsDoc.themeDefault || 'dark',
        maintenanceMode: !!settingsDoc.maintenanceMode,
        showHero: settingsDoc.sectionVisibility?.hero !== false,
        showAbout: settingsDoc.sectionVisibility?.about !== false,
        showSkills: settingsDoc.sectionVisibility?.skills !== false,
        showProjects: settingsDoc.sectionVisibility?.projects !== false,
        showExperience: settingsDoc.sectionVisibility?.experience !== false,
        showEducation: settingsDoc.sectionVisibility?.education !== false,
        showCertifications: settingsDoc.sectionVisibility?.certifications !== false,
        showPublications: settingsDoc.sectionVisibility?.publications !== false,
        showContact: settingsDoc.sectionVisibility?.contact !== false
      });

      // Contact Settings
      let contactDoc = await readDocument('contactSettings', 'main');
      if (!contactDoc) {
        contactDoc = initialPortfolioData.contactSettings;
      }
      setLoadedContact(contactDoc);
      setContactForm({
        recruiterCta: contactDoc.recruiterCta || '',
        email: contactDoc.email || '',
        location: contactDoc.location || ''
      });

    } catch (err) {
      console.error("Load failed:", err.message);
      setSaveError("Failed to fetch settings from Firestore database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  // Dirty state checks
  const isSettingsDirty = loadedSettings && (
    settingsForm.websiteTitle !== (loadedSettings.websiteTitle || 'Pragati Tayade | Portfolio') ||
    settingsForm.metaDescription !== (loadedSettings.metaDescription || 'Java Full-Stack Developer Portfolio') ||
    settingsForm.defaultTheme !== (loadedSettings.themeDefault || 'dark') ||
    settingsForm.maintenanceMode !== (!!loadedSettings.maintenanceMode) ||
    settingsForm.showHero !== (loadedSettings.sectionVisibility?.hero !== false) ||
    settingsForm.showAbout !== (loadedSettings.sectionVisibility?.about !== false) ||
    settingsForm.showSkills !== (loadedSettings.sectionVisibility?.skills !== false) ||
    settingsForm.showProjects !== (loadedSettings.sectionVisibility?.projects !== false) ||
    settingsForm.showExperience !== (loadedSettings.sectionVisibility?.experience !== false) ||
    settingsForm.showEducation !== (loadedSettings.sectionVisibility?.education !== false) ||
    settingsForm.showCertifications !== (loadedSettings.sectionVisibility?.certifications !== false) ||
    settingsForm.showPublications !== (loadedSettings.sectionVisibility?.publications !== false) ||
    settingsForm.showContact !== (loadedSettings.sectionVisibility?.contact !== false)
  );

  const isContactDirty = loadedContact && (
    contactForm.recruiterCta !== (loadedContact.recruiterCta || '') ||
    contactForm.email !== (loadedContact.email || '') ||
    contactForm.location !== (loadedContact.location || '')
  );

  const isAnyDirty = isSettingsDirty || isContactDirty;

  // React Router Navigation Blocker
  const blocker = useBlocker(
    ({ currentValue, nextValue }) =>
      isAnyDirty && currentValue.pathname !== nextValue.pathname
  );

  const handleSettingsChange = (field, val) => {
    setSettingsForm(prev => ({ ...prev, [field]: val }));
  };

  const handleContactChange = (field, val) => {
    setContactForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSaveSettings = async () => {
    if (!settingsForm.websiteTitle.trim()) {
      setSaveError("Website Title is a required field.");
      return;
    }

    setSubmitting(true);
    setSaveSuccess('');
    setSaveError('');
    try {
      const payload = {
        websiteTitle: settingsForm.websiteTitle.trim(),
        metaDescription: settingsForm.metaDescription.trim(),
        themeDefault: settingsForm.defaultTheme,
        maintenanceMode: settingsForm.maintenanceMode,
        sectionVisibility: {
          hero: settingsForm.showHero,
          about: settingsForm.showAbout,
          skills: settingsForm.showSkills,
          projects: settingsForm.showProjects,
          experience: settingsForm.showExperience,
          education: settingsForm.showEducation,
          certifications: settingsForm.showCertifications,
          publications: settingsForm.showPublications,
          contact: settingsForm.showContact
        },
        migrated: true // Maintain migration status flag
      };

      await updateRecord('portfolioSettings', 'main', payload);
      await logAdminAction('update_general_settings', 'Updated website global settings config', currentUser?.email);
      setSaveSuccess('Website global settings updated successfully!');
      
      setLoadedSettings({ ...loadedSettings, ...payload });
    } catch (err) {
      setSaveError(`Save failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveContact = async () => {
    if (!contactForm.email.trim() || !contactForm.location.trim()) {
      setSaveError("Email and Location are required contact fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())) {
      setSaveError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setSaveSuccess('');
    setSaveError('');
    try {
      const payload = {
        recruiterCta: contactForm.recruiterCta.trim(),
        email: contactForm.email.trim(),
        location: contactForm.location.trim()
      };

      await updateRecord('contactSettings', 'main', payload);
      await logAdminAction('update_contact_settings', 'Updated contact options and recruiter CTA pitching text', currentUser?.email);
      setSaveSuccess('Contact configuration updated successfully!');
      
      setLoadedContact({ ...loadedContact, ...payload });
    } catch (err) {
      setSaveError(`Save failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetSettings = () => {
    if (!loadedSettings) return;
    setSettingsForm({
      websiteTitle: loadedSettings.websiteTitle || 'Pragati Tayade | Portfolio',
      metaDescription: loadedSettings.metaDescription || 'Java Full-Stack Developer Portfolio',
      defaultTheme: loadedSettings.themeDefault || 'dark',
      maintenanceMode: !!loadedSettings.maintenanceMode,
      showHero: loadedSettings.sectionVisibility?.hero !== false,
      showAbout: loadedSettings.sectionVisibility?.about !== false,
      showSkills: loadedSettings.sectionVisibility?.skills !== false,
      showProjects: loadedSettings.sectionVisibility?.projects !== false,
      showExperience: loadedSettings.sectionVisibility?.experience !== false,
      showEducation: loadedSettings.sectionVisibility?.education !== false,
      showCertifications: loadedSettings.sectionVisibility?.certifications !== false,
      showPublications: loadedSettings.sectionVisibility?.publications !== false,
      showContact: loadedSettings.sectionVisibility?.contact !== false
    });
  };

  const handleResetContact = () => {
    if (!loadedContact) return;
    setContactForm({
      recruiterCta: loadedContact.recruiterCta || '',
      email: loadedContact.email || '',
      location: loadedContact.location || ''
    });
  };

  if (loading) {
    return <AdminLoadingState message="Fetching settings configurations from Firestore..." />;
  }

  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Global Configuration Settings" 
        description="Toggle public visibility states, modify sitemaps meta values, or edit email endpoints."
      />

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        gap: '24px',
        marginBottom: '8px'
      }}>
        {['general', 'contact'].map((tab) => (
          <button 
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSaveSuccess('');
              setSaveError('');
            }}
            style={{
              padding: '12px 4px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'general' ? 'General Settings' : 'Contact Settings'}
          </button>
        ))}
      </div>

      {/* Save Alerts */}
      {saveSuccess && (
        <div style={{ padding: '12px 16px', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid var(--success)', color: 'var(--success)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600 }}>
          {saveSuccess}
        </div>
      )}
      {saveError && (
        <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600 }}>
          {saveError}
        </div>
      )}

      {/* Tab Contents */}
      <div className="card" style={{ padding: '32px' }}>
        
        {activeTab === 'general' && (
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '20px' }}>
            <AdminTextField 
              label="Website Browser Title" 
              id="settingsWebTitle" 
              value={settingsForm.websiteTitle} 
              onChange={(e) => handleSettingsChange('websiteTitle', e.target.value)} 
              required 
              disabled={submitting}
            />
            <AdminTextArea 
              label="Meta Description (SEO)" 
              id="settingsMetaDesc" 
              value={settingsForm.metaDescription} 
              onChange={(e) => handleSettingsChange('metaDescription', e.target.value)} 
              rows={3}
              disabled={submitting}
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="form-row-2">
              <AdminSelect 
                label="Default Client Theme Mode" 
                id="settingsDefaultTheme" 
                value={settingsForm.defaultTheme} 
                onChange={(e) => handleSettingsChange('defaultTheme', e.target.value)} 
                options={[
                  { value: 'dark', label: 'Dark Theme (Default)' },
                  { value: 'light', label: 'Light Theme' }
                ]}
                disabled={submitting}
              />
              <div style={{ marginTop: '28px' }}>
                <AdminToggle 
                  label="Enable Maintenance Lock Mode" 
                  id="settingsMaintenance" 
                  checked={settingsForm.maintenanceMode} 
                  onChange={(e) => handleSettingsChange('maintenanceMode', e.target.checked)} 
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Section Visibilities */}
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Public Sections Visibility Toggles
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="skills-grid-container">
                <AdminToggle label="Hero / Banner" id="toggleHero" checked={settingsForm.showHero} onChange={(e) => handleSettingsChange('showHero', e.target.checked)} disabled={submitting} />
                <AdminToggle label="About Bio" id="toggleAbout" checked={settingsForm.showAbout} onChange={(e) => handleSettingsChange('showAbout', e.target.checked)} disabled={submitting} />
                <AdminToggle label="Skills Pills" id="toggleSkills" checked={settingsForm.showSkills} onChange={(e) => handleSettingsChange('showSkills', e.target.checked)} disabled={submitting} />
                <AdminToggle label="Projects Cards" id="toggleProjects" checked={settingsForm.showProjects} onChange={(e) => handleSettingsChange('showProjects', e.target.checked)} disabled={submitting} />
                <AdminToggle label="Work Experience" id="toggleExperience" checked={settingsForm.showExperience} onChange={(e) => handleSettingsChange('showExperience', e.target.checked)} disabled={submitting} />
                <AdminToggle label="Education History" id="toggleEducation" checked={settingsForm.showEducation} onChange={(e) => handleSettingsChange('showEducation', e.target.checked)} disabled={submitting} />
                <AdminToggle label="Certificates list" id="toggleCert" checked={settingsForm.showCertifications} onChange={(e) => handleSettingsChange('showCertifications', e.target.checked)} disabled={submitting} />
                <AdminToggle label="Publications list" id="togglePub" checked={settingsForm.showPublications} onChange={(e) => handleSettingsChange('showPublications', e.target.checked)} disabled={submitting} />
                <AdminToggle label="Contact Form" id="toggleContact" checked={settingsForm.showContact} onChange={(e) => handleSettingsChange('showContact', e.target.checked)} disabled={submitting} />
              </div>
            </div>

            <AdminFormActions 
              onSave={handleSaveSettings} 
              onReset={handleResetSettings} 
              submitting={submitting}
              isDirty={isSettingsDirty}
            />
          </form>
        )}

        {activeTab === 'contact' && (
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '20px' }}>
            <AdminTextArea 
              label="Recruiter Invitation / pitch text" 
              id="contactCta" 
              value={contactForm.recruiterCta} 
              onChange={(e) => handleContactChange('recruiterCta', e.target.value)} 
              rows={4}
              disabled={submitting}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="form-row-2">
              <AdminTextField 
                label="Target Contact Email" 
                id="contactEmail" 
                type="email"
                value={contactForm.email} 
                onChange={(e) => handleContactChange('email', e.target.value)} 
                required 
                disabled={submitting}
              />
              <AdminTextField 
                label="Residential Location" 
                id="contactLocation" 
                value={contactForm.location} 
                onChange={(e) => handleContactChange('location', e.target.value)} 
                required 
                disabled={submitting}
              />
            </div>

            <AdminFormActions 
              onSave={handleSaveContact} 
              onReset={handleResetContact} 
              submitting={submitting}
              isDirty={isContactDirty}
            />
          </form>
        )}

      </div>

      {/* Warning dialog blocker */}
      <UnsavedChangesDialog 
        isOpen={blocker.state === "blocked"}
        onConfirm={() => blocker.proceed()}
        onCancel={() => blocker.reset()}
      />
    </div>
  );
};

export default AdminSettingsPage;
