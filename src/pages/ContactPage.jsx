import React from 'react';
import Contact from '../components/sections/Contact';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ContactPage = () => {
  useScrollReveal();

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <Contact />
    </div>
  );
};

export default ContactPage;
