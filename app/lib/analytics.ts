// Google Analytics 4 helpers + cookie consent (Google Consent Mode v2).
// GA4 loads on every page with all storage DENIED by default (no cookies set).
// Only after the visitor clicks "Accept" do we switch analytics cookies on.
// Events never include names, emails, phone numbers, messages or link URLs.

export const GA_ID = "G-BX0MTVEM6X";
export const CONSENT_KEY = "dpt-cookie-consent"; // "granted" | "denied"
export const CONSENT_EVENT = "dpt:consent-change";
export const OPEN_SETTINGS_EVENT = "dpt:open-cookie-settings";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

// Inline script for <head>: sets consent defaults BEFORE GA config, re-applies a saved "Accept".
export const gaInitScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GA_ID}');
`;

export function getConsent(): "granted" | "denied" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {}
  // Analytics only. Ads storage stays denied: the site runs no ad tracking.
  window.gtag?.("consent", "update", { analytics_storage: choice });
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
