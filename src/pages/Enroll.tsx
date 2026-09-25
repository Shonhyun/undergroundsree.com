import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import appStoreImg from '../assets/app-store.png';
import playStoreImg from '../assets/play-store.png';
import './Enroll.css';

/* ===========================================================================
   REFERRAL DISCOUNT — please confirm these three values.
   Taken from the brief as: "invite a friend and Full Enrollment drops from
   about 8,000 to about 7,000" — i.e. 1 invite, P1,000 off, Full Enrollment.
   Change the numbers here and the whole page updates.
   =========================================================================== */
const REFERRAL_INVITES_REQUIRED = 1;      // how many friends must enroll
const REFERRAL_DISCOUNT = 1000;           // peso amount taken off
const REFERRAL_APPLIES_TO = 'full';       // plan id the discount applies to

const APP_STORE_LINK = 'https://apps.apple.com/us/app/undergrounds-ree-review/id6745921735';
const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.undergrounds.reviewcenterapp&pcampaignid=web_share';

/* --- Plans (display only — no selection, no checkout on the website) ------- */
type Plan = { id: string; name: string; price: number; badge?: string };

const REVIEW_PLANS: Plan[] = [
  { id: 'math', name: 'MATH', price: 2499 },
  { id: 'esas', name: 'ESAS', price: 2499 },
  { id: 'ee', name: 'EE', price: 2499 },
  { id: 'refresher', name: 'REFRESHER', price: 2499 },
  { id: 'full', name: 'FULL ENROLLMENT', price: 7999, badge: 'Best Value' },
];

const MOCK_PLANS: Plan[] = [
  { id: 'math_mock', name: 'MATH Mock Board', price: 250 },
  { id: 'esas_mock', name: 'ESAS Mock Board', price: 250 },
  { id: 'ee_mock', name: 'EE Mock Board', price: 250 },
  { id: 'all_mock', name: 'ALL MOCK BOARDS', price: 500 },
];

const peso = (n: number) => '₱' + n.toLocaleString('en-PH');

const referralPlan = [...REVIEW_PLANS, ...MOCK_PLANS].find(p => p.id === REFERRAL_APPLIES_TO);
const isSingleInvite = REFERRAL_INVITES_REQUIRED === 1;
const friendWord = isSingleInvite ? 'friend' : 'friends';
const enrollWord = isSingleInvite ? 'enrolls' : 'enroll';

const IconGift = (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
);

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const Enroll: React.FC = () => {
  const renderRow = (plan: Plan) => (
    <motion.div className="enroll-row" key={plan.id} variants={item}>
      <span className="enroll-row-name">
        {plan.name}
        {plan.badge && <span className="enroll-badge">{plan.badge}</span>}
      </span>
      <span className="enroll-row-price">{peso(plan.price)}</span>
    </motion.div>
  );

  return (
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
            <h1>Enroll in Undergrounds</h1>
            <p>
              Here's what's available and what it costs. Enrollment and payment are
              completed inside the Undergrounds app.
            </p>
          </motion.div>

          {/* Referral discount */}
          {referralPlan && (
            <motion.div
              className="enroll-referral"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="enroll-referral-icon">{IconGift}</span>
              <div className="enroll-referral-body">
                <h2>
                  Invite {REFERRAL_INVITES_REQUIRED} {friendWord}, get {peso(REFERRAL_DISCOUNT)} off
                </h2>
                <p>
                  Refer {REFERRAL_INVITES_REQUIRED} {friendWord} who {enrollWord} and your{' '}
                  <strong>{referralPlan.name}</strong> drops from{' '}
                  <span className="enroll-strike">{peso(referralPlan.price)}</span> to{' '}
                  <strong className="enroll-referral-price">
                    {peso(referralPlan.price - REFERRAL_DISCOUNT)}
                  </strong>.
                </p>
              </div>
            </motion.div>
          )}

          {/* Price lists */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.h2 className="enroll-group-title" variants={item}>
              Online Review Enrollment
            </motion.h2>
            <div className="enroll-list">{REVIEW_PLANS.map(renderRow)}</div>

            <motion.h2 className="enroll-group-title" variants={item}>
              Mock Boards Enrollment
            </motion.h2>
            <div className="enroll-list">{MOCK_PLANS.map(renderRow)}</div>
          </motion.div>

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
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Enroll;
