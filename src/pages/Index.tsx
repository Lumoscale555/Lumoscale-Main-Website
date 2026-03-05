import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Solution from "@/components/Solution";
import SystemFlow from "@/components/SystemFlow";
import MeetingAutomation from "@/components/MeetingAutomation";
import DMDemo from "@/components/DMDemo";
import Features from "@/components/Features";
import BeforeAfter from "@/components/BeforeAfter";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <PainPoints />
      <Solution />
      <SystemFlow />
      <MeetingAutomation />
      <DMDemo />
      <Features />
      <BeforeAfter />
      <Pricing />
      <FinalCTA />
    </div>
  );
};

export default Index;
