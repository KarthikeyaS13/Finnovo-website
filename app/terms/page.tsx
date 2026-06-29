import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FINNOVO",
  description: "Terms of Service for FinAcco.",
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-[#565e74] dark:text-[#CBD5E1]">
      <h1 className="text-3xl md:text-5xl font-bold text-secondary dark:text-white mb-6">Terms of Service</h1>
      <p className="mb-8"><strong>Effective Date:</strong> March 30, 2026</p>

      <p className="mb-6">By accessing or using the FinAcco website and services, you agree to the following terms.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">1. Use of Website</h2>
          <p className="mb-2">You agree to use this website for lawful purposes only. You must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to systems</li>
            <li>Use the website for fraudulent or harmful activities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">2. Services</h2>
          <p className="mb-2">FinAcco provides services including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Accounting & Finance</li>
            <li>Payroll & HR</li>
            <li>Employer of Record (EOR)</li>
            <li>Compliance & Registration</li>
            <li>Global Advisory Services</li>
          </ul>
          <p className="mt-4">All services are subject to separate agreements, scope, and pricing.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">3. Engagement Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Services are provided based on agreed scope and timelines</li>
            <li>Pricing may vary depending on complexity and requirements</li>
            <li>Clients are responsible for providing accurate information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">4. Intellectual Property</h2>
          <p>All content on this website, including text, design, logos, and graphics, is the property of FinAcco and may not be used without permission.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">5. Confidentiality</h2>
          <p>We maintain strict confidentiality of client data and expect clients to respect confidentiality obligations where applicable.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">6. Limitation of Liability</h2>
          <p className="mb-2">FinAcco shall not be liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Indirect or consequential damages</li>
            <li>Loss of data, revenue, or business opportunities</li>
            <li>Any errors arising from inaccurate information provided by clients</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">7. Compliance Disclaimer</h2>
          <p>While we strive to ensure compliance with applicable laws, clients are responsible for final decisions and approvals. Regulations may vary by jurisdiction.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">8. Third-Party Tools & Software</h2>
          <p>We may use third-party tools (including payroll software and integrations). We are not responsible for issues arising from third-party platforms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">9. Termination</h2>
          <p className="mb-2">We reserve the right to suspend or terminate services in case of:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Breach of terms</li>
            <li>Non-payment</li>
            <li>Misuse of services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">10. Governing Law</h2>
          <p>These terms shall be governed by the laws of India, unless otherwise agreed in writing.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">11. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the website constitutes acceptance of updated terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">12. Contact Information</h2>
          <p className="mt-2"><strong>FinAcco</strong></p>
          <p>Email: <a href="mailto:mail@finacco.in" className="text-primary hover:underline cursor-pointer">mail@finacco.in</a></p>
          <p>Website: <a href="https://finacco.in" className="text-primary hover:underline cursor-pointer">finacco.in</a></p>
        </section>
      </div>
    </div>
  );
}
