import React from 'react';
import Projects from '../components/sections/Projects';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ProjectsPage = () => {
  useScrollReveal();

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <Projects />
    </div>
  );
};

export default ProjectsPage;
