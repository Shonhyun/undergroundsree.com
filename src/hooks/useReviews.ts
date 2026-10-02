import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { PUBLISHED_REVIEWS, type Review } from '../data/reviews';

const MAX_FETCHED = 200;

type FetchedReview = {
  name?: unknown;
  role?: unknown;
  rating?: unknown;
  text?: unknown;
  createdAt?: { toDate?: () => Date } | null;
};

/** Keeps a malformed document from breaking the page. */
function toReview(id: string, data: FetchedReview): Review | null {
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const role = typeof data.role === 'string' ? data.role.trim() : '';
  const text = typeof data.text === 'string' ? data.text.trim() : '';
  const rating = typeof data.rating === 'number' ? data.rating : 0;

  if (!name || !text || rating < 1 || rating > 5) return null;

  const created = data.createdAt?.toDate?.();
  return {
    id,
    name,
    role: role || 'Student',
    rating: Math.round(rating),
    text,
    date: (created ?? new Date()).toISOString().slice(0, 10),
  };
}

/**
 * The 50 seeded reviews plus anything students have posted, newest first.
 * Posted reviews appear immediately — there is no approval step.
 *
 * If Firestore cannot be reached the seeded list is still returned, so the
 * section never renders empty because of a network or permissions problem.
 */
export function useReviews(): { reviews: Review[]; add: (review: Review) => void } {
  const [submitted, setSubmitted] = useState<Review[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(MAX_FETCHED))
        );
        if (cancelled) return;
        const rows = snap.docs
          .map(doc => toReview(doc.id, doc.data() as FetchedReview))
          .filter((r): r is Review => r !== null);
        setSubmitted(rows);
      } catch (err) {
        console.error('Could not load submitted reviews:', err);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  /** Shows a just-posted review without waiting for a refetch. */
  const add = (review: Review) => setSubmitted(prev => [review, ...prev]);

  return { reviews: [...submitted, ...PUBLISHED_REVIEWS], add };
}
