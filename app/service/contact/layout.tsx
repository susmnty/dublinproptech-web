import type { Metadata } from "next";
import { pageMeta } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us – Book a Snag List or Flooring Quote",
  description: "Book a snagging inspection or get a free flooring quote in Dublin. Call +353 89 965 5102, WhatsApp us or send us a message.",
  path: "/service/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}