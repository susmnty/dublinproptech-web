import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Build Guides – Dublin Developments | Dublin PropTech",
  description:
    "Independent buyer guides to new build developments in Dublin: prices, schemes, location and snagging checklists before handover.",
  alternates: { canonical: "/new-build-guides/" },
};

const guides = [
  {
    slug: "foothills-killinarden",
    name: "Foothills, Killinarden",
    area: "Tallaght, Dublin 24",
    summary: "635 A-rated homes by Arden with South Dublin County Council. Prices, schemes and snagging checklist.",
  },
];

export default function NewBuildGuidesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <p className="text-sm uppercase tracking-widest text-[#b7935b]">Buyer Guides</p>
      <h1 className="mt-2 font-serif text-4xl text-[#1a1814]">New Build Guides</h1>
      <p className="mt-4 max-w-2xl text-gray-600">
        Independent guides for people buying new homes in Dublin, covering what each
        development offers, which schemes apply, and what to check before you get your keys.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/new-build-guides/${g.slug}/`}
            className="block rounded-xl border border-gray-200 p-6 transition hover:border-[#b7935b]"
          >
            <h2 className="font-serif text-2xl text-[#1a1814]">{g.name}</h2>
            <p className="mt-1 text-sm text-[#b7935b]">{g.area}</p>
            <p className="mt-3 text-gray-600">{g.summary}</p>
            <span className="mt-4 inline-block text-[#b7935b]">Read the guide →</span>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-xs text-gray-500">
        Dublin PropTech is an independent snagging and flooring company. These guides are not
        affiliated with any developer or selling agent.
      </p>
    </main>
  );
}