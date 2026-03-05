import React from "react";
import logo from "@/assets/lumoscale-logo.jpg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-6 py-12">

        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">

          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Lumoscale"
                className="h-9 w-auto object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                Lumoscale
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              We turn Instagram DMs into booked consultations automatically,
              without missed leads or manual follow ups.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">

            {/* Product */}
            <div>
              <p className="mb-4 font-semibold text-white">Product</p>
              <ul className="space-y-3">
                <li>
                  <a href="#solution" className="text-slate-400 hover:text-white transition-colors">
                    Solution
                  </a>
                </li>
                <li>
                  <a href="#demo" className="text-slate-400 hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="mb-4 font-semibold text-white">Company</p>
              <ul className="space-y-3">
                <li>
                  <a href="#painpoints" className="text-slate-400 hover:text-white transition-colors">
                    Problems
                  </a>
                </li>
                <li>
                  <a href="#beforeafter" className="text-slate-400 hover:text-white transition-colors">
                    Results
                  </a>
                </li>
                <li>
                  <a href="#hero" className="text-slate-400 hover:text-white transition-colors">
                    Overview
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="mb-4 font-semibold text-white">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:contact@lumoscale.com"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    contact@lumoscale.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918919053970"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    +91 89190 53970
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Lumoscale. All rights reserved.</span>
          <span>Built for founders who value speed and automation.</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
