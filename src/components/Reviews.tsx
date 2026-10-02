import React from 'react';
import { motion } from 'framer-motion';
import {
  type Review,
  averageRating,
  ratingBreakdown,
  initialOf,
  formatReviewDate,
} from '../data/reviews';
import './Reviews.css';

/* --- Stars ---------------------------------------------------------------- */

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`review-star ${filled ? 'is-filled' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const StarRating: React.FC<{ rating: number; label?: string }> = ({ rating, label }) => (
  <span className="review-stars" role="img" aria-label={label ?? `${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(n => <Star key={n} filled={n <= Math.round(rating)} />)}
  </span>
);

/* --- Single review card ---------------------------------------------------- */

export const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <motion.article
    className={`review-card ${review.isExample ? 'is-example' : ''}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    {review.isExample && <span className="review-example-tag">Example — replace before launch</span>}

    <header className="review-head">
      <span className="review-avatar" aria-hidden="true">{initialOf(review.name)}</span>
      <div className="review-who">
        <strong>{review.name}</strong>
        <small>{review.role}</small>
      </div>
    </header>

    <StarRating rating={review.rating} />

    <p className="review-text">{review.text}</p>

    {review.date && <time className="review-date">{formatReviewDate(review.date)}</time>}
  </motion.article>
);

/* --- Rating summary -------------------------------------------------------- */

export const RatingSummary: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const average = averageRating(reviews);
  if (average === null) return null;

  const breakdown = ratingBreakdown(reviews);

  return (
    <div className="review-summary">
      <div className="review-score">
        <span className="review-score-value">{average.toFixed(1)}</span>
        <StarRating rating={average} label={`Average rating ${average} out of 5`} />
        <small>
          Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </small>
      </div>

      <div className="review-bars">
        {breakdown.map(({ stars, count }) => {
          const pct = reviews.length ? (count / reviews.length) * 100 : 0;
          return (
            <div className="review-bar-row" key={stars}>
              <span className="review-bar-label">{stars}</span>
              <span className="review-bar-track">
                <span className="review-bar-fill" style={{ width: `${pct}%` }} />
              </span>
              <span className="review-bar-count">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* --- Empty state ----------------------------------------------------------- */

export const ReviewsEmpty: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <div className={`review-empty ${compact ? 'is-compact' : ''}`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    <h3>No reviews yet</h3>
    <p>
      Be the first to share how Undergrounds helped your review. Your words could be
      what convinces the next student to start.
    </p>
  </div>
);
