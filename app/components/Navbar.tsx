"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 py-5 px-8 md:px-16 relative z-50">
      <div className="flex justify-between items-center w-full">
        
        {/* Logo on the far left edge */}
        <Link href="/" className="flex items-center shrink-0" onClick={closeMenu}>
          <Image 
            src="/logo.png" 
            alt="Dublin PropTech Logo" 
            width={60} 
            height={20} 
            className="w-[160px] md:w-[130px] h-auto object-contain"
            priority
          />
        </Link>
        
        {/* Navigation Links pushed to the far right edge (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-x-4 text-lg font-bold text-gray-900">
          <Link href="/" className="hover:text-[#b7935b] transition-colors">Home</Link>
          <Link href="/service/flooring" className="hover:text-[#b7935b] transition-colors">Flooring</Link>
          <Link href="/service/snaglist" className="hover:text-[#b7935b] transition-colors">Snaglist</Link>
          <Link href="https://luxblinds.ie/" target="_blank" rel="noopener noreferrer" className="hover:text-[#b7935b] transition-colors">Blinds</Link>
          <Link href="/service/contact" className="hover:text-[#b7935b] transition-colors">Contact</Link>
        </div>

        {/* Mobile Hamburger Icon (Hidden on Desktop) */}
        <button 
          className="md:hidden p-2 text-gray-900 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Menu Dropdown Panel */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-lg font-bold text-gray-900">
          <Link href="/" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Home</Link>
          <Link href="/service/flooring" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Flooring</Link>
          <Link href="/service/snaglist" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Snaglist</Link>
          <Link href="https://luxblinds.ie/" target="_blank" rel="noopener noreferrer" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Blinds</Link>
          <Link href="/service/contact" className="hover:text-[#b7935b] transition-colors w-full text-center" onClick={closeMenu}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}