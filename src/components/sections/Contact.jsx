import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import Toast from '../common/Toast';
import { Mail, Linkedin, Github, MapPin, Copy, Send, FileDown } from 'lucide-react';
import resumePdf from '../../assets/documents/Pragati_Tayade_Resume.pdf';
import DocumentLink from '../common/DocumentLink';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toastConfig, setToastConfig] = useState({ isOpen: false, message: '', type: 'success' });
  const [emailCopied, setEmailCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pragatitayade1302@gmail.com');
    setEmailCopied(true);
    setToastConfig({
      isOpen: true,
      message: 'Email address copied to clipboard!',
      type: 'success'
    });
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    // Client-side validations
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    
    // Simulate API Formspree endpoint trigger
    setTimeout(() => {
      setSubmitting(false);
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      setToastConfig({
        isOpen: true,
        message: 'Message sent successfully! Thank you.',
        type: 'success'
      });
    }, 1200);
  };

  return (
    <section id="contact">
      <div className="container">
        <SectionHeading 
          label="Connect" 
          title="Let's build something meaningful."
          subtitle="Reach out for collaborations, job opportunities, or technical inquiries."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '48px',
          marginTop: '40px',
          alignItems: 'start'
        }} className="contact-layout">
          
          {/* LEFT: Recruiter Details Card */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="contact-details-col"
          >
            <SpotlightCard style={{ padding: '36px', display: 'grid', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.3px' }}>
                  Looking for Opportunities
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  I am currently seeking full-time roles or internships in **Java Software Development**, **Full-Stack Engineering**, or **Backend Development**. I am open to remote arrangements or relocation.
                </p>
              </div>

              {/* Direct Info Lines */}
              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Email Address</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <a href="mailto:pragatitayade1302@gmail.com" style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>
                        pragatitayade1302@gmail.com
                      </a>
                      <button 
                        onClick={handleCopyEmail}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', display: 'grid', placeItems: 'center', padding: '4px' }}
                        title="Copy email to clipboard"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>LinkedIn</span>
                    <a href="https://www.linkedin.com/in/pragati-tayade-644636283" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>
                      linkedin.com/in/pragati-tayade
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Location</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 600 }}>Akola, Maharashtra, India</span>
                  </div>
                </div>
              </div>

              {/* Document Download Link */}
              <DocumentLink 
                className="btn btn-primary" 
                href={resumePdf} 
                downloadName="Pragati_Tayade_Resume.pdf"
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', padding: '12px' }}
              >
                <FileDown size={16} /> Download Resume PDF
              </DocumentLink>
            </SpotlightCard>
          </motion.div>

          {/* RIGHT: Input Form */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="contact-form-col"
          >
            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '16px' }} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="form-row-2">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="contactName" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Your Name *</label>
                  <input 
                    className="form-input" id="contactName" name="name" type="text"
                    value={formData.name} onChange={handleInputChange} disabled={submitting}
                    style={{ borderColor: formErrors.name ? 'var(--danger)' : 'var(--border-color)' }}
                  />
                  {formErrors.name && <span style={{ color: 'var(--danger)', fontSize: '0.7rem' }}>{formErrors.name}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="contactEmail" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Email Address *</label>
                  <input 
                    className="form-input" id="contactEmail" name="email" type="email"
                    value={formData.email} onChange={handleInputChange} disabled={submitting}
                    style={{ borderColor: formErrors.email ? 'var(--danger)' : 'var(--border-color)' }}
                  />
                  {formErrors.email && <span style={{ color: 'var(--danger)', fontSize: '0.7rem' }}>{formErrors.email}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="form-row-2">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="contactCompany" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Company (Optional)</label>
                  <input 
                    className="form-input" id="contactCompany" name="company" type="text"
                    value={formData.company} onChange={handleInputChange} disabled={submitting}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="contactSubject" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Subject *</label>
                  <input 
                    className="form-input" id="contactSubject" name="subject" type="text"
                    value={formData.subject} onChange={handleInputChange} disabled={submitting}
                    style={{ borderColor: formErrors.subject ? 'var(--danger)' : 'var(--border-color)' }}
                  />
                  {formErrors.subject && <span style={{ color: 'var(--danger)', fontSize: '0.7rem' }}>{formErrors.subject}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="contactMessage" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Message *</label>
                <textarea 
                  className="form-input" id="contactMessage" name="message" rows={5}
                  value={formData.message} onChange={handleInputChange} disabled={submitting}
                  style={{ borderColor: formErrors.message ? 'var(--danger)' : 'var(--border-color)', minHeight: '120px' }}
                />
                {formErrors.message && <span style={{ color: 'var(--danger)', fontSize: '0.7rem' }}>{formErrors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={submitting}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', padding: '12px', marginTop: '10px' }}
              >
                {submitting ? 'Sending Message...' : 'Send Message'} <Send size={16} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* Action Banners Toast */}
      <Toast 
        message={toastConfig.message} 
        type={toastConfig.type} 
        isOpen={toastConfig.isOpen} 
        onClose={() => setToastConfig(prev => ({ ...prev, isOpen: false }))} 
      />
    </section>
  );
};

export default Contact;
