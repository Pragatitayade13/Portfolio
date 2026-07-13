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

    // Validation logic matching original JS
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
          subtitle="Reach out for collaborations, job inquiries, or project requests."
        />

        <div className="contact-card card reveal">
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
                placeholder="Project Inquiry" 
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
                placeholder="Hi Pragati, I would like to collaborate with you on..." 
                required
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-footer">
              <button className="btn btn-primary" type="submit">
                Send Message
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    </section>
  );
};

export default Contact;
