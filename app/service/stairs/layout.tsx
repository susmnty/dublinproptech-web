import type { Metadata } from "next";
import { pageMeta, JsonLd, serviceJsonLd } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Stair Cladding Dublin – Oak & Laminate Stairs, Carpet Runners",
  description: "Oak and laminate stair cladding and bespoke carpet runners fitted in Dublin. Squeaks fixed first, custom nosing, colour-matched to your floors. Free quote.",
  path: "/service/stairs",
  image: "/stair-cladding.webp",
});

export default function StairsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("Stair Cladding & Carpet Runners", "Staircase renovation", "/service/stairs")} />
      {children}
    </>
  );
}