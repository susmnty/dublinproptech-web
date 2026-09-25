import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import RecentBlogs from "./components/RecentBlogs";

export const metadata: Metadata = {
  title: "Dublin Proptech",
  description: "Premium flooring, blinds, and snagging inspections in Dublin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black flex flex-col min-h-screen">
        
        {/* Exact Header matching dublinproptech.com */}
        <nav className="w-full bg-white border-b border-gray-200 py-6 px-6 md:px-20 flex justify-between items-center">
          <Link href="/" className="flex items-center shrink-0">
            <Image 
              src="/logo.png" 
              alt="Dublin PropTech Logo" 
              width={130} 
              height={50} 
              className="w-[195px] md:w-[120px] h-auto object-contain"
              priority
            />
          </Link>
          
          <div className="flex items-center gap-x-4 text-base md:text-lg font-bold text-gray-900">
            <Link href="/" className="hover:text-[#b7935b] transition-colors">Home</Link>
            <Link href="/service/flooring" className="hover:text-[#b7935b] transition-colors">Flooring</Link>
            <Link href="/service/snaglist" className="hover:text-[#b7935b] transition-colors">Snaglist</Link>
            <Link href="https://luxblinds.ie/" target="_blank" rel="noopener noreferrer" className="hover:text-[#b7935b] transition-colors">Blinds</Link>
            <Link href="/service/contact" className="hover:text-[#b7935b] transition-colors">Contact</Link>
          </div>
        </nav>
        
        {/* Main Content Area */}
        <div className="w-full flex-grow">
          {children}
        </div>

        {/* NOTION BLOGS COMPONENT */}
        <RecentBlogs />

        {/* Global Footer */}
        <footer className="bg-[#1a1814] text-white pt-14 pb-8 w-full mt-10 font-sans">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            
            {/* Logo Section */}
            <div className="mb-6 flex justify-center md:justify-start">
              <Image 
                src="/logo.png" 
                alt="Dublin PropTech" 
                width={240} 
                height={100} 
                className="w-[180px] h-auto object-contain brightness-0 invert" 
              />
            </div>

            {/* Top Divider */}
            <div className="border-t border-gray-700 mb-10"></div>

            {/* Columns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16 text-center sm:text-left">
              
              {/* Column 1: Contact us */}
              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">Contact us</h4>
                <span className="text-gray-300">Dublin, Ireland</span>
                <span className="text-gray-300">dublinproptech@gmail.com</span>
                
                {/* Social Media Icons */}
                <div className="flex justify-center sm:justify-start gap-6 mt-4 text-white">
                  <a href="https://www.instagram.com/dublinproptech/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#b7935b] transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="https://www.facebook.com/people/Dublin-Proptech/61580488380589/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#b7935b] transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="https://x.com/DublinProptech" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-[#b7935b] transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                  </a>
                </div>
              </div>

              {/* Column 2: Customer Care */}
              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">Customer Care</h4>
                <a href="tel:+353899655102" className="text-gray-300 hover:text-white transition-colors">+353 89 965 5102</a>
              </div>

              {/* Column 3: About */}
              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">About</h4>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Dublin Proptech</Link>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</Link>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blogs</Link>
              </div>

              {/* Column 4: Services */}
              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">Services</h4>
                <Link href="/service/flooring" className="text-gray-300 hover:text-white transition-colors">Premium Flooring</Link>
                <Link href="/service/snaglist" className="text-gray-300 hover:text-white transition-colors">Snagging Inspections</Link>
                <Link href="https://luxblinds.ie/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Custom Blinds</Link>
              </div>

            </div>

            {/* Bottom Divider & Legal Links */}
            <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-center md:justify-start gap-4 md:gap-6 text-[14px] text-gray-400 text-center md:text-left">
              <Link href="/cookie-policy" className="hover:text-white underline underline-offset-4">Cookie Policy</Link>
              <Link href="/privacy-policy" className="hover:text-white underline underline-offset-4">Legal & privacy</Link>
              <Link href="/terms-conditions" className="hover:text-white underline underline-offset-4">Terms & conditions</Link>
            </div>
            
          </div>
        </footer>
        
      </body>
    </html>
  );
}