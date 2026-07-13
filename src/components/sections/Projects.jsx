import React, { useState, useEffect, useRef } from 'react';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from './ProjectCard';
import { PROJECTS_DATA, FILTERS_DATA } from '../../data/projects';
import ExternalLink from '../common/ExternalLink';

const PROJECT_IMAGE_MAPPING = {
  portfolio: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
  todo: "https://images.unsplash.com/photo-1598791318878-10e76d178023?auto=format&fit=crop&w=800&q=80",
  hotel: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  expense: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  notvault: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80"
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);

  // Manage modal open/close effect on body overflow
  useEffect(() => {
    if (selectedProject) {
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleBackdropClick = (e) => {
    if (dialogRef.current) {
      const bounds = dialogRef.current.getBoundingClientRect();
      const clickedInside = (
        bounds.top <= e.clientY && e.clientY <= bounds.top + bounds.height &&
        bounds.left <= e.clientX && e.clientX <= bounds.left + bounds.width
      );
      if (!clickedInside) {
        handleCloseModal();
      }
    }
  };

  // Filter project cards list
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase().trim()));
    
    return matchesCategory && matchesSearch;
  });

  const modalCover = selectedProject 
    ? (PROJECT_IMAGE_MAPPING[selectedProject.icon] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80')
    : '';

  return (
    <section id="projects">
      <div className="container">
        <SectionHeading 
          label="My Projects" 
          title="Featured Work" 
          subtitle="Filter or search through my coding projects. Click cards for modal details."
        />

        <div className="showcase-toolbar reveal">
          <div className="filter-chips" role="tablist" aria-label="Project category filters">
            {FILTERS_DATA.map((category) => (
              <button 
                key={category}
                className={`filter-chip ${category === activeFilter ? 'active' : ''}`}
                role="tab"
                aria-selected={category === activeFilter ? 'true' : 'false'}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="search-box-wrapper">
            <input 
              className="search-box-input" 
              type="search" 
              placeholder="Search projects..."
              aria-label="Search projects input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="search-box-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className="projects-grid" aria-live="polite">
          {filteredProjects.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)', fontWeight: 500 }}>
              No projects match your criteria.
            </div>
          ) : (
            filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx}
                onClick={setSelectedProject}
              />
            ))
          )}
        </div>
      </div>

      {/* DYNAMIC LIGHTBOX MODAL */}
      <dialog 
        ref={dialogRef} 
        onClick={handleBackdropClick} 
        onClose={handleCloseModal}
        aria-labelledby="modalHeading"
      >
        {selectedProject && (
          <>
            <div className="modal-header">
              <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close dialog">✕</button>
            </div>
            <div className="modal-scrollable">
              <div className="modal-thumb">
                <img src={modalCover} alt={`${selectedProject.title} Detail Banner`} />
              </div>
              <div className="modal-body">
                <div className="modal-title-row">
                  <h3 className="modal-title" id="modalHeading">{selectedProject.title}</h3>
                  <p className="modal-meta">{selectedProject.category} · {selectedProject.year}</p>
                </div>
                <p className="modal-lead">{selectedProject.summary}</p>
                <p className="modal-desc">{selectedProject.details}</p>
                <div className="project-tags" style={{ marginBottom: '24px' }}>
                  {selectedProject.tech.map((t, idx) => (
                    <span className="project-tag" key={idx}>{t}</span>
                  ))}
                </div>
                <div className="modal-links">
                  <ExternalLink className="btn btn-primary" href={selectedProject.url}>
                    🚀 Live Demo
                  </ExternalLink>
                  <ExternalLink className="btn btn-secondary" href={selectedProject.repo}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Repository
                  </ExternalLink>
                </div>
              </div>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
};

export default Projects;
