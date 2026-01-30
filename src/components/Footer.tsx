import React from "react";
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

            {/* BRAND COLUMN - col-span-4 */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Lumoscale" className="h-10 w-auto rounded-full" />
                <span className="text-2xl font-bold text-white tracking-tight">LUMOSCALE</span>
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                We build AI Voice & Text Agents that turn missed calls and inquiries into booked appointments. 24/7 coverage for healthcare and real estate. No manual work.
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

            {/* LINKS COLUMN - col-span-2 */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold mb-6">Explore</h4>
              <ul className="space-y-4">
                {[
                  { label: "Home", href: "/#hero" },
                  { label: "Why Lumoscale", href: "/#beforeafter" },
                  { label: "Live Demo", href: "/#demo" },
                  { label: "Features", href: "/#solution" },
                  { label: "Blogs", href: "/blog" },
                  { label: "Pricing", href: "/#pricing" },
                  { label: "FAQ", href: "/#faq" },
                  { label: "Privacy Policy", href: "/privacy-policy" }
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT COLUMN - col-span-3 */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">Email Us</p>
                    <a href="mailto:contact@lumoscale.com" className="text-white hover:text-blue-400 transition-colors">
                      contact@lumoscale.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">Call Us</p>
                    <p className="text-white">+91 89190 53970</p>
                    <p className="text-white">+91 80743 28526</p>
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

            {/* LINKEDIN POST COLUMN - col-span-3 */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-bold mb-6">Latest Update</h4>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7407429716019896320"
                  height="380"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Lumoscale LinkedIn Post"
                  className="w-full"
                ></iframe>
              </div>
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
