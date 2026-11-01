import type { Metadata } from "next";
import { pageMeta, JsonLd, SITE_URL, BUSINESS_ID, areaServedSchema } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Snag List Dublin from €200 | Home Inspector | Dublin PropTech",
  absoluteTitle: true,
  description:
    "Independent snag list inspections in Dublin from €200. 300+ point check, thermal imaging and a photo report in 48 hours. Book your new build snag today.",
  path: "/service/snaglist",
  image: "/snaglist.webp?v=2",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Snag List & Home Inspection",
  alternateName: ["Snagging Inspection", "Home Inspection", "New Build Snag List"],
  serviceType: "Home inspection and new build snagging",
  description:
    "Independent new build snag list inspections for houses, apartments and duplexes: 300+ point check, thermal imaging, calibrated electrical tests and a photographic report in 48 hours.",
  url: `${SITE_URL}/service/snaglist/`,
  provider: { "@id": BUSINESS_ID },
  areaServed: areaServedSchema(),
  offers: [
    { "@type": "Offer", name: "1 & 2-bed property", price: "200", priceCurrency: "EUR" },
    { "@type": "Offer", name: "3-bed property", price: "250", priceCurrency: "EUR" },
    { "@type": "Offer", name: "4-bed property", price: "300", priceCurrency: "EUR" },
    { "@type": "Offer", name: "Re-inspection", price: "150", priceCurrency: "EUR" },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Snag List Dublin", item: `${SITE_URL}/service/snaglist/` },
  ],
};

export default function SnaglistLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}