import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

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
        
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6 border-b border-gray-200 max-w-6xl mx-auto w-full">
          <Link href="/" className="flex items-center">
            {/* Make sure to place your actual logo file (e.g., logo.png) in the public folder */}
            <Image 
              src="/logo.png" 
              alt="Dublin PropTech Logo" 
              width={120} 
              height={60} 
              className="object-contain"
              priority
            />
          </Link>
          
          <div className="flex gap-8 text-lg font-semibold text-gray-800">
            <Link href="/Service/flooring" className="hover:text-[#b7935b] transition-colors">Flooring</Link>
            <Link href="/Service/snaglist" className="hover:text-[#b7935b] transition-colors">Snaglist</Link>
            <Link href="/Service/blinds" className="hover:text-[#b7935b] transition-colors">Blinds</Link>
            <Link href="/Service/contact" className="hover:text-[#b7935b] transition-colors">Contact Us</Link>
          </div>
        </nav>
        
        {/* Main Content Area */}
        <div className="w-full flex-grow">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="bg-[#1a1814] text-white pt-14 pb-8 w-full mt-10 font-sans">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            {/* Logo Section */}
            <div className="mb-6">
              <Image 
                src="/logo.png" 
                alt="Dublin PropTech" 
                width={180} 
                height={60} 
                className="w-[180px] h-auto object-contain brightness-0 invert" 
              />
            </div>

            {/* Top Divider */}
            <div className="border-t border-gray-700 mb-10"></div>

            {/* Columns Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
              
              {/* Column 1: Contact us */}
              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">Contact us</h4>
                <Link href="/Service/contact" className="text-gray-300 hover:text-white transition-colors">Contact us</Link>
                <span className="text-gray-300">Dublin, Ireland</span>
                <span className="text-gray-300">info@dublinproptech.com</span>
                
                {/* Social Media Icons */}
                <div className="flex gap-6 mt-4 text-white">
                  <a href="#" aria-label="Instagram" className="hover:text-[#b7935b] transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" aria-label="Meta" className="hover:text-[#b7935b] transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-[#b7935b] transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </div>

              {/* Column 2: Customer Care */}
              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">Customer Care</h4>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Customer information</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Returns</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </div>

              {/* Column 3: About */}
              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">About</h4>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">About Dublin Proptech</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Join our team</Link>
              </div>

              {/* Column 4: Services */}
              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">Services</h4>
                <Link href="/Service/flooring" className="text-gray-300 hover:text-white transition-colors">Premium Flooring</Link>
                <Link href="/Service/snaglist" className="text-gray-300 hover:text-white transition-colors">Snagging Inspections</Link>
                <Link href="/Service/blinds" className="text-gray-300 hover:text-white transition-colors">Custom Blinds</Link>
              </div>

            </div>

            {/* Bottom Divider & Legal Links */}
            <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row gap-6 text-[14px] text-gray-400">
              <Link href="#" className="hover:text-white underline underline-offset-4">Cookie Policy</Link>
              <Link href="#" className="hover:text-white underline underline-offset-4">Legal & privacy</Link>
              <Link href="#" className="hover:text-white underline underline-offset-4">Terms & conditions</Link>
            </div>
            
          </div>
        </footer>
        
      </body>
    </html>
  );
}