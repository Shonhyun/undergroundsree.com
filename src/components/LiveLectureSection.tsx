import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import liveLectureImg from '../assets/live-lecture.jpg';
import './LiveLectureSection.css';

/* ===========================================================================
   Live lecture schedule. Update these when the term changes.
   =========================================================================== */
const CLASS_START = new Date(2026, 10, 11); // 11 November 2026 (month is 0-based)
const CLASS_START_LABEL = 'November 11, 2026';
const LECTURE_DAYS = 'Monday, Wednesday & Friday';
const LECTURE_TIME = '8:00 PM';

/** Whole days from today until classes start; negative once they have begun. */
function daysUntilStart(): number {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((CLASS_START.getTime() - startOfToday.getTime()) / msPerDay);
}

const icon = (d: React.ReactNode) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const IconCalendar = icon(<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>);
const IconClock = icon(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>);
const IconReplay = icon(<><rect x="5" y="2" width="14" height="20" rx="2" /><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none" /></>);

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

const LiveLectureSection: React.FC = () => {
  const days = daysUntilStart();

  let countdown: string | null = null;
  if (days > 1) countdown = `${days} days to go`;
  else if (days === 1) countdown = 'Starts tomorrow';
  else if (days === 0) countdown = 'Starts today';

  return (
    <section id="live-lectures" className="live-section">
      <div className="container live-layout">

        {/* Left: schedule poster */}
        <motion.figure
          className="live-poster"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <img
            src={liveLectureImg}
            alt={`Undergrounds live lectures every ${LECTURE_DAYS} at ${LECTURE_TIME}, with replays available in the app`}
            loading="lazy"
          />
        </motion.figure>

        {/* Right: start of classes */}
        <motion.div
          className="live-copy"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.1 }}
        >
          <span className="live-eyebrow">Live Lectures</span>
          <h2>
            Classes start
            <span className="live-date">{CLASS_START_LABEL}</span>
          </h2>

          {countdown && <span className="live-countdown">{countdown}</span>}

          <p className="live-intro">
            Live teaching sessions with your instructors, straight from the app. Miss one
            and the replay is waiting for you.
          </p>

          <ul className="live-facts">
            <li>
              <span className="live-fact-icon">{IconCalendar}</span>
              <span>
                <strong>{LECTURE_DAYS}</strong>
                <small>Three live sessions every week</small>
              </span>
            </li>
            <li>
              <span className="live-fact-icon">{IconClock}</span>
              <span>
                <strong>{LECTURE_TIME}</strong>
                <small>Same time each session</small>
              </span>
            </li>
            <li>
              <span className="live-fact-icon">{IconReplay}</span>
              <span>
                <strong>Replays in the app</strong>
                <small>Rewatch any session, anytime</small>
              </span>
            </li>
          </ul>

          <Link to="/enroll" className="btn btn-primary live-cta">
            Reserve your slot
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default LiveLectureSection;
