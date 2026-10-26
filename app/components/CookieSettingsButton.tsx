"use client";

import { OPEN_SETTINGS_EVENT } from "@/app/lib/analytics";

// Footer link that re-opens the cookie banner so visitors can change their choice.
export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
