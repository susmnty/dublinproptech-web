"use client";

import { useState } from "react";
import Link from "next/link";
import { submitEnquiry } from "../lib/hubspot";

// The site is a static export (no server), so applications go straight to HubSpot like the contact form.
// HubSpot's form API can't take file uploads, so we ask for a CV link and offer an email button after submitting.
const CAREERS_EMAIL = "dublinproptech@gmail.com";

const inputClass =
  "w-full rounded-lg border border-[#cfc5b4] bg-white px-4 py-3.5 text-base text-gray-900 outline-none transition-colors focus:border-[#b7935b] focus:ring-2 focus:ring-[#b7935b]/30";
const labelClass = "block text-sm font-semibold text-gray-900 mb-2";

export default function ApplyForm({ jobTitle }: { jobTitle: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [firstName, setFirstName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) || "").trim();

    setStatus("sending");
    setFirstName(get("firstName"));

    const message = [
      `[CAREERS] Application: ${jobTitle}`,
      `LinkedIn: ${get("linkedin") || "—"}`,
      `CV link: ${get("cvLink") || "— (will email CV)"}`,
      `Right to work in Ireland: ${get("rightToWork")}`,
      "",
      `Why this role: ${get("note") || "—"}`,
    ].join("\n");

    const ok = await submitEnquiry({
      firstName: get("firstName"),
      lastName: get("lastName"),
      email: get("email"),
      phone: get("phone"),
      message,
    }, "careers");

    setStatus(ok ? "sent" : "error");
  }

  if (status === "sent") {
    const mailto = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`CV – ${jobTitle} – ${firstName}`)}`;
    return (
      <div role="status" className="rounded-2xl border border-[#e6dfd2] bg-white p-10 md:p-12">
        <div className="w-12 h-1 bg-[#b7935b] mb-6" />
        <h2 className="font-serif text-3xl font-bold mb-3">Thanks{firstName ? `, ${firstName}` : ""} — application received.</h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          We&apos;ll review it and reply by email. If you didn&apos;t add a CV link, please email your CV (PDF) to us now.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href={mailto} className="rounded-md bg-[#1a1814] px-7 py-4 font-semibold text-[#f4efe6] transition-colors hover:bg-[#b7935b] hover:text-[#1a1814]">
            Email your CV
          </a>
          <Link href="/careers/" className="rounded-md border border-[#cfc5b4] px-7 py-4 font-medium transition-colors hover:border-[#b7935b]">
            Back to careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#e6dfd2] bg-white p-8 md:p-12">
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Apply for this role</h2>
      <p className="text-gray-600 mb-9">Takes about 3 minutes. We reply to every application.</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="ap-first" className={labelClass}>First name</label>
          <input id="ap-first" name="firstName" required autoComplete="given-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-last" className={labelClass}>Last name</label>
          <input id="ap-last" name="lastName" required autoComplete="family-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-email" className={labelClass}>Email</label>
          <input id="ap-email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-phone" className={labelClass}>Phone</label>
          <input id="ap-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-linkedin" className={labelClass}>LinkedIn URL</label>
          <input id="ap-linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ap-cv" className={labelClass}>CV link (Google Drive / Dropbox)</label>
          <input id="ap-cv" name="cvLink" type="url" placeholder="https://…" className={inputClass} />
          <p className="mt-1.5 text-sm text-gray-500">No link? You can email your CV after submitting.</p>
        </div>

        <fieldset className="md:col-span-2">
          <legend className={labelClass}>Do you have the right to work in Ireland?</legend>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <label className="flex min-h-[44px] items-center gap-2.5 cursor-pointer">
              <input type="radio" name="rightToWork" value="Yes" required className="h-4 w-4 accent-[#b7935b]" /> Yes
            </label>
            <label className="flex min-h-[44px] items-center gap-2.5 cursor-pointer">
              <input type="radio" name="rightToWork" value="Needs a work permit" className="h-4 w-4 accent-[#b7935b]" /> I&apos;d need a work permit
            </label>
          </div>
        </fieldset>

        <div className="md:col-span-2">
          <label htmlFor="ap-note" className={labelClass}>Why this role? (optional)</label>
          <textarea id="ap-note" name="note" rows={4} className={inputClass} />
        </div>

        <label className="md:col-span-2 flex items-start gap-3 text-sm leading-relaxed text-gray-700 cursor-pointer">
          <input type="checkbox" required className="mt-1 h-[18px] w-[18px] shrink-0 accent-[#b7935b]" />
          <span>
            I agree that Dublin Property and Fintech Limited may store my details to assess this application, per the{" "}
            <Link href="/privacy-policy/" className="underline hover:text-[#b7935b]">Privacy Policy</Link>.
          </span>
        </label>

        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md bg-[#1a1814] px-9 py-4 font-semibold text-[#f4efe6] transition-colors hover:bg-[#b7935b] hover:text-[#1a1814] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Submit application"}
          </button>
          {status === "error" && (
            <p role="alert" className="text-sm text-red-700">
              Something went wrong. Please try again or email us at{" "}
              <a href={`mailto:${CAREERS_EMAIL}`} className="underline">{CAREERS_EMAIL}</a>.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}