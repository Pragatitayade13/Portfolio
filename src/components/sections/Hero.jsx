import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import avatarImg from '../../assets/images/pragati.png';
import resumePdf from '../../assets/documents/Pragati_Tayade_Resume.pdf';
import SocialLinks from '../common/SocialLinks';
import DocumentLink from '../common/DocumentLink';
import MagneticButton from '../common/MagneticButton';
import AnimatedText from '../common/AnimatedText';
import { 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  FileDown, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Database, 
  Monitor, 
  Settings 
} from 'lucide-react';

// Lazy load Three Canvas component to optimize performance
const HeroCanvas = React.lazy(() => import('../three/HeroCanvas'));

const Hero = () => {
  const rolesList = [
    "Java Full-Stack Developer",
    "CSE Graduate",
    "Web Application Creator",
    "Problem Solver & Coder"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [animateClass, setAnimateClass] = useState('');
  const [projectCount, setProjectCount] = useState(0);
  const statsSectionRef = useRef(null);

  // Responsive and motion preference checks
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 820px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setIsMobile(mobileQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const handleMobileChange = (e) => setIsMobile(e.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);

    mobileQuery.addEventListener('change', handleMobileChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Role rotator cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateClass('slide-out');
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % rolesList.length);
        setAnimateClass('slide-in');
        setTimeout(() => {
          setAnimateClass('');
        }, 300);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Stats number counting animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = 3;
          const duration = 1000;
          const startTime = performance.now();

          const animate = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(1, elapsed / duration);
            const eased = progress * (2 - progress);
            const current = Math.floor(eased * end);
            setProjectCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => {
      if (statsSectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Recruiter Value Strip Item Map
  const valueStripItems = [
    { label: "Full-Stack Development", icon: Cpu },
    { label: "Responsive UI", icon: Monitor },
    { label: "REST API Integration", icon: Layers },
    { label: "Role-Based Systems", icon: ShieldCheck },
    { label: "Database Design", icon: Database },
    { label: "Testing and Deployment", icon: Settings }
  ];

  return (
    <section className="hero-container" id="home" style={{ paddingBottom: 0 }}>
      <div className="container" style={{ width: '100%' }}>
        <div className="hero-inner" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          
          {/* LEFT: Text Content */}
          <div className="hero-content">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="hero-badge"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}
            >
              <span className="hero-badge-dot"></span>
              Available for Work
            </motion.div>
            
            <p className="hero-greeting" style={{ marginTop: '16px', fontSize: '1rem', fontWeight: 600, color: 'var(--accent)' }}>Hello, I'm</p>
            
            <h1 className="hero-name" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, margin: '8px 0' }}>
              <AnimatedText text="Pragati Tayade" />
            </h1>
            
            <p className="hero-role" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
              <span className={`role-text-animate ${animateClass}`}>
                {rolesList[roleIndex]}
              </span>
              <span className="typing-cursor" aria-hidden="true"></span>
            </p>
            
            <p className="hero-desc" style={{ color: 'var(--text-muted)', fontSize: '0.975rem', lineHeight: 1.6, maxWidth: '520px', marginBottom: '28px' }}>
              Java Full-Stack Developer building scalable and meaningful digital products. I develop complete web applications across frontend, backend, databases, API integration, authentication, testing and deployment.
            </p>

            {/* Location & Availability tags */}
            <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '32px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} style={{ color: 'var(--accent)' }} /> Pune, Maharashtra
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Briefcase size={14} style={{ color: 'var(--accent)' }} /> Full-time / Internship
              </span>
            </div>

            {/* Social Icons row */}
            <SocialLinks />

            {/* CTA Buttons */}
            <div className="hero-ctas" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href="#/#projects" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                View Projects <ArrowRight size={16} />
              </a>
              
              <DocumentLink 
                className="btn btn-secondary" 
                href={resumePdf} 
                downloadName="Pragati_Tayade_Resume.pdf"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FileDown size={16} /> Download Resume
              </DocumentLink>
              
              <a className="btn btn-secondary" href="#/#contact">Contact Me</a>
            </div>
          </div>

          {/* RIGHT: Dynamic 3D canvas or Avatar Fallback */}
          <div className="hero-avatar-area" style={{ display: 'grid', placeItems: 'center', position: 'relative' }}>
            {(!isMobile && !prefersReducedMotion) ? (
              <Suspense fallback={
                <div className="avatar-glow-ring">
                  <div className="avatar-frame">
                    <img src={avatarImg} alt="Pragati Tayade Profile Fallback" />
                  </div>
                </div>
              }>
                <HeroCanvas />
              </Suspense>
            ) : (
              <div className="avatar-glow-ring">
                <div className="avatar-frame">
                  <img src={avatarImg} alt="Pragati Tayade Profile Portrait" />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Stats bar */}
        <div 
          className="hero-stats-bar" 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', margin: '64px 0 0', borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}
          ref={statsSectionRef}
        >
          <div className="stat-item">
            <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{projectCount}+</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>5+</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Technologies Mastered</p>
          </div>
          <div className="stat-item">
            <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>100%</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Remote Ready</p>
          </div>
          <div className="stat-item">
            <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>2026</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>CSE Graduate</p>
          </div>
        </div>

      </div>

      {/* Recruiter Value Strip Section */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '24px 0',
        marginTop: '64px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }} className="recruiter-value-strip-row">
          {valueStripItems.map((item, idx) => (
            <div 
              key={idx} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.825rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              <item.icon size={16} style={{ color: 'var(--accent)' }} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
