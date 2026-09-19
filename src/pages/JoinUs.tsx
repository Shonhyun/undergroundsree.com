import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import qrCodeImg from '../assets/qr-code-group.jpeg';
import '../App.css';

const JoinUs: React.FC = () => {
  return (
    <PageTransition>
      <div className="support-page-container" style={{ padding: '80px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="highlight" style={{ marginBottom: '16px', display: 'inline-block', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Community</span>
            <h1 style={{ fontSize: '42px', marginBottom: '20px', letterSpacing: '-1px' }}>Join the Undergrounds Group Chat</h1>
            <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', marginBottom: '40px', lineHeight: '1.6' }}>
              Connect with fellow students, get updates, and join the discussion. Scan the QR code below or click the button to join directly.
            </p>

            <motion.div 
              style={{
                background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(139,92,246,0.08) 100%)',
                border: '1px solid rgba(37,99,235,0.2)',
                borderRadius: '24px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
              }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', marginBottom: '30px' }}>
                <img 
                  src={qrCodeImg} 
                  alt="QR Code to Join Group Chat" 
                  style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '8px' }} 
                />
              </div>
              
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>Can't scan? Click below to join directly:</p>
              
              <a 
                href="https://m.me/ch/AbbLJzyPOXZRq0oy/?send_source=cm%3Acopy_invite_link&join_source=cm%3Axma" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '18px', fontWeight: 'bold' }}
              >
                Join Group Chat
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default JoinUs;
