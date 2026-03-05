import React, { useState, useEffect } from "react";
import logo from "@/assets/lumoscale-logo.jpg";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuditModal } from "@/context/AuditModalContext";

/* ---------- Nav Item ---------- */
const NavItem = ({ href, label }: { href: string; label: string }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's not a scroll anchor, allow default navigation
    if (!href.includes('/#')) {
      return;
    }

    const targetId = href.replace('/#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      e.preventDefault();
      const headerOffset = 100; // Fixed header height + spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    // If element doesn't exist (e.g. on another page), let default navigation happen
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white group whitespace-nowrap"
    >
      {label}
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/70 to-cyan-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
    </a>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useAuditModal();

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

  const handleAuditClick = () => {
    setOpen(false);
    openModal();
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
            <NavItem href="/#hero" label="Home" />
            <NavItem href="/#beforeafter" label="Why Lumoscale" />
            <NavItem href="/#demo-interactive" label="Talk to AI" />
            <NavItem href="/#solution" label="Features" />
            <NavItem href="/blog" label="Blogs" />
            <NavItem href="/#pricing" label="Pricing" />
            <NavItem href="/#faq" label="FAQ" />

            <div className="w-px h-4 bg-white/10 mx-2" />

            <button
              onClick={() => window.open("https://cal.com/lumoscale/30min", "_blank")}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-bold text-xs uppercase tracking-wide hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </nav>

          {/* Mobile - Talk to AI Button (visible outside hamburger) */}
          <div className="md:hidden flex-1 flex justify-center">
            <a
              href="/#demo-interactive"
              onClick={(e) => {
                const targetId = 'demo-interactive';
                const element = document.getElementById(targetId);
                
                if (element) {
                  e.preventDefault();
                  const headerOffset = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-white/10 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_15px_rgba(74,222,128,0.2)] hover:shadow-[0_0_25px_rgba(74,222,128,0.4)] hover:bg-white/20 transition-all whitespace-nowrap active:scale-95"
            >
              <span className="bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent">Talk to AI</span>
            </a>
          </div>

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
                  { href: "/#hero", label: "Home" },
                  { href: "/#beforeafter", label: "Why Lumoscale" },
                  { href: "/#demo-interactive", label: "Talk to AI" },
                  { href: "/#solution", label: "Features" },
                  { href: "/blog", label: "Blogs" },
                  { href: "/#pricing", label: "Pricing" },
                  { href: "/#faq", label: "FAQ" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      // If it's not a scroll anchor, allow default navigation
                      if (!item.href.includes('/#')) {
                        setOpen(false);
                        return;
                      }

                      const targetId = item.href.replace('/#', '');
                      const element = document.getElementById(targetId);
                      
                      if (element) {
                        e.preventDefault();
                        const headerOffset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                        window.history.pushState(null, '', item.href);
                      }
                      // If element doesn't exist, let default navigation happen
                      setOpen(false);
                    }}
                    className="block px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-lg font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setOpen(false);
                    window.open("https://cal.com/lumoscale/30min", "_blank");
                  }}
                  className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Header;
