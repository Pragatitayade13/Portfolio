import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Education from '../components/sections/Education';
import Certifications from '../components/sections/Certifications';
import Publications from '../components/sections/Publications';
import Contact from '../components/sections/Contact';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PortfolioPage = () => {
  // Trigger reveal animations on scroll
  useScrollReveal();

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Publications />
      <Contact />
    </>
  );
};

export default PortfolioPage;
