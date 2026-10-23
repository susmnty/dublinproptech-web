import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/app/lib/seo";
import { JOBS } from "./jobs";

export const metadata: Metadata = pageMeta({
  title: "Careers - Join Dublin PropTech",
  description:
    "Work with Dublin PropTech in Dublin. We hire across property services, digital and cloud - snagging, flooring, marketing and engineering. See open roles and apply online.",
  path: "/careers",
});

// The teams we hire into. "roles" = the kinds of people each team takes on (not live openings — those come from jobs.ts).
const TEAMS = [
  {
    name: "Property Services",
    text: "Snagging inspections, flooring and blinds - on site with homeowners across Dublin and beyond.",
    roles: ["Snagging inspectors", "Flooring fitters", "Project coordinators"],
  },
  {
    name: "Digital Hub",
    text: "Websites, SEO, paid ads and content for our own brands and local businesses.",
    roles: ["Web developers", "SEO & marketing", "Content & design"],
  },
  {
    name: "Cloud Practice",
    text: "Secure, scalable AWS platforms for our own digital transformation and for clients.",
    roles: ["Cloud engineers", "DevOps", "Cloud consultants"],
  },
];

const REASONS = [
  { title: "Real work, real ownership", text: "Small team - what you build and fix goes live, and people see it." },
  { title: "Work across the business", text: "Property, digital and cloud under one roof. Learn from all three." },
  { title: "Direct access", text: "Work closely with the founder. Decisions happen fast." },
  { title: "Grow with us", text: "As each team grows, so does your scope and your role." },
];

export default function CareersPage() {
  return (
    <main className="w-full bg-[#faf8f4] text-gray-900 selection:bg-[#b7935b] selection:text-white">
      {/* Hero */}
      <section className="bg-[#1a1814] text-[#f4efe6]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-5">Careers · Dublin</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.08] tracking-tight mb-6 max-w-4xl">
            Build your career with <br className="hidden md:block" /> Dublin PropTech
          </h1>
          <p className="text-lg md:text-xl text-[#cfc7b8] leading-relaxed max-w-2xl mb-9">
            From snagging and flooring to websites and cloud platforms - we&apos;re growing, & we&apos;re looking for
            people who take pride in doing the job properly.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#roles" className="rounded-md bg-[#b7935b] px-7 py-4 font-semibold text-[#1a1814] transition-colors hover:bg-[#f4efe6]">
              View open roles
            </a>
            <a href="#teams" className="rounded-md border border-[#5a5246] px-7 py-4 font-medium transition-colors hover:border-[#b7935b] hover:text-[#b7935b]">
              Our teams
            </a>
          </div>
        </div>
      </section>

      {/* Open roles — first, so job seekers see them straight away */}
      <section id="roles" className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-10 scroll-mt-24">
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
        <p className="mt-6 text-gray-600">
          Don&apos;t see your role? We&apos;re always happy to hear from good people -{" "}
          <a href="#cv" className="font-semibold text-[#7a5c2e] underline underline-offset-4 hover:text-[#1a1814]">send us your CV</a>.
        </p>
      </section>

      {/* Teams */}
      <section id="teams" className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-10 scroll-mt-24">
        <p className="text-sm font-bold tracking-widest uppercase text-[#7a5c2e] mb-3">Our teams</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">One company, three teams.</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-12">
          Dublin Property and Fintech Limited started with homes - snagging and flooring. Today we also build digital
          products and cloud platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAMS.map((t) => {
            const openCount = JOBS.filter((j) => j.team === t.name).length;
            return (
              <div key={t.name} className="flex flex-col rounded-xl border border-[#e6dfd2] bg-white p-8">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="font-serif text-2xl font-bold">{t.name}</h3>
                  {openCount > 0 && (
                    <span className="shrink-0 rounded-full bg-[#b7935b] px-2.5 py-1 text-xs font-bold text-[#1a1814]">
                      {openCount} open
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{t.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {t.roles.map((r) => (
                    <li key={r} className="rounded-full bg-[#f1ece3] px-3 py-1.5 text-sm text-gray-700">{r}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why join */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <p className="text-sm font-bold tracking-widest uppercase text-[#7a5c2e] mb-3">Why join</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-12">Why work with us.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {REASONS.map((r) => (
            <div key={r.title} className="border-t-2 border-[#b7935b] pt-5">
              <h3 className="text-lg font-bold mb-2">{r.title}</h3>
              <p className="text-gray-600 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Speculative CV */}
      <section id="cv" className="bg-[#1a1814] text-[#f4efe6] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Don&apos;t see your role?</h2>
            <p className="text-lg text-[#cfc7b8]">
              Inspector, fitter, marketer or engineer - send us your CV and tell us which team you&apos;d like to join.
            </p>
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