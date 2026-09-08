import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Dublin Proptech",
  description: "Terms and conditions of service for Dublin Proptech.",
};

export default function TermsConditions() {
  return (
    <main className="w-full bg-[#f2efe8] text-gray-900 pt-16 pb-24 min-h-screen selection:bg-[#b7935b] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="bg-white p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100">
          <div className="w-12 h-1 bg-[#b7935b] mb-8"></div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="text-gray-600 space-y-6 leading-relaxed">
            <p><strong>Last Updated:</strong> September 2026</p>
            
            <p>Welcome to Dublin Proptech. By accessing our website and utilizing our services, you agree to be bound by the following Terms and Conditions. Please read them carefully.</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Services</h2>
            <p>Dublin Proptech provides property technology services in Ireland, specializing in new home snagging inspections, premium flooring, and bespoke blinds. All services are subject to availability and formal agreement upon quotation.</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Quotes and Bookings</h2>
            <p>Any quotes provided via email or phone are estimates based on the information provided by the client. Final pricing will be confirmed in a formal contract before any service commences. We reserve the right to refuse service at our discretion.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Intellectual Property</h2>
            <p>All content published and made available on our site is the property of Dublin Proptech. This includes, but is not limited to images, text, logos, documents, downloadable files, and anything that contributes to the composition of our site.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Limitation of Liability</h2>
            <p>Dublin Proptech and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities, and expenses including legal fees from your use of the site or our services, beyond the scope of our legally required insurance policies.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Governing Law</h2>
            <p>These Terms and Conditions are governed by the laws of Ireland. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Ireland.</p>

            <p className="mt-8">For any queries regarding these terms, please email us at <strong>info@dublinproptech.com</strong>.</p>
          </div>
        </div>
      </div>
    </main>
  );
}