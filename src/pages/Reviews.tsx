import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { ReviewCard, RatingSummary, ReviewsEmpty } from '../components/Reviews';
import { useReviews } from '../hooks/useReviews';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Reviews.css';

const MAX_TEXT = 600;

const ReviewsPage: React.FC = () => {
  const { reviews, add } = useReviews();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please choose a rating.');
      return;
    }

    setSubmitting(true);
    setError(null);
    const entry = {
      name: name.trim(),
      role: role.trim(),
      rating,
      text: text.trim(),
    };

    try {
      const doc = await addDoc(collection(db, 'reviews'), {
        ...entry,
        createdAt: serverTimestamp(),
      });
      // Show it straight away rather than waiting for a refetch.
      add({ ...entry, id: doc.id, date: new Date().toISOString().slice(0, 10) });
      setSubmitted(true);
    } catch (err) {
      console.error('Review submission failed:', err);
      setError('Sorry, that did not send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setRole('');
    setRating(0);
    setText('');
    setSubmitted(false);
    setError(null);
  };

  return (
    <PageTransition>
      <div className="support-page-container">
        <div className="container reviews-page">

          <motion.div
            className="reviews-page-head"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="reviews-eyebrow">Student Reviews</span>
            <h1>What Students Say</h1>
            <p>
              Honest words from students reviewing with Undergrounds. Reviewed with us?
              Add yours below.
            </p>
          </motion.div>

          {reviews.length > 0 ? (
            <>
              <RatingSummary reviews={reviews} />
              <div className="reviews-grid">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </>
          ) : (
            <ReviewsEmpty />
          )}

          {/* --- Write a review --- */}
          <motion.div
            className="review-form-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Write a review</h2>

            {submitted ? (
              <div className="review-thanks">
                <h3>Thank you — your review is live.</h3>
                <p>
                  It is now on this page with everyone else's. Scroll up and you will
                  find it at the top.
                </p>
                <button type="button" className="btn btn-outline" onClick={resetForm}>
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="review-form-row">
                  <div className="form-group">
                    <label htmlFor="rv-name">Your name</label>
                    <input
                      id="rv-name"
                      className="form-control"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Juan dela Cruz"
                      maxLength={60}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rv-role">Course or job</label>
                    <input
                      id="rv-role"
                      className="form-control"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      placeholder="e.g. BSEE Graduate, Batch 2026"
                      maxLength={80}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <span className="review-rating-label">Your rating</span>
                  <div
                    className="review-rating-input"
                    role="radiogroup"
                    aria-label="Your rating"
                    onMouseLeave={() => setHovered(0)}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={rating === n}
                        aria-label={`${n} ${n === 1 ? 'star' : 'stars'}`}
                        className={`review-rating-star ${n <= (hovered || rating) ? 'is-on' : ''}`}
                        onClick={() => { setRating(n); setError(null); }}
                        onMouseEnter={() => setHovered(n)}
                        onFocus={() => setHovered(n)}
                        onBlur={() => setHovered(0)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      </button>
                    ))}
                    {(hovered || rating) > 0 && (
                      <span className="review-rating-value">{hovered || rating} / 5</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="rv-text">Your review</label>
                  <textarea
                    id="rv-text"
                    className="form-control"
                    value={text}
                    onChange={e => setText(e.target.value.slice(0, MAX_TEXT))}
                    placeholder="How did Undergrounds help your review? English or Taglish — whichever you are comfortable with."
                    rows={5}
                    required
                  />
                  <span className="review-count">{text.length} / {MAX_TEXT}</span>
                </div>

                {error && <p className="review-error">{error}</p>}

                <p className="review-note">
                  Your review goes live straight away. Only share a name you are happy to
                  have published.
                </p>

                <button
                  type="submit"
                  className="btn btn-primary review-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Sending…' : 'Submit review'}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

export default ReviewsPage;
