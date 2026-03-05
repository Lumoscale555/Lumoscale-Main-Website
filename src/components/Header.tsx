import React, { useState } from "react";
import logo from "@/assets/lumoscale-logo.jpg";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 fixed top-0 left-0 z-50 bg-background/50 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Lumoscale AI" className="h-12 w-auto object-contain" />
          <span className="text-xl font-bold tracking-tight gradient-text">LUMOSCALE</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#hero" className="text-sm text-muted-foreground hover:text-primary transition">Home</a>
          <a href="#solution" className="text-sm text-muted-foreground hover:text-primary transition">Solution</a>
          <a href="#painpoints" className="text-sm text-muted-foreground hover:text-primary transition">Pain Points</a>
          <a href="#beforeafter" className="text-sm text-muted-foreground hover:text-primary transition">Before vs After</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition">Pricing</a>
          <a href="#demo" className="text-sm text-muted-foreground hover:text-primary transition">Demo</a>

          <Button className="px-6 py-3 text-sm bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:scale-105 transition">
            Get Started
          </Button>
        </nav>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center">
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 rounded-md bg-card/60 hover:bg-card/80">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-6">
          <div className="w-full max-w-md bg-card rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Lumoscale" className="h-10 w-auto object-contain" />
                <span className="font-bold">LUMOSCALE</span>
              </div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md">
                <X className="w-5 h-5" />
              </button>
            </div>

            <ul className="space-y-4">
              <li><a onClick={() => setOpen(false)} href="#hero" className="block text-lg">Home</a></li>
              <li><a onClick={() => setOpen(false)} href="#solution" className="block text-lg">Solution</a></li>
              <li><a onClick={() => setOpen(false)} href="#painpoints" className="block text-lg">Pain Points</a></li>
              <li><a onClick={() => setOpen(false)} href="#beforeafter" className="block text-lg">Before vs After</a></li>
              <li><a onClick={() => setOpen(false)} href="#pricing" className="block text-lg">Pricing</a></li>
              <li><a onClick={() => setOpen(false)} href="#demo" className="block text-lg">Demo</a></li>
              <li>
                <Button onClick={() => { setOpen(false); window.open('https://cal.com/vamsivk/30min', '_blank'); }} className="w-full mt-2 py-3 bg-gradient-to-r from-primary to-secondary text-black">
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
