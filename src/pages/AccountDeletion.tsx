import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';

const AccountDeletion: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="legal-page-container">
      <div className="container form-container">
        <h1>Request for Mobile App Account Deletion</h1>
        <p className="subtitle">
          You may choose to permanently delete your account in the Undergrounds REE Mobile Application by Engr. Clibourn E. Quiapo. 
          To do this, kindly fill out this form to request the permanent deletion of your mobile app account.
        </p>

        {isSubmitted ? (
          <div className="success-message">
            <h3>Request Submitted Successfully</h3>
            <p>This process may take up to 7 days to complete. One of our support representatives shall accommodate your request. You will receive a notification email once the request has been completed.</p>
          </div>
        ) : (
          <form className="standalone-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Complete Name *</label>
              <input type="text" required className="form-control" placeholder="Your registered name" />
            </div>
            
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" required className="form-control" placeholder="Your registered email address" />
            </div>
            
            <div className="form-group">
              <label>Reason for Request *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="reason" value="App no longer needed" required />
                  App no longer needed
                </label>
                <label className="radio-label">
                  <input type="radio" name="reason" value="App not working" />
                  App not working
                </label>
                <label className="radio-label">
                  <input type="radio" name="reason" value="Looking for something else" />
                  Looking for something else
                </label>
                <label className="radio-label">
                  <input type="radio" name="reason" value="Found a better option" />
                  Found a better option
                </label>
                <label className="radio-label">
                  <input type="radio" name="reason" value="I just want to delete it" />
                  I just want to delete it
                </label>
              </div>
            </div>
            
            <button type="submit" className="btn btn-danger" style={{ width: '100%', marginTop: '20px' }}>
              Request Account Deletion
            </button>
          </form>
        )}
      </div>
      </div>
    </PageTransition>
  );
};

export default AccountDeletion;
