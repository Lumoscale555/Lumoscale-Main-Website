import React, { useState, useEffect } from "react";
import logo from "@/assets/lumoscale-logo.jpg";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import FloatingContact from "./FloatingContact";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Nav Item ---------- */
const NavItem = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="relative px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white group"
  >
    {label}
    <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/70 to-cyan-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
  </a>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 20);
        timeoutId = undefined!;
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToCTA = () => {
    document.getElementById("finalcta")?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none will-change-transform"
      >
        <div
          className={`
            pointer-events-auto
            flex items-center justify-between p-2 pl-6 pr-2 gap-8
            rounded-full border border-white/10
            backdrop-blur-xl bg-black/50 shadow-2xl shadow-black/50
            transition-all duration-500
            ${scrolled ? "w-full max-w-5xl scale-95 md:scale-100" : "w-full max-w-6xl"}
          `}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 select-none">
            <img
              src={logo}
              alt="Lumoscale AI"
              className="h-8 w-auto object-contain rounded-full"
            />
            <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
              LUMOSCALE
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavItem href="#hero" label="Home" />
            <NavItem href="#painpoints" label="Pain Points" />
            <NavItem href="#solution" label="How It Works" />
            <NavItem href="#demo" label="Demo" />
            <NavItem href="#beforeafter" label="Comparisons" />
            <NavItem href="#pricing" label="Pricing" />
            <NavItem href="#faq" label="Questions" />

            <div className="w-px h-4 bg-white/10 mx-2" />

            <button
              onClick={scrollToCTA}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-bold text-xs uppercase tracking-wide hover:bg-zinc-200 transition-all active:scale-95"
            >
              <span>Get Free System Audit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine" />
              </div>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(true)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md p-4 flex items-start justify-center pt-24"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#0b0b0b] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-white">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { label: "Home", href: "#hero" },
                  { label: "Pain Points", href: "#painpoints" },
                  { label: "How It Works", href: "#solution" },
                  { label: "Live Demo", href: "#demo" },
                  { label: "Comparisons", href: "#beforeafter" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Questions", href: "#faq" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-lg font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={scrollToCTA}
                  className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Get Free Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <FloatingContact />
    </>
  );
};

export default Header;
