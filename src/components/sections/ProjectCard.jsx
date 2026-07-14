import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '../common/SpotlightCard';
import TiltCard from '../common/TiltCard';
import { ExternalLink } from 'lucide-react';

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
    <motion.article 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      onClick={() => onClick(project)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <TiltCard maxRotation={4} style={{ height: '100%' }}>
        <SpotlightCard style={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          
          {/* Cover image wrap */}
          <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
            <img 
              src={coverImgUrl} 
              alt={`${project.title} Thumbnail`} 
              loading="lazy" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="proj-card-img"
            />
            {/* Overlay glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(7, 10, 18, 0.4) 0%, transparent 100%)'
            }} />
          </div>

          {/* Details body */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.3px', margin: 0 }}>
                  {project.title}
                </h3>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent-secondary)', backgroundColor: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px' }}>
                  {project.status}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem', lineHeight: 1.5, marginBottom: '20px' }}>
                {project.summary}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
              {project.tech.slice(0, 3).map((t, idx) => (
                <span key={idx} style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', fontWeight: 700, backgroundColor: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)' }}>
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>

        </SpotlightCard>
      </TiltCard>
    </motion.article>
  );
};

export default ProjectCard;
