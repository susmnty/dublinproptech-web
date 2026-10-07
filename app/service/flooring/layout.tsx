import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Flooring Dublin | Laminate, LVT, Tiles & Carpets – Supply & Fitting",
  absoluteTitle: true,
  description:
    "Flooring supply & installation in Dublin. Laminate, engineered wood, herringbone, LVT & SPC, floor tiles and carpets, with expert subfloor prep and a flawless finish. Free survey & quote.",
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