import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Privacy | Dublin Proptech",
  description: "Privacy policy and legal information for Dublin Proptech.",
};

export default function PrivacyPolicy() {
  return (
    <main className="w-full bg-[#f2efe8] text-gray-900 pt-16 pb-24 min-h-screen selection:bg-[#b7935b] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-white p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100">
          <div className="w-12 h-1 bg-[#b7935b] mb-8"></div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">Legal & Privacy Policy</h1>
          
          <div className="text-gray-600 space-y-6 leading-relaxed">
            <p><strong>Last Updated:</strong> September 2026</p>
            
            <p>Dublin Proptech ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Dublin Proptech in compliance with the General Data Protection Regulation (GDPR).</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            <p>We only collect information that you voluntarily provide to us when expressing an interest in obtaining information about our services (Snagging, Flooring, Blinds) or when contacting us via our website forms. The personal information we collect may include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>First and Last Name</li>
              <li>Email Address</li>
              <li>Details of your inquiry or message</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to communicate with you, fulfill your service requests, and improve our business operations. Your data is routed securely to our team via Web3Forms and is never sold to third-party data brokers.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your GDPR Rights</h2>
            <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Dublin Proptech aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete the information we have on you.</li>
              <li>Object to our processing of your Personal Data.</li>
              <li>Request portability of your Personal Data.</li>
            </ul>
            
            <p>To exercise any of these rights, please contact us directly at <strong>info@dublinproptech.com</strong>.</p>
          </div>
        </div>
      </div>
    </main>
  );
}