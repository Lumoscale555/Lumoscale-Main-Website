import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Header />
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <a 
          href="/#footer" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back
        </a>
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">LUMOSCALE</span>{" "}
            <span className="bg-gradient-to-r from-[#D3E4FD] to-[#3B82F6] bg-clip-text text-transparent">PRIVACY POLICY</span>
          </h1>
          <p className="text-white/60 text-lg">
            Last Updated: January 29, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
          <p>
            At Lumoscale, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, protect, and handle your information
            when you use our AI voice and text automation services.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. WHO WE ARE
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <p>
              Lumoscale is a UDYAM registered MSME providing done-for-you AI
              automation services for real estate businesses.
              We're based in Bengaluru, India, and help businesses automate
              client communication through AI-powered voice and text agents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. INFORMATION WE COLLECT
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <p className="mb-4">To provide our services, we collect and process:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#3B82F6]">
              <li>
                <strong className="text-white">Business Information:</strong>{" "}
                Company name, industry, contact details, business goals
              </li>
              <li>
                <strong className="text-white">Communication Data:</strong>{" "}
                Conversations, calls, messages handled by our AI agents
              </li>
              <li>
                <strong className="text-white">Technical Data:</strong> CRM
                credentials, calendar access, integration settings you provide
              </li>
              <li>
                <strong className="text-white">Voice Samples:</strong> 30+
                seconds of audio for voice cloning (business owner only)
              </li>
              <li>
                <strong className="text-white">End-User Data:</strong>{" "}
                Information your customers share with our AI agents (names,
                contact info, appointment details, inquiry information)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. HOW WE USE YOUR INFORMATION
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#3B82F6]">
              <li>Build and operate your custom AI agents</li>
              <li>Handle voice calls and text messages on your behalf</li>
              <li>Schedule appointments and manage bookings</li>
              <li>Qualify leads and communicate with your customers</li>
              <li>Provide analytics and performance insights through your dashboard</li>
              <li>Optimize and improve AI agent performance weekly</li>
              <li>Provide customer support and technical assistance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. DATA STORAGE & SECURITY
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <ul className="list-disc pl-6 space-y-2 marker:text-[#3B82F6]">
              <li>Your data is stored securely in our cloud infrastructure</li>
              <li>
                We use industry-standard security measures to protect your
                information
              </li>
              <li>
                Only you and authorized Lumoscale team members can access your
                data
              </li>
              <li>
                All communication channels use official APIs (WhatsApp Business
                API, Instagram API)
              </li>
              <li>Data is retained until you request deletion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. THIRD-PARTY SERVICES
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <p className="mb-4">
              To deliver our services, we work with trusted third-party
              providers:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[#3B82F6]">
              <li>
                <strong className="text-white">Cartesia:</strong> Voice
                synthesis and cloning technology
              </li>
              <li>
                <strong className="text-white">Twilio:</strong> Voice calls for
                clients in US, UAE, and other international locations
              </li>
              <li>
                <strong className="text-white">Viboz:</strong> Voice calls for
                clients in India
              </li>
              <li>
                <strong className="text-white">WhatsApp Business API:</strong>{" "}
                Official messaging platform
              </li>
              <li>
                <strong className="text-white">Instagram API:</strong> Official
                messaging platform
              </li>
              <li>
                <strong className="text-white">OpenAI (GPT-4):</strong> AI
                language processing
              </li>
              <li>
                <strong className="text-white">PayPal:</strong> Payment
                processing
              </li>
              <li>
                <strong className="text-white">Your existing tools:</strong> CRM
                systems (HubSpot, Salesforce, Zoho, etc.) and calendar platforms
                (Google Calendar, Calendly, etc.)
              </li>
            </ul>
            <p className="mt-4 text-white/60 text-base">
              These providers have their own privacy policies and security
              measures. We only share the minimum information necessary to
              provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. CALL & MESSAGE RECORDING
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <ul className="list-disc pl-6 space-y-2 marker:text-[#3B82F6]">
              <li>
                We only record calls if you specifically request this feature
              </li>
              <li>
                When call recording is enabled, users will be informed at the
                start of the call that it is being recorded
              </li>
              <li>
                All call transcripts are available in your dashboard (read-only
                access)
              </li>
              <li>
                Message conversations are stored for service delivery and
                optimization
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. REAL ESTATE CLIENTS - IMPORTANT NOTICE
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Fair Housing & Compliance:
            </h3>
            <p className="mb-4">
              Our AI agents are designed to handle appointment booking and lead
              qualification in a compliant manner:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6 marker:text-blue-500">
              <li>
                AI agents treat all leads equally and do not discriminate based
                on protected characteristics
              </li>
              <li>
                Lead qualification focuses on property preferences, budget,
                timeline, and relevant business factors only
              </li>
              <li>
                No discriminatory practices in communication or lead handling
              </li>
              <li>
                You (the client) remain responsible for Fair Housing Act
                compliance and local real estate regulations
              </li>
              <li>
                AI responses are based on property availability and business
                criteria you provide
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Data Privacy:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 marker:text-blue-500">
              <li>Buyer and seller information handled securely</li>
              <li>
                Lead data accessible only to you and authorized Lumoscale team
              </li>
              <li>
                Communication records available in your dashboard for compliance
                review
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Licensing:
            </h3>
            <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
              <li>
                Our AI agents facilitate communication and booking only
              </li>
              <li>
                All real estate advice, negotiations, and transactions remain
                your responsibility
              </li>
              <li>
                Clients must maintain appropriate real estate licenses per local
                requirements
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. YOUR RIGHTS & CHOICES
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
              <li>Access your data through the dashboard</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request complete deletion of your data at any time</li>
              <li>Export your conversation history and analytics</li>
              <li>Opt out of specific features or integrations</li>
              <li>Cancel your service month-to-month (no long-term lock-in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. DATA OWNERSHIP
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
              <li>
                You retain ownership of your business data and customer
                information
              </li>
              <li>Lumoscale has access to operate and optimize your AI agents</li>
              <li>
                Upon service termination, your data will be deleted per your
                request
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. CHILDREN'S PRIVACY
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <p>
              Our services are designed for businesses and not intended for use
              by individuals under 18. We do not knowingly collect information
              from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              12. CHANGES TO THIS POLICY
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <p>
              We may update this Privacy Policy from time to time. We'll notify
              you of any significant changes via email or through your dashboard.
              Continued use of our services after changes means you accept the
              updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              13. CONTACT US
            </h2>
            <div className="h-px w-full bg-blue-500/20 mb-6" />
            <p className="mb-4">
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact us:
            </p>
            <p className="mb-2">
              <strong className="text-white">Email:</strong>{" "}
              <a
                href="mailto:contact@lumoscale.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                contact@lumoscale.com
              </a>
            </p>
            <p className="mb-6">
              <strong className="text-white">Website:</strong>{" "}
              <a
                href="https://www.lumoscale.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                www.lumoscale.com
              </a>
            </p>
            <p className="text-white/60">
              We're committed to protecting your privacy and being transparent
              about our practices. As a growing startup, we're continuously
              improving our security and compliance measures to serve you better.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
