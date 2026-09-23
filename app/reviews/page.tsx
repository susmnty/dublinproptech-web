"use client";

import Script from "next/script";

export default function ReviewsPage() {
  return (
    <main className="px-6 max-w-6xl mx-auto w-full py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight mb-4">
          What Our Clients Say
        </h1>
        <p className="text-gray-500 text-[17px] max-w-2xl mx-auto">
          Reviews from Dublin homeowners we have worked with.
        </p>
      </section>

      <div className="elfsight-app-6086c492-1131-4b31-b55f-06e7d2b57d8d" data-elfsight-app-lazy></div>
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </main>
  );
}