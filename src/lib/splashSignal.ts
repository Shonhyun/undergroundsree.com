/* ===========================================================================
   Lets the Home page wait for the splash intro to finish before it starts
   anything of its own, so the promo video is not already part-way through by
   the time the splash uncovers it.

   Module state rather than context on purpose: the splash unmounts itself
   when it is done, so anything mounting later still needs to know it already
   happened.
   =========================================================================== */

const EVENT = 'undergrounds:splash-done';

let done = false;

export const isSplashDone = () => done;

export function markSplashDone() {
  if (done) return;
  done = true;
  window.dispatchEvent(new Event(EVENT));
}

/** Calls back once the splash has finished. Returns an unsubscribe function. */
export function onSplashDone(callback: () => void): () => void {
  if (done) {
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}
