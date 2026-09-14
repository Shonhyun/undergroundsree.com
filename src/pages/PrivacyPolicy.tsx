import React from 'react';
import PageTransition from '../components/PageTransition';

const PrivacyPolicy: React.FC = () => {
  return (
    <PageTransition>
      <div className="legal-page-container">
      <div className="container">
        <h1>Privacy Policy for Undergrounds REE Review Center</h1>
        <p className="effective-date">Effective Date: April 19, 2025</p>

        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>Welcome to the Undergrounds REE Review Center app by Engr. Clibourn E. Quiapo. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines.</p>

          <h2>2. Data We Collect</h2>
          <p>When you use our app, we may collect the following personal information:</p>
          <ul>
            <li><strong>Personal Identification Information:</strong> Name, email address, contact number, and profile information.</li>
            <li><strong>Device Information:</strong> Device model, operating system, and app usage data.</li>
            <li><strong>Payment Information:</strong> When enrolling in paid courses (processed through secure third-party providers).</li>
            <li><strong>Usage Data:</strong> Interaction logs, quiz scores, progress tracking, and session data.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Provide and improve our services.</li>
            <li>Manage your account and enrollment in courses.</li>
            <li>Facilitate payment processing for paid content.</li>
            <li>Enhance your learning experience through progress tracking and personalized content.</li>
            <li>Send notifications about app updates, promotions, and new features.</li>
            <li>Maintain security and prevent unauthorized access.</li>
          </ul>

          <h2>4. Data Protection and Security</h2>
          <p>We implement industry-standard security measures to protect your data, including encryption, secure servers, and access control. Only authorized personnel can access your personal information.</p>

          <h2>5. Data Sharing and Third Parties</h2>
          <p>We do not sell or share your personal information with third parties, except:</p>
          <ul>
            <li>With payment processing partners to complete transactions.</li>
            <li>As required by law or to comply with legal obligations.</li>
            <li>To protect the rights and safety of users and the public.</li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>We retain your personal information as long as your account is active or as needed to provide our services. Upon account deletion, your data will be permanently removed from our systems.</p>

          <h2>7. Your Rights Under the Data Privacy Act</h2>
          <p>In compliance with the Data Privacy Act of 2012, you have the right to:</p>
          <ul>
            <li>Access your personal data.</li>
            <li>Correct inaccurate or outdated information.</li>
            <li>Request deletion or restriction of your data.</li>
            <li>Object to data processing.</li>
            <li>File a complaint with the National Privacy Commission (NPC) if your rights are violated.</li>
          </ul>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted in the app, and continued use indicates acceptance of the revised policy.</p>

          <h2>9. Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy, please reach out to us at:</p>
          <ul>
            <li><strong>Email:</strong> clibourn.ug8@gmail.com</li>
            <li><strong>Address:</strong> Iligan City, Mindanao</li>
          </ul>

          <p>By using the Undergrounds REE Review Center app, you acknowledge that you have read and understood this Privacy Policy and consent to the processing of your personal data as described.</p>
        </section>
      </div>
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;
