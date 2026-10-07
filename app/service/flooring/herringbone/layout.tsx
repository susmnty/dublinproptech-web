import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Herringbone Flooring Dublin – Laminate & Engineered Wood",
  description: "Herringbone and chevron floors in engineered wood and premium laminate, precision-fitted in Dublin homes. Request samples and a free quote.",
  path: "/service/flooring/herringbone",
  image: "/herringbone-detail.webp",
});

export default function HerringboneLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("Herringbone & Chevron Flooring Installation", "Herringbone flooring installation", "/service/flooring/herringbone")} />
      {children}
    </>
  );
}