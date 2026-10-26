"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { getConsent, saveConsent, CONSENT_EVENT, OPEN_SETTINGS_EVENT } from "@/app/lib/analytics";

// Cookie consent banner (GDPR / ePrivacy). Shown until the visitor chooses.
// "Accept" switches on Google Analytics cookies and loads HubSpot tracking.
// "Reject" keeps both off. The footer "Cookie settings" link re-opens this banner.
// Re-read the saved choice whenever it changes (this tab or another tab)
function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export default function ConsentBanner() {
  // "ssr" during the static build, so nothing renders until the browser knows the choice
  const consent = useSyncExternalStore(subscribe, getConsent, () => "ssr");
  const [reopened, setReopened] = useState(false);
  const granted = consent === "granted";
  const open = consent === null || reopened;

  // Footer "Cookie settings" link re-opens the banner
  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  const choose = (choice: "granted" | "denied") => {
    saveConsent(choice);
    setReopened(false);
  };

  return (
    <>
      {/* HubSpot tracking sets cookies, so it only loads after "Accept" */}
      {granted && <Script id="hs-script-loader" strategy="lazyOnload" src="//js-na2.hs-scripts.com/246058565.js" />}

      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[90] bg-[#1a1814] text-white rounded-2xl shadow-2xl border border-white/10 p-6 font-sans"
        >
          <p className="font-serif font-bold text-lg mb-2">We value your privacy</p>
          <p className="text-sm text-gray-300 leading-relaxed mb-5">
            We use analytics cookies to understand how visitors use our site so we can improve it. They are only set if you accept.{" "}
            <Link href="/cookie-policy" className="text-[#b7935b] underline underline-offset-2 hover:text-white">
              Cookie Policy
            </Link>
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="flex-1 border border-white/40 text-white px-4 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-[#1a1814] transition-colors"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="flex-1 bg-[#b7935b] text-white px-4 py-3 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-[#1a1814] transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
