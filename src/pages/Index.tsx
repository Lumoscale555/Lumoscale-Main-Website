import Header from "@/components/Header";
import Hero from "../components/Hero";   
import DMDemo from "@/components/DMDemo";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import ScrollProgress from "@/components/ScrollProgress";
import Pricing from "@/components/Pricing";
import FAQs from "@/components/FAQ";
import Process from "@/components/Process";

import Footer from "@/components/Footer";
import BlogPreview from "@/components/BlogPreview";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const location = useLocation();
  const scrollToTarget = location.state?.scrollTo;
  const hash = location.hash;
  
  // Use state (priority) or hash (fallback) for determining target
  const targetId = scrollToTarget || (hash ? hash.replace('#', '') : null);

  useLayoutEffect(() => {
    if (!targetId) return;

    // Disable scroll restoration for precise control
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToSection = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "auto"
        });
        return true;
      }
      return false;
    };

    // Try immediate scroll
    if (!scrollToSection()) {
      // One retry after DOM settles
      const timer = setTimeout(() => {
        scrollToSection();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [targetId]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Helmet>
        <title>Lumoscale - Your AI Voice System. Done For You.</title>
        <meta name="description" content="Every missed call is lost revenue. Lumoscale builds and runs your custom AI voice system - answering calls in your cloned voice within 60 seconds, calling back form leads, and handling every DM 24/7. We build it. We run it. You just take the appointments." />
      </Helmet>
      
      <Header />
      <ScrollProgress />
      <Hero />
      <BeforeAfter />

      <DMDemo />
      <Services />
      <Process />
      <Pricing />

      <FAQs />
      <Footer />
    </div>
  );
};

export default Index;