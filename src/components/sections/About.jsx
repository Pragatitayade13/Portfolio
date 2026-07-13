import React from 'react';
import SectionHeading from '../common/SectionHeading';
import Skills from './Skills';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <SectionHeading 
          label="Who I Am" 
          title="About Me &amp; Skills" 
          subtitle="Dedicated web developer from Akola, India, focused on solving problems with code."
        />

        <div className="about-cards-layout">
          <article className="card reveal">
            <h3>My Story</h3>
            <p className="card-paragraph">
              A motivated and detail-oriented Computer Science Engineering graduate with a strong foundation in
              programming, software development, and problem-solving. Passionate about learning emerging technologies,
              improving system security, and building efficient digital solutions.
            </p>
            <ul className="checkmark-list">
              <li><span className="checkmark-icon" aria-hidden="true">✓</span> Motivated CSE Graduate (CGPA: 8.51)</li>
              <li><span className="checkmark-icon" aria-hidden="true">✓</span> Proficient in Java, Python, C, C++ &amp; Web Technologies</li>
              <li><span className="checkmark-icon" aria-hidden="true">✓</span> Skilled in SQL Database and Cybersecurity basics</li>
              <li><span className="checkmark-icon" aria-hidden="true">✓</span> Strong analytical, communication, and teamwork skills</li>
            </ul>
          </article>

          <Skills />
        </div>
      </div>
    </section>
  );
};

export default About;
