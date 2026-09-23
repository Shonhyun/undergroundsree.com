import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Enroll.css';

/* --- Payment details (mirrors the mobile app) ------------------------------ */
const GCASH_NUMBER = '0926 553 7411';
const GCASH_NAME = 'CLIBOURN QUIAPO';

// Drop the GCash/InstaPay QR image into src/assets/ and import it here to show
// it on Step 3. Until then, Step 3 shows the number with a placeholder slot.
// e.g. import gcashQr from '../assets/gcash-qr.png';
const GCASH_QR_IMAGE: string | null = null;

// TODO: replace with Engr. Clibourn's own Messenger link when available.
const ADMIN_MESSENGER_LINK =
  'https://m.me/ch/AbbLJzyPOXZRq0oy/?send_source=cm%3Acopy_invite_link&join_source=cm%3Axma';

const MAX_PROOF_BYTES = 10 * 1024 * 1024; // 10MB

/* --- Plans ----------------------------------------------------------------- */
type Plan = { id: string; name: string; price: number; badge?: string };

const REVIEW_PLANS: Plan[] = [
  { id: 'math', name: 'MATH', price: 2499 },
  { id: 'esas', name: 'ESAS', price: 2499 },
  { id: 'ee', name: 'EE', price: 2499 },
  { id: 'refresher', name: 'REFRESHER', price: 2499 },
  { id: 'full', name: 'FULL ENROLLMENT', price: 7999, badge: 'Best Value' },
];

const MOCK_PLANS: Plan[] = [
  { id: 'math_mock', name: 'MATH Mock Board', price: 250 },
  { id: 'esas_mock', name: 'ESAS Mock Board', price: 250 },
  { id: 'ee_mock', name: 'EE Mock Board', price: 250 },
  { id: 'all_mock', name: 'ALL MOCK BOARDS', price: 500 },
];

const REVIEW_SINGLE_IDS = ['math', 'esas', 'ee', 'refresher'];
const MOCK_SINGLE_IDS = ['math_mock', 'esas_mock', 'ee_mock'];

/* --- Terms ----------------------------------------------------------------- */
type Rule = { text: string; offenses?: string[] };

const TERMS: Record<'tag' | 'eng', { title: string; agree: string; rules: Rule[] }> = {
  tag: {
    title: 'Mga Tuntunin',
    agree: 'Naiintindihan at sumasang-ayon ako sa mga Tuntunin',
    rules: [
      {
        text: 'Tandaan na ang lahat ng ibinayad ay pinal at hindi na maibabalik (non-refundable). Paki-check nang mabuti ang inyong napiling program at mga detalye bago tapusin ang transaksyon.',
      },
      {
        text: 'Kailangang mag-upload ng malinaw na screenshot o resibo ng inyong bayad para ma-verify namin ang inyong transaksyon.',
      },
      {
        text: 'Ang inyong access sa review materials at platform ay mananatiling active hanggang sa paglabas ng resulta ng board exam.',
      },
      {
        text: 'Mahigpit na ipinagbabawal ang pag-screenshot ng mga PDF files. Anumang pagsubok ay maituturing na paglabag:',
        offenses: [
          '1st offense - Babala (Warning)',
          '2nd offense - 24 hours account restriction',
          '3rd offense - Permanent account ban',
        ],
      },
    ],
  },
  eng: {
    title: 'Terms & Conditions',
    agree: 'I understand and agree to the Terms & Conditions',
    rules: [
      {
        text: 'Please note that all payments are final and non-refundable. Kindly double-check your selected program and details before completing the transaction.',
      },
      {
        text: 'You must upload a clear screenshot or receipt of your payment so we can verify your transaction.',
      },
      {
        text: 'Your access to the review materials and platform will remain active until the release of the board exam results.',
      },
      {
        text: 'Taking screenshots of PDF files is strictly prohibited. Any attempt will be treated as a violation:',
        offenses: [
          '1st offense - Warning',
          '2nd offense - 24 hours account restriction',
          '3rd offense - Permanent account ban',
        ],
      },
    ],
  },
};

/* --- Icons ----------------------------------------------------------------- */
const icon = (d: React.ReactNode) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const IconShield = icon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><circle cx="12" cy="11" r="2" /></>);
const IconReceipt = icon(<><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="15" y2="12" /></>);
const IconCalendar = icon(<><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><polyline points="9 14 11 16 15 12" /></>);
const IconLock = icon(<><rect x="5" y="11" width="14" height="11" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>);
const IconDoc = icon(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>);
const IconInfo = icon(<><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>);
const IconCheckCircle = icon(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>);
const IconUpload = icon(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>);
const IconClipboard = icon(<><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></>);
const IconClock = icon(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>);
const IconHelp = icon(<><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>);
const IconMoney = icon(<><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /></>);
const IconHash = icon(<><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></>);
const IconShieldSmall = icon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>);

