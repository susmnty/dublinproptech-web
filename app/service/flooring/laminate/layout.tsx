import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

// Page is "use client", so metadata lives here (client components can't export metadata).
export const metadata: Metadata = pageMeta({
  title: "Laminate Flooring Dublin – Supplied & Fitted",
  description: "AC4 and AC5 laminate flooring supplied and fitted in Dublin. 8mm to 14mm, herringbone and waterproof 12mm ranges. Browse by colour and thickness. Free quote.",
  path: "/service/flooring/laminate",
  image: "/flooring/evolution.webp",
});

export default function LaminateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("Laminate Flooring Supply & Installation", "Laminate flooring installation", "/service/flooring/laminate")} />
      {children}
    </>
  );
}