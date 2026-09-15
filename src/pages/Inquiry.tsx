import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import '../App.css';

const Inquiry: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instructor: 'any',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <PageTransition>
      <div className="legal-page-container container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="form-container"
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1>Student Teacher Inquiry</h1>
            <p className="effective-date" style={{ marginBottom: 0 }}>
              Got a tough question? Connect directly with our expert instructors and get personalized guidance.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3>Inquiry Sent Successfully!</h3>
              <p>Your question has been forwarded to our instructors. You will receive an email response shortly.</p>
              <button 
                className="btn btn-primary" 
                style={{ marginTop: '24px' }}
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Inquiry
              </button>
            </motion.div>
          ) : (
            <div className="standalone-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-control" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instructor">Select Instructor (Optional)</label>
                  <select 
                    id="instructor" 
                    name="instructor" 
                    className="form-control" 
                    value={formData.instructor}
                    onChange={handleChange}
                    style={{ appearance: 'auto' }}
                  >
                    <option value="any">Any Available Instructor</option>
                    <option value="clibourn">Engr. Clibourn E. Quiapo</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject / Topic</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    className="form-control" 
                    required 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Electrical Circuits, AC Machines"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Question</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="form-control" 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your question or inquiry here..."
                    rows={5}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                  Submit Inquiry
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Inquiry;
