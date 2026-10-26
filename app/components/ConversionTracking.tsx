"use client";

import { useEffect } from "react";
import { trackEvent } from "@/app/lib/analytics";

// One site-wide click listener for contact links, so every phone / WhatsApp / email link
// is tracked exactly once, wherever it is on the site (no per-button code, no double counting).
// Sends only the event name and where on the page it was clicked: never the link itself,
// because WhatsApp links can contain the visitor's name, email and message.
export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";

      let name: string | null = null;
      if (href.startsWith("tel:")) name = "phone_click";
      else if (href.startsWith("mailto:")) name = "email_click";
      else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//i.test(href)) name = "whatsapp_click";
      if (!name) return;

      const link_location = link.closest("footer") ? "footer" : link.closest("nav, header") ? "header" : "page";
      trackEvent(name, { link_location });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
