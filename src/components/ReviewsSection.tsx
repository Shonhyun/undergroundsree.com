import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PUBLISHED_REVIEWS, HOME_PREVIEW_COUNT } from '../data/reviews';
import { ReviewCard, RatingSummary, ReviewsEmpty } from './Reviews';
import './ReviewsSection.css';

const ReviewsSection: React.FC = () => {
  const preview = PUBLISHED_REVIEWS.slice(0, HOME_PREVIEW_COUNT);
  const hasMore = PUBLISHED_REVIEWS.length > HOME_PREVIEW_COUNT;

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

        {PUBLISHED_REVIEWS.length === 0 ? (
          <>
            <ReviewsEmpty compact />
            <div className="reviews-more">
              <Link to="/reviews" className="btn btn-primary">Write a review</Link>
            </div>
          </>
        ) : (
          <>
            <RatingSummary reviews={PUBLISHED_REVIEWS} />

            <div className="reviews-grid">
              {preview.map(review => <ReviewCard key={review.id} review={review} />)}
            </div>

            <div className="reviews-more">
              <Link to="/reviews" className="btn btn-primary">
                {hasMore
                  ? `See all ${PUBLISHED_REVIEWS.length} reviews`
                  : 'See all reviews'}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
