/* ===========================================================================
   Student reviews.

   NOTE ON THE CONTENT BELOW: these entries are sample review data supplied by
   the client, not quotes from identified customers. Swap them for real
   reviews as students send them in. Submissions from the form on /reviews
   land in the `reviews` Firestore collection as `pending` for approval.

   To add a review: append an entry with a unique `id`. Every figure on the
   site — the average, the counts, the star breakdown — is derived from this
   list, so it stays consistent on its own.
   =========================================================================== */

export type Review = {
  id: string;
  name: string;
  age?: number;
  role: string;
  rating: number; // 1-5
  text: string;
  date: string; // ISO date the review was given
  isExample?: boolean;
};

export const PUBLISHED_REVIEWS: Review[] = [
  { id: 'r1', name: 'Miguel Santos', age: 27, role: 'Electrical Engineer', rating: 5, date: '2026-10-01', text: 'Solid reviewer. I usually study after work, so malaking help yung organized materials and practice questions.' },
  { id: 'r2', name: 'Alyssa Marie Cruz', age: 24, role: 'Civil Engineering Graduate', rating: 4, date: '2026-09-28', text: 'I like how easy it is to go back to topics I struggled with. Very convenient lalo na kapag short lang yung study time.' },
  { id: 'r3', name: 'Joshua Daniel Reyes', age: 30, role: 'Mechanical Engineer', rating: 5, date: '2026-09-25', text: 'Working while reviewing is not easy, but having everything in one app makes it much more manageable.' },
  { id: 'r4', name: 'Christine Joy Navarro', age: 26, role: 'Registered Nurse', rating: 4, date: '2026-09-22', text: 'Very useful during my free time. I can review kahit break time or before sleeping.' },
  { id: 'r5', name: 'Kevin John Bautista', age: 32, role: 'Project Engineer', rating: 5, date: '2026-09-19', text: 'I only have limited time for review, so I really like being able to do a few questions whenever I have free time.' },
  { id: 'r6', name: 'Patricia Anne Flores', age: 29, role: 'Architect', rating: 4, date: '2026-09-16', text: "Clean and easy to use. I don't need to spend too much time figuring out where everything is." },
  { id: 'r7', name: 'Daniel Joseph Aquino', age: 35, role: 'Civil Engineer', rating: 5, date: '2026-09-13', text: 'Been working for years and had to refresh a lot of concepts. This made reviewing less overwhelming.' },
  { id: 'r8', name: 'Rhea Camille Torres', age: 21, role: 'Engineering Student', rating: 4, date: '2026-09-10', text: 'I like using it when preparing for exams. The explanations help me understand where I went wrong.' },
  { id: 'r9', name: 'Francis Miguel Lim', age: 34, role: 'Electrical Engineer', rating: 5, date: '2026-09-07', text: 'Very convenient for reviewing after work. I can study at my own pace without feeling pressured.' },
  { id: 'r10', name: 'Mary Grace Villanueva', age: 28, role: 'Accountant', rating: 3, date: '2026-09-04', text: 'The materials are helpful and I like the practice questions. I just wish there were a few more options for customizing my review sessions.' },
  { id: 'r11', name: 'Adrian Paul Garcia', age: 25, role: 'Electrical Engineer', rating: 5, date: '2026-09-01', text: 'The practice exams are my favorite part. It feels more structured compared to just reading notes.' },
  { id: 'r12', name: 'Jasmine Nicole Ramos', age: 31, role: 'Registered Nurse', rating: 4, date: '2026-08-29', text: 'I work long shifts, so having a reviewer I can open anytime is really convenient. Simple and straightforward.' },
  { id: 'r13', name: 'Mark Anthony Dela Cruz', age: 37, role: 'Site Engineer', rating: 5, date: '2026-08-26', text: "I don't have much time after work, but even 20-30 minutes of review feels productive with this app." },
  { id: 'r14', name: 'Angela Mae Castillo', age: 22, role: 'Engineering Student', rating: 4, date: '2026-08-23', text: 'I like that I can practice questions instead of just reading everything. It helps me remember the concepts better.' },
  { id: 'r15', name: 'Rafael Antonio Santos', age: 39, role: 'Construction Engineer', rating: 5, date: '2026-08-20', text: 'After several years in the field, I needed something that would help me refresh the basics. Very useful for my schedule.' },
  { id: 'r16', name: 'Nicole Andrea Reyes', age: 20, role: 'Engineering Student', rating: 4, date: '2026-08-17', text: 'I can quickly see which topics I need to spend more time on. It makes my review sessions easier to manage.' },
  { id: 'r17', name: 'Jerome Carlo Fernandez', age: 28, role: 'Electrical Engineer', rating: 5, date: '2026-08-14', text: 'Kahit after work na, I can still get some review done. The flexibility is a big plus for me.' },
  { id: 'r18', name: 'Beatrice Anne Domingo', age: 25, role: 'Teacher', rating: 3, date: '2026-08-11', text: 'I like the overall experience and the materials are useful. Some sections could be a little easier to navigate, but overall okay naman.' },
  { id: 'r19', name: 'Nathaniel James Ong', age: 33, role: 'Electronics Engineer', rating: 5, date: '2026-08-08', text: 'Good for people who prefer practicing questions. I can immediately check my mistakes and review the solution.' },
  { id: 'r20', name: 'Camille Sophia Tan', age: 24, role: 'Civil Engineering Graduate', rating: 4, date: '2026-08-05', text: 'I like having my review materials in one place. Mas madaling mag-focus kapag hindi na kailangang mag-switch between different files.' },
  { id: 'r21', name: 'Gabriel Luis Mercado', age: 29, role: 'Mechanical Engineer', rating: 5, date: '2026-08-02', text: 'The mock exams are useful for checking my progress. It gives me a better idea of which areas still need work.' },
  { id: 'r22', name: 'Hannah Marie Salazar', age: 19, role: 'Engineering Student', rating: 4, date: '2026-07-30', text: 'I use it mostly during free periods and at night. Very convenient for quick review sessions.' },
  { id: 'r23', name: 'Christian Paolo Rivera', age: 36, role: 'Project Manager', rating: 5, date: '2026-07-27', text: "Working full-time means I can't follow a traditional review schedule. I like that I can study at my own pace." },
  { id: 'r24', name: 'Erika Jean Manalo', age: 23, role: 'Nursing Graduate', rating: 4, date: '2026-07-24', text: 'The straightforward layout is one of the things I like most. Easy to open and start reviewing.' },
  { id: 'r25', name: 'Luis Miguel Herrera', age: 31, role: 'Electrical Engineer', rating: 5, date: '2026-07-21', text: "I usually review after my shift, and it's convenient to have everything accessible whenever I have time." },
  { id: 'r26', name: 'Shaira Nicole Bautista', age: 26, role: 'Architect', rating: 4, date: '2026-07-18', text: 'The practice questions are a big help. I noticed that I remember concepts better when I actually answer questions.' },
  { id: 'r27', name: 'Patrick Joseph Co', age: 38, role: 'Engineering Consultant', rating: 5, date: '2026-07-15', text: 'I appreciate having different review materials in one place. Less time organizing and more time actually studying.' },
  { id: 'r28', name: 'Maureen Claire Garcia', age: 30, role: 'Registered Nurse', rating: 4, date: '2026-07-12', text: 'I usually have very little time for review, so being able to do short sessions is really helpful.' },
  { id: 'r29', name: 'John Carlo Villareal', age: 22, role: 'Electrical Engineering Student', rating: 3, date: '2026-07-09', text: "Good app for practice. I like reviewing questions that I got wrong. Some parts could still be improved, but it's useful overall." },
  { id: 'r30', name: 'Denise Marie Aquino', age: 27, role: 'Civil Engineer', rating: 5, date: '2026-07-06', text: 'I can review whenever I have free time. Everything feels organized and easy to access.' },
  { id: 'r31', name: 'Robert James Flores', age: 40, role: 'Senior Engineer', rating: 4, date: '2026-07-03', text: 'I needed something flexible because of work. Being able to review whenever I have free time works well for me.' },
  { id: 'r32', name: 'Kristine Mae Ramos', age: 25, role: 'Accountant', rating: 5, date: '2026-06-30', text: "Simple, organized, and useful. I don't feel lost when choosing what to review." },
  { id: 'r33', name: 'Anthony Gabriel Cruz', age: 34, role: 'Electrical Engineer', rating: 4, date: '2026-06-27', text: 'I usually only have an hour or two after work. The app helps me make those hours count.' },
  { id: 'r34', name: 'Maria Angela Santos', age: 21, role: 'Engineering Student', rating: 5, date: '2026-06-24', text: "The explanations after answering are really helpful. I don't just know if I'm wrong, I can also understand why." },
  { id: 'r35', name: 'Kenneth Paul Navarro', age: 28, role: 'Civil Engineer', rating: 4, date: '2026-06-21', text: 'The app is easy to navigate and the practice materials are useful. Good option for flexible studying.' },
  { id: 'r36', name: 'Janelle Marie Dizon', age: 32, role: 'Registered Nurse', rating: 5, date: '2026-06-18', text: 'Reviewing after a long shift can be tiring, so I prefer something simple. This app fits that kind of routine.' },
  { id: 'r37', name: 'Vincent Gabriel Tan', age: 24, role: 'Mechanical Engineering Graduate', rating: 4, date: '2026-06-15', text: 'I use it for quick practice sessions. Kahit 10 questions lang, I still feel like I accomplished something.' },
  { id: 'r38', name: 'Sophia Elaine Reyes', age: 29, role: 'Teacher', rating: 3, date: '2026-06-12', text: 'The review materials are helpful and I like the flexibility. I think the experience could still be smoother in some areas, but overall okay.' },
  { id: 'r39', name: 'Michael Andre Velasco', age: 33, role: 'Electrical Engineer', rating: 5, date: '2026-06-09', text: 'Good balance between practice and reviewing concepts. Helpful especially when preparing after work.' },
  { id: 'r40', name: 'Andrea Nicole Mendoza', age: 20, role: 'Engineering Student', rating: 4, date: '2026-06-06', text: 'I like that I can study whenever I want. It works well for quick reviews before an exam.' },
  { id: 'r41', name: 'Joshua Miguel Tan', age: 26, role: 'Electronics Engineer', rating: 5, date: '2026-06-03', text: 'The app is easy to use and the practice materials are useful. I spend less time organizing my review and more time studying.' },
  { id: 'r42', name: 'Clarisse Mae Villanueva', age: 37, role: 'Registered Nurse', rating: 4, date: '2026-05-31', text: 'I had to relearn a lot after working for a few years. Having everything accessible makes the process easier.' },
  { id: 'r43', name: 'Mark Steven Garcia', age: 30, role: 'Construction Engineer', rating: 5, date: '2026-05-28', text: 'I usually study after my shift. The flexibility is probably what I like most about using the app.' },
  { id: 'r44', name: 'Isabelle Marie Cruz', age: 18, role: 'Engineering Student', rating: 3, date: '2026-05-25', text: 'Helpful for practicing before exams. I like being able to see which questions I need to review again.' },
  { id: 'r45', name: 'Paolo Vincent Reyes', age: 39, role: 'Electrical Engineer', rating: 5, date: '2026-05-22', text: "I've been working for several years, so I needed something I could use on my own schedule. Very convenient." },
  { id: 'r46', name: 'Leah Christine Navarro', age: 27, role: 'Civil Engineer', rating: 4, date: '2026-05-19', text: 'I like having my review materials and practice in one place. Mas madaling mag-stick sa routine.' },
  { id: 'r47', name: 'Aaron Joseph Bautista', age: 23, role: 'Engineering Graduate', rating: 4, date: '2026-05-16', text: 'Useful for daily practice. I usually answer a few questions whenever I have free time.' },
  { id: 'r48', name: 'Michelle Anne Torres', age: 35, role: 'Project Engineer', rating: 5, date: '2026-05-13', text: 'As someone working full-time, I appreciate having a flexible way to review. I can study without following a fixed schedule.' },
  { id: 'r49', name: 'Carlo Vincent Mendoza', age: 23, role: 'Electrical Engineering Graduate', rating: 2, date: '2026-05-10', text: 'The practice questions are useful, but I found some parts of the review flow a little confusing. Hopefully the navigation can be improved.' },
  { id: 'r50', name: 'Michelle Grace Flores', age: 28, role: 'Civil Engineer', rating: 2, date: '2026-05-07', text: 'The materials are helpful, but I had some difficulty finding certain topics at first. Once I got used to it, the experience became better.' },
];

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
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
