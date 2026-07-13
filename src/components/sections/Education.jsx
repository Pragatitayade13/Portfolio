import React from 'react';
import SectionHeading from '../common/SectionHeading';

const Education = () => {
  const educationData = [
    {
      icon: "🎓",
      date: "2022 - 2026",
      degree: "Bachelor of Engineering (CSE)",
      school: "S.G.B Amravati University",
      details: "Completed Computer Science and Engineering with a CGPA of 8.51. Developed a strong foundation in software engineering, database design, OOPs, and systems security.",
      delay: "0s"
    },
    {
      icon: "🏫",
      date: "2020 - 2022",
      degree: "Higher Secondary Certificate (HSC)",
      school: "Maharashtra State Board, Pune",
      details: "Focused on Science and Mathematics. Secured 70.83% score.",
      delay: "0.1s"
    },
    {
      icon: "✏️",
      date: "2020",
      degree: "Secondary School Certificate (SSC)",
      school: "Maharashtra State Board, Pune",
      details: "Completed secondary school education with high honors. Secured 90.60% score.",
      delay: "0.2s"
    }
  ];

  return (
    <section id="education">
      <div className="container">
        <SectionHeading 
          label="Academics" 
          title="Education" 
          subtitle="My academic background and qualifications."
        />

        <div className="education-grid">
          {educationData.map((edu, idx) => (
            <div 
              className="education-card reveal" 
              style={{ transitionDelay: edu.delay }}
              key={idx}
            >
              <div className="education-icon">{edu.icon}</div>
              <div className="education-date">{edu.date}</div>
              <h3 className="education-degree">{edu.degree}</h3>
              <div className="education-school">{edu.school}</div>
              <p className="education-details">{edu.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
