import React, { useState, useEffect, useRef } from 'react';
import avatarImg from '../../assets/images/pragati.png';
import resumePdf from '../../assets/documents/Pragati_Tayade_Resume.pdf';
import SocialLinks from '../common/SocialLinks';
import DocumentLink from '../common/DocumentLink';

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

  return (
    <section className="hero-container" id="home">
      <div className="container" style={{ width: '100%' }}>
        <div className="hero-inner">
          
          {/* LEFT: Text Content */}
          <div className="hero-content">
            <div className="hero-badge reveal">
              <span className="hero-badge-dot"></span> Available for Work
            </div>
            
            <p className="hero-greeting reveal" style={{ transitionDelay: '0.05s' }}>Hello, I'm</p>
            <h1 className="hero-name reveal" style={{ transitionDelay: '0.1s' }}>
              Pragati Tayade
            </h1>
            <p className="hero-role reveal" style={{ transitionDelay: '0.15s' }}>
              <span className={`role-text-animate ${animateClass}`}>
                {rolesList[roleIndex]}
              </span>
              <span className="typing-cursor" aria-hidden="true"></span>
            </p>
            <p className="hero-desc reveal" style={{ transitionDelay: '0.2s' }}>
              A motivated and detail-oriented Computer Science Engineering graduate skilled in building responsive web
              applications and database architectures. Dedicated to clean code, system security, and efficient software
              design.
            </p>

            {/* Social Icons row */}
            <SocialLinks />

            {/* CTA Buttons */}
            <div className="hero-ctas reveal" style={{ transitionDelay: '0.28s' }}>
              <a className="btn btn-primary btn-hire" href="#/#projects">View Projects</a>
              <DocumentLink 
                className="btn btn-secondary" 
                href={resumePdf} 
                downloadName="Pragati_Tayade_Resume.pdf"
              >
                ⬇ Download Resume
              </DocumentLink>
              <a className="btn btn-secondary" href="#/#contact">Contact Me</a>
            </div>

            {/* Key Tech Highlights using JetBrains Mono */}
            <div className="hero-tech-highlights reveal" style={{ transitionDelay: '0.32s' }}>
              <span className="hero-tech-label">Core stack:</span>
              <div className="hero-tech-tags">
                <span className="hero-tech-tag">Java</span>
                <span className="hero-tech-tag">Spring Boot</span>
                <span className="hero-tech-tag">React.js</span>
                <span className="hero-tech-tag">SQL</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Profile Avatar */}
          <div className="hero-avatar-area reveal">
            <div className="avatar-glow-ring">
              <div className="avatar-frame">
                <img src={avatarImg} alt="Pragati Tayade Profile Portrait" />
              </div>
            </div>
          </div>

        </div>

        {/* Stats bar spans full width below */}
        <div 
          className="hero-stats-bar reveal" 
          style={{ transitionDelay: '0.36s' }}
          ref={statsSectionRef}
        >
          <div className="stat-item">
            <h4><span>{projectCount}</span><span>+</span></h4>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h4><span>5</span><span>+</span></h4>
            <p>Technologies Mastered</p>
          </div>
          <div className="stat-item">
            <h4><span>100</span><span>%</span></h4>
            <p>Remote Ready</p>
          </div>
          <div className="stat-item">
            <h4><span>2026</span></h4>
            <p>CSE Graduate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
