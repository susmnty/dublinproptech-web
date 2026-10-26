import type { Metadata } from "next";
import { pageMeta } from "@/app/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Cookie Policy",
  description: "How Dublin PropTech uses cookies, including optional Google Analytics and HubSpot cookies, and how to change your cookie settings.",
  path: "/cookie-policy",
});

export default function CookiePolicy() {
  return (
    <main className="w-full bg-[#f2efe8] text-gray-900 pt-16 pb-24 min-h-screen selection:bg-[#b7935b] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-white p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100">
          <div className="w-12 h-1 bg-[#b7935b] mb-8"></div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="text-gray-600 space-y-6 leading-relaxed">
            <p><strong>Last Updated:</strong> October 2026</p>
            
            <p>At Dublin Proptech, we believe in being clear and open about how we collect and use data related to you. This Cookie Policy applies to any Dublin Proptech product or service that links to this policy or incorporates it by reference.</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What are cookies?</h2>
            <p>Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work or work more efficiently, as well as to provide reporting information and assist with service or site personalization.</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How we use cookies</h2>
            <p>When you first visit our website we ask whether you accept analytics cookies. Optional cookies are only set if you click &quot;Accept&quot;. If you click &quot;Reject&quot;, they are not set.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Strictly Necessary:</strong> We store your cookie choice in your browser so we don&apos;t ask again on every page. No personal information is stored.</li>
              <li><strong>Analytics (optional) - Google Analytics 4:</strong> Helps us understand how visitors find and use our website, for example which pages are viewed and whether an enquiry form was sent. We do not send your name, email address, phone number or message to Google Analytics.</li>
              <li><strong>Analytics (optional) - HubSpot:</strong> Helps us link enquiries sent through our website forms to the pages visited before the enquiry.</li>
            </ul>
            <p>Without consent, Google Analytics may receive basic, cookieless signals (such as a page being viewed) under Google Consent Mode. These do not use cookies or identify you.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Managing your cookies</h2>
            <p>You can change your choice at any time using the &quot;Cookie settings&quot; link at the bottom of every page.</p>
            <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.</p>
            <p>If you have any questions about our use of cookies, please contact us at <strong>dublinproptech@gmail.com</strong>.</p>
          </div>
        </div>
      </div>
    </main>
  );
}