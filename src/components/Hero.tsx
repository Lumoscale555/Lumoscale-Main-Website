import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Play,
  TrendingUp,
  BarChart3,
  Phone,
  CheckCircle2,
  Mic,
  Clock,
  User,
  MoreHorizontal,
  ArrowUpRight
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

// --- Floating Widget Components ---

const FloatingCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
    className={`absolute hidden lg:flex flex-col bg-zinc-900/60 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-5 ${className}`}
  >
    {children}
  </motion.div>
);

const MonthlySavingsCard = () => (
  <FloatingCard className="top-[15%] left-[5%] xl:left-[10%] w-64" delay={0.6}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Monthly Savings</p>
        <h4 className="text-3xl font-bold text-white mt-1">$12,450</h4>
      </div>
      <div className="bg-emerald-500/10 p-2 rounded-full">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">+45%</span>
      <span className="text-zinc-500 text-xs">vs Humans</span>
    </div>
  </FloatingCard>
);

const AgentActiveCard = () => (
  <FloatingCard className="top-[45%] left-[-2%] xl:left-[2%] flex-row items-center gap-4 py-4 px-6 rounded-full" delay={0.8}>
    <div className="relative w-12 h-7 bg-zinc-800 rounded-full border border-white/10 flex items-center px-1">
        <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
    </div>
    <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-white font-bold text-sm tracking-wide">AGENT ACTIVE</span>
    </div>
  </FloatingCard>
);

const InboundCallsCard = () => (
  <FloatingCard className="bottom-[15%] left-[8%] w-64" delay={1.0}>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
                <Phone className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-white font-bold text-sm">Inbound Calls</span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-[10px] text-zinc-400">Live</span>
        </div>
      </div>
      <div className="flex items-end justify-between mt-4 mb-2">
          <span className="text-zinc-500 text-xs">Auto-Resolved</span>
          <span className="text-2xl font-bold text-white">92%</span>
      </div>
      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 w-[92%] rounded-full" />
      </div>
  </FloatingCard>
);

const LeadQualCard = () => (
  <FloatingCard className="top-[18%] right-[5%] xl:right-[10%] w-72" delay={0.7}>
      <div className="flex justify-between items-center mb-6">
          <span className="text-zinc-400 text-xs font-bold uppercase">Lead Qualification</span>
          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
             <TrendingUp className="w-3 h-3" /> High Intent
          </span>
      </div>
      <div className="flex items-end gap-3">
          <span className="text-5xl font-bold text-white leading-none">3x</span>
          <span className="text-zinc-400 text-sm font-medium mb-1">More appointments set</span>
      </div>
  </FloatingCard>
);

const SuccessRateCard = () => (
  <FloatingCard className="bottom-[20%] right-[5%] xl:right-[8%] w-64" delay={1.1}>
      <div className="flex items-center justify-between mb-4">
          <span className="text-zinc-400 text-xs font-bold uppercase">Call Outcome</span>
          <MoreHorizontal className="w-4 h-4 text-zinc-600" />
      </div>
      <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
                 <circle cx="32" cy="32" r="28" fill="none" stroke="#27272a" strokeWidth="6" />
                 <circle cx="32" cy="32" r="28" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="175.9" strokeDashoffset="17.59" strokeLinecap="round" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-sm font-bold text-white">98%</span>
             </div>
          </div>
          <div className="space-y-2">
              <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs text-white">Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-700" />
                  <span className="text-xs text-zinc-500">Waitlist</span>
              </div>
          </div>
      </div>
  </FloatingCard>
);

const MeetingSetCard = () => (
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-sm hidden md:block">
      <motion.div 
         initial={{ y: 50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 1.2, duration: 0.8 }}
         className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl flex items-center justify-between"
      >
          <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Live Conversation</span>
            </div>
            <h3 className="text-white font-bold text-lg">Meeting Set</h3>
            <p className="text-zinc-500 text-sm">For Tomorrow, 2 PM</p>
          </div>
          <div className="flex -space-x-3">
             <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" className="w-full h-full object-cover" />
             </div>
             <div className="w-10 h-10 rounded-full border-2 border-black bg-blue-600 flex items-center justify-center z-10">
                 <Mic className="w-5 h-5 text-white" />
             </div>
          </div>
      </motion.div>
  </div>
);


const Hero = () => {
  const isMobile = useIsMobile();
  
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-black pt-32 pb-20">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full">
         
         {/* Central Content */}
         <div className="max-w-4xl mx-auto text-center relative z-20">
            
            {/* Pill Badge */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
               <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20"> New </span>
               <span className="text-zinc-300 text-xs font-medium">Voice OS for Healthcare & Real Estate</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                <span className="block mb-2">3x your Bookings</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                    with our Voice OS
                </span>
            </h1>

            {/* Subtitle */}
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            >
                Scale your patient & buyer operations with hyper-realistic voice agents. 
                Qualify leads instantly, recover lost leads, and reduce support costs by 80%.
            </motion.p>

            {/* CTAs */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    <Button
                        className="relative h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-xl transition-all duration-300 flex items-center gap-2 group-hover:scale-[1.02]"
                        onClick={() => window.open("https://cal.com/lumoscale/30min", "_blank")}
                    >
                        <Phone className="w-5 h-5 fill-current" />
                        Book an appointment
                    </Button>
                </div>

                <button 
                  onClick={scrollToDemo}
                  className="px-8 h-14 rounded-full text-zinc-300 font-medium hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 group"
                >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                    <span>Watch Demo</span>
                </button>
            </motion.div>
         </div>

         {/* Floating Widgets Layer */}
         <div className="absolute inset-0 pointer-events-none z-0">
             <MonthlySavingsCard />
             <LeadQualCard />
             <AgentActiveCard />
             <InboundCallsCard />
             <SuccessRateCard />
             <MeetingSetCard />
             
             {/* "0s Wait Time" Small Pill Widget */}
             <FloatingCard className="top-[55%] left-[-5%] xl:left-0 rotate-[-6deg]" delay={0.9}>
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-zinc-800 rounded-lg"><Clock className="w-5 h-5 text-white" /></div>
                     <span className="text-white font-bold text-lg">0s Wait Time</span>
                 </div>
             </FloatingCard>
         </div>

      </div>
    </section>
  );
};

export default Hero;
