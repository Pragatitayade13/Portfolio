import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from './ProjectCard';
import Modal from '../common/Modal';
import { PROJECTS_DATA, FILTERS_DATA } from '../../data/projects';
import { Globe, Github, Info } from 'lucide-react';

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
          label="My Portfolio" 
          title="Featured Projects" 
          subtitle="Explore case studies of full-stack systems and developer tools I have designed."
        />

        {/* Toolbar filters + searches */}
        <div className="showcase-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '32px 0 40px', flexWrap: 'wrap', gap: '20px' }}>
          <div className="filter-chips" role="tablist" aria-label="Project category filters" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {FILTERS_DATA.map((category) => (
              <button 
                key={category}
                className={`filter-chip ${category === activeFilter ? 'active' : ''}`}
                role="tab"
                aria-selected={category === activeFilter ? 'true' : 'false'}
                onClick={() => setActiveFilter(category)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '30px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: category === activeFilter ? 'var(--accent)' : 'transparent',
                  color: category === activeFilter ? '#FFF' : 'var(--text-muted)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <input 
              className="search-input-box"
              type="search" 
              placeholder="Search projects..."
              aria-label="Search projects input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 40px',
                borderRadius: '30px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem'
              }}
            />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          </div>
        </div>

        {/* Grid display with Anim Presence */}
        <motion.div 
          layout
          className="projects-grid" 
          aria-live="polite"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)', fontWeight: 500 }}
              >
                No projects match your search criteria.
              </motion.div>
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
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Details Modal */}
      <Modal 
        isOpen={selectedProject !== null} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || "Project Details"}
      >
        {selectedProject && (
          <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '240px', position: 'relative' }}>
              <img 
                src={modalCover} 
                alt={`${selectedProject.title} Cover`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 10, 18, 0.8) 0%, transparent 60%)'
              }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '20px', color: '#FFF' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: 'var(--accent)', padding: '4px 10px', borderRadius: '4px' }}>
                  {selectedProject.category}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, marginLeft: '12px' }}>
                  {selectedProject.year}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {selectedProject.summary}
            </p>

            <div style={{ display: 'grid', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              {selectedProject.problem && (
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Business Problem
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    {selectedProject.problem}
                  </p>
                </div>
              )}
              {selectedProject.solution && (
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-secondary)', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Solution Summary
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    {selectedProject.solution}
                  </p>
                </div>
              )}
              {selectedProject.contribution && (
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    My Contribution
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    {selectedProject.contribution}
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedProject.tech.map((t, idx) => (
                <span key={idx} style={{ fontFamily: 'var(--font-code)', fontSize: '0.725rem', fontWeight: 700, backgroundColor: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '0.8rem' }}>
                <Globe size={14} /> Live Demo
              </a>
              <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '0.8rem' }}>
                <Github size={14} /> Repository
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Projects;
