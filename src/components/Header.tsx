import React, { useState } from "react";
import logo from "@/assets/lumoscale-logo.jpg";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

/* ---------- Nav Item ---------- */
const NavItem = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="
      px-4 py-2 text-sm font-medium rounded-lg
      text-muted-foreground transition-all
      hover:text-black hover:bg-white hover:shadow-md
    "
  >
    {label}
  </a>
);

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-background/60 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Lumoscale AI"
            className="h-12 w-auto object-contain"
          />
          <span className="text-xl font-bold tracking-tight gradient-text">
            LUMOSCALE
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavItem href="#hero" label="Home" />
          <NavItem href="#painpoints" label="Challenges" />
          <NavItem href="#solution" label="How It Works" />
          <NavItem href="#demo" label="Demo" />
          <NavItem href="#beforeafter" label="Results" />
          <NavItem href="#pricing" label="Pricing" />

          <Button
            className="
              ml-3 px-6 py-3 text-sm font-semibold rounded-xl
              bg-gradient-to-r from-primary to-secondary text-black
              hover:scale-105 transition
            "
            onClick={() =>
              window.open("https://cal.com/lumoscale/30min", "_blank")
            }
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="p-2 rounded-md bg-card/60 hover:bg-card/80"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-start p-6">
          <div className="w-full max-w-md bg-card rounded-2xl p-6 shadow-2xl">

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Lumoscale"
                  className="h-10 w-auto object-contain"
                />
                <span className="font-bold">LUMOSCALE</span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ul className="space-y-4">
              <li><a href="#hero" onClick={() => setOpen(false)} className="block text-lg font-medium">Home</a></li>
              <li><a href="#painpoints" onClick={() => setOpen(false)} className="block text-lg font-medium">Challenges</a></li>
              <li><a href="#solution" onClick={() => setOpen(false)} className="block text-lg font-medium">How It Works</a></li>
              <li><a href="#demo" onClick={() => setOpen(false)} className="block text-lg font-medium">Demo</a></li>
              <li><a href="#beforeafter" onClick={() => setOpen(false)} className="block text-lg font-medium">Results</a></li>
              <li><a href="#pricing" onClick={() => setOpen(false)} className="block text-lg font-medium">Pricing</a></li>

              <li className="pt-2">
                <Button
                  className="
                    w-full py-3 text-black font-semibold rounded-xl
                    bg-gradient-to-r from-primary to-secondary
                  "
                  onClick={() => {
                    setOpen(false);
                    window.open("https://cal.com/lumoscale/30min", "_blank");
                  }}
                >
                  Get Started
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
