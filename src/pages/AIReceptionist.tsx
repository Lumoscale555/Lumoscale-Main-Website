import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, PhoneIncoming, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    title: "Never Miss a Call",
    description: "Answers every call in under 30 seconds, day or night",
    number: "01"
  },
  {
    title: "Sounds Like You",
    description: "Uses your actual voice (95% match), not robotic",
    number: "02"
  },
  {
    title: "Asks the Right Questions",
    description: "Budget? Timeline? Location? Need? Done automatically",
    number: "03"
  },
  {
    title: "Books Appointments Instantly",
    description: "Straight into your Google/Outlook calendar",
    number: "04"
  },
  {
    title: "Transfers to You When Needed",
    description: "Hot lead? Gets you on the line immediately",
    number: "05"
  },
  {
    title: "Confirms Appointments",
    description: "Calls leads 24 hours before (or 2-4 hours for same-day)",
    number: "06"
  },
  {
    title: "Every Call Transcribed",
    description: "Read what was said, search past conversations",
    number: "07"
  },
  {
    title: "Built for Your Business",
    description: "Custom script matching how you actually talk",
    number: "08"
  },
  {
    title: "Syncs with Your CRM",
    description: "Every lead saved automatically, no manual entry",
    number: "09"
  },
  {
    title: "See Everything Live",
    description: "Dashboard shows who called, what they want, what got booked",
    number: "10"
  },
  {
    title: "Speaks Multiple Languages",
    description: "English, Hindi, Kannada, Tamil, Telugu - whatever your market needs",
    number: "11"
  },
  {
    title: "Weekly Performance Reports",
    description: "See what's working, what needs fixing",
    number: "12"
  }
];

const AIReceptionist = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>AI Receptionist - 24/7 Call Answering | Lumoscale</title>
        <meta name="description" content="Answers every incoming call in your voice. Qualifies leads, books appointments, handles support - 24/7." />
      </Helmet>
      
      <Header />
      
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-50">
        <Link
          to="/"
          state={{ scrollTo: "service-cards" }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>
      
      {/* Hero */}
      <section className="pt-32 pb-8 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <PhoneIncoming className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-200">AI Receptionist</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Never Miss Another Call
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 mb-10"
          >
            Answers incoming calls in your voice, qualifies leads, and bookings appointments 24/7.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Everything You Need
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-zinc-800 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Never Miss a Call?
            </h2>
            <p className="text-zinc-400 mb-8 text-lg">
              See how AI Receptionist can transform your business.
            </p>
            <Button
              className="h-12 px-8 bg-white text-black hover:bg-white/90 text-base font-semibold rounded-full"
              onClick={() => window.open("https://cal.com/lumoscale/30min", "_blank")}
            >
              Schedule a Call
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

function FeatureCard({ feature, index }: { feature: any, index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col justify-between h-full min-h-[180px]"
    >
      {/* Desktop Mouse Spotlight */}
      {!isMobile && (
        <div
          className="pointer-events-none absolute -inset-px transition duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
          }}
        />
      )}
      
      {/* Border Highlight */}
      {!isMobile && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl z-10 transition duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), transparent 40%)`,
            maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      )}

      {/* Blue Bottom Highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent scale-x-0 group-hover:scale-x-100 origin-center z-20 transition-transform duration-400" />

      <div className="relative z-20 flex flex-col h-full">
        {/* Header: Icon + Number */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-white/70 group-hover:text-[#3b82f6] group-hover:bg-[#3b82f6]/10 transition-colors duration-300">
            <Check className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-white/10 group-hover:text-white/20 transition-colors font-mono">
            {feature.number}
          </span>
        </div>

        {/* Content */}
        <div className="mb-auto">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#3b82f6] transition-colors duration-300 leading-tight">
            {feature.title}
          </h3>
          <p className="text-white/50 text-xs leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AIReceptionist;