const RULE_ICONS = [IconShield, IconReceipt, IconCalendar, IconLock];

const IconTick = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

/* --- Helpers --------------------------------------------------------------- */
const peso = (n: number) => '₱' + n.toLocaleString('en-PH');

function makeReferenceId(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  const date = `${p(d.getMonth() + 1)}${p(d.getDate())}${d.getFullYear()}`;
  const time = `${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
  return `PAY-${date}-${time}`;
}

function formatSubmitted(d: Date) {
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${date} • ${time}`;
}

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

const TOTAL_STEPS = 5;

const Enroll: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [lang, setLang] = useState<'tag' | 'eng'>('tag');
  const [agreed, setAgreed] = useState(false);
  const [proof, setProof] = useState<{ file: File; url: string } | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [copied, setCopied] = useState(false);
  const [submission, setSubmission] = useState<{ ref: string; at: Date } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allPlans = [...REVIEW_PLANS, ...MOCK_PLANS];
  const chosen = allPlans.filter(p => selected.includes(p.id));
  const total = chosen.reduce((sum, p) => sum + p.price, 0);
  const programLabel = chosen.map(p => p.name).join(' + ').toUpperCase();

  // Bundles and their individual items are mutually exclusive
  const togglePlan = (id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      let next = [...prev, id];
      if (id === 'full') next = next.filter(x => !REVIEW_SINGLE_IDS.includes(x));
      if (REVIEW_SINGLE_IDS.includes(id)) next = next.filter(x => x !== 'full');
      if (id === 'all_mock') next = next.filter(x => !MOCK_SINGLE_IDS.includes(x));
      if (MOCK_SINGLE_IDS.includes(id)) next = next.filter(x => x !== 'all_mock');
      return next;
    });
  };

  const goTo = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(GCASH_NUMBER.replace(/\s/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setUploadError('Please choose a PNG or JPG image.');
      return;
    }
    if (file.size > MAX_PROOF_BYTES) {
      setUploadError('That file is larger than 10MB. Please choose a smaller image.');
      return;
    }
    setUploadError('');
    if (proof) URL.revokeObjectURL(proof.url);
    setProof({ file, url: URL.createObjectURL(file) });
  };

  const removeProof = () => {
    if (proof) URL.revokeObjectURL(proof.url);
    setProof(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const submit = () => {
    const at = new Date();
    setSubmission({ ref: makeReferenceId(at), at });
    goTo(5);
  };

  const restart = () => {
    removeProof();
    setSelected([]);
    setAgreed(false);
    setSubmission(null);
    setUploadError('');
    goTo(1);
  };

  const t = TERMS[lang];

  const renderPlan = (plan: Plan) => {
    const isSelected = selected.includes(plan.id);
    return (
      <button
        key={plan.id}
        type="button"
        className={`enroll-plan ${isSelected ? 'is-selected' : ''}`}
        onClick={() => togglePlan(plan.id)}
        aria-pressed={isSelected}
      >
        <span className="enroll-box">{isSelected && IconTick}</span>
        <span className="enroll-plan-name">
          {plan.name}
          {plan.badge && <span className="enroll-badge">{plan.badge}</span>}
        </span>
        <span className="enroll-plan-price">{peso(plan.price)}</span>
      </button>
    );
  };

  return (
    <PageTransition>
      <div className="support-page-container">
        <div className="container enroll-wrap">

          {/* Stepper */}
          <div className="enroll-stepper" aria-hidden="true">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(n => (
              <React.Fragment key={n}>
                {n > 1 && <span className={`enroll-step-line ${step >= n ? 'is-done' : ''}`} />}
                <span className={`enroll-step-dot ${step === n ? 'is-active' : ''} ${step > n ? 'is-done' : ''}`}>
                  {n}
                </span>
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ---------------- Step 1 — Choose a Plan ---------------- */}
            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="enroll-head">
                  <span className="enroll-step-label">Step 1 of 5</span>
                  <h1>Choose a Plan</h1>
                  <p>Select the program or package you want to enroll in and continue.</p>
                </div>

                <h2 className="enroll-group-title">Online Review Enrollment</h2>
                {REVIEW_PLANS.map(renderPlan)}

                <h2 className="enroll-group-title">Mock Boards Enrollment</h2>
                {MOCK_PLANS.map(renderPlan)}

                <div className="enroll-total">
                  <span className="enroll-total-label">Total Due:</span>
                  <span className="enroll-total-value">{peso(total)}</span>
                </div>

                <div className="enroll-note">
                  {IconShieldSmall}
                  <span>
                    <strong>Your enrollment details are handled securely.</strong>
                    We never store your payment details on this website.
                  </span>
                </div>

                <div className="enroll-actions">
                  <button
                    type="button"
                    className="btn btn-primary enroll-btn-main"
                    disabled={total === 0}
                    onClick={() => goTo(2)}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---------------- Step 2 — Read & Accept Terms ---------------- */}
            {step === 2 && (
              <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="enroll-head">
                  <span className="enroll-step-label">Step 2 of 5</span>
                  <h1>Read &amp; Accept Terms</h1>
                  <p>Please read and accept the Terms &amp; Conditions before proceeding.</p>
                </div>

                <div className="enroll-terms">
                  <div className="enroll-terms-head">
                    <h2>{IconDoc}{t.title}</h2>
                    <div className="enroll-lang" role="group" aria-label="Language">
                      <button
                        type="button"
                        className={lang === 'tag' ? 'is-active' : ''}
                        onClick={() => setLang('tag')}
                      >
                        TAG
                      </button>
                      <button
                        type="button"
                        className={lang === 'eng' ? 'is-active' : ''}
                        onClick={() => setLang('eng')}
                      >
                        ENG
                      </button>
                    </div>
                  </div>

                  <div className="enroll-rules">
                    {t.rules.map((rule, i) => (
                      <div className="enroll-rule" key={i}>
                        <span className="enroll-rule-icon">{RULE_ICONS[i]}</span>
                        <div className="enroll-rule-body">
                          <span className="enroll-rule-num">{i + 1}.</span>
                          {rule.text}
                          {rule.offenses && (
                            <ul className="enroll-offenses">
                              {rule.offenses.map(o => <li key={o}>{o}</li>)}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className={`enroll-check ${agreed ? 'is-checked' : ''}`}
                  onClick={() => setAgreed(v => !v)}
                  aria-pressed={agreed}
                >
                  <span className="enroll-box">{agreed && IconTick}</span>
                  {t.agree}
                </button>

                <div className="enroll-actions">
                  <button type="button" className="btn btn-outline enroll-btn-back" onClick={() => goTo(1)}>
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary enroll-btn-main"
                    disabled={!agreed}
                    onClick={() => goTo(3)}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---------------- Step 3 — Make Payment ---------------- */}
            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="enroll-head">
                  <span className="enroll-step-label">Step 3 of 5</span>
                  <h1>Make Payment</h1>
                  <p>Choose your preferred payment method and complete your payment.</p>
                </div>

                <div className="enroll-note is-info">
                  {IconInfo}
                  <span>After payment, please upload your proof of payment so we can verify and activate your account.</span>
                </div>

                <h2 className="enroll-pay-title">Pay using GCash</h2>
                <div className="enroll-pay-card">
                  <div>
                    <div className="enroll-pay-label">GCash Number</div>
                    <div className="enroll-pay-number">{GCASH_NUMBER}</div>
                    <div className="enroll-pay-label">Account Name</div>
                    <div className="enroll-pay-name">{GCASH_NAME}</div>
                  </div>
                  <button type="button" className="enroll-copy" onClick={copyNumber}>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className="enroll-or">OR</div>

                <h2 className="enroll-pay-title" style={{ marginTop: 0 }}>Scan this QR Code</h2>
                <div className="enroll-qr">
                  {GCASH_QR_IMAGE ? (
                    <img src={GCASH_QR_IMAGE} alt="GCash QR code" />
                  ) : (
                    <div className="enroll-qr-fallback">
                      {IconInfo}
                      <span>QR code coming soon — please send your payment to the GCash number above.</span>
                    </div>
                  )}
                  <span className="enroll-qr-caption">Transfer fees may apply.</span>
                </div>

                <div className="enroll-total">
                  <span className="enroll-total-label">Total Amount</span>
                  <span className="enroll-total-value">{peso(total)}</span>
                </div>

                <div className="enroll-actions">
                  <button type="button" className="btn btn-outline enroll-btn-back" onClick={() => goTo(2)}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary enroll-btn-main" onClick={() => goTo(4)}>
                    I Have Paid (Upload Proof)
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---------------- Step 4 — Upload Proof ---------------- */}
            {step === 4 && (
              <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="enroll-head">
                  <span className="enroll-step-label">Step 4 of 5</span>
                  <h1>Upload Proof of Payment</h1>
                </div>

                <div className="enroll-note is-success">
                  {IconCheckCircle}
                  <span>Please upload your proof of payment so we can verify it.</span>
                </div>

                <div className="enroll-howto">
                  <h3>{IconClipboard}How to submit your proof</h3>
                  <ul>
                    <li><span className="enroll-howto-num">1</span>Choose your proof of payment below.</li>
                    <li><span className="enroll-howto-num">2</span>Send a clear screenshot of your payment (GCash transaction or receipt) to our admin on Messenger.</li>
                    <li><span className="enroll-howto-num">3</span>Wait for the admin to verify and activate your enrollment.</li>
                  </ul>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleFile}
                  style={{ display: 'none' }}
                />

                {!proof ? (
                  <button type="button" className="enroll-drop" onClick={() => fileInputRef.current?.click()}>
                    {IconUpload}
                    <strong>Tap to upload image</strong>
                    <span>PNG, JPG, JPEG • Max 10MB</span>
                  </button>
                ) : (
                  <div className="enroll-preview">
                    <img src={proof.url} alt="Proof of payment preview" />
                    <div className="enroll-preview-meta">
                      <div className="enroll-preview-name">{proof.file.name}</div>
                      <div className="enroll-preview-size">
                        {(proof.file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <button type="button" className="enroll-remove" onClick={removeProof}>Remove</button>
                  </div>
                )}

                {uploadError && <p className="enroll-error">{uploadError}</p>}

                <div className="enroll-note is-success" style={{ marginTop: '20px' }}>
                  {IconLock}
                  <span>Your information is secure and will only be used for verification.</span>
                </div>

                <div className="enroll-actions">
                  <button type="button" className="btn btn-outline enroll-btn-back" onClick={() => goTo(3)}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary enroll-btn-main" onClick={submit}>
                    I Have Sent My Proof
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---------------- Step 5 — Payment Status ---------------- */}
            {step === 5 && submission && (
              <motion.div key="step5" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="enroll-head">
                  <h1>Payment Submitted!</h1>
                  <p>Your payment is now being verified.</p>
                </div>

                <div className="enroll-status-card">
                  <h2>Status</h2>
                  <p className="enroll-status-intro">
                    Please message <strong>Engr. Clibourn Quiapo</strong> on Facebook to verify your
                    payment and activate your account.
                  </p>

                  <div className="enroll-summary">
                    <div className="enroll-summary-row">
                      <span className="enroll-summary-key">{IconCalendar}Submitted On</span>
                      <span className="enroll-summary-val">{formatSubmitted(submission.at)}</span>
                    </div>
                    <div className="enroll-summary-row">
                      <span className="enroll-summary-key">{IconDoc}Selected Program</span>
                      <span className="enroll-summary-val">{programLabel}</span>
                    </div>
                    <div className="enroll-summary-row">
                      <span className="enroll-summary-key">{IconMoney}Total Amount</span>
                      <span className="enroll-summary-val is-amount">{peso(total)}</span>
                    </div>
                    <div className="enroll-summary-row">
                      <span className="enroll-summary-key">{IconHash}Reference ID</span>
                      <span className="enroll-summary-val">{submission.ref}</span>
                    </div>
                  </div>

                  <span className="enroll-pending">PENDING VERIFICATION</span>

                  <div className="enroll-next">
                    {IconClock}
                    <div>
                      <strong>What happens next?</strong>
                      <p>Message <strong>Engr. Clibourn Quiapo</strong> on Facebook with your reference ID and proof of payment to proceed with your verification.</p>
                    </div>
                  </div>

                  <a
                    href={ADMIN_MESSENGER_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enroll-next"
                    style={{ textDecoration: 'none' }}
                  >
                    {IconHelp}
                    <div>
                      <strong>Need help?</strong>
                      <p>Message our admin anytime through Messenger.</p>
                    </div>
                  </a>
                </div>

                <div className="enroll-actions">
                  <button type="button" className="btn btn-outline enroll-btn-back" onClick={restart}>
                    Start Over
                  </button>
                  <a
                    href={ADMIN_MESSENGER_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary enroll-btn-main"
                  >
                    Message Admin on Messenger
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Enroll;
