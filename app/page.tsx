import type { Metadata } from "next";
import { pageMeta } from "@/app/lib/seo";
import HomeClient from "./HomeClient";

// The homepage UI is a client component (HomeClient.tsx), which can't export metadata.
// This thin server wrapper adds the homepage canonical URL; the page looks exactly the same.
export const metadata: Metadata = pageMeta({
  title: "Dublin PropTech | Flooring, Snagging & Blinds in Dublin",
  absoluteTitle: true,
  description:
    "Premium flooring supply & fit, independent snagging inspections from €200 and made-to-measure blinds across Dublin. Free quotes, fixed prices, expert team.",
  path: "/",
});

export default function Page() {
  return <HomeClient />;
}
