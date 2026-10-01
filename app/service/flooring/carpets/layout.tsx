import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

// Page is "use client", so metadata lives here (client components can't export metadata).
export const metadata: Metadata = pageMeta({
  title: "Carpets & Carpet Tiles Dublin – Supply & Fit",
  description: "Luxury deep-pile carpets and Tarkett DESSO Essence carpet tiles supplied and fitted in Dublin. Browse by colour and pile type. Free quote.",
  path: "/service/flooring/carpets",
  image: "/carpets/luxury-carpets/riva.webp",
});

export default function CarpetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("Carpet & Carpet Tile Installation", "Carpet installation", "/service/flooring/carpets")} />
      {children}
    </>
  );
}