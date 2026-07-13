import React from 'react';
import SectionHeading from '../common/SectionHeading';

const Skills = () => {
  const skillCategories = [
    {
      title: "Backend & Systems",
      skills: ["Java", "OOPs", "Spring Boot", "REST APIs", "C/C++", "Python"]
    },
    {
      title: "Frontend Technologies",
      skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"]
    },
    {
      title: "Database & Security",
      skills: ["MySQL Database", "SQL Design", "PostgreSQL", "CyberSecurity Basics"]
    },
    {
      title: "Tools & Workflow",
      skills: ["Git & GitHub", "Docker", "Postman API", "Maven", "VS Code", "Agile / Scrum"]
    }
  ];

  return (
    <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <SectionHeading 
          label="Capabilities" 
          title="Technical Skills" 
          subtitle="A comprehensive grid of technologies, frameworks, databases, and professional tools I work with."
        />

        <div className="skills-grid-container">
          {skillCategories.map((category, idx) => (
            <div 
              className="skill-category-card reveal" 
              style={{ transitionDelay: `${idx * 0.05}s` }}
              key={idx}
            >
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skill-badges-wrapper">
                {category.skills.map((skill, sIdx) => (
                  <span className="skill-badge" key={sIdx}>
                    <span style={{ color: 'var(--accent-secondary)' }}>#</span> {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
