import type { Metadata } from "next";
import { pageMeta } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Customer Reviews – Snagging & Flooring Dublin",
  description: "Read reviews from Dublin homeowners who used Dublin PropTech for snagging inspections, flooring and stair installations.",
  path: "/reviews",
});

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}