import type { Metadata } from "next";
import { pageMeta, JsonLd, SITE_URL, BUSINESS_ID } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Snag List & Home Inspector Dublin | From €200 | Dublin PropTech",
  absoluteTitle: true,
  description:
    "Independent home inspector in Dublin. New build snag lists, house, apartment and rental property inspections from €200. 300+ point check, thermal imaging and a photo report in 48 hours.",
  path: "/service/snaglist",
  image: "/snaglist.webp?v=2",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Snag List & Home Inspection",
  alternateName: ["Snagging Inspection", "Home Inspection", "New Build Snag List"],
  serviceType: "Home inspection and new build snagging",
  url: `${SITE_URL}/service/snaglist/`,
  provider: { "@id": BUSINESS_ID },
  areaServed: ["Dublin", "Kildare", "Wicklow", "Meath"].map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  offers: [
    { "@type": "Offer", name: "1 & 2-bed property", price: "200", priceCurrency: "EUR" },
    { "@type": "Offer", name: "3-bed property", price: "250", priceCurrency: "EUR" },
    { "@type": "Offer", name: "4-bed property", price: "300", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Re-inspection", price: "150", priceCurrency: "EUR" },
  ],
};

export default function SnaglistLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}