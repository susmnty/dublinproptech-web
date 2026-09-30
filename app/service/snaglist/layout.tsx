import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snagging Inspections Dublin | From €200 | Dublin PropTech",
  description:
    "Professional snagging inspections in Dublin from €200. 300+ point check, thermal imaging and a developer-ready photo report within 48 hours. Book your inspection today.",
  alternates: { canonical: "/service/snaglist" },
  openGraph: {
    title: "Snagging Inspections Dublin | Dublin PropTech",
    description:
      "300+ point snagging inspection with thermal imaging and a 48-hour photographic report. Fixed prices from €200.",
    url: "/service/snaglist",
    images: [{ url: "/snaglist.webp", alt: "Snagging inspection in a new Dublin home" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Snagging Inspection",
  serviceType: "New home snagging inspection",
  url: "https://dublinproptech.com/service/snaglist",
  areaServed: { "@type": "City", name: "Dublin" },
  provider: { "@type": "LocalBusiness", name: "Dublin PropTech", url: "https://dublinproptech.com", telephone: "+353899655102" },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}