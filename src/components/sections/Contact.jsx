import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [statusMsg, setStatusMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    const validationErrors = [];
    if (!formData.name || formData.name.trim().length < 2) {
      validationErrors.push('Please enter your name (minimum 2 characters).');
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.push('Please enter a valid email address.');
    }
    if (!formData.message || formData.message.trim().length < 10) {
      validationErrors.push('Your message must be at least 10 characters long.');
    }

    if (validationErrors.length > 0) {
      setStatusMsg(validationErrors[0]);
      setIsSuccess(false);
      return;
    }

    // Success sequence
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setStatusMsg('✓ Message sent successfully! Thank you.');
    setIsSuccess(true);

    setTimeout(() => {
      setStatusMsg('');
    }, 5000);
  };

  return (
    <section id="contact">
      <div className="container">
        <SectionHeading 
          label="Connect" 
          title="Contact Me" 
          subtitle="Reach out for collaborations, job opportunities, or technical inquiries."
        />

        <div className="contact-layout">
          {/* Recruiter Call to Action */}
          <div className="contact-cta-wrapper reveal">
            <h3>Looking for Opportunities</h3>
            <p className="contact-cta-text">
              I am currently seeking full-time roles or internships in **Java Software Development**, **Full-Stack Engineering**, or **Backend Development**. I am open to remote arrangements or on-site positions. If you are a recruiter, engineering manager, or team leader, I'd love to connect!
            </p>

            <div className="contact-detail-items">
              <div className="contact-detail-item">
                <div className="contact-detail-icon" aria-hidden="true">📧</div>
                <div>
                  <div className="contact-detail-label">Email Me</div>
                  <a className="contact-detail-value" href="mailto:pragatitayade1302@gmail.com">
                    pragatitayade1302@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon" aria-hidden="true">💼</div>
                <div>
                  <div className="contact-detail-label">LinkedIn Profile</div>
                  <a 
                    className="contact-detail-value" 
                    href="https://www.linkedin.com/in/pragati-tayade-644636283" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/pragati-tayade
                  </a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon" aria-hidden="true">📍</div>
                <div>
                  <div className="contact-detail-label">Location</div>
                  <span className="contact-detail-value">Akola, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Accessible Form */}
          <div className="contact-card card reveal" style={{ transitionDelay: '0.1s' }}>
            <form className="contact-form" onSubmit={handleFormSubmit} noValidate>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="formName">Your Name</label>
                  <input 
                    className="form-input" 
                    id="formName" 
                    name="name" 
                    type="text" 
                    placeholder="Pragati Tayade" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="formEmail">Email Address</label>
                  <input 
                    className="form-input" 
                    id="formEmail" 
                    name="email" 
                    type="email" 
                    placeholder="hello@example.com"
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="formSubject">Subject</label>
                <input 
                  className="form-input" 
                  id="formSubject" 
                  name="subject" 
                  type="text" 
                  placeholder="Internship Inquiry / Project Collaboration" 
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="formMessage">Message</label>
                <textarea 
                  className="form-input" 
                  id="formMessage" 
                  name="message"
                  placeholder="Hi Pragati, I would like to invite you for an interview regarding..." 
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-footer">
                <button className="btn btn-primary" type="submit">
                  Send Message
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
                <span 
                  className="form-status" 
                  style={{ color: isSuccess ? 'var(--success)' : 'var(--danger)' }}
                  role="status"
                >
                  {statusMsg}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
