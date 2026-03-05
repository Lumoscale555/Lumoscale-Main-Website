import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black border-t border-white/10 pt-16 pb-10 overflow-hidden">
      
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-400/10 blur-[140px]" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Lumoscale
            </h3>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              We turn Instagram DMs into booked consultations automatically,
              without missed leads or manual follow ups.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/90">
              Navigate
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "#hero" },
                { label: "Solution", href: "#solution" },
                { label: "Pain Points", href: "#painpoints" },
                { label: "Before vs After", href: "#before-after" }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/90">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Pricing", href: "#pricing" },
                { label: "DM Demo", href: "#dm-demo" },
                { label: "Get Started", href: "#finalcta" }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/90">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@lumoscale.com"
                  className="text-cyan-400 hover:text-green-400 transition-colors"
                >
                  hello@lumoscale.com
                </a>
              </li>
              <li className="text-slate-500 text-xs">
                © {new Date().getFullYear()} Lumoscale. All rights reserved.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom divider */}
        <div className="mt-12 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
          Built for founders who value speed, clarity, and automation.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
