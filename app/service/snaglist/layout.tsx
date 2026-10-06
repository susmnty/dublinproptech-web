import type { Metadata } from "next";
import { pageMeta, JsonLd, SITE_URL, BUSINESS_ID } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Snagging Inspections Dublin | From €200 | Dublin PropTech",
  absoluteTitle: true,
  description:
    "Professional snagging inspections in Dublin from €200. 300+ point check, thermal imaging and a developer-ready photo report within 48 hours. Book your inspection today.",
  path: "/service/snaglist",
  image: "/snaglist.webp?v=2",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Snagging Inspection",
  serviceType: "New home snagging inspection",
  url: `${SITE_URL}/service/snaglist`,
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