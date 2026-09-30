import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flooring Dublin | Laminate, Herringbone & Carpet Tiles",
  description: "Flooring supply & installation in Dublin. AC5 laminate, herringbone and DESSO carpet tiles with expert subfloor prep and a flawless finish. Get a free quote.",
  alternates: { canonical: "/service/flooring" },
};

export default function FlooringLayout({ children }: { children: React.ReactNode }) {
  return children;
}