import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Wall Panels Dublin – Slat & Acoustic Feature Walls",
  description: "Slat and acoustic wood wall panels supplied and fitted in Dublin. Feature walls for living rooms, bedrooms and offices in oak, walnut, white and grey.",
  path: "/service/wall-panels",
  image: "/wall-panels-prep.webp?v=2",
});

export default function WallPanelsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("Wall Panel Installation", "Wall panelling installation", "/service/wall-panels")} />
      {children}
    </>
  );
}