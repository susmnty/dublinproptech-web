"use client";

// Reusable FAQ section: shows the questions on the page AND sends them to Google as FAQ schema.
// Use: <ServiceFAQ title="Laminate Flooring FAQs" faqs={[{ q: "...", a: "..." }]} />

import { motion } from "framer-motion";
import { JsonLd } from "@/app/lib/seo";

export type Faq = { q: string; a: string };

export default function ServiceFAQ({ title, faqs, eyebrow = "Good to Know" }: { title: string; faqs: Faq[]; eyebrow?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="px-6 max-w-4xl mx-auto w-full py-24">
      <JsonLd data={schema} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <span className="text-sm font-bold tracking-widest uppercase text-[#b7935b] mb-4 block">{eyebrow}</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">{title}</h2>
      </motion.div>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <motion.details
            key={f.q}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
            className="group bg-white border border-gray-200 rounded-xl shadow-sm open:shadow-md transition-shadow"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6 md:p-7 [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900">{f.q}</h3>
              <span className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-[#b7935b] transition-transform duration-300 group-open:rotate-45">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </span>
            </summary>
            <p className="px-6 md:px-7 pb-6 md:pb-7 -mt-2 text-gray-600 leading-relaxed">{f.a}</p>
          </motion.details>
        ))}
      </div>
    </section>
  );
}
