import Header from "@/components/Header";
import Hero from "@/components/Hero";


import Solution from "@/components/Solution";

import DMDemo from "@/components/DMDemo";
import BeforeAfter from "@/components/BeforeAfter";
import ScrollProgress from "@/components/ScrollProgress";
import Pricing from "@/components/Pricing";

// import ChatWidget from "@/components/ChatWidget";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BlogPreview from "@/components/BlogPreview";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
