import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // layout.tsx adds " | Dublin PropTech" automatically
  title: "New Build Guides – Dublin Developments",
  description:
    "Independent buyer guides to new build developments in Dublin: prices, schemes, location and snagging checklists before handover.",
  alternates: { canonical: "/new-build-guides/" },
};

// Add a new development here (and create its page folder)
const guides = [
  {
    slug: "foothills-killinarden",
    name: "Foothills",
    area: "Killinarden, Tallaght, Dublin 24",
    summary: "635 A-rated homes by Arden with South Dublin County Council. Prices, buying schemes, location and a full snagging checklist.",
    stats: [
      { value: "635", label: "Homes" },
      { value: "1–4", label: "Bed" },
      { value: "A", label: "BER" },
    ],
    tags: ["Starter Home Scheme", "Help to Buy", "First Home Scheme"],
    updated: "October 2026",
  },
];

const inEveryGuide = [
  { title: "Prices & home types", text: "What's on offer and what it costs, with sources." },
  { title: "Buying schemes", text: "Which government supports apply and who qualifies." },
  { title: "Location & amenities", text: "Transport, schools, shops and what's being built." },
  { title: "Snagging checklist", text: "What to check before you close, tailored to the homes." },
];

export default function NewBuildGuidesPage() {
  return (
    <main className="w-full bg-[#faf9f5] text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1a1814] text-white">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#b7935b]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#b7935b]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <nav className="text-sm text-gray-400">
            <Link href="/" className="hover:text-[#b7935b]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">New Build Guides</span>
          </nav>

          <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b7935b]">
            <span className="h-px w-8 bg-[#b7935b]" />
            Independent Buyer Guides
          </span>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            New Build <span className="italic text-[#b7935b]">Guides</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            Buying a new home in Dublin? Our independent guides cover what each development offers,
            which schemes apply, and exactly what to check before you get your keys.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8">
            {[
              [String(guides.length), guides.length === 1 ? "Development covered" : "Developments covered"],
              ["Free", "No sign-up needed"],
              ["Updated", "Every two weeks"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-serif text-3xl font-bold text-[#d9bc8c]">{v}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b7935b]">Developments</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#1a1814] md:text-4xl">Choose your development</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/new-build-guides/${g.slug}/`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b7935b] hover:shadow-xl"
            >
              {/* Card top band */}
              <div className="relative bg-[#1a1814] px-7 py-8 text-white">
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#b7935b]/25 blur-2xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl font-bold md:text-4xl">{g.name}</h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#d9bc8c]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {g.area}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#b7935b] px-3 py-1 text-[10px] font-bold uppercase tracking-widest">New</span>
                </div>
                <div className="relative mt-6 flex gap-8">
                  {g.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-serif text-2xl font-bold text-[#d9bc8c]">{s.value}</p>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-7">
                <p className="leading-relaxed text-gray-600">{g.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.tags.map((t) => (
                    <span key={t} className="rounded-full border border-[#e8e4db] bg-[#f6f4f0] px-3 py-1 text-xs font-semibold text-gray-700">{t}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6 mt-8">
                  <span className="text-xs text-gray-400">Updated {g.updated}</span>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a1814] group-hover:text-[#b7935b] transition-colors">
                    Read the guide
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b7935b] text-white transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Coming soon card */}
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#e0dbd0] bg-white/50 p-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e0dbd0] text-2xl text-[#b7935b]">+</span>
            <p className="mt-5 font-serif text-2xl font-bold text-[#1a1814]">More developments coming</p>
            <p className="mt-2 max-w-xs text-sm text-gray-500">
              Buying somewhere else in Dublin? Tell us the development and we'll help with your snag list.
            </p>
            <Link
              href="/service/contact/?area=Dublin#enquiry"
              className="mt-6 inline-block rounded-full border border-[#1a1814] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#1a1814] transition-colors hover:bg-[#1a1814] hover:text-white"
            >
              Ask about yours
            </Link>
          </div>
        </div>
      </section>

      {/* What's in every guide */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b7935b]">What's inside</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#1a1814] md:text-4xl">In every guide</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {inEveryGuide.map((item, i) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-[#faf9f5] p-6">
                <p className="font-serif text-3xl font-bold text-[#b7935b]">0{i + 1}</p>
                <p className="mt-3 font-serif text-lg font-bold text-[#1a1814]">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-[#b7935b] p-8 text-white shadow-lg md:p-12">
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-serif text-3xl font-bold leading-tight md:text-4xl">Got your snagging date?</p>
              <p className="mt-2 text-white/85">Fixed prices from €200 · 300+ point check · Report in 48 hours</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/service/snaglist/"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-widest text-[#1a1814] transition-colors hover:bg-[#1a1814] hover:text-white"
              >
                Book a Snag List →
              </Link>
              <a
                href="tel:+353899655102"
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#1a1814]"
              >
                089 965 5102
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#f6f4f0] p-5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
          <p className="text-xs leading-relaxed text-gray-500">
            <strong className="text-gray-700">Independent guides.</strong> Dublin PropTech is an independent snagging and
            flooring company. These guides are not affiliated with any developer, council or selling agent.
          </p>
        </div>
      </section>
    </main>
  );
}