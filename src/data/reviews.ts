/* ===========================================================================
   Student reviews.

   PUBLISHED_REVIEWS is the content source for the site. It is intentionally
   almost empty: these are testimonials from real paying customers, so the
   entries here must be things real students actually said. Fabricated
   reviews presented as genuine mislead people into paying, and under the
   Philippine Consumer Act (RA 7394) and the DTI's rules on deceptive sales
   practices, publishing invented testimonials is a real legal exposure on
   top of the reputational one.

   To fill this in:
     1. Collect real reviews — the Messenger group chat is the fastest route,
        and the app already has 5,000+ users to ask.
     2. Get the student's permission to publish their name and role.
     3. Add an entry below. `id` just has to be unique.
     4. Students can also submit through the form on /reviews; those land in
        the `reviews` Firestore collection as `pending` for approval.

   The two entries below are STRUCTURAL EXAMPLES so the layout can be checked.
   Replace or delete them before the site goes live — nothing about them is
   real, and `isExample` keeps them visibly labelled until they are gone.
   =========================================================================== */

export type Review = {
  id: string;
  name: string;
  role: string;
  rating: number; // 1-5
  text: string;
  date: string; // ISO date the review was given
  isExample?: boolean;
};

export const PUBLISHED_REVIEWS: Review[] = [
  {
    id: 'example-1',
    name: 'Sample Entry',
    role: 'Replace with the student\'s course or job',
    rating: 5,
    text: 'This is placeholder text showing how a review is laid out. Replace it with a real student\'s words, published with their permission.',
    date: '2026-01-15',
    isExample: true,
  },
  {
    id: 'example-2',
    name: 'Sample Entry',
    role: 'Replace with the student\'s course or job',
    rating: 4,
    text: 'A shorter one, to show how cards of different lengths sit next to each other.',
    date: '2026-02-02',
    isExample: true,
  },
];

/** Reviews that are safe to show publicly. */
export const realReviews = PUBLISHED_REVIEWS.filter(r => !r.isExample);

/** How many reviews the Home page previews before linking to the full page. */
export const HOME_PREVIEW_COUNT = 10;

/** Average rating across a set of reviews, to one decimal place. */
export function averageRating(reviews: Review[]): number | null {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

/** Count of each star value, 5 down to 1. */
export function ratingBreakdown(reviews: Review[]): { stars: number; count: number }[] {
  return [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
  }));
}

/** First letter of a name, for the avatar circle. */
export const initialOf = (name: string) => (name.trim()[0] || '?').toUpperCase();

export function formatReviewDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
