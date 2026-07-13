import React, { useState, useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTextField from '../../components/admin/AdminTextField';
import AdminTextArea from '../../components/admin/AdminTextArea';
import AdminFormActions from '../../components/admin/AdminFormActions';
import UnsavedChangesDialog from '../../components/admin/UnsavedChangesDialog';
import AdminLoadingState from '../../components/admin/AdminLoadingState';
import { readDocument, createRecord, updateRecord, readCollection, updateRecord as updateColRecord } from '../../services/portfolioService';
import { logAdminAction } from '../../services/auditService';
import { useAuth } from '../../hooks/useAuth';
import { initialPortfolioData } from '../../data/initialPortfolioData';

const AdminProfilePage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  // 1. Profile & Hero Form State
  const [profileForm, setProfileForm] = useState({
    name: '',
    greeting: '',
    roles: '',
    avatarUrl: '',
    availability: '',
    coreStack: ''
  });
  const [loadedProfile, setLoadedProfile] = useState(null);

  // 2. About Form State
  const [aboutForm, setAboutForm] = useState({
    story: '',
    whatIBring: '',
    strength1Title: '', strength1Desc: '',
    strength2Title: '', strength2Desc: '',
    strength3Title: '', strength3Desc: '',
    strength4Title: '', strength4Desc: ''
  });
  const [loadedAbout, setLoadedAbout] = useState(null);

  // 3. Social Links Form State
  const [socialsForm, setSocialsForm] = useState([]);
  const [loadedSocials, setLoadedSocials] = useState([]);

  // Fetch Firestore values or fallbacks on mount
  const loadPageData = async () => {
    setLoading(true);
    setSaveSuccess('');
    setSaveError('');
    try {
      // Load Profile
      let profileDoc = await readDocument('profile', 'main');
      if (!profileDoc) {
        profileDoc = initialPortfolioData.profile;
      }
      setLoadedProfile(profileDoc);
      setProfileForm({
        name: profileDoc.name || '',
        greeting: profileDoc.greeting || '',
        roles: Array.isArray(profileDoc.roles) ? profileDoc.roles.join(', ') : profileDoc.roles || '',
        avatarUrl: profileDoc.avatarUrl || '',
        availability: profileDoc.availability || '',
        coreStack: Array.isArray(profileDoc.coreStack) ? profileDoc.coreStack.join(', ') : profileDoc.coreStack || ''
      });

      // Load About
      let aboutDoc = await readDocument('about', 'main');
      if (!aboutDoc) {
        aboutDoc = initialPortfolioData.about;
      }
      setLoadedAbout(aboutDoc);
      setAboutForm({
        story: aboutDoc.story || '',
        whatIBring: Array.isArray(aboutDoc.whatIBring) ? aboutDoc.whatIBring.join('\n') : aboutDoc.whatIBring || '',
        strength1Title: aboutDoc.strengths?.[0]?.title || '',
        strength1Desc: aboutDoc.strengths?.[0]?.desc || '',
        strength2Title: aboutDoc.strengths?.[1]?.title || '',
        strength2Desc: aboutDoc.strengths?.[1]?.desc || '',
        strength3Title: aboutDoc.strengths?.[2]?.title || '',
        strength3Desc: aboutDoc.strengths?.[2]?.desc || '',
        strength4Title: aboutDoc.strengths?.[3]?.title || '',
        strength4Desc: aboutDoc.strengths?.[3]?.desc || ''
      });

      // Load Socials
      let socialsCol = await readCollection('socialLinks');
      if (!socialsCol || socialsCol.length === 0) {
        socialsCol = initialPortfolioData.socialLinks.map(s => ({ firebaseId: `social_${s.id}`, ...s }));
      }
      setLoadedSocials(socialsCol);
      setSocialsForm(socialsCol.map(item => ({ ...item })));

    } catch (err) {
      console.error("Load failed:", err.message);
      setSaveError("Failed to load documents from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  // Dirty state checks
  const isProfileDirty = loadedProfile && (
    profileForm.name !== (loadedProfile.name || '') ||
    profileForm.greeting !== (loadedProfile.greeting || '') ||
    profileForm.roles !== (Array.isArray(loadedProfile.roles) ? loadedProfile.roles.join(', ') : loadedProfile.roles || '') ||
    profileForm.avatarUrl !== (loadedProfile.avatarUrl || '') ||
    profileForm.availability !== (loadedProfile.availability || '') ||
    profileForm.coreStack !== (Array.isArray(loadedProfile.coreStack) ? loadedProfile.coreStack.join(', ') : loadedProfile.coreStack || '')
  );

  const isAboutDirty = loadedAbout && (
    aboutForm.story !== (loadedAbout.story || '') ||
    aboutForm.whatIBring !== (Array.isArray(loadedAbout.whatIBring) ? loadedAbout.whatIBring.join('\n') : loadedAbout.whatIBring || '') ||
    aboutForm.strength1Title !== (loadedAbout.strengths?.[0]?.title || '') ||
    aboutForm.strength1Desc !== (loadedAbout.strengths?.[0]?.desc || '') ||
    aboutForm.strength2Title !== (loadedAbout.strengths?.[1]?.title || '') ||
    aboutForm.strength2Desc !== (loadedAbout.strengths?.[1]?.desc || '') ||
    aboutForm.strength3Title !== (loadedAbout.strengths?.[2]?.title || '') ||
    aboutForm.strength3Desc !== (loadedAbout.strengths?.[2]?.desc || '') ||
    aboutForm.strength4Title !== (loadedAbout.strengths?.[3]?.title || '') ||
    aboutForm.strength4Desc !== (loadedAbout.strengths?.[3]?.desc || '')
  );

  const isSocialsDirty = JSON.stringify(socialsForm) !== JSON.stringify(loadedSocials);
  const isAnyDirty = isProfileDirty || isAboutDirty || isSocialsDirty;

  // React Router Blocker trigger for unsaved edits warning
  const blocker = useBlocker(
    ({ currentValue, nextValue }) =>
      isAnyDirty && currentValue.pathname !== nextValue.pathname
  );

  const handleProfileChange = (field, val) => {
    setProfileForm(prev => ({ ...prev, [field]: val }));
  };

  const handleAboutChange = (field, val) => {
    setAboutForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSocialsChange = (index, field, val) => {
    const updated = [...socialsForm];
    updated[index][field] = val;
    setSocialsForm(updated);
  };

  const handleSaveProfile = async () => {
    if (!profileForm.name.trim() || !profileForm.greeting.trim()) {
      setSaveError("Name and greeting are required fields.");
      return;
    }

    setSubmitting(true);
    setSaveSuccess('');
    setSaveError('');
    try {
      const payload = {
        name: profileForm.name.trim(),
        greeting: profileForm.greeting.trim(),
        roles: profileForm.roles.split(',').map(r => r.trim()).filter(Boolean),
        avatarUrl: profileForm.avatarUrl.trim(),
        availability: profileForm.availability.trim(),
        coreStack: profileForm.coreStack.split(',').map(c => c.trim()).filter(Boolean),
        stats: loadedProfile?.stats || initialPortfolioData.profile.stats
      };

      await updateRecord('profile', 'main', payload);
      await logAdminAction('update_profile', 'Updated profile metadata fields', currentUser?.email);
      setSaveSuccess('Profile changes saved successfully!');
      
      // Update loaded values
      setLoadedProfile({ ...loadedProfile, ...payload });
    } catch (err) {
      setSaveError(`Save failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveAbout = async () => {
    if (!aboutForm.story.trim()) {
      setSaveError("Story paragraph is a required field.");
      return;
    }

    setSubmitting(true);
    setSaveSuccess('');
    setSaveError('');
    try {
      const payload = {
        story: aboutForm.story.trim(),
        whatIBring: aboutForm.whatIBring.split('\n').map(l => l.trim()).filter(Boolean),
        strengths: [
          { icon: '💻', title: aboutForm.strength1Title.trim(), desc: aboutForm.strength1Desc.trim() },
          { icon: '☕', title: aboutForm.strength2Title.trim(), desc: aboutForm.strength2Desc.trim() },
          { icon: '📊', title: aboutForm.strength3Title.trim(), desc: aboutForm.strength3Desc.trim() },
          { icon: '🔒', title: aboutForm.strength4Title.trim(), desc: aboutForm.strength4Desc.trim() }
        ]
      };

      await updateRecord('about', 'main', payload);
      await logAdminAction('update_about', 'Updated about stories and strengths layout', currentUser?.email);
      setSaveSuccess('About me section saved successfully!');
      
      setLoadedAbout({ ...loadedAbout, ...payload });
    } catch (err) {
      setSaveError(`Save failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveSocials = async () => {
    // Validate URLs
    for (const item of socialsForm) {
      if (item.url && !item.url.startsWith('http://') && !item.url.startsWith('https://') && !item.url.startsWith('mailto:')) {
        setSaveError(`Invalid URL format: '${item.url}'. Must start with http://, https://, or mailto:`);
        return;
      }
    }

    setSubmitting(true);
    setSaveSuccess('');
    setSaveError('');
    try {
      for (const item of socialsForm) {
        const docPayload = {
          name: item.name,
          url: item.url,
          icon: item.icon,
          published: item.published ?? true,
          sortOrder: item.sortOrder ?? 0
        };
        await updateColRecord('socialLinks', item.firebaseId, docPayload);
      }
      await logAdminAction('update_social_links', 'Updated social link channels URLs', currentUser?.email);
      setSaveSuccess('Social Links updated successfully!');
      
      setLoadedSocials(socialsForm.map(s => ({ ...s })));
    } catch (err) {
      setSaveError(`Save failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetProfile = () => {
    if (!loadedProfile) return;
    setProfileForm({
      name: loadedProfile.name || '',
      greeting: loadedProfile.greeting || '',
      roles: Array.isArray(loadedProfile.roles) ? loadedProfile.roles.join(', ') : loadedProfile.roles || '',
      avatarUrl: loadedProfile.avatarUrl || '',
      availability: loadedProfile.availability || '',
      coreStack: Array.isArray(loadedProfile.coreStack) ? loadedProfile.coreStack.join(', ') : loadedProfile.coreStack || ''
    });
  };

  const handleResetAbout = () => {
    if (!loadedAbout) return;
    setAboutForm({
      story: loadedAbout.story || '',
      whatIBring: Array.isArray(loadedAbout.whatIBring) ? loadedAbout.whatIBring.join('\n') : loadedAbout.whatIBring || '',
      strength1Title: loadedAbout.strengths?.[0]?.title || '',
      strength1Desc: loadedAbout.strengths?.[0]?.desc || '',
      strength2Title: loadedAbout.strengths?.[1]?.title || '',
      strength2Desc: loadedAbout.strengths?.[1]?.desc || '',
      strength3Title: loadedAbout.strengths?.[2]?.title || '',
      strength3Desc: loadedAbout.strengths?.[2]?.desc || '',
      strength4Title: loadedAbout.strengths?.[3]?.title || '',
      strength4Desc: loadedAbout.strengths?.[3]?.desc || ''
    });
  };

  const handleResetSocials = () => {
    setSocialsForm(loadedSocials.map(s => ({ ...s })));
  };

  if (loading) {
    return <AdminLoadingState message="Fetching content collections from Firestore..." />;
  }

  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <AdminPageHeader 
        title="Edit Portfolio Profile" 
        description="Update your primary bio parameters, hero descriptions, about stories, and social links."
      >
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          👁️ Preview Live Site
        </a>
      </AdminPageHeader>

      {/* Tabs Row */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        gap: '24px',
        marginBottom: '8px'
      }}>
        {['profile', 'about', 'socials'].map((tab) => (
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
            {tab === 'socials' ? 'Social Links' : tab === 'profile' ? 'Profile & Hero' : 'About Me'}
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
        
        {activeTab === 'profile' && (
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="form-row-2">
              <AdminTextField 
                label="Full Name" 
                id="profileName" 
                value={profileForm.name} 
                onChange={(e) => handleProfileChange('name', e.target.value)} 
                required 
                disabled={submitting}
              />
              <AdminTextField 
                label="Greeting Prefix" 
                id="profileGreeting" 
                value={profileForm.greeting} 
                onChange={(e) => handleProfileChange('greeting', e.target.value)} 
                required 
                disabled={submitting}
              />
            </div>
            
            <AdminTextField 
              label="Carousel Roles (separated by comma)" 
              id="profileRoles" 
              value={profileForm.roles} 
              onChange={(e) => handleProfileChange('roles', e.target.value)} 
              placeholder="Java Developer, CSE Graduate"
              disabled={submitting}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="form-row-2">
              <AdminTextField 
                label="Availability Status" 
                id="profileAvail" 
                value={profileForm.availability} 
                onChange={(e) => handleProfileChange('availability', e.target.value)} 
                disabled={submitting}
              />
              <AdminTextField 
                label="Avatar Image Path / URL" 
                id="profileAvatar" 
                value={profileForm.avatarUrl} 
                onChange={(e) => handleProfileChange('avatarUrl', e.target.value)} 
                disabled={submitting}
              />
            </div>

            <AdminTextField 
              label="Core Highlight Tags (separated by comma)" 
              id="profileCoreStack" 
              value={profileForm.coreStack} 
              onChange={(e) => handleProfileChange('coreStack', e.target.value)} 
              placeholder="Java, Spring Boot, SQL"
              disabled={submitting}
            />

            <AdminFormActions 
              onSave={handleSaveProfile} 
              onReset={handleResetProfile} 
              submitting={submitting}
              isDirty={isProfileDirty}
            />
          </form>
        )}

        {activeTab === 'about' && (
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '24px' }}>
            <AdminTextArea 
              label="My Story / Biography Paragraph" 
              id="aboutStory" 
              value={aboutForm.story} 
              onChange={(e) => handleAboutChange('story', e.target.value)} 
              required
              rows={6}
              disabled={submitting}
            />

            <AdminTextArea 
              label="What I Bring Points (one bullet point per line)" 
              id="aboutBullets" 
              value={aboutForm.whatIBring} 
              onChange={(e) => handleAboutChange('whatIBring', e.target.value)} 
              rows={4}
              disabled={submitting}
            />

            {/* Strengths Edit Grid */}
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Key Strengths Bento Cards
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="form-row-2">
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <AdminTextField label="Strength 1 (💻): Title" id="s1Title" value={aboutForm.strength1Title} onChange={(e) => handleAboutChange('strength1Title', e.target.value)} disabled={submitting} />
                  <AdminTextField label="Strength 1: Description" id="s1Desc" value={aboutForm.strength1Desc} onChange={(e) => handleAboutChange('strength1Desc', e.target.value)} disabled={submitting} />
                </div>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <AdminTextField label="Strength 2 (☕): Title" id="s2Title" value={aboutForm.strength2Title} onChange={(e) => handleAboutChange('strength2Title', e.target.value)} disabled={submitting} />
                  <AdminTextField label="Strength 2: Description" id="s2Desc" value={aboutForm.strength2Desc} onChange={(e) => handleAboutChange('strength2Desc', e.target.value)} disabled={submitting} />
                </div>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <AdminTextField label="Strength 3 (📊): Title" id="s3Title" value={aboutForm.strength3Title} onChange={(e) => handleAboutChange('strength3Title', e.target.value)} disabled={submitting} />
                  <AdminTextField label="Strength 3: Description" id="s3Desc" value={aboutForm.strength3Desc} onChange={(e) => handleAboutChange('strength3Desc', e.target.value)} disabled={submitting} />
                </div>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <AdminTextField label="Strength 4 (🔒): Title" id="s4Title" value={aboutForm.strength4Title} onChange={(e) => handleAboutChange('strength4Title', e.target.value)} disabled={submitting} />
                  <AdminTextField label="Strength 4: Description" id="s4Desc" value={aboutForm.strength4Desc} onChange={(e) => handleAboutChange('strength4Desc', e.target.value)} disabled={submitting} />
                </div>
              </div>
            </div>

            <AdminFormActions 
              onSave={handleSaveAbout} 
              onReset={handleResetAbout} 
              submitting={submitting}
              isDirty={isAboutDirty}
            />
          </form>
        )}

        {activeTab === 'socials' && (
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '20px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configure URL redirects for your social channels.</p>
            <div style={{ display: 'grid', gap: '16px' }}>
              {socialsForm.map((item, idx) => (
                <div 
                  key={item.firebaseId} 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 2fr 0.8fr',
                    gap: '20px',
                    alignItems: 'center',
                    padding: '16px',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)'
                  }}
                  className="socials-edit-row"
                >
                  <strong style={{ fontSize: '0.9rem' }}>{item.name}</strong>
                  <input 
                    className="form-input"
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => handleSocialsChange(idx, 'url', e.target.value)}
                    placeholder="https://example.com"
                    disabled={submitting}
                  />
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="checkbox" 
                      id={`social_pub_${idx}`} 
                      checked={!!item.published}
                      onChange={(e) => handleSocialsChange(idx, 'published', e.target.checked)}
                      disabled={submitting}
                    />
                    <label htmlFor={`social_pub_${idx}`} style={{ fontSize: '0.75rem', cursor: 'pointer', marginBottom: 0 }}>
                      Visible
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <AdminFormActions 
              onSave={handleSaveSocials} 
              onReset={handleResetSocials} 
              submitting={submitting}
              isDirty={isSocialsDirty}
            />
          </form>
        )}

      </div>

      {/* Unsaved Changes Blocker Warn Modal */}
      <UnsavedChangesDialog 
        isOpen={blocker.state === "blocked"}
        onConfirm={() => blocker.proceed()}
        onCancel={() => blocker.reset()}
      />
    </div>
  );
};

export default AdminProfilePage;
