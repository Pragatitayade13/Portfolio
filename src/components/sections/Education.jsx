import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import { GraduationCap, School, BookOpen } from 'lucide-react';

const Education = () => {
  const educationData = [
    {
      icon: GraduationCap,
      date: "2022 - 2026",
      degree: "Bachelor of Engineering (CSE)",
      school: "S.G.B Amravati University",
      details: "Completed Computer Science and Engineering with a CGPA of 8.51. Developed a strong foundation in software engineering, database design, OOPs, and systems security."
    },
    {
      icon: School,
      date: "2020 - 2022",
      degree: "Higher Secondary Certificate (HSC)",
      school: "Maharashtra State Board, Pune",
      details: "Focused on Science and Mathematics. Secured 70.83% score."
    },
    {
      icon: BookOpen,
      date: "2020",
      degree: "Secondary School Certificate (SSC)",
      school: "Maharashtra State Board, Pune",
      details: "Completed secondary school education with high honors. Secured 90.60% score."
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '40px'
        }} className="education-grid">
          
          {educationData.map((edu, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <SpotlightCard style={{ height: '100%', padding: '28px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent-muted)',
                  color: 'var(--accent)',
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: '20px'
                }}>
                  <edu.icon size={20} />
                </div>
                
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-code)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {edu.date}
                </span>

                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  marginTop: '8px',
                  letterSpacing: '-0.3px'
                }}>
                  {edu.degree}
                </h3>
                
                <p style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginTop: '2px',
                  marginBottom: '12px'
                }}>
                  {edu.school}
                </p>

                <p style={{
                  fontSize: '0.825rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.5
                }}>
                  {edu.details}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Education;
