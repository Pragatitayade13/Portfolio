import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import { 
  FileSearch, 
  Map, 
  Database, 
  Code, 
  Link, 
  CheckCircle, 
  Server, 
  TrendingUp 
} from 'lucide-react';

const DevelopmentProcess = () => {
  const steps = [
    { title: "Understand Requirements", desc: "Collaborate on specifications, identify target users, and establish technical parameters.", icon: FileSearch },
    { title: "Plan Architecture", desc: "Design system layers, select technologies, and map data transfer streams.", icon: Map },
    { title: "Design Database", desc: "Structure relational schemas, index keys, and build secure storage models.", icon: Database },
    { title: "Build Features", desc: "Develop clean frontend layouts and backend controllers with modular components.", icon: Code },
    { title: "Integrate APIs", desc: "Connect data transfer points, secure auth cookies, and test responses.", icon: Link },
    { title: "Test Codebase", desc: "Verify input bounds, run interface unit checks, and resolve layout issues.", icon: CheckCircle },
    { title: "Deploy System", desc: "Build optimized packages and deploy live builds to secure cloud hosting.", icon: Server },
    { title: "Improve Iterations", desc: "Analyze runtime performance, optimize database structures, and gather feedback.", icon: TrendingUp }
  ];

  return (
    <section id="process" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <SectionHeading 
          label="Methodology" 
          title="Development Process" 
          subtitle="An outline of how I design, develop, test, and release software applications."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginTop: '40px'
        }} className="process-grid">
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
            >
              <SpotlightCard style={{ height: '100%', padding: '24px', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  fontSize: '2rem',
                  fontWeight: 900,
                  opacity: 0.04,
                  color: 'var(--text-primary)',
                  userSelect: 'none'
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--accent-muted)',
                  color: 'var(--accent)',
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: '16px'
                }}>
                  <step.icon size={16} />
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default DevelopmentProcess;
