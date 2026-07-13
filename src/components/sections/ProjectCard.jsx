import React from 'react';

const PROJECT_IMAGE_MAPPING = {
  portfolio: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
  todo: "https://images.unsplash.com/photo-1598791318878-10e76d178023?auto=format&fit=crop&w=800&q=80",
  hotel: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  expense: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  notvault: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80"
};

const ProjectCard = ({ project, onClick, index }) => {
  const coverImgUrl = PROJECT_IMAGE_MAPPING[project.icon] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';

  return (
    <article 
      className="project-card reveal" 
      style={{ transitionDelay: `${(index % 3) * 0.05}s` }}
      onClick={() => onClick(project)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      <div className="project-thumbnail">
        <img src={coverImgUrl} alt={`${project.title} Cover`} loading="lazy" />
        <div className="project-overlay">
          <span className="project-overlay-btn">
            View Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </span>
        </div>
      </div>
      
      <div className="project-body">
        <div className="project-header-row">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-status-tag">{project.status}</span>
        </div>
        <p className="project-summary">{project.summary}</p>
        <div className="project-tags">
          {project.tech.map((t, idx) => (
            <span className="project-tag" key={idx}>{t}</span>
          ))}
          <span className="project-tag project-tag-category">{project.category}</span>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
