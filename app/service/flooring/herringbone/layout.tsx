import type { Metadata } from "next";
import { pageMeta } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Herringbone & Chevron Flooring Dublin",
  description: "Herringbone and chevron floors in engineered wood and premium laminate, precision-fitted in Dublin homes. Request samples and a free quote.",
  path: "/service/flooring/herringbone",
  image: "/herringbone-detail.webp",
});

export default function HerringboneLayout({ children }: { children: React.ReactNode }) {
  return children;
}