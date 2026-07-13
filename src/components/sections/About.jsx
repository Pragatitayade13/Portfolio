import React from 'react';
import SectionHeading from '../common/SectionHeading';

const About = () => {
  const strengthsData = [
    {
      icon: "💻",
      title: "Full-Stack Dev",
      desc: "Creating responsive web applications with HTML, CSS, JavaScript, and React."
    },
    {
      icon: "☕",
      title: "Java Backend",
      desc: "Robust backend system architecture with Core Java and OOP principles."
    },
    {
      icon: "📊",
      title: "Database Design",
      desc: "Relational database modeling, query tuning, and tracking with MySQL."
    },
    {
      icon: "🔒",
      title: "Cyber Security",
      desc: "Solid understanding of security scanning, cryptography basics, and vulnerabilities."
    }
  ];

  return (
    <section id="about">
      <div className="container">
        <SectionHeading 
          label="Who I Am" 
          title="About Me" 
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
            
            <h3 style={{ marginTop: '28px', marginBottom: '16px' }}>What I Bring</h3>
            <ul className="checkmark-list">
              <li><span className="checkmark-icon" aria-hidden="true">✓</span> Motivated CSE Graduate (CGPA: 8.51)</li>
              <li><span className="checkmark-icon" aria-hidden="true">✓</span> Proficient in Java, Python, C, C++ &amp; Web Technologies</li>
              <li><span className="checkmark-icon" aria-hidden="true">✓</span> Skilled in SQL Database and Cybersecurity basics</li>
              <li><span className="checkmark-icon" aria-hidden="true">✓</span> Strong analytical, communication, and teamwork skills</li>
            </ul>
          </article>

          {/* Small Expertise Cards Bento Grid */}
          <aside className="reveal" style={{ transitionDelay: '0.1s' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>Key Strengths</h3>
            <div className="strengths-grid">
              {strengthsData.map((strength, idx) => (
                <div className="strength-card" key={idx}>
                  <div className="strength-icon" aria-hidden="true">{strength.icon}</div>
                  <h4 className="strength-title">{strength.title}</h4>
                  <p className="strength-desc">{strength.desc}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
