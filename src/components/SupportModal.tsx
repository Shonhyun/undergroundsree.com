import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SupportModal: React.FC = () => {
  const { isModalOpen, closeModal } = useAppContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const category = formData.get('category') as string;
    const message = formData.get('message') as string;

    try {
      setErrorMsg(null);
      await addDoc(collection(db, 'supportRequests'), {
        name,
        email,
        category,
        message,
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
      // Wait a moment then close modal automatically
      setTimeout(() => {
        closeModal();
        setIsSubmitted(false); // reset for next time
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMsg("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div 
          className="modal-overlay" 
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            <button className="modal-close" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '16px', boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', marginBottom: '24px', boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)' }}>
                  <svg style={{ width: '40px', height: '40px', color: '#D4AF37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#D4AF37', fontWeight: 'bold', letterSpacing: '0.5px' }}>Message Sent!</h3>
                <p style={{ color: '#E2E8F0', fontSize: '15px', lineHeight: '1.6', maxWidth: '300px', margin: '0 auto' }}>We've securely received your ticket and our team will assist you shortly.</p>
              </motion.div>
            ) : (
              <>
                <h3>Submit a Request</h3>
                <p>Send us your concerns and we'll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit}>
                  {errorMsg && (
                    <div style={{ padding: '12px', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', borderRadius: '8px', color: '#ff4444', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
                      {errorMsg}
                    </div>
                  )}
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" required className="form-control" placeholder="Juan Dela Cruz" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" required className="form-control" placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Concern Category</label>
                    <select name="category" className="form-control" required>
                      <option value="">Select a category...</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Access</option>
                      <option value="content">Lecture / Exam Content</option>
                      <option value="other">Other Inquiries</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea name="message" required className="form-control" placeholder="Describe your issue..."></textarea>
                  </div>
                  <motion.button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%' }} 
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;
