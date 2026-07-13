import React, { useEffect, useState, useRef } from 'react';

const Skills = () => {
  const [animateSkills, setAnimateSkills] = useState(false);
  const skillsRef = useRef(null);

  const skillsData = [
    { name: "Java & OOPs", level: 90 },
    { name: "HTML, CSS & JS", level: 85 },
    { name: "Python & C/C++", level: 50 },
    { name: "MySQL Database", level: 70 },
    { name: "CyberSecurity & Tools", level: 50 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <aside className="card reveal" style={{ transitionDelay: '0.1s' }} ref={skillsRef}>
      <h3>Technical Skills</h3>
      <div className="skills-box" id="skillsWrapper">
        {skillsData.map((skill, idx) => (
          <div className="skill-item" key={idx}>
            <div className="skill-meta">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="skill-track">
              <div 
                className="skill-fill" 
                style={{ width: animateSkills ? `${skill.level}%` : '0%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Skills;
