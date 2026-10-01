import type { Metadata } from "next";
import { pageMeta } from "@/app/lib/seo";

// Overrides the parent flooring layout (was giving this page the flooring title + canonical)
export const metadata: Metadata = pageMeta({
  title: "Engineered Wood Flooring Dublin – Supply & Fit",
  description: "Engineered wood flooring supplied and fitted in Dublin. Real timber veneer on a stable multi-ply core, ideal for underfloor heating. Request samples today.",
  path: "/service/flooring/engineered-wood",
  image: "/engineered-detail.webp",
});

export default function EngineeredWoodLayout({ children }: { children: React.ReactNode }) {
  return children;
}