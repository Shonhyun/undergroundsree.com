import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { ReferralCallout, PromoPosters, PriceLists } from '../components/PricingTables';
import {
  APP_STORE_LINK,
  PLAY_STORE_LINK,
  ENROLL_FORM_LINK,
  ENROLL_STEPS,
} from '../data/plans';
import appStoreImg from '../assets/app-store.png';
import playStoreImg from '../assets/play-store.png';
import './Enroll.css';

const Enroll: React.FC = () => (
  <PageTransition>
    <div className="support-page-container">
      <div className="container enroll-wrap">

        {/* Heading */}
        <motion.div
          className="enroll-head"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="enroll-eyebrow">Programs &amp; Pricing</span>
          <h1>Reviewing for the board exam shouldn't feel this overwhelming.</h1>
          <p>
            Too many subjects, too many handouts, too little time. Undergrounds puts your
            whole review in one place — here's what's available and what it costs.
          </p>
        </motion.div>

        <ReferralCallout />
        <PromoPosters />
        <PriceLists />

        {/* App CTA */}
        <motion.div
          className="enroll-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Want to try the app?</h2>
          <p>
            Download Undergrounds to enroll, pay, and start reviewing. Everything you
            need is in your pocket.
          </p>

          <ol className="enroll-steps">
            {ENROLL_STEPS.map((step, i) => (
              <li key={i}>
                <span className="enroll-step-num">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          <div className="enroll-cta-actions">
            <motion.a
              href={APP_STORE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn white-btn"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <img src={appStoreImg} alt="App Store" className="store-icon" />
              <div className="store-btn-text">
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </motion.a>
            <motion.a
              href={PLAY_STORE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn white-btn"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <img src={playStoreImg} alt="Google Play" className="store-icon" />
              <div className="store-btn-text">
                <small>Get it on</small>
                <strong>Google Play</strong>
              </div>
            </motion.a>
          </div>

          <div className="enroll-form-alt">
            <span>Prefer to sign up through the website?</span>
            <a
              href={ENROLL_FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Fill out the enrollment form
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  </PageTransition>
);

export default Enroll;
