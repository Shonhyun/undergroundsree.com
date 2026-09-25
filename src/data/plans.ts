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
   REFERRAL DISCOUNT — still awaiting the client's confirmation.
   Taken from the brief as: "invite a friend and Full Enrollment drops from
   about 8,000 to about 7,000" — i.e. 1 invite, P1,000 off, Full Enrollment.
   Changing these three values updates every page that shows the offer.
   --------------------------------------------------------------------------- */
export const REFERRAL_INVITES_REQUIRED = 1;
export const REFERRAL_DISCOUNT = 1000;
export const REFERRAL_APPLIES_TO = 'full';

export const referralPlan = ALL_PLANS.find(p => p.id === REFERRAL_APPLIES_TO);

export const peso = (n: number) => '₱' + n.toLocaleString('en-PH');

export const APP_STORE_LINK =
  'https://apps.apple.com/us/app/undergrounds-ree-review/id6745921735';
export const PLAY_STORE_LINK =
  'https://play.google.com/store/apps/details?id=com.undergrounds.reviewcenterapp&pcampaignid=web_share';
