import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">Page not found</h1>
      <p className="text-gray-600 text-lg mb-10">That page has moved or no longer exists. Try one of these:</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/service/snaglist" className="bg-[#1a1814] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#b7935b] transition-colors">Snagging Inspections</Link>
        <Link href="/service/flooring" className="bg-[#1a1814] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#b7935b] transition-colors">Flooring</Link>
        <Link href="/" className="border border-gray-900 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors">Home</Link>
      </div>
    </main>
  );
}