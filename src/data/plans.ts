/* ===========================================================================
   Single source of truth for programs, pricing and the referral offer.
   Both the Enroll page and the Home page pricing section read from here, so
   a price only ever has to be changed in one place.
   =========================================================================== */

export type Plan = {
  id: string;
  name: string;
  price: number;
  badge?: string;
};

export const REVIEW_PLANS: Plan[] = [
  { id: 'math', name: 'MATH', price: 2499 },
  { id: 'esas', name: 'ESAS', price: 2499 },
  { id: 'ee', name: 'EE', price: 2499 },
  { id: 'refresher', name: 'REFRESHER', price: 2499 },
  { id: 'full', name: 'FULL ENROLLMENT', price: 7999, badge: 'Best Value' },
];

export const MOCK_PLANS: Plan[] = [
  { id: 'math_mock', name: 'MATH Mock Board', price: 250 },
  { id: 'esas_mock', name: 'ESAS Mock Board', price: 250 },
  { id: 'ee_mock', name: 'EE Mock Board', price: 250 },
  { id: 'all_mock', name: 'ALL MOCK BOARDS', price: 500 },
];

export const ALL_PLANS: Plan[] = [...REVIEW_PLANS, ...MOCK_PLANS];

/* ---------------------------------------------------------------------------
   REFERRAL DISCOUNT — confirmed by the campaign posters (app-promo1/2.png):
   "Invite 1 friend. Both save P1,000." Both the referrer and the friend get
   P1,000 off their enrollment.
   Changing these values updates every page that shows the offer.
   --------------------------------------------------------------------------- */
export const REFERRAL_INVITES_REQUIRED = 1;
export const REFERRAL_DISCOUNT = 1000;
export const REFERRAL_APPLIES_TO = 'full';

export const referralPlan = ALL_PLANS.find(p => p.id === REFERRAL_APPLIES_TO);

/* ---------------------------------------------------------------------------
   INSTALLMENTS — split Full Enrollment over several months for a surcharge.
   Monthly figures are computed from the plan price rather than written in, so
   a price change carries through instead of leaving stale numbers on a page
   that quotes money.
   --------------------------------------------------------------------------- */
export const INSTALLMENT_APPLIES_TO = 'full';

export const installmentPlan = ALL_PLANS.find(p => p.id === INSTALLMENT_APPLIES_TO);

export type InstallmentOption = {
  months: number;
  label: string;
  /** Surcharge on the plan price, as a fraction. 0 for paying in full. */
  interest: number;
  note: string;
};

export const INSTALLMENT_OPTIONS: InstallmentOption[] = [
  { months: 1, label: 'Pay in full', interest: 0, note: 'One payment' },
  { months: 3, label: '3 months', interest: 0.0625, note: '+6.25% interest' },
  { months: 5, label: '5 months', interest: 0.125, note: '+12.5% interest' },
];

/** What one monthly payment comes to, rounded to the peso. */
export const monthlyPayment = (price: number, option: InstallmentOption) =>
  Math.round((price * (1 + option.interest)) / option.months);

/** What the plan costs in total under this option. */
export const installmentTotal = (price: number, option: InstallmentOption) =>
  monthlyPayment(price, option) * option.months;

export const peso = (n: number) => '₱' + n.toLocaleString('en-PH');

export const APP_STORE_LINK =
  'https://apps.apple.com/us/app/undergrounds-ree-review/id6745921735';
export const PLAY_STORE_LINK =
  'https://play.google.com/store/apps/details?id=com.undergrounds.reviewcenterapp&pcampaignid=web_share';

/** Enrollment form, for students who would rather sign up through the website. */
export const ENROLL_FORM_LINK =
  'https://docs.google.com/forms/d/e/1FAIpQLSdUGopgYWyTpyTDef17rbCt9CaYm3Yk2kiCqveg-hZbzsgBZg/viewform?usp=send_form';

/** How a student enrolls, shown on the Enroll page. `action` renders in bold. */
export const ENROLL_STEPS = [
  { action: 'Download Undergrounds REE', detail: 'from the App Store or Google Play.' },
  { action: 'Create your account', detail: 'by opening the app and signing up.' },
  { action: 'Log in', detail: 'using the account you just created.' },
  { action: 'Go to the Payments screen', detail: 'and choose your program.' },
  { action: 'Complete your payment', detail: "and you're enrolled." },
];
