import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import PageTransition from '../components/PageTransition';

const Enroll: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const subjects = formData.getAll('subject') as string[];
    
    try {
      setErrorMsg(null);
      await addDoc(collection(db, 'preRegistrations'), {
        name,
        email,
        phone,
        subjects,
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMsg("Failed to submit registration. Please try again.");
    }
  };

  return (
    <PageTransition>
      <div className="support-page-container">
        <div className="container form-container">
          <h1 style={{ textAlign: 'center' }}>Pre-Registration</h1>
          <p className="subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>
            Ready to pass the board exam? Fill out the form below to secure your spot and get an exclusive discount.
          </p>

          {isSubmitted ? (
            <div className="success-message" style={{ textAlign: 'center', padding: '40px', background: 'rgba(0,255,100,0.1)', border: '1px solid rgba(0,255,100,0.3)', borderRadius: '12px' }}>
              <svg style={{ width: '64px', height: '64px', color: '#00ff66', margin: '0 auto 16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#fff' }}>Registration Successful!</h3>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>Thank you for pre-registering. Our team will contact you shortly with the enrollment instructions and payment details.</p>
            </div>
          ) : (
            <form className="standalone-form" onSubmit={handleSubmit}>
              {errorMsg && (
                <div style={{ padding: '16px', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '8px', color: '#ff4444', marginBottom: '20px', textAlign: 'center' }}>
                  {errorMsg}
                </div>
              )}
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" required className="form-control" placeholder="Juan Dela Cruz" />
              </div>
              
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" required className="form-control" placeholder="your@email.com" />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" required className="form-control" placeholder="+63 912 345 6789" />
              </div>
              
              <div className="form-group">
                <label>Subjects to Enroll *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="checkbox" name="subject" value="MATH" />
                    Engineering Mathematics (MATH)
                  </label>
                  <label className="radio-label">
                    <input type="checkbox" name="subject" value="ESAS" />
                    Engineering Sciences and Allied Subjects (ESAS)
                  </label>
                  <label className="radio-label">
                    <input type="checkbox" name="subject" value="EE" />
                    Electrical Engineering (EE)
                  </label>
                  <label className="radio-label">
                    <input type="checkbox" name="subject" value="REFRESHER" />
                    Refresher Course
                  </label>
                </div>
                <small style={{ color: 'var(--color-accent)', display: 'block', marginTop: '12px', fontWeight: 'bold' }}>
                  * Enroll in all 4 subjects to get an automatic ₱1000 discount!
                </small>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                Submit Pre-Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Enroll;
