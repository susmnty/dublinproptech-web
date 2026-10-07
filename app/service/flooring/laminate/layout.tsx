import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

// Page is "use client", so metadata lives here (client components can't export metadata).
export const metadata: Metadata = pageMeta({
  title: "Laminate Flooring Dublin – Supply & Installation",
  description: "Laminate flooring supplied and installed in Dublin. AC4 & AC5 rated, 8mm to 14mm, herringbone and water-resistant ranges, fitted with skirting and trims. Free quote.",
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