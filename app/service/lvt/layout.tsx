import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "LVT & SPC Flooring Dublin – Supply & Fitting",
  description: "LVT and waterproof SPC flooring supplied and fitted in Dublin. Wide plank and herringbone styles, underfloor-heating ready, levelled subfloors. Free quote.",
  path: "/service/lvt",
  image: "/lvt-cat.webp",
});

export default function LvtLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("LVT & SPC Flooring Installation", "Luxury vinyl flooring installation", "/service/lvt")} />
      {children}
    </>
  );
}