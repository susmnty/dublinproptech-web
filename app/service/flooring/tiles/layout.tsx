import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

// Page is "use client", so metadata lives here (client components can't export metadata).
export const metadata: Metadata = pageMeta({
  title: "Floor Tiles Dublin – Porcelain & Ceramic Fitting",
  description: "Porcelain, ceramic and large-format floor tiles supplied and fitted in Dublin. Levelled subfloors, tanking for wet areas, ideal with underfloor heating. Free quote.",
  path: "/service/flooring/tiles",
  image: "/tiles-prep.webp",
});

export default function TilesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("Floor Tile Supply & Fitting", "Tile installation", "/service/flooring/tiles")} />
      {children}
    </>
  );
}