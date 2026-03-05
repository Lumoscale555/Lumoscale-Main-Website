import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Solution from "@/components/Solution";
import DMDemo from "@/components/DMDemo";
import BeforeAfter from "@/components/BeforeAfter";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <PainPoints />
      <Solution />
      <DMDemo />
      <BeforeAfter />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
