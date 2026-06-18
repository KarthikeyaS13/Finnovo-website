import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[#f8f9ff] dark:bg-[#0B1020] min-h-screen">
      {/* Hero Section */}
      <section className="reveal-section max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 text-center space-y-6">
        <div className="reveal-element inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/30 px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
            About Us
          </span>
        </div>
        <h1 className="reveal-element reveal-heading font-display text-4xl md:text-5xl lg:text-[52px] font-extrabold text-secondary dark:text-[#F8FAFC] tracking-tight max-w-4xl mx-auto leading-tight">
          Bridging Financial Acumen with <br />
          <span className="text-primary bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Elite Engineering
          </span>
        </h1>
        <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          FINNOVO was founded to solve a unique market gap: while software developers understand code, they rarely grasp complex ledger structures, regulatory frameworks, or operational compliance. Conversely, finance departments struggle to translate their compliance and reporting needs into software. Our team consists of seasoned finance professionals and elite technologists working as one, delivering custom financial transformations that execute without error.
        </p>
      </section>

      {/* Philosophy / Model Section */}
      <section className="reveal-section py-16 bg-white dark:bg-[#111827] border-y border-gray-150 dark:border-[#2B364D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="reveal-element inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/30 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                Our Philosophy
              </span>
            </div>
            <h2 className="reveal-element reveal-heading font-display text-3xl font-extrabold text-secondary dark:text-[#F8FAFC] tracking-tight">
              &quot;Service as a Software&quot; — Delivering Expertise at Scale
            </h2>
            <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
              Traditional software requires extensive onboarding, training, and manual input. At FINNOVO, we believe in &quot;Service as a Software.&quot; We don&apos;t just sell tools; we deliver fully managed software workflows.
            </p>
            <p className="reveal-element reveal-paragraph font-sans text-gray-500 dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
              By encapsulating specialized financial operations into custom autonomous systems, we ensure that your team spends time analyzing results, not keying in data.
            </p>
          </div>
          <div className="reveal-element reveal-image lg:col-span-6 relative rounded-3xl overflow-hidden h-[300px] md:h-[380px] bg-transparent animate-float">
            <Image
              src="/saas.png"
              alt="FINNOVO Service as a Software Model"
              fill
              className="object-contain opacity-95 cursor-pointer premium-img-hover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Sections */}
      <section className="reveal-section py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        
        {/* The Mission Section */}
        <div className="reveal-card premium-card-hover bg-white dark:bg-[#161F33] border border-gray-200/80 dark:border-[#2B364D] rounded-3xl p-8 md:p-12 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-all duration-300">
          <div className="lg:col-span-6 lg:order-2 space-y-5">
            <span className="font-mono text-[10px] font-bold text-primary dark:text-primary tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded border border-indigo-100/50 dark:border-indigo-800/30 inline-block">
              THE MISSION
            </span>
            <h2 className="font-display text-3xl font-extrabold text-secondary dark:text-[#F8FAFC] tracking-tight">
              Empowering Financial Transformations
            </h2>
            <p className="font-sans text-[#565e74] dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
              Our mission is to translate complex operational challenges, compliance standards, and ledger structures into reliable, automated, and secure software. We empower CFOs and HR leaders to focus on high-level growth by taking operational maintenance off their plates.
            </p>
          </div>
          <div className="reveal-element reveal-image lg:col-span-6 lg:order-1 relative rounded-2xl overflow-hidden h-[300px] md:h-[350px] bg-transparent flex items-center justify-center animate-float-slow">
            <Image
              src="/empowring_financial.png"
              alt="Finnovo Mission Dashboard"
              fill
              className="object-contain opacity-95 cursor-pointer premium-img-hover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* The Vision Section */}
        <div className="reveal-card premium-card-hover bg-white dark:bg-[#161F33] border border-gray-200/80 dark:border-[#2B364D] rounded-3xl p-8 md:p-12 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-all duration-300">
          <div className="lg:col-span-6 space-y-5">
            <span className="font-mono text-[10px] font-bold text-primary dark:text-primary tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded border border-indigo-100/50 dark:border-[#2B364D] inline-block">
              THE VISION
            </span>
            <h2 className="font-display text-3xl font-extrabold text-secondary dark:text-[#F8FAFC] tracking-tight">
              A Future of Zero-Disruption Automation
            </h2>
            <p className="font-sans text-[#565e74] dark:text-[#CBD5E1] text-sm md:text-base leading-relaxed">
              We envision a future where core corporate HR and financial systems function as automated, self-healing platforms. In this future, companies run unified processes seamlessly across accounting, payroll, and compliance, eliminating data silos entirely.
            </p>
          </div>
          <div className="reveal-element reveal-image lg:col-span-6 relative rounded-2xl overflow-hidden h-[300px] md:h-[350px] bg-transparent flex items-center justify-center animate-float">
            <Image
              src="/disruption.png"
              alt="Finnovo Vision Globe"
              fill
              className="object-contain opacity-95 cursor-pointer premium-img-hover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

      </section>
    </div>
  );
}
