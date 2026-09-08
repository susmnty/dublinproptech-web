import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Dublin Proptech",
  description: "Cookie policy for Dublin Proptech.",
};

export default function CookiePolicy() {
  return (
    <main className="w-full bg-[#f2efe8] text-gray-900 pt-16 pb-24 min-h-screen selection:bg-[#b7935b] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-white p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100">
          <div className="w-12 h-1 bg-[#b7935b] mb-8"></div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="text-gray-600 space-y-6 leading-relaxed">
            <p><strong>Last Updated:</strong> September 2026</p>
            
            <p>At Dublin Proptech, we believe in being clear and open about how we collect and use data related to you. This Cookie Policy applies to any Dublin Proptech product or service that links to this policy or incorporates it by reference.</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What are cookies?</h2>
            <p>Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work or work more efficiently, as well as to provide reporting information and assist with service or site personalization.</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How we use cookies</h2>
            <p>Dublin Proptech strictly uses essential cookies required to deliver our website securely and functionally. Because our site is statically generated, we do not deploy invasive third-party marketing or tracking cookies without your explicit consent.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site.</li>
              <li><strong>Functional Cookies:</strong> These allow our website to remember choices you make (such as form submissions) to provide a more enhanced, personal experience.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Managing your cookies</h2>
            <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.</p>
            <p>If you have any questions about our use of cookies, please contact us at <strong>info@dublinproptech.com</strong>.</p>
          </div>
        </div>
      </div>
    </main>
  );
}