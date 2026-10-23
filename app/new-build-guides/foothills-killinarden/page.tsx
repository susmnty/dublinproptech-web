import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const URL = "https://dublinproptech.com/new-build-guides/foothills-killinarden/";
const PUBLISHED = "2026-10-18";
const UPDATED = "2026-10-23"; // change this every time you edit the page — Google likes fresh guides
const UPDATED_LABEL = new Date(UPDATED + "T00:00:00").toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });
const OG_IMAGE = "/d-logo-irish.webp";

// Your own photo of the site / area (e.g. public/new-build-guides/foothills-killinarden.webp).
// Leave as null until you have one — the photo block only shows when this is set.
const HERO_IMAGE: string | null = null;

export const metadata: Metadata = {
  // absolute = skip the "| Dublin PropTech" template, so the title stays under ~60 characters in Google
  title: { absolute: "Foothills Killinarden: 2026 Prices, Schemes & Snag List Guide" },
  description:
    "Buying at Foothills, Killinarden? Prices, Starter Home Scheme, location, amenities and an independent snagging checklist before handover.",
  alternates: { canonical: "/new-build-guides/foothills-killinarden/" },
  openGraph: {
    title: "Foothills Killinarden: 2026 Buyer's Guide",
    description: "Prices, schemes, location and a snagging checklist for Foothills buyers.",
    url: URL,
    siteName: "Dublin PropTech",
    locale: "en_IE",
    type: "article",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Foothills Killinarden 2026 Buyer's Guide by Dublin PropTech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foothills Killinarden: 2026 Buyer's Guide",
    description: "Prices, schemes, location and a snagging checklist for Foothills buyers.",
    images: [OG_IMAGE],
  },
};

const stats = [
  { value: "635", label: "Homes" },
  { value: "1–4", label: "Bedrooms" },
  { value: "A", label: "BER Rated" },
  { value: "3", label: "Phases" },
];

const prices = [
  { type: "3 bed mid-terrace", size: "108.58 m²", from: "€300,000", omv: "€425,000" },
  { type: "3 bed mid-terrace", size: "123.96 m²", from: "€315,000", omv: "€435,000" },
  { type: "3 bed end-terrace", size: "107.71 m²", from: "€320,000", omv: "€440,000" },
  { type: "3 bed end-terrace", size: "116.67 m²", from: "€330,000", omv: "€450,000" },
  { type: "4 bed end-terrace", size: "155.23 m²", from: "€380,000", omv: "€495,000" },
];

const checklist = [
  { area: "Ventilation", items: "Mechanical ventilation running in every room, filters fitted, vents not blocked or noisy" },
  { area: "Heating", items: "Heat pump commissioned, controls explained, radiators or underfloor heating warming evenly" },
  { area: "Airtightness", items: "Gaps around windows, doors, pipes and attic hatch sealed. These matter in an A-rated home" },
  { area: "Windows & doors", items: "Open, close and lock smoothly, no scratched glass, seals intact, trickle vents working" },
  { area: "Walls & ceilings", items: "Cracks, uneven plaster, paint misses, nail pops, corners and edges finished cleanly" },
  { area: "Kitchen & bathrooms", items: "Silicone complete, no leaks under sinks, tiles level, extractor fans working" },
  { area: "Electrics", items: "Every socket, switch and light working, consumer unit labelled, smoke alarms fitted" },
  { area: "Outside", items: "Gutters and downpipes fixed, paving level, drainage working, boundary fencing complete" },
];

const faqs = [
  {
    q: "When should I book a snagging inspection at Foothills?",
    a: "Book as soon as you are told your home is ready for snagging, which is usually a few weeks before closing. That gives the builder time to fix the issues before you complete the purchase.",
  },
  {
    q: "Do Starter Home Scheme buyers need a snag list?",
    a: "Yes. A home bought under the Starter Home Scheme is still a new build, and the same snags can appear. A snag list is the best way to have issues fixed before you move in, whatever scheme you used.",
  },
  {
    q: "What problems are common in A-rated new builds?",
    a: "Beyond paint and plaster finishes, A-rated homes often have issues with ventilation balancing, heat pump setup, and air sealing around windows, doors and service pipes. These affect comfort and running costs, so they are worth checking carefully.",
  },
  {
    q: "How much does a snagging inspection cost?",
    a: "Our fixed prices are €200 for a 1 or 2-bed home, €250 for a 3-bed and €300 for a 4-bed, with a photo report in 48 hours. A re-inspection costs €150.",
  },
  {
    q: "Who fixes the snags?",
    a: "Normally the builder's team fixes the items on your snag list before closing. Your report gives them a clear, photo-backed list so nothing is missed.",
  },
  {
    q: "Can you fit flooring and blinds after I get the keys?",
    a: "Yes. We supply and fit laminate, LVT, carpet and stair cladding, and arrange made-to-measure blinds, so you can move into a finished home.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Foothills Killinarden: 2026 Buyer's Guide",
      image: `https://dublinproptech.com${HERO_IMAGE ?? OG_IMAGE}`,
      datePublished: PUBLISHED,
      dateModified: UPDATED,
      author: { "@type": "Organization", name: "Dublin PropTech" },
      publisher: { "@type": "Organization", name: "Dublin PropTech", url: "https://dublinproptech.com" },
      mainEntityOfPage: URL,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://dublinproptech.com/" },
        { "@type": "ListItem", position: 2, name: "New Build Guides", item: "https://dublinproptech.com/new-build-guides/" },
        { "@type": "ListItem", position: 3, name: "Foothills, Killinarden", item: URL },
      ],
    },
  ],
};

const H2 = "mt-16 font-serif text-3xl md:text-4xl font-bold text-[#1a1814] tracking-tight";
const P = "mt-4 text-lg leading-relaxed text-gray-700";
const EYEBROW = "text-xs font-bold uppercase tracking-[0.25em] text-[#b7935b]";

