import React from 'react';
import { motion } from 'framer-motion';
import {
  INSTALLMENT_OPTIONS,
  installmentPlan,
  monthlyPayment,
  installmentTotal,
  peso,
} from '../data/plans';
import installmentPoster from '../assets/installment-plan.jpg';
import './InstallmentPlans.css';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

/**
 * Installment options for Full Enrollment. Hidden if that plan is ever
 * removed, rather than rendering prices for something that no longer exists.
 */
const InstallmentPlans: React.FC = () => {
  if (!installmentPlan) return null;

  const price = installmentPlan.price;

  return (
    <motion.section
      className="installment"
      aria-label="Installment options"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <figure className="installment-poster">
        <img
          src={installmentPoster}
          alt={`Review now, pay over time: ${installmentPlan.name} in one payment, or over 3 or 5 months`}
          loading="lazy"
        />
      </figure>

      <div className="installment-body">
        <h3>Review now, pay over time.</h3>
        <p className="installment-intro">
          Enroll today and pay in installments. Split your {installmentPlan.name} payment
          and start reviewing right away.
        </p>

        <motion.ul
          className="installment-options"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {INSTALLMENT_OPTIONS.map(option => {
            const monthly = monthlyPayment(price, option);
            const payInFull = option.months === 1;
            const total = installmentTotal(price, option);

            return (
              <motion.li
                key={option.months}
                className={`installment-option ${payInFull ? 'is-full' : ''}`}
                variants={item}
              >
                <span className="installment-option-label">{option.label}</span>
                <span className="installment-amount">
                  {peso(monthly)}
                  {!payInFull && <small>/mo</small>}
                </span>
                <span className="installment-note">{option.note}</span>
                {!payInFull && (
                  <span className="installment-total">
                    {option.months} payments · {peso(total)} total
                  </span>
                )}
              </motion.li>
            );
          })}
        </motion.ul>

        <p className="installment-how">
          Open the app and go to <strong>Payments</strong> to choose a plan. Downpayment
          today, the rest monthly.
        </p>
      </div>
    </motion.section>
  );
};

export default InstallmentPlans;
