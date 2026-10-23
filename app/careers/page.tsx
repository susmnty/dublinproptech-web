import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/app/lib/seo";
import { JOBS } from "./jobs";

export const metadata: Metadata = pageMeta({
  title: "Careers – Join Dublin PropTech",
  description:
    "Join Dublin PropTech in Dublin. We're hiring for our new Cloud Practice — AWS engineering for our own platforms and for clients. See open roles and apply online.",
  path: "/careers",
});

const PRACTICES = [
  { n: "01", name: "Property Services", text: "Snagging inspections, premium flooring and blinds across Dublin and beyond.", isNew: false },
  { n: "02", name: "Digital Hub", text: "Website development, SEO and paid ads for local businesses.", isNew: false },
  { n: "03", name: "Cloud Practice", text: "Secure, scalable AWS infrastructure — for our own digital transformation and for clients.", isNew: true },
];

const REASONS = [
  { title: "Build from day one", text: "A new practice means you shape the architecture, tooling and standards." },
  { title: "Two kinds of projects", text: "Internal platforms and client consulting — engineering and advisory in one role." },
  { title: "Small team, direct access", text: "Work closely with the founder. Decisions happen fast." },
  { title: "Grow with the practice", text: "As the Cloud Practice grows, so does your scope and your team." },
];

export default function CareersPage() {
  const featured = JOBS[0];

  return (
    <main className="w-full bg-[#faf8f4] text-gray-900 selection:bg-[#b7935b] selection:text-white">
      {/* Hero */}
      <section className="bg-[#1a1814] text-[#f4efe6]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col lg:flex-row gap-14 items-center">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-5">Careers · Dublin</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.08] tracking-tight mb-6">
              Build the cloud behind Dublin&apos;s property tech.
            </h1>
            <p className="text-lg md:text-xl text-[#cfc7b8] leading-relaxed max-w-xl mb-9">
              We&apos;re launching our Cloud Practice — AWS engineering for our own platforms and for clients. Join the
              team building it from day one at our Dublin site.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#roles" className="rounded-md bg-[#b7935b] px-7 py-4 font-semibold text-[#1a1814] transition-colors hover:bg-[#f4efe6]">
                View open roles
              </a>
              <a href="#practice" className="rounded-md border border-[#5a5246] px-7 py-4 font-medium transition-colors hover:border-[#b7935b] hover:text-[#b7935b]">
                Meet the Cloud Practice
              </a>
            </div>
          </div>

          {featured && (
            <div className="w-full max-w-md rounded-2xl border border-[#3a342c] bg-[#24201b] p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#7fbf8a]" />
                <span className="text-sm font-medium text-[#cfc7b8]">Now hiring</span>
              </div>
              <p className="font-serif text-3xl font-bold leading-tight mb-3">{featured.title}</p>
              <p className="text-[#cfc7b8] mb-7">
                Dublin · {featured.employmentLabel} · {featured.workMode}
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {featured.stack.slice(0, 4).map((s) => (
                  <span key={s} className="rounded-full bg-[#332d25] px-3 py-1.5 text-sm text-[#e8dfcf]">{s}</span>
                ))}
              </div>
              <Link href={`/careers/${featured.slug}/`} className="block rounded-md bg-[#f4efe6] py-3.5 text-center font-semibold text-[#1a1814] transition-colors hover:bg-[#b7935b]">
                See the role →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Who we are */}
      <section id="practice" className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-10 scroll-mt-24">
        <p className="text-sm font-bold tracking-widest uppercase text-[#7a5c2e] mb-3">Who we are</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">One company, three practices.</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-12">
          Dublin Property and Fintech Limited started with homes — snagging and flooring. Today we also build digital
          products, and now cloud platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRACTICES.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl border p-8 ${p.isNew ? "bg-[#1a1814] border-[#1a1814] text-[#f4efe6]" : "bg-white border-[#e6dfd2]"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-semibold ${p.isNew ? "text-[#cfc7b8]" : "text-gray-500"}`}>{p.n}</span>
                {p.isNew && (
                  <span className="rounded-full bg-[#b7935b] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1a1814]">New</span>
                )}
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2.5">{p.name}</h3>
              <p className={`leading-relaxed ${p.isNew ? "text-[#cfc7b8]" : "text-gray-600"}`}>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why join */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <p className="text-sm font-bold tracking-widest uppercase text-[#7a5c2e] mb-3">Why join</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-12">Real work, real ownership.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {REASONS.map((r) => (
            <div key={r.title} className="border-t-2 border-[#b7935b] pt-5">
              <h3 className="text-lg font-bold mb-2">{r.title}</h3>
              <p className="text-gray-600 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section id="roles" className="bg-[#f1ece3] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-[#7a5c2e] mb-3">Open roles</p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">Current openings</h2>
            </div>
            <span className="text-gray-600">
              {JOBS.length} open position{JOBS.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {JOBS.map((job) => (
              <Link
                key={job.slug}
                href={`/careers/${job.slug}/`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-xl border border-[#e0d7c7] bg-white p-8 md:px-9 transition-shadow hover:shadow-lg"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3.5">
                    <span className="rounded-full bg-[#1a1814] px-3 py-1 text-sm font-semibold text-[#f4efe6]">{job.team}</span>
                    {["Dublin", job.employmentLabel, job.workMode].map((t) => (
                      <span key={t} className="rounded-full bg-[#f1ece3] px-3 py-1 text-sm text-gray-700">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{job.summary}</p>
                </div>
                <span className="shrink-0 self-start md:self-center rounded-md bg-[#1a1814] px-6 py-3.5 font-semibold text-[#f4efe6] transition-colors group-hover:bg-[#b7935b] group-hover:text-[#1a1814]">
                  View role →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-gray-600">More roles will open as the Cloud Practice grows.</p>
        </div>
      </section>

      {/* Speculative CV */}
      <section className="bg-[#1a1814] text-[#f4efe6]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Don&apos;t see your role?</h2>
            <p className="text-lg text-[#cfc7b8]">Send us your CV and tell us what you&apos;d build. We&apos;ll keep it on file for future openings.</p>
          </div>
          <a
            href="mailto:dublinproptech@gmail.com?subject=Speculative%20application"
            className="shrink-0 rounded-md bg-[#b7935b] px-7 py-4 font-semibold text-[#1a1814] transition-colors hover:bg-[#f4efe6]"
          >
            Send your CV
          </a>
        </div>
      </section>
    </main>
  );
}