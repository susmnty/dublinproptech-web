import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta, JsonLd, SITE_URL, BUSINESS_ID } from "@/app/lib/seo";
import { getJob, formatSalary, formatDate } from "../jobs";
import ApplyForm from "../ApplyForm";

const SLUG = "cloud-platform-engineer";
const job = getJob(SLUG);

export const metadata: Metadata = pageMeta({
  title: "Cloud Platform Engineer (AWS) – Dublin | Careers",
  description:
    "Join Dublin PropTech's new Cloud Practice in Dublin. Design, build and run secure, scalable AWS infrastructure for our platforms and clients. Apply online.",
  path: `/careers/${SLUG}`,
});

export default function JobPage() {
  if (!job) notFound();

  const salary = formatSalary(job.salary);

  // Google for Jobs — https://developers.google.com/search/docs/appearance/structured-data/job-posting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.about}</p><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59+00:00`,
    employmentType: job.employmentType,
    directApply: true,
    url: `${SITE_URL}/careers/${job.slug}/`,
    hiringOrganization: {
      "@type": "Organization",
      "@id": BUSINESS_ID,
      name: "Dublin Property and Fintech Limited",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo.webp`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dublin",
        addressRegion: "County Dublin",
        addressCountry: "IE",
      },
    },
    ...(job.salary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "EUR",
        value: { "@type": "QuantitativeValue", minValue: job.salary.min, maxValue: job.salary.max, unitText: "YEAR" },
      },
    }),
  };

  const chips = [job.location, job.employmentLabel, job.workMode, ...(salary ? [salary] : [])];

  return (
    <main className="w-full bg-[#faf8f4] text-gray-900 selection:bg-[#b7935b] selection:text-white">
      <JsonLd data={jsonLd} />

      {/* Header */}
      <section className="bg-[#1a1814] text-[#f4efe6]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-16 md:pb-20">
          <nav aria-label="Breadcrumb" className="text-sm text-[#a89f90] mb-10">
            <Link href="/careers/" className="text-[#cfc7b8] hover:text-[#b7935b] transition-colors">Careers</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>{job.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-[#b7935b] px-3 py-1 text-sm font-semibold text-[#1a1814] mb-5">{job.team}</span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight mb-6">{job.title}</h1>
              <div className="flex flex-wrap gap-2.5">
                {chips.map((c) => (
                  <span key={c} className="rounded-full border border-[#4a4339] px-3.5 py-2 text-sm text-[#e8dfcf]">{c}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2.5 shrink-0">
              <a href="#apply" className="rounded-md bg-[#b7935b] px-8 py-4 font-semibold text-[#1a1814] transition-colors hover:bg-[#f4efe6]">
                Apply now
              </a>
              <span className="text-sm text-[#a89f90]">
                Posted {formatDate(job.datePosted)} · Closes {formatDate(job.validThrough)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10 flex flex-col lg:flex-row gap-14 items-start">
        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-3xl font-bold mb-4">About the role</h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-12">{job.about}</p>

          <h2 className="font-serif text-3xl font-bold mb-5">What you&apos;ll do</h2>
          <ul className="flex flex-col gap-3.5 text-lg leading-relaxed text-gray-700 mb-12">
            {job.responsibilities.map((r) => (
              <li key={r} className="flex gap-3.5">
                <span aria-hidden="true" className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#b7935b]" />
                <span>{r}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { title: "What you'll bring", items: job.requirements },
              { title: "Nice to have", items: job.niceToHave },
            ].map((box) => (
              <div key={box.title} className="rounded-xl border border-[#e6dfd2] bg-white p-7">
                <h3 className="text-lg font-bold mb-3.5">{box.title}</h3>
                <ul className="list-disc pl-5 leading-relaxed text-gray-700 space-y-1">
                  {box.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-3xl font-bold mb-5">Tech stack</h2>
          <div className="flex flex-wrap gap-2.5 mb-14">
            {job.stack.map((s) => (
              <span key={s} className="rounded-lg bg-[#f1ece3] px-4 py-2.5 font-medium text-gray-700">{s}</span>
            ))}
          </div>

          <h2 className="font-serif text-3xl font-bold mb-6">Hiring process</h2>
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Apply online", "Screening call", "Technical interview", "Offer"].map((step, i) => (
              <li key={step} className={`border-t-2 pt-4 ${i === 3 ? "border-[#b7935b]" : "border-[#1a1814]"}`}>
                <div className="text-sm font-semibold text-gray-500 mb-1.5">Step {i + 1}</div>
                <div className="font-bold text-lg">{step}</div>
              </li>
            ))}
          </ol>
        </div>

        {/* Summary card */}
        <aside aria-label="Role summary" className="w-full lg:w-[340px] shrink-0 rounded-2xl bg-[#1a1814] p-8 text-[#f4efe6] lg:sticky lg:top-8">
          <h2 className="font-serif text-2xl font-bold mb-6">Role summary</h2>
          <dl className="flex flex-col gap-4.5 mb-7 text-[15px]">
            {[
              ["Team", job.team],
              ["Location", job.location],
              ["Work type", `${job.employmentLabel} · ${job.workMode}`],
              ...(salary ? [["Salary", salary]] : []),
              ["Closing date", formatDate(job.validThrough)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[#a89f90] mb-1">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <a href="#apply" className="block rounded-md bg-[#b7935b] py-4 text-center font-semibold text-[#1a1814] transition-colors hover:bg-[#f4efe6] mb-3">
            Apply now
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/careers/${job.slug}/`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md border border-[#4a4339] py-3.5 text-center font-medium transition-colors hover:border-[#b7935b] hover:text-[#b7935b]"
          >
            Share on LinkedIn
          </a>
        </aside>
      </section>

      {/* Apply */}
      <section id="apply" className="max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-24 scroll-mt-24">
        <div className="max-w-3xl">
          <ApplyForm jobTitle={job.title} />
        </div>
      </section>
    </main>
  );
}