import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import TiltCard from '../common/TiltCard';
import { CheckCircle2, Award, Target, HelpCircle, Code2, Heart } from 'lucide-react';

const About = () => {
  const strengthsData = [
    {
      icon: Code2,
      title: "Full-Stack Dev",
      desc: "Creating responsive web applications with HTML, CSS, JavaScript, and React."
    },
    {
      icon: Target,
      title: "Java Backend",
      desc: "Robust backend system architecture with Core Java and OOP principles."
    },
    {
      icon: Award,
      title: "Database Design",
      desc: "Relational database modeling, query tuning, and tracking with MySQL."
    },
    {
      icon: HelpCircle,
      title: "Cyber Security",
      desc: "Solid understanding of security scanning, cryptography basics, and vulnerabilities."
    }
  ];

  const checkmarks = [
    "Motivated CSE Graduate (CGPA: 8.51)",
    "Proficient in Java, Python, C, C++ & Web Technologies",
    "Skilled in SQL Database and Cybersecurity basics",
    "Strong analytical, communication, and teamwork skills"
  ];

  return (
    <section id="about" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeading 
          label="Who I Am" 
          title="About Me" 
          subtitle="Dedicated web developer from Akola, India, focused on solving problems with code."
        />

        {/* Bento Grid Layout Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginTop: '40px'
        }} className="about-bento-grid">
          
          {/* Card 1: My Story (Left, Spans 2 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ gridColumn: 'span 2' }}
            className="bento-span-2"
          >
            <SpotlightCard style={{ height: '100%', padding: '36px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
                My Story
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '24px' }}>
                A motivated and detail-oriented Computer Science Engineering graduate with a strong foundation in programming, software development, and problem-solving. Passionate about learning emerging technologies, improving system security, and building efficient digital solutions.
              </p>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
                What I Bring
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {checkmarks.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-secondary)', marginTop: '4px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{point}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 2: Interactive strengths preview card (Right, Spans 1 column) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bento-span-1"
          >
            <TiltCard maxRotation={6} style={{ height: '100%' }}>
              <SpotlightCard style={{ height: '100%', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
                    Core Strengths
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {strengthsData.map((s, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--accent)',
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0
                        }}>
                          <s.icon size={16} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.title}</h4>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
