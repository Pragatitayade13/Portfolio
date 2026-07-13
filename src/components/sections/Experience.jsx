import React from 'react';
import SectionHeading from '../common/SectionHeading';

const Experience = () => {
  return (
    <section id="experience">
      <div className="container">
        <SectionHeading 
          label="My Path" 
          title="Work Experience" 
          subtitle="Summary of my professional roles and academic collaborations."
        />

        <div className="timeline-container single-item">
          <div className="timeline-item timeline-item-right reveal">
            <span className="timeline-dot" aria-hidden="true"></span>
            <div className="timeline-card">
              <div className="timeline-date">July 2025 - August 2025</div>
              <h3 class="timeline-title">Web Development Intern</h3>
              <div className="timeline-company">ApexPlanet Software Pvt. Ltd.</div>
              <p className="timeline-text">
                Developed responsive web pages and components using HTML, CSS, and JavaScript.
                Tested interface layouts, optimized loading times, and gained practical web dev experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
