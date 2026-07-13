import React, { useState, useEffect } from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTextField from '../../components/admin/AdminTextField';
import AdminTextArea from '../../components/admin/AdminTextArea';
import AdminSelect from '../../components/admin/AdminSelect';
import AdminToggle from '../../components/admin/AdminToggle';
import AdminFormActions from '../../components/admin/AdminFormActions';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import UnsavedChangesDialog from '../../components/admin/UnsavedChangesDialog';
import AdminLoadingState from '../../components/admin/AdminLoadingState';
import AdminEmptyState from '../../components/admin/AdminEmptyState';
import AdminErrorState from '../../components/admin/AdminErrorState';
import { 
  readCollection, 
  createRecord, 
  updateRecord, 
  deleteRecord, 
  validateProjectSlug 
} from '../../services/portfolioService';
import { logAdminAction } from '../../services/auditService';
import { useAuth } from '../../hooks/useAuth';
import { Plus, Edit2, Trash2, ExternalLink, GitBranch, Award, Check } from 'lucide-react';

const AdminProjectsPage = () => {
  const { currentUser } = useAuth();
  
  // States
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Modals / Dialogs controllers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // null means "Create" mode
  const [deleteTarget, setDeleteTarget] = useState(null); // project object to delete
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState(false);

  // Form Fields
  const [formState, setFormState] = useState({
    title: '',
    slug: '',
    category: '',
    year: '',
    status: 'Completed',
    tech: '',
    summary: '',
    details: '',
    problem: '',
    solution: '',
    contribution: '',
    url: '',
    repo: '',
    icon: 'code',
    published: true,
    featured: false,
    sortOrder: 0
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch projects list
  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await readCollection('projects', 'sortOrder');
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve projects from Firestore.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Form dirtiness checker
  const isFormDirty = () => {
    if (editingProject) {
      const originalTech = Array.isArray(editingProject.tech) ? editingProject.tech.join(', ') : editingProject.tech || '';
      return (
        formState.title !== (editingProject.title || '') ||
        formState.slug !== (editingProject.slug || '') ||
        formState.category !== (editingProject.category || '') ||
        formState.year !== String(editingProject.year || '') ||
        formState.status !== (editingProject.status || 'Completed') ||
        formState.tech !== originalTech ||
        formState.summary !== (editingProject.summary || '') ||
        formState.details !== (editingProject.details || '') ||
        formState.problem !== (editingProject.problem || '') ||
        formState.solution !== (editingProject.solution || '') ||
        formState.contribution !== (editingProject.contribution || '') ||
        formState.url !== (editingProject.url || '') ||
        formState.repo !== (editingProject.repo || '') ||
        formState.icon !== (editingProject.icon || 'code') ||
        formState.published !== (editingProject.published ?? true) ||
        formState.featured !== (editingProject.featured ?? false) ||
        Number(formState.sortOrder) !== (editingProject.sortOrder ?? 0)
      );
    } else {
      return (
        formState.title !== '' ||
        formState.slug !== '' ||
        formState.category !== '' ||
        formState.year !== '' ||
        formState.tech !== '' ||
        formState.summary !== '' ||
        formState.details !== '' ||
        formState.problem !== '' ||
        formState.solution !== '' ||
        formState.contribution !== '' ||
        formState.url !== '' ||
        formState.repo !== '' ||
        formState.featured !== false
      );
    }
  };

  // Open Form Modal
  const openFormModal = (project = null) => {
    setSuccessMsg('');
    setErrorMsg('');
    setFormErrors({});
    if (project) {
      setEditingProject(project);
      setFormState({
        title: project.title || '',
        slug: project.slug || '',
        category: project.category || '',
        year: String(project.year || ''),
        status: project.status || 'Completed',
        tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech || '',
        summary: project.summary || '',
        details: project.details || '',
        problem: project.problem || '',
        solution: project.solution || '',
        contribution: project.contribution || '',
        url: project.url || '',
        repo: project.repo || '',
        icon: project.icon || 'code',
        published: project.published ?? true,
        featured: project.featured ?? false,
        sortOrder: project.sortOrder ?? 0
      });
    } else {
      setEditingProject(null);
      setFormState({
        title: '',
        slug: '',
        category: '',
        year: String(new Date().getFullYear()),
        status: 'Completed',
        tech: '',
        summary: '',
        details: '',
        problem: '',
        solution: '',
        contribution: '',
        url: '',
        repo: '',
        icon: 'code',
        published: true,
        featured: false,
        sortOrder: projects.length // Default to end of list
      });
    }
    setIsModalOpen(true);
  };

  // Close Form Modal with dirty confirmation check
  const closeFormModal = (force = false) => {
    if (!force && isFormDirty()) {
      setShowUnsavedPrompt(true);
    } else {
      setIsModalOpen(false);
      setEditingProject(null);
      setShowUnsavedPrompt(false);
    }
  };

  // Field change binder
  const handleChange = (field, val) => {
    setFormState(prev => ({ ...prev, [field]: val }));
    // Auto-generate slug from title on creation
    if (field === 'title' && !editingProject) {
      const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormState(prev => ({ ...prev, title: val, slug: generatedSlug }));
    }
  };

  // Save changes handler
  const handleSaveProject = async () => {
    setFormErrors({});
    setErrorMsg('');
    setSuccessMsg('');

    // Input Validation
    const errors = {};
    if (!formState.title.trim()) errors.title = "Title is required";
    if (!formState.slug.trim()) {
      errors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formState.slug)) {
      errors.slug = "Slug must contain only lowercase letters, numbers, and hyphens";
    }
    if (!formState.category.trim()) errors.category = "Category is required";
    if (!formState.year.trim()) errors.year = "Year is required";
    if (!formState.problem.trim()) errors.problem = "Business problem description is required";
    if (!formState.solution.trim()) errors.solution = "Solution summary is required";
    if (!formState.contribution.trim()) errors.contribution = "Contribution description is required";

    // URLs validation
    const urlPattern = /^https?:\/\/.+/;
    if (formState.url && !urlPattern.test(formState.url)) {
      errors.url = "Link must start with http:// or https://";
    }
    if (formState.repo && !urlPattern.test(formState.repo)) {
      errors.repo = "Link must start with http:// or https://";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setErrorMsg("Please resolve form validation errors before saving.");
      return;
    }

    setSubmitting(true);
    try {
      const isNew = !editingProject;
      const targetDocId = isNew ? `project_${Date.now()}` : editingProject.firebaseId;

      // Unique slug check
      const slugCheck = await validateProjectSlug(formState.slug.trim(), targetDocId);
      if (!slugCheck.isValid) {
        setFormErrors({ slug: slugCheck.error });
        setErrorMsg(slugCheck.error);
        setSubmitting(false);
        return;
      }

      const payload = {
        id: isNew ? Date.now() : editingProject.id,
        title: formState.title.trim(),
        slug: formState.slug.trim(),
        category: formState.category.trim(),
        year: Number(formState.year) || new Date().getFullYear(),
        status: formState.status,
        tech: formState.tech.split(',').map(t => t.trim()).filter(Boolean),
        summary: formState.summary.trim(),
        details: formState.details.trim(),
        problem: formState.problem.trim(),
        solution: formState.solution.trim(),
        contribution: formState.contribution.trim(),
        url: formState.url.trim(),
        repo: formState.repo.trim(),
        icon: formState.icon,
        published: formState.published,
        featured: formState.featured,
        sortOrder: Number(formState.sortOrder) || 0
      };

      if (isNew) {
        await createRecord('projects', payload, targetDocId);
        await logAdminAction('create_project', `Created project record '${payload.title}'`, currentUser?.email);
      } else {
        await updateRecord('projects', targetDocId, payload);
        await logAdminAction('update_project', `Modified project details for '${payload.title}'`, currentUser?.email);
      }

      setSuccessMsg(`Project '${payload.title}' saved successfully!`);
      closeFormModal(true);
      fetchProjects();
    } catch (err) {
      console.error(err);
      setErrorMsg(`Operation failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Inline Toggles for Published/Featured
  const handleToggleState = async (project, field) => {
    try {
      const updatedVal = !project[field];
      const payload = {
        ...project,
        [field]: updatedVal
      };
      // remove metadata ID and firebaseId from doc writes payload
      delete payload.firebaseId;

      await updateRecord('projects', project.firebaseId, payload);
      
      const actionName = field === 'published' ? 'toggle_project_publish' : 'toggle_project_featured';
      const actionDesc = `Toggled ${field} state to ${updatedVal} on project '${project.title}'`;
      await logAdminAction(actionName, actionDesc, currentUser?.email);

      // Update state local cache directly for snappy UI
      setProjects(prev => prev.map(p => p.firebaseId === project.firebaseId ? { ...p, [field]: updatedVal } : p));
    } catch (err) {
      alert(`Toggle failed: ${err.message}`);
    }
  };

  // Confirm delete execution
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      await deleteRecord('projects', deleteTarget.firebaseId);
      await logAdminAction('delete_project', `Deleted project record '${deleteTarget.title}'`, currentUser?.email);
      
      setProjects(prev => prev.filter(p => p.firebaseId !== deleteTarget.firebaseId));
      setDeleteTarget(null);
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  if (loading) {
    return <AdminLoadingState message="Fetching project portfolio records from Firestore..." />;
  }

  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      
      <AdminPageHeader 
        title="Manage Projects" 
        description="Add, update details, or toggle visibility states for featured project case studies."
      >
        <button className="btn btn-primary" onClick={() => openFormModal(null)}>
          <Plus size={16} /> Add Project
        </button>
      </AdminPageHeader>

      {/* Main List Box */}
      {projects.length === 0 ? (
        <AdminEmptyState 
          title="No projects found" 
          description="Your projects collection is empty. Click below to add your first featured case study."
          actionLabel="Add New Project"
          onAction={() => openFormModal(null)}
        />
      ) : (
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '14px 12px' }}>Sort Order</th>
                  <th style={{ padding: '14px 12px' }}>Title</th>
                  <th style={{ padding: '14px 12px' }}>Category</th>
                  <th style={{ padding: '14px 12px' }}>Year</th>
                  <th style={{ padding: '14px 12px', textAlign: 'center' }}>Featured</th>
                  <th style={{ padding: '14px 12px', textAlign: 'center' }}>Published</th>
                  <th style={{ padding: '14px 12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj, idx) => (
                  <tr key={proj.firebaseId} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '14px 12px', fontWeight: 700, color: 'var(--accent)' }}>{proj.sortOrder}</td>
                    <td style={{ padding: '14px 12px', fontWeight: 600 }}>{proj.title}</td>
                    <td style={{ padding: '14px 12px' }}>{proj.category}</td>
                    <td style={{ padding: '14px 12px' }}>{proj.year}</td>
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleToggleState(proj, 'featured')}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: proj.featured ? 'var(--warning)' : 'var(--text-muted)',
                          padding: '6px'
                        }}
                        aria-label="Toggle Featured status"
                      >
                        {proj.featured ? <Award size={18} fill="currentColor" /> : <Award size={18} />}
                      </button>
                    </td>
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleToggleState(proj, 'published')}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: proj.published ? 'var(--success)' : 'var(--text-muted)',
                          padding: '6px'
                        }}
                        aria-label="Toggle Publish status"
                      >
                        {proj.published ? <Check size={18} style={{ strokeWidth: 3 }} /> : <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>○</span>}
                      </button>
                    </td>
                    <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-secondary" 
                          onClick={() => openFormModal(proj)}
                          style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                          aria-label="Edit project"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          onClick={() => setDeleteTarget(proj)}
                          style={{ padding: '6px 10px', fontSize: '0.75rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                          aria-label="Delete project"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT DIALOG FORM MODAL */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 250,
          display: 'grid',
          placeItems: 'center',
          backgroundColor: 'rgba(8, 11, 18, 0.85)',
          backdropFilter: 'blur(6px)',
          padding: '24px',
          overflowY: 'auto'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-xl)',
            padding: 0
          }}>
            
            {/* Modal Header */}
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {editingProject ? 'Edit Featured Project' : 'Add New Case Study'}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Provide implementation specifics, outcomes, and git references.
                </p>
              </div>
              <button 
                onClick={() => closeFormModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '8px'
                }}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Scroll Body */}
            <div style={{ padding: '32px', overflowY: 'auto', flexGrow: 1, display: 'grid', gap: '20px' }}>
              
              {errorMsg && (
                <div style={{ padding: '10px 14px', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 600 }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="form-row-2">
                <AdminTextField 
                  label="Project Title" id="projTitle" value={formState.title} 
                  onChange={(e) => handleChange('title', e.target.value)} required disabled={submitting} 
                  error={formErrors.title}
                />
                <AdminTextField 
                  label="URL Slug (Unique)" id="projSlug" value={formState.slug} 
                  onChange={(e) => handleChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'))} required disabled={submitting} 
                  error={formErrors.slug}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '20px' }} className="skills-grid-container">
                <AdminTextField 
                  label="Category" id="projCat" value={formState.category} 
                  onChange={(e) => handleChange('category', e.target.value)} required disabled={submitting} 
                  error={formErrors.category}
                />
                <AdminTextField 
                  label="Year" id="projYear" value={formState.year} 
                  onChange={(e) => handleChange('year', e.target.value.replace(/[^0-9]/g, ''))} required disabled={submitting} 
                  error={formErrors.year}
                />
                <AdminSelect 
                  label="Status" id="projStatus" value={formState.status} 
                  onChange={(e) => handleChange('status', e.target.value)} 
                  options={[
                    { value: 'Completed', label: 'Completed' },
                    { value: 'Prototype', label: 'Prototype' },
                    { value: 'In Development', label: 'In Development' }
                  ]}
                  disabled={submitting}
                />
              </div>

              <AdminTextField 
                label="Tech Stack Tags (separated by comma)" id="projTech" value={formState.tech} 
                onChange={(e) => handleChange('tech', e.target.value)} 
                placeholder="React.js, Java, Spring Boot, MySQL"
                disabled={submitting}
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="form-row-2">
                <AdminTextField 
                  label="GitHub Repository Link" id="projRepo" value={formState.repo} 
                  onChange={(e) => handleChange('repo', e.target.value)} placeholder="https://github.com/..." 
                  disabled={submitting} error={formErrors.repo}
                />
                <AdminTextField 
                  label="Live Demo Link" id="projUrl" value={formState.url} 
                  onChange={(e) => handleChange('url', e.target.value)} placeholder="https://..." 
                  disabled={submitting} error={formErrors.url}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="skills-grid-container">
                <AdminTextField 
                  label="Display Icon ID" id="projIcon" value={formState.icon} 
                  onChange={(e) => handleChange('icon', e.target.value)} placeholder="code, hotel, portfolio" 
                  disabled={submitting}
                />
                <div style={{ marginTop: '28px' }}>
                  <AdminToggle 
                    label="Published visible" id="projPub" checked={formState.published} 
                    onChange={(e) => handleChange('published', e.target.checked)} disabled={submitting} 
                  />
                </div>
                <div style={{ marginTop: '28px' }}>
                  <AdminToggle 
                    label="Featured showcase" id="projFeatured" checked={formState.featured} 
                    onChange={(e) => handleChange('featured', e.target.checked)} disabled={submitting} 
                  />
                </div>
              </div>

              <AdminTextField 
                label="Sort Order Index" id="projSort" type="number" value={formState.sortOrder} 
                onChange={(e) => handleChange('sortOrder', e.target.value)} disabled={submitting} 
              />

              <AdminTextArea 
                label="Summary Pitch" id="projSummary" value={formState.summary} 
                onChange={(e) => handleChange('summary', e.target.value)} rows={2} disabled={submitting} 
              />

              <AdminTextArea 
                label="Full Case Study Details" id="projDetails" value={formState.details} 
                onChange={(e) => handleChange('details', e.target.value)} rows={4} disabled={submitting} 
              />

              <AdminTextArea 
                label="The Business Problem" id="projProblem" value={formState.problem} 
                onChange={(e) => handleChange('problem', e.target.value)} rows={3} required disabled={submitting} 
                error={formErrors.problem}
              />

              <AdminTextArea 
                label="The Implemented Solution" id="projSolution" value={formState.solution} 
                onChange={(e) => handleChange('solution', e.target.value)} rows={3} required disabled={submitting} 
                error={formErrors.solution}
              />

              <AdminTextArea 
                label="My Contribution" id="projContribution" value={formState.contribution} 
                onChange={(e) => handleChange('contribution', e.target.value)} rows={3} required disabled={submitting} 
                error={formErrors.contribution}
              />

            </div>

            {/* Modal Action Row */}
            <div style={{
              padding: '20px 32px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => closeFormModal(false)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleSaveProject}
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Save Project'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog 
        isOpen={deleteTarget !== null}
        title="Delete Featured Project"
        message={`Are you sure you want to permanently delete '${deleteTarget?.title}'? This action cannot be undone.`}
        confirmLabel="Yes, Delete Project"
        cancelLabel="Keep Project"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        destructive
      />

      {/* UNSAVED CHANGES INNER MODAL */}
      <UnsavedChangesDialog 
        isOpen={showUnsavedPrompt}
        onConfirm={() => {
          setShowUnsavedPrompt(false);
          closeFormModal(true);
        }}
        onCancel={() => setShowUnsavedPrompt(false)}
      />

    </div>
  );
};

export default AdminProjectsPage;