export default function FoothillsGuide() {
  return (
    <div className="w-full bg-[#faf9f5]">
      <main className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <Link href="/" className="hover:text-[#b7935b]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/new-build-guides/" className="hover:text-[#b7935b]">New Build Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Foothills</span>
        </nav>

        {/* Hero */}
        <header className="mt-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b7935b]">
            <span className="h-px w-8 bg-[#b7935b]" />
            Independent Buyer's Guide
          </span>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-[#1a1814]">
            Foothills Killinarden: Prices, Schemes &amp; Snagging Guide
          </h1>
          <p className="mt-4 text-sm text-gray-500">Last updated: {UPDATED_LABEL}</p>
          <p className={P}>
            Foothills Killinarden is one of the biggest new home schemes in South Dublin. If you have
            reserved a home there, or are thinking about it, this guide covers what is being built,
            what the homes cost, which buying schemes apply, and what to check before you get your keys.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/service/snaglist/"
              className="inline-flex items-center justify-center rounded-full bg-[#b7935b] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-[#1a1814]"
            >
              Book a Snag List
            </Link>
            <a
              href="tel:+353899655102"
              className="inline-flex items-center justify-center rounded-full border border-[#1a1814] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#1a1814] transition-colors hover:bg-[#1a1814] hover:text-white"
            >
              Call 089 965 5102
            </a>
          </div>
        </header>

        {/* Your own photo (shows only when HERO_IMAGE is set) */}
        {HERO_IMAGE && (
          <figure className="mt-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <Image
              src={HERO_IMAGE}
              alt="Foothills new homes development in Killinarden, Tallaght, Dublin 24"
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              priority
            />
            <figcaption className="px-5 py-3 text-xs text-gray-500">Foothills, Killinarden — photo by Dublin PropTech</figcaption>
          </figure>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-6 text-center ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 ? "border-r md:border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-gray-200`}
            >
              <p className="font-serif text-4xl font-bold text-[#b7935b]">{s.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <h2 className={H2}>Foothills at a glance</h2>
        <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {[
            ["Location", "Killinarden, Tallaght, Dublin 24, at the foot of the Dublin Mountains"],
            ["Size", "635 homes, built in three phases"],
            ["Home types", "1, 2, 3 and 4 bedroom homes, including duplexes and terraced, semi-detached and detached houses"],
            ["Energy rating", "A-rated homes"],
            ["Developer", "Arden (a partnership of John Sisk & Son and D/RES Properties), working with South Dublin County Council"],
            ["Selling agent", "Sherry FitzGerald New Homes"],
            ["Status", "Construction started on site in December 2025"],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-1 p-5 md:grid-cols-[180px_1fr] md:gap-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#b7935b] md:pt-1">{k}</p>
              <p className="text-gray-700">{v}</p>
            </div>
          ))}
        </div>

        {/* Prices */}
        <h2 className={H2}>Foothills prices (Starter Home Scheme release)</h2>
        <p className={P}>
          The first 65 homes were offered through South Dublin County Council's Starter Home Scheme,
          at prices well below open market value. Applications for this first release have now closed.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-[#1a1814] text-white">
              <tr>
                <th className="px-5 py-4 font-bold uppercase tracking-widest text-xs">Home type</th>
                <th className="px-5 py-4 font-bold uppercase tracking-widest text-xs">Size</th>
                <th className="px-5 py-4 font-bold uppercase tracking-widest text-xs">From</th>
                <th className="px-5 py-4 font-bold uppercase tracking-widest text-xs">Market value</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p, i) => (
                <tr key={i} className="border-t border-gray-100 text-gray-700 even:bg-[#f6f4f0]">
                  <td className="px-5 py-4 font-semibold text-[#1a1814]">{p.type}</td>
                  <td className="px-5 py-4">{p.size}</td>
                  <td className="px-5 py-4 font-bold text-[#b7935b]">{p.from}</td>
                  <td className="px-5 py-4 text-gray-500">{p.omv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Source:{" "}
          <a href="https://sdcc.ie/en/services/housing/starter-homes-programme/foothills-killinarden/" className="underline hover:text-[#b7935b]" rel="nofollow noopener" target="_blank">
            South Dublin County Council
          </a>
          {" "}and{" "}
          <a href="https://affordablehomes.ie/buy/foothills/" className="underline hover:text-[#b7935b]" rel="nofollow noopener" target="_blank">
            affordablehomes.ie
          </a>
          . Prices can change, so always confirm with the selling agent.
        </p>

        {/* Schemes */}
        <h2 className={H2}>Which buying schemes apply?</h2>
        <p className={P}>Homes at Foothills qualify for three government supports, depending on the home and the buyer:</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Starter Home Scheme", "Homes sold below market value through the council, mainly for first-time buyers who meet the income limits."],
            ["Help to Buy", "A tax refund toward the deposit for first-time buyers of new homes."],
            ["First Home Scheme", "A shared-equity scheme that helps close the gap between your mortgage and the price."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="font-serif text-xl font-bold text-[#1a1814]">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">Check each scheme's current rules on its official website before you apply.</p>

        {/* Location */}
        <h2 className={H2}>Location and getting around</h2>
        <p className={P}>
          Killinarden sits just west of Tallaght village, with the Dublin Mountains behind it and
          Tallaght's shops, hospital and Luas stop close by. The M50 and N81 are a short drive away.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["Bus", "Dublin Bus 77A, 77X and 65B stop at Killinarden Heights, a few minutes' walk away"],
            ["Luas", "Red Line from Tallaght into the city centre"],
            ["Schools", "Killinarden Community School is under 1 km away, with primary schools and crèches nearby"],
            ["Shopping", "The Square Tallaght and Citywest Shopping Centre"],
            ["Outdoors", "Killinarden Park, Bohernabreena and the Dublin Mountain trails"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className={EYEBROW}>{k}</p>
              <p className="mt-2 text-gray-700">{v}</p>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <h2 className={H2}>What's being built on site</h2>
        <p className={P}>
          As well as the homes, the plans include a community centre, two full-size sports pitches,
          a crèche, about 6.6 hectares of parkland and 3.6 km of walking and cycling paths. Remains
          of a Bronze Age settlement found during groundworks will be preserved within the new Elder Park.
        </p>

        {/* Snagging */}
        <h2 className={H2}>Snagging checklist for Foothills homes</h2>
        <p className={P}>
          Even well-built new homes have snags. In A-rated homes, the most important checks go
          beyond paint and plaster. They cover the systems that keep the home warm, dry and
          cheap to run. Here's what we check:
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {checklist.map((c) => (
            <div key={c.area} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#e5e1d8] bg-[#f9f8f6]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <div>
                <p className="font-serif text-lg font-bold text-[#1a1814]">{c.area}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{c.items}</p>
              </div>
            </div>
          ))}
        </div>
        <p className={P}>
          Our inspections cover 300+ points, start from €200, and come with a photo report within
          48 hours, ready to send to the builder.
        </p>
        <Link href="/service/snaglist/" className="mt-4 inline-block font-bold text-[#b7935b] underline underline-offset-4">
          Book your Foothills snag list →
        </Link>

        {/* After keys */}
        <h2 className={H2}>After you get the keys</h2>
        <p className={P}>
          Most new homes are handed over with bare floors and no blinds. We supply and fit{" "}
          <Link href="/service/flooring/" className="font-semibold text-[#b7935b] underline underline-offset-4">flooring</Link>,{" "}
          <Link href="/service/stairs/" className="font-semibold text-[#b7935b] underline underline-offset-4">stair cladding</Link> and{" "}
          <a href="https://luxblinds.ie/" className="font-semibold text-[#b7935b] underline underline-offset-4">made-to-measure blinds</a>, so you can move
          straight into a finished home.
        </p>

        {/* FAQ */}
        <h2 className={H2}>Foothills Killinarden FAQs</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-gray-200 bg-white shadow-sm open:shadow-md transition-shadow">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-lg font-bold text-[#1a1814] md:text-xl">{f.q}</h3>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 text-[#b7935b] transition-transform duration-300 group-open:rotate-45">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </span>
              </summary>
              <p className="-mt-2 px-6 pb-6 leading-relaxed text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>

        {/* CTA */}
        <section className="relative mt-16 overflow-hidden rounded-3xl bg-[#1a1814] text-white shadow-2xl">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#b7935b]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#b7935b]/10 blur-3xl" />

          <div className="relative p-8 md:p-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b7935b]">
              <span className="h-px w-8 bg-[#b7935b]" />
              Foothills Buyers
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight md:text-5xl">
              Got your snagging date?<br />
              <span className="italic text-[#b7935b]">Let's check it properly.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
              Independent 300+ point inspection with thermal imaging and a developer-ready photo report
              in 48 hours, so the builder fixes everything before you close.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "1 & 2 bed", price: "€200" },
                { label: "3 bed", price: "€250" },
                { label: "4 bed", price: "€300" },
                { label: "Re-inspection", price: "€150" },
              ].map((p) => (
                <div key={p.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{p.label}</p>
                  <p className="mt-1 font-serif text-3xl font-bold text-white">{p.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/service/contact/?area=Dublin#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b7935b] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-white hover:text-[#1a1814]"
              >
                Book Your Inspection →
              </Link>
              <a
                href="tel:+353899655102"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#1a1814]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                089 965 5102
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 text-sm text-gray-300 md:grid-cols-4">
              {["300+ point check", "Thermal imaging", "Report in 48 hours", "Fixed prices"].map((t) => (
                <p key={t} className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {t}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-gray-200 bg-[#f6f4f0] p-5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b7935b" strokeWidth="2" className="mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
          <p className="text-xs leading-relaxed text-gray-500">
            <strong className="text-gray-700">Independent guide.</strong> Dublin PropTech is an independent
            snagging and flooring company and is not affiliated with Arden, South Dublin County Council or
            Sherry FitzGerald. Information is based on public sources and may change. Last updated {UPDATED_LABEL}.
          </p>
        </div>
      </main>
    </div>
  );
}