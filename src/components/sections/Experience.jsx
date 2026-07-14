import React from 'react';
import SectionHeading from '../common/SectionHeading';
import TimelineItem from '../common/TimelineItem';

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

        <div style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '40px auto 0',
          borderLeft: '2px solid var(--border-color)',
          paddingTop: '8px'
        }} className="timeline-container">
          
          {experiences.map((exp, idx) => (
            <TimelineItem 
              key={idx}
              role={exp.title}
              company={exp.company}
              date={exp.date}
              desc={exp.desc}
              techs={exp.techs}
            />
          ))}

        </div>
      </div>
    </section>
  );
};

export default Experience;
