"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Pages with a full-screen photo hero: at the top the navbar floats over the photo as a white rounded bar;
// after scrolling it becomes the normal full-width white bar, and floats again when you scroll back up. Add a page path here to give it the same effect.
const PHOTO_HERO_PAGES = ["/", "/service/flooring", "/service/snaglist", "/service/blinds"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";

  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const overHero = PHOTO_HERO_PAGES.includes(path);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the page changes
  useEffect(() => setIsOpen(false), [pathname]);

  const closeMenu = () => setIsOpen(false);

  // Desktop links: gold underline slides in on hover
  const linkClass =
    "relative py-1 hover:text-[#b7935b] transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:bg-[#b7935b] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";

  const links = (
    <>
      <Link href="/" className={linkClass}>Home</Link>
      <Link href="/service/flooring" className={linkClass}>Flooring</Link>
      <Link href="/service/snaglist" className={linkClass}>Snaglist</Link>
      <Link href="https://luxblinds.ie/" target="_blank" rel="noopener noreferrer" className={linkClass}>Blinds</Link>
      <Link href="/service/contact" className={linkClass}>Contact</Link>
    </>
  );

  const mobileLinks = (
    <div className="flex flex-col items-center gap-6 text-lg font-bold text-gray-900">
      <Link href="/" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Home</Link>
      <Link href="/service/flooring" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Flooring</Link>
      <Link href="/service/snaglist" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Snaglist</Link>
      <Link href="https://luxblinds.ie/" target="_blank" rel="noopener noreferrer" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Blinds</Link>
      <Link href="/service/contact" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Contact</Link>
    </div>
  );

  const logo = (
    <Link href="/" className="flex items-center shrink-0" onClick={closeMenu}>
      <Image
        src="/logo.webp"
        alt="Dublin PropTech Logo"
        width={60}
        height={20}
        className={`h-auto object-contain transition-all duration-300 ${
          overHero ? (scrolled ? "w-[150px] md:w-[130px]" : "w-[115px] md:w-[105px]") : "w-[160px] md:w-[130px]"
        }`}
        priority
      />
    </Link>
  );

  const hamburger = (
    <button className="md:hidden p-2 text-gray-900 focus:outline-none" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );

  // ---------- Photo-hero pages: floating bar at the top, normal full-width bar after scrolling ----------
  if (overHero) {
    return (
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "px-0 pt-0" : "px-3 md:px-6 pt-4 md:pt-5"
        }`}
      >
        <div
          className={`relative mx-auto flex justify-between items-center transition-all duration-500 ${
            scrolled
              ? "max-w-full rounded-none bg-white border-b border-gray-200 shadow-sm px-8 md:px-16 py-4"
              : "max-w-6xl rounded-2xl md:rounded-full bg-white/95 border border-white/60 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] px-5 md:px-7 py-1.5"
          }`}
        >
          {logo}
          <div
            className={`hidden md:flex items-center font-bold text-gray-900 transition-all duration-500 ${
              scrolled ? "gap-x-7 text-lg" : "gap-x-6 text-base"
            }`}
          >
            {links}
          </div>
          {hamburger}

          {/* Mobile Menu Dropdown Panel */}
          <div
            className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
              scrolled ? "mt-0 rounded-none border-b border-gray-200" : "mt-2 rounded-2xl"
            } ${isOpen ? "max-h-[400px] opacity-100 py-5" : "max-h-0 opacity-0 py-0"}`}
          >
            {mobileLinks}
          </div>
        </div>
      </nav>
    );
  }

  // ---------- All other pages: normal white bar (unchanged) ----------
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-5 px-8 md:px-16 relative z-50">
      <div className="flex justify-between items-center w-full">
        {logo}
        <div className="hidden md:flex items-center gap-x-7 text-lg font-bold text-gray-900">{links}</div>
        {hamburger}
      </div>

      {/* Mobile Menu Dropdown Panel */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        {mobileLinks}
      </div>
    </nav>
  );
}