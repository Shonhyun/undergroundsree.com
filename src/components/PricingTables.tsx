import React from 'react';
import { motion } from 'framer-motion';
import {
  REVIEW_PLANS,
  MOCK_PLANS,
  REFERRAL_INVITES_REQUIRED,
  REFERRAL_DISCOUNT,
  referralPlan,
  peso,
  type Plan,
} from '../data/plans';
import './PricingTables.css';

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

const PriceRow: React.FC<{ plan: Plan }> = ({ plan }) => (
  <motion.div className="pricing-row" variants={item}>
    <span className="pricing-row-name">
      {plan.name}
      {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
    </span>
    <span className="pricing-row-price">{peso(plan.price)}</span>
  </motion.div>
);

/** Referral offer callout. Hidden if no qualifying plan is configured. */
export const ReferralCallout: React.FC = () => {
  if (!referralPlan) return null;

  return (
    <motion.div
      className="pricing-referral"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="pricing-referral-icon">{IconGift}</span>
      <div className="pricing-referral-body">
        <h3>
          Invite {REFERRAL_INVITES_REQUIRED} {friendWord}, get {peso(REFERRAL_DISCOUNT)} off{' '}
          {referralPlan.name}
        </h3>
        <p>
          Invite {REFERRAL_INVITES_REQUIRED} {friendWord} who {enrollWord} and your{' '}
          <strong>{referralPlan.name}</strong> drops from{' '}
          <span className="pricing-strike">{peso(referralPlan.price)}</span> to{' '}
          <strong className="pricing-referral-price">
            {peso(referralPlan.price - REFERRAL_DISCOUNT)}
          </strong>.
        </p>
      </div>
    </motion.div>
  );
};

/** The two read-only price lists. */
export const PriceLists: React.FC = () => (
  <motion.div
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    <motion.h3 className="pricing-group-title" variants={item}>
      Online Review Enrollment
    </motion.h3>
    <div className="pricing-list">
      {REVIEW_PLANS.map(p => <PriceRow key={p.id} plan={p} />)}
    </div>

    <motion.h3 className="pricing-group-title" variants={item}>
      Mock Boards Enrollment
    </motion.h3>
    <div className="pricing-list">
      {MOCK_PLANS.map(p => <PriceRow key={p.id} plan={p} />)}
    </div>
  </motion.div>
);
