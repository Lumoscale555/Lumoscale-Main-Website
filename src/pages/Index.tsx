import Header from "@/components/Header";
import Hero from "@/components/Hero";


import Solution from "@/components/Solution";

import DMDemo from "@/components/DMDemo";
import BeforeAfter from "@/components/BeforeAfter";
import ScrollProgress from "@/components/ScrollProgress";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

import Footer from "@/components/Footer";
import BlogPreview from "@/components/BlogPreview";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const location = useLocation();
  const scrollToTarget = location.state?.scrollTo;
  const hash = location.hash;
  
  // Use state (priority) or hash (fallback) for determining if we should hide
  const targetId = scrollToTarget || (hash ? hash.replace('#', '') : null);
  const [isScrolled, setIsScrolled] = useState(!targetId);

  useLayoutEffect(() => {
    // Prevent browser from messing with scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToSection = () => {
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 100;
          const y = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo(0, y);
        }
      } else {
        window.scrollTo(0, 0);
      }
      // Reveal content after scroll is set
      setIsScrolled(true);

      // Clean URL hash after scroll
      if (hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    // Run immediately
    // Force instant scroll by temporarily disabling CSS smooth scroll
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    
    scrollToSection();
    
    // Restore smooth scroll after a small tick
    const timer = setTimeout(() => {
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }, 50);

    return () => clearTimeout(timer);
  }, [hash, scrollToTarget, targetId]);

  return (
    <div 
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ opacity: isScrolled ? 1 : 0 }}
    >
      <Helmet>
        <title>Lumoscale - AI Voice & Text Agents for Real Estate & Healthcare</title>
        <meta name="description" content="Never miss a lead again. Lumoscale builds AI Voice & Text agents that handle calls, DMs, and bookings 24/7 in YOUR cloned voice. Built for Real Estate & Healthcare." />
        <link rel="canonical" href="https://www.lumoscale.com" />
      </Helmet>
      <ScrollProgress />
      <Header />
      <Hero />
      <BeforeAfter />
      <DMDemo />


      <Solution />
      <BlogPreview />
      <Pricing />

      <FAQ />
      <Footer />
      {/* <ChatWidget /> */}
    </div>
  );
};

export default Index;
