import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/lumoscale-logo.jpg";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToCTA = () => {
    document.getElementById("finalcta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative py-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-black" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto p-8 md:p-12 md:pb-8 overflow-hidden relative">

          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-16">

            {/* BRAND COLUMN */}
            <div className="lg:w-1/3 xl:w-2/5 space-y-8">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Lumoscale" className="h-10 w-auto rounded-full" />
                <span className="text-2xl font-bold text-white tracking-tight">LUMOSCALE</span>
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                We build it. We run it. You just take the appointments. Custom AI voice systems - answering calls, following up on leads, and handling every DM 24/7.
              </p>

              <div className="flex gap-4">
                {[
                  { icon: FaLinkedinIn, link: "https://www.linkedin.com/company/lumoscale/" },
                  { icon: FaInstagram, link: "https://www.instagram.com/lumoscale/" },
                  { icon: FaFacebookF, link: "https://www.facebook.com/p/Lumoscale-61562068393631/" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* EXPLORE COLUMN */}
            <div className="lg:w-1/5">
              <h4 className="text-white font-bold mb-6">Explore</h4>
              <ul className="space-y-4">
                {[
                  { label: "Home", href: "/#hero", external: true },
                  { label: "Why Lumoscale", href: "/#beforeafter", external: true },
                  { label: "Live Demo", href: "/#demo", external: true },
                  { label: "Pricing", href: "/#pricing", external: true },
                  { label: "Insights", href: "/blog", external: false },
                  { label: "FAQ", href: "/#faq", external: true },
                  { label: "Privacy Policy", href: "/privacy-policy", external: false }
                ].map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICES COLUMN */}
            <div className="lg:w-1/5">
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4">
                {[
                  { label: "AI Receptionist", href: "/ai-receptionist" },
                  { label: "AI Voice SDR", href: "/ai-voice-sdr" },
                  { label: "AI Text Agents", href: "/ai-text-agents" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT COLUMN */}
            <div className="lg:w-1/3">
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">Email Us</p>
                    <a href="mailto:contact@lumoscale.com" className="block text-white hover:text-blue-400 transition-colors mb-1">
                      contact@lumoscale.com
                    </a>
                    <a href="mailto:vamsi@lumoscale.com" className="block text-white hover:text-blue-400 transition-colors">
                      vamsi@lumoscale.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">Call Us</p>
                    <a href="tel:+918919053970" className="block text-white hover:text-blue-400 transition-colors">+91 89190 53970</a>
                    <a href="tel:+918074328526" className="block text-white hover:text-blue-400 transition-colors">+91 80743 28526</a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">Location</p>
                    <p className="text-white">Bengaluru, Karnataka, India</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-white/40 text-sm">
                © {new Date().getFullYear()} Lumoscale. All rights reserved.
              </p>
              <a
                href="/privacy-policy"
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Back to Top
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
