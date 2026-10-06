import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Flooring Dublin | Laminate, Herringbone & Carpet Tiles",
  absoluteTitle: true,
  description:
    "Flooring supply & installation in Dublin. AC5 laminate, herringbone and DESSO carpet tiles with expert subfloor prep and a flawless finish. Get a free quote.",
  path: "/service/flooring",
  image: "/flooring.webp?v=2",
});

export default function FlooringLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("Flooring Supply & Installation", "Flooring installation", "/service/flooring")} />
      {children}
    </>
  );
}