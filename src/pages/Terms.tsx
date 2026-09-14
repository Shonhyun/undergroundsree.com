import React from 'react';
import PageTransition from '../components/PageTransition';

const Terms: React.FC = () => {
  return (
    <PageTransition>
      <div className="legal-page-container">
      <div className="container">
        <h1>Terms and Conditions</h1>
        <p className="effective-date">Effective Date: April 19, 2025</p>

        <section className="legal-section">
          <p>Welcome to the Undergrounds REE Review Center App by Engr. Clibourn E. Quiapo. By using this app and enrolling in any of the offered review programs, you agree to the following terms:</p>
          
          <h2>1. Access to Content</h2>
          <p>Users may access selected learning materials and features for free. However, full access to subject-specific content, live sessions, exclusive coaching, and premium exams requires enrollment in one or more paid review programs.</p>

          <h2>2. Subject Enrollment</h2>
          <p>You may choose to enroll in any of the following review subjects:</p>
          <ul>
            <li>MATH</li>
            <li>ESAS</li>
            <li>EE</li>
            <li>Refresher</li>
          </ul>
          <p>A ₱1000 discount will automatically be applied if you enroll in all four (4) subjects.</p>

          <h2>3. Payment & Refund Policy</h2>
          <p>All payments and enrollments are final and non-refundable. Please review your subject choices carefully before proceeding with payment. We do not offer refunds for any reason once your enrollment is confirmed.</p>

          <h2>4. Academic Use Only</h2>
          <p>This app is strictly for educational and review purposes in preparation for the Registered Electrical Engineer Licensure Examination. Unauthorized use, duplication, or distribution of course content is prohibited.</p>

          <h2>5. Updates and Availability</h2>
          <p>We continuously improve the app to deliver the best review experience. Features and content may change or be updated without prior notice. The app is currently available on Android via Google Play and iOS.</p>

          <p>By continuing to use this app and enrolling in any course, you acknowledge and agree to these terms.</p>
        </section>
      </div>
      </div>
    </PageTransition>
  );
};

export default Terms;
