import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HOME_PREVIEW_COUNT } from '../data/reviews';
import { useReviews } from '../hooks/useReviews';
import { ReviewCard, RatingSummary, ReviewsEmpty } from './Reviews';
import './ReviewsSection.css';

/** Seconds per card — the whole loop scales with how many are on screen. */
const SECONDS_PER_CARD = 6;

const ReviewsSection: React.FC = () => {
  const { reviews } = useReviews();
  const preview = reviews.slice(0, HOME_PREVIEW_COUNT);

  // The track holds the cards twice so the loop can restart invisibly at
  // the halfway point. The copy is hidden from assistive tech.
  const duration = preview.length * SECONDS_PER_CARD;

  return (
    <section id="reviews" className="reviews-section">
      <div className="container reviews-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2>What Students Say</h2>
          <p>Reviews from the students reviewing with Undergrounds right now.</p>
        </motion.div>

        {preview.length === 0 ? (
          <>
            <ReviewsEmpty compact />
            <div className="reviews-more">
              <Link to="/reviews" className="btn btn-primary">Write a review</Link>
            </div>
          </>
        ) : (
          <>
            <RatingSummary reviews={reviews} />

            <div className="reviews-marquee">
              <div
                className="reviews-track"
                style={{ animationDuration: `${duration}s` }}
              >
                {preview.map(review => (
                  <div className="reviews-slide" key={review.id}>
                    <ReviewCard review={review} noAnimate />
                  </div>
                ))}
                {preview.map(review => (
                  <div className="reviews-slide" key={`dup-${review.id}`} aria-hidden="true">
                    <ReviewCard review={review} noAnimate />
                  </div>
                ))}
              </div>
            </div>

            <div className="reviews-more">
              <Link to="/reviews" className="btn btn-primary">See all reviews</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
