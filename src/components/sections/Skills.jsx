import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import SkillGroup from '../common/SkillGroup';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('All');

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

  const filteredCategories = activeTab === 'All' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.title.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <SectionHeading 
          label="Capabilities" 
          title="Technical Skills" 
          subtitle="A comprehensive grid of technologies, frameworks, databases, and professional tools I work with."
        />

        {/* Tab Selection Filter */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '32px 0 40px', flexWrap: 'wrap' }}>
          {['All', 'Backend', 'Frontend', 'Database', 'Tools'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 18px',
                borderRadius: '30px',
                border: '1px solid var(--border-color)',
                backgroundColor: activeTab === tab ? 'var(--accent)' : 'var(--bg-card)',
                color: activeTab === tab ? '#FFF' : 'var(--text-muted)',
                fontSize: '0.825rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {tab === 'All' ? 'Show All' : tab}
            </button>
          ))}
        </div>

        {/* Skill Bento Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }} className="skills-grid-container">
          {filteredCategories.map((category, idx) => (
            <SkillGroup 
              key={idx}
              categoryName={category.title}
              skillsList={category.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
