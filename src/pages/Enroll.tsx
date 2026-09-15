import React from 'react';
import PageTransition from '../components/PageTransition';

const Enroll: React.FC = () => {

  return (
    <PageTransition>
      <div className="support-page-container">
        <div className="container form-container">
          <h1 style={{ textAlign: 'center' }}>Pre-Registration</h1>
          <p className="subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>
            Ready to pass the board exam? Fill out the form below to secure your spot and get an exclusive discount.
          </p>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSdUGopgYWyTpyTDef17rbCt9CaYm3Yk2kiCqveg-hZbzsgBZg/viewform?usp=send_form" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary" 
              style={{ display: 'inline-block', padding: '16px 40px', fontSize: '20px' }}
            >
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Enroll;
