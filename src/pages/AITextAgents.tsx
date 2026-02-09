import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Instagram, Facebook, MessageSquare, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useIsMobile } from "@/hooks/use-mobile";

// Custom WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={2} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const features = [
  {
    title: "Replies in 15 Seconds",
    description: "Lead messages you? Response sent before they can blink",
    number: "01"
  },
  {
    title: "Works on All 3 Platforms",
    description: "Instagram DMs, Facebook Messenger, WhatsApp Business",
    number: "02"
  },
  {
    title: "Qualifies Every Lead",
    description: "Budget? Timeline? Serious or browsing? Gets the answers",
    number: "03"
  },
  {
    title: "Books Appointments Directly",
    description: "\"Tuesday 3 PM work for you?\" - straight into calendar",
    number: "04"
  },
  {
    title: "Answers Common Questions",
    description: "Pricing, availability, location - handles it all",
    number: "05"
  },
  {
    title: "Never Stops Following Up",
    description: "Messages on Day 1, Day 3, Day 7 until they respond",
    number: "06"
  },
  {
    title: "Blocks Spam",
    description: "Filters out bots, scammers, time-wasters automatically",
    number: "07"
  },
  {
    title: "Saves Every Conversation",
    description: "All chats sync to your CRM, nothing gets lost",
    number: "08"
  },
  {
    title: "No Message Limits",
    description: "100 messages or 10,000 - same price",
    number: "09"
  },
  {
    title: "One Dashboard for Everything",
    description: "See all Instagram, Facebook, WhatsApp chats in one place",
    number: "10"
  },
  {
    title: "Tags Leads Automatically",
    description: "Hot, Warm, Cold - sorted without you lifting a finger",
    number: "11"
  },
  {
    title: "Hands Off When Needed",
    description: "Lead asks for human? We alert your team via Slack",
    number: "12"
  }
];

const platforms = [
  { name: "Instagram", icon: Instagram, color: "from-pink-500 to-purple-500" },
  { name: "Facebook", icon: Facebook, color: "from-blue-500 to-blue-600" },
  { name: "WhatsApp", icon: WhatsAppIcon, color: "from-green-500 to-emerald-500" }
];

const AITextAgents = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>DM Automation - Instagram, Facebook, WhatsApp | Lumoscale</title>
        <meta name="description" content="Handles all Instagram, Facebook, and WhatsApp messages. Qualifies leads, books appointments - while you sleep." />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-200">DM Automation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Converts DMs into Revenue
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 mb-10"
          >
            Handles all Instagram, Facebook, and WhatsApp messages. Qualifies leads, books appointments - while you sleep.
          </motion.p>

          {/* Platform Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-4 mt-8 flex-wrap"
          >
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div
                  key={index}
                  className={`relative rounded-2xl bg-gradient-to-br ${platform.color} p-[1px]`}
                >
                  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-black">
                    <Icon className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-white">{platform.name}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
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
            className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-zinc-800 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Automate Your DMs?
            </h2>
            <p className="text-zinc-400 mb-8 text-lg">
              See how AI Text Agents can transform your social media.
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
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.1), transparent 40%)`
          }}
        />
      )}
      
      {/* Border Highlight */}
      {!isMobile && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl z-10 transition duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 222, 128, 0.4), transparent 40%)`,
            maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      )}

      {/* Green Bottom Highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ade80] to-transparent scale-x-0 group-hover:scale-x-100 origin-center z-20 transition-transform duration-400" />

      <div className="relative z-20 flex flex-col h-full">
        {/* Header: Icon + Number */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-white/70 group-hover:text-[#4ade80] group-hover:bg-[#4ade80]/10 transition-colors duration-300">
            <Check className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-white/10 group-hover:text-white/20 transition-colors font-mono">
            {feature.number}
          </span>
        </div>

        {/* Content */}
        <div className="mb-auto">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4ade80] transition-colors duration-300 leading-tight">
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

export default AITextAgents;
