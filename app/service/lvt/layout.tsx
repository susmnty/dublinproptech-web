import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "LVT, SPC & Porcelain Tiles Dublin – Supply & Fit",
  description: "Luxury vinyl tile, SPC rigid core and porcelain tiles supplied and fitted in Dublin. Waterproof, underfloor-heating ready, laser-levelled subfloors. Free quote.",
  path: "/service/lvt",
  image: "/lvt-cat.webp",
});

export default function LvtLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("LVT & Tile Flooring Installation", "Vinyl and tile flooring installation", "/service/lvt")} />
      {children}
    </>
  );
}