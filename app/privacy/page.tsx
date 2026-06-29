import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FINNOVO",
  description: "Privacy Policy for FinAcco services.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-[#565e74] dark:text-[#CBD5E1]">
      <h1 className="text-3xl md:text-5xl font-bold text-secondary dark:text-white mb-6">Privacy Policy</h1>
      <p className="mb-8"><strong>Effective Date:</strong> March 30, 2026</p>
      
      <p className="mb-6">Welcome to FinAcco. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">1. Information We Collect</h2>
          <p className="mb-2">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>a. Personal Information:</strong> Name, Email address, Phone number, Company name, Job title</li>
            <li><strong>b. Business Information:</strong> Financial or operational data shared for service inquiries, Employee-related information (for payroll/EOR services)</li>
            <li><strong>c. Technical Information:</strong> IP address, Browser type, Device information, Cookies and usage data</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">2. How We Use Your Information</h2>
          <p className="mb-2">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and manage our services</li>
            <li>Respond to inquiries and consultations</li>
            <li>Process payroll, compliance, and EOR services</li>
            <li>Improve website functionality and experience</li>
            <li>Send updates or service-related communication</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">3. Sharing of Information</h2>
          <p className="mb-2">We do not sell your personal data. We may share information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Trusted service providers and partners</li>
            <li>Legal or regulatory authorities when required</li>
            <li>Internal teams for service delivery</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">4. Data Security</h2>
          <p className="mb-2">We implement appropriate technical and organizational measures to protect your data, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure servers and encrypted systems</li>
            <li>Restricted access to sensitive data</li>
            <li>Confidentiality agreements with employees</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">5. International Data Transfers</h2>
          <p>As we serve global clients, your data may be processed in different countries. We ensure appropriate safeguards are in place.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">6. Cookies Policy</h2>
          <p>We use cookies to improve performance, analyze behavior, and enhance user experience. You can control cookies through your browser settings.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">7. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to access, correct, update, or request deletion of your data, or withdraw consent.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">8. Data Retention</h2>
          <p>We retain your information only as long as necessary for business, legal, or compliance purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">9. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">10. Updates to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">11. Contact Us</h2>
          <p>If you have any questions regarding this Privacy Policy, please contact:</p>
          <p className="mt-2"><strong>FinAcco</strong></p>
          <p>Email: <a href="mailto:legal@finacco.in" className="text-primary hover:underline cursor-pointer">legal@finacco.in</a></p>
          <p>Website: <a href="https://finacco.in" className="text-primary hover:underline cursor-pointer">finacco.in</a></p>
        </section>
      </div>
    </div>
  );
}
