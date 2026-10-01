import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Wall Panels Dublin – Acoustic Slat & SPC Shower Panels",
  description: "Acoustic slatted wood feature walls and 100% waterproof SPC shower panels installed in Dublin. Zero grout, mould-free, faster than tiling. Get a free quote.",
  path: "/service/wall-panels",
  image: "/wall-panels-prep.webp",
});

export default function WallPanelsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("Wall Panel Installation", "Wall panelling installation", "/service/wall-panels")} />
      {children}
    </>
  );
}