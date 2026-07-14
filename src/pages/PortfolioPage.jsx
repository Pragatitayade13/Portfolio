import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import DevelopmentProcess from '../components/sections/DevelopmentProcess';
import Education from '../components/sections/Education';
import Publications from '../components/sections/Publications';
import Certifications from '../components/sections/Certifications';
import Contact from '../components/sections/Contact';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PortfolioPage = () => {
  // Trigger reveal animations on scroll
  useScrollReveal();

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <DevelopmentProcess />
      <Education />
      <Publications />
      <Certifications />
      <Contact />
    </>
  );
};

export default PortfolioPage;
