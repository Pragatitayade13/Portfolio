import React from 'react';
import SectionHeading from '../common/SectionHeading';

const Experience = () => {
  const experiences = [
    {
      date: "July 2025 – August 2025",
      title: "Web Development Intern",
      company: "ApexPlanet Software Pvt. Ltd.",
      desc: "Developed responsive web pages and components using HTML, CSS, and JavaScript. Tested interface layouts, optimized loading times, and gained practical web development experience.",
      techs: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    }
  ];

  return (
    <section id="experience">
      <div className="container">
        <SectionHeading 
          label="My Path" 
          title="Work Experience" 
          subtitle="A timeline of my professional developer internships and software roles."
        />

        <div className="timeline-container">
          {experiences.map((exp, idx) => (
            <div className="timeline-item reveal" key={idx}>
              <span className="timeline-dot" aria-hidden="true"></span>
              <div className="timeline-card">
                <div className="timeline-date">{exp.date}</div>
                <h3 className="timeline-title">{exp.title}</h3>
                <div className="timeline-company">{exp.company}</div>
                <p className="timeline-text">{exp.desc}</p>
                <div className="timeline-techs">
                  {exp.techs.map((tech, tIdx) => (
                    <span className="timeline-tech-tag" key={tIdx}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
