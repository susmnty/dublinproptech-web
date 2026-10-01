import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import RecentBlogs from "./components/RecentBlogs";
import Navbar from "./components/Navbar";
import { SITE_URL, SITE_NAME, BUSINESS_ID, JsonLd, areaServedSchema } from "@/app/lib/seo";

// No canonical here: a root canonical is inherited by every page without its own
// and told Google they were all copies of the homepage.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dublin PropTech | Snagging Inspections & Flooring in Dublin",
    template: "%s | Dublin PropTech",
  },
  description:
    "Independent snagging inspections from €200 and premium flooring supply & fit in Dublin. 300+ point check, photo report in 48 hours. Get a free quote.",
  openGraph: {
    title: "Dublin PropTech | Snagging Inspections & Flooring in Dublin",
    description: "Independent snagging inspections from €200 and premium flooring supply & fit in Dublin.",
    siteName: SITE_NAME,
    images: [{ url: "/d-logo-irish.webp", width: 1200, height: 630, alt: SITE_NAME }],
    locale: "en_IE",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": BUSINESS_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.webp`,
      image: `${SITE_URL}/snaglist.webp`,
      telephone: "+353899655102",
      email: "dublinproptech@gmail.com",
      priceRange: "€€",
      address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
      areaServed: areaServedSchema(),
      sameAs: [
        "https://www.instagram.com/dublinproptech/",
        "https://www.facebook.com/people/Dublin-Proptech/61580488380589/",
        "https://www.youtube.com/@DublinProptech",
        "https://x.com/DublinProptech",
        "https://ie.pinterest.com/dublinproptech/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": BUSINESS_ID },
      inLanguage: "en-IE",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IE">
      <body className="antialiased bg-white text-black flex flex-col min-h-screen">
        <JsonLd data={jsonLd} />

        <Navbar />

        <div className="w-full flex-grow">{children}</div>

        <RecentBlogs />

        <footer className="bg-[#1a1814] text-white pt-14 pb-8 w-full mt-10 font-sans">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-6 flex justify-center md:justify-start">
              <Image src="/logo.webp" alt="Dublin PropTech" width={240} height={100} className="w-[180px] h-auto object-contain brightness-0 invert" />
            </div>

            <div className="border-t border-gray-700 mb-10"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16 text-center sm:text-left">
              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">Contact us</h4>
                <span className="text-gray-300">Dublin, Ireland</span>
                <a href="mailto:dublinproptech@gmail.com" className="text-gray-300 hover:text-white transition-colors">dublinproptech@gmail.com</a>
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

              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">Customer Care</h4>
                <a href="tel:+353899655102" className="text-gray-300 hover:text-white transition-colors">+353 89 965 5102</a>
              </div>

              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">About</h4>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Dublin Proptech</Link>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</Link>
                <Link href="/blogs" className="text-gray-300 hover:text-white transition-colors">Blogs</Link>
              </div>

              <div className="flex flex-col gap-4 text-[15px]">
                <h4 className="font-bold text-white text-base mb-1">Services</h4>
                <Link href="/service/snaglist" className="text-gray-300 hover:text-white transition-colors">Snagging Inspections Dublin</Link>
                <Link href="/service/flooring" className="text-gray-300 hover:text-white transition-colors">Flooring Supply &amp; Fit</Link>
                <Link href="/service/lvt" className="text-gray-300 hover:text-white transition-colors">LVT &amp; Tiles</Link>
                <Link href="/service/stairs" className="text-gray-300 hover:text-white transition-colors">Stair Cladding &amp; Runners</Link>
                <Link href="/service/wall-panels" className="text-gray-300 hover:text-white transition-colors">Wall Panels</Link>
                <a href="https://luxblinds.ie/" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Custom Blinds</a>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-center md:justify-start gap-4 md:gap-6 text-[14px] text-gray-400 text-center md:text-left">
              <Link href="/cookie-policy" className="hover:text-white underline underline-offset-4">Cookie Policy</Link>
              <Link href="/privacy-policy" className="hover:text-white underline underline-offset-4">Legal &amp; privacy</Link>
              <Link href="/terms-conditions" className="hover:text-white underline underline-offset-4">Terms &amp; conditions</Link>
            </div>
          </div>
        </footer>

        <Script id="hs-script-loader" strategy="lazyOnload" src="//js-na2.hs-scripts.com/246058565.js" />
        <GoogleAnalytics gaId="G-BX0MTVEM6X" />
      </body>
    </html>
  );
}