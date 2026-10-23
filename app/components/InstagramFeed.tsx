"use client";

import { useRef } from "react";
import Image from "next/image";
import PHOTOS from "./instagram.json";

// Photos come from public/instagram/ (listed by scripts/instagram-list.mjs). No third-party widget.

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

const arrowClass =
  "absolute top-1/2 -translate-y-1/2 z-10 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1a1814] shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:bg-[#b7935b] hover:text-white transition-colors";

export default function InstagramFeed() {
  const track = useRef<HTMLDivElement>(null);
  const photos = PHOTOS as { src: string; href: string; alt: string }[];

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  if (photos.length === 0) return null;

  return (
    <div className="relative w-full">
      <button type="button" onClick={() => scroll(-1)} aria-label="Previous photos" className={`${arrowClass} -left-5`}>
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button type="button" onClick={() => scroll(1)} aria-label="Next photos" className={`${arrowClass} -right-5`}>
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {/* Big portrait cards: 1 + peek on mobile (swipe), 2 on tablet, 3 on desktop */}
      <div
        ref={track}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p) => (
          <a
            key={p.src}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative shrink-0 snap-start w-[85%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-sm"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Hover: dark fade + Instagram icon */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#1a1814] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <InstagramIcon className="h-6 w-6" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}