import React, { useState, useRef } from "react";
import { Zap, Mic, Target, Globe, Phone, BarChart3, Bell, Repeat, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

const features = [
  {
    icon: Zap,
    title: "Instant Response × 24/7",
    description: "Response in <60 seconds. Capture every opportunity, day or night.",
    highlight: "Recover lost revenue instantly.",
    number: "01"
  },
  {
    icon: Mic,
    title: "Human Voice Clone",
    description: "Indistinguishable from reality. Your tone, your style, perfectly replicated.",
    highlight: "Trust automation that sounds exactly like you.",
    number: "02"
  },
  {
    icon: Target,
    title: "Intelligent Lead Qualification",
    description: "AI filters the noise. Only high-intent, qualified leads reach you.",
    highlight: "Stop wasting time on tire-kickers.",
    number: "03"
  },
  {
    icon: Globe,
    title: "Multi-Lingual Support",
    description: "Fluent in multiple languages. Expand globally without barriers.",
    highlight: "Sell to the world without hiring translators.",
    number: "04"
  },
  {
    icon: Phone,
    title: "Seamless Human Transfer",
    description: "When someone asks for a real person, calls transfer instantly to your team.",
    highlight: "AI handles volume, you handle VIPs.",
    number: "05"
  },
  {
    icon: BarChart3,
    title: "Live Custom Dashboard",
    description: "Real-time analytics on every conversation, conversion, and outcome.",
    highlight: "Scale with data, not guesswork.",
    number: "06"
  },
  {
    icon: Bell,
    title: "Smart Reminder System",
    description: "Automated follow-ups with pre-call briefs sent before every appointment.",
    highlight: "Win the call before it starts—never walk in blind.",
    number: "07"
  },
  {
    icon: Repeat,
    title: "Intelligent Follow-Up Sequences",
    description: "AI nurtures leads with personalized follow-ups until they book or opt out.",
    highlight: "Turn \"maybe later\" into booked appointments automatically.",
    number: "08"
  }
];

export default function Solution() {
  const isMobile = useIsMobile();
  return (
    <section id="solution" className="relative py-16 bg-black overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Header - More Compact */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-medium text-white/80 uppercase tracking-widest">Features</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight leading-tight">
            Features You Will <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">
              Never Regret
            </span>
          </h2>
          <p className="text-lg text-white/50 font-light max-w-2xl mx-auto">
            The complete system that runs your DMs like a sales team.
          </p>
        </div>

        {/* 4x2 Grid for 8 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index, isMobile }: { feature: any, index: number, isMobile: boolean }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col justify-between h-full min-h-[220px]"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(74, 222, 128, 0.1), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-2xl z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(74, 222, 128, 0.4), transparent 40%)`,
          maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Green Bottom Highlight (Static) */}
      <motion.div
        variants={{ hover: { scaleX: 1 } }}
        whileInView={isMobile ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ade80] to-transparent scale-x-0 origin-center z-20"
      />

      <div className="relative z-20 flex flex-col h-full">
        {/* Header: Icon + Number */}
        <div className="flex justify-between items-start mb-4">
          <div
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-white/70 group-hover:text-[#4ade80] group-hover:bg-[#4ade80]/10 transition-colors duration-300"
          >
            <feature.icon className="w-5 h-5" />
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

        {/* Footer Highlight */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-white/40 group-hover:text-white/90 transition-colors">
          <span className="text-[10px] font-bold tracking-wide uppercase group-hover:text-[#4ade80]">{feature.highlight}</span>
        </div>
      </div>
    </motion.div>
  )
}