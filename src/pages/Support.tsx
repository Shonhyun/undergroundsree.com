import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';
import { useAppContext } from '../context/AppContext';

const Support: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { openModal } = useAppContext();

  const faqs = [
    {
      q: "What is the Undergrounds REE Mobile App?",
      a: "Undergrounds REE Review Center by Engr. Clibourn E. Quiapo is your ultimate companion for the Electrical Engineering Board Exam. Access expertly crafted lectures, quizzes, and mock exams based on the latest REE syllabus. Track your progress, enhance your knowledge, and boost your confidence—anytime, anywhere. Whether you're studying solo or enrolled in the center, this app is built to help you succeed. Let's pass the board, the Undergrounds way!"
    },
    {
      q: "How does your product/service work?",
      a: "The Undergrounds REE Review Center app is designed to help aspiring Registered Electrical Engineers (REE) prepare for the board exam. It provides a comprehensive learning experience through expertly crafted lectures, quizzes, and mock exams for key subjects: MATH, ESAS, EE, and Refresher. Users can access free content or enroll in paid courses for complete access to premium features, including live sessions and personalized coaching."
    },
    {
      q: "How much does it cost?",
      a: "Our pricing varies depending on which subjects you enroll in. We offer a variety of options to fit your needs and budget for your preparation for the REE Licensure Exam."
    },
    {
      q: "Do you offer refresher or coaching sessions?",
      a: "Yes! The app offers a dedicated Refresher course designed to reinforce essential concepts and problem-solving techniques for the REE Board Exam. Additionally, enrolled users can join live coaching sessions led by Engr. Clibourn Quiapo."
    },
    {
      q: "Is it an online review?",
      a: "Yes, the Undergrounds REE Review Center app is an entirely online review platform. You can access all learning materials, mock exams, and coaching sessions through the app anytime, anywhere. All you need is a stable internet connection."
    }
  ];

  return (
    <PageTransition>
      <div className="support-page-container">
        <div className="container">
          
          <section className="faq-section">
            <h1>Frequently Asked Questions</h1>
            <p className="faq-subtitle">Find answers to common questions about the Undergrounds REE Review app.</p>
            
            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <div className="faq-question">
                    <h3>{faq.q}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="contact-form-section" style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2>Still Need Assistance?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>If you couldn't find the answer to your question, feel free to send us a message.</p>
            <button onClick={openModal} className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
              Open Support Ticket
            </button>
          </section>

        </div>
      </div>
    </PageTransition>
  );
};

export default Support;
