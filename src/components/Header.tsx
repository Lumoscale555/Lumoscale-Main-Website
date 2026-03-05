import React from "react";
import logo from "@/assets/lumoscale-logo.jpg";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 fixed top-0 left-0 z-50 bg-background/50 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Lumoscale AI" className="h-12 w-auto object-contain" />
          <span className="text-xl font-bold tracking-tight gradient-text">Lumoscale AI</span>
        </div>

        {/* Right navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition">Features</a>
          <a href="#demo" className="text-sm text-muted-foreground hover:text-primary transition">Live Demo</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition">Pricing</a>

          <Button className="px-6 py-3 text-sm bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:scale-105 transition">
            Book Demo
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
