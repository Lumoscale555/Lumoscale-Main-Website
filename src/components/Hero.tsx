import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Zap,
  X,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 

const Hero = () => {
  // Voice Agent State for visual loop only - minimal impact
  const [voiceActive, setVoiceActive] = useState(true);

  // Text Agent State
  const [textStep, setTextStep] = useState(0);

  // Real Estate Chat Sequence
  const chatMessages = [
    { type: 'in', text: "Is 12 Oak St still available?", delay: 1000 },
    { type: 'out', text: "Yes! Just hit the market yesterday.", delay: 3000 },
    { type: 'in', text: "Can I tour it tomorrow?", delay: 5500 },
    { type: 'out', text: "Sure! 2 PM or 4 PM work best?", delay: 7500 },
  ];

  // Cycle through chat messages - kept as it's a core demo feature, not "animation" in the transition sense
  useEffect(() => {
    const timer = setInterval(() => {
      setTextStep((prev) => (prev + 1) % (chatMessages.length + 2)); 
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-interactive');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden px-6 pt-32 pb-12 md:pb-20 bg-black"
      >
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 relative z-10 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center space-y-10 min-w-0 text-left">

            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 px-4 py-2 bg-blue-500/5 rounded-full w-fit backdrop-blur-md border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest text-blue-200 uppercase whitespace-nowrap">
                AI for Healthcare & Real Estate
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <span className="block text-white drop-shadow-2xl overflow-hidden pb-2">
                  Never Miss Another
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600 drop-shadow-lg pb-2 overflow-hidden">
                  Patient or Buyer
                </span>
              </h1>

              <p
                className="text-2xl md:text-3xl font-light text-zinc-400"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                AI Voice & Text Agents<span className="text-white font-medium border-b border-blue-500/50 pb-0.5"> answer every call </span> 24/7.
              </p>

              <p
                className="text-lg text-zinc-500 max-w-2xl leading-relaxed font-light"
              >
                Every missed call is now a booked appointment. Every late-night inquiry gets qualified. Your AI team works around the clock so your calendar stays full.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-5 pt-4"
            >
              {/* Premium Talk to Team Button */}
              <div className="relative group">

                <Button
                  className="relative h-auto px-8 py-5 text-lg bg-white text-black font-bold rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-300 border border-white/50 overflow-hidden"
                  onClick={() => window.open("https://cal.com/lumoscale/30min", "_blank")}
                >
                  <span className="relative z-10 flex items-center">
                    Talk to our team
                    <Zap className="w-5 h-5 ml-2 fill-blue-500 text-blue-500 group-hover:fill-blue-600 group-hover:text-blue-600 transition-colors duration-300" />
                  </span>

                  {/* Internal Shimmer */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </Button>
              </div>

              <button
                onClick={scrollToDemo}
                className="group h-auto px-8 py-5 text-lg text-white font-medium rounded-2xl flex items-center gap-3 transition-all duration-300 hover:text-green-400"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors border border-white/10 group-hover:border-green-500">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* RIGHT - STATIC CARD VISUAL (No Tilt) */}
          <div
            className="hidden lg:flex relative items-center justify-center min-w-0 h-[640px] lg:h-[700px]"
          >
            {/* Dynamic Glow Behind Graphic */}
            {/* Dynamic Glow Behind Graphic - Hidden on mobile (black bg), visible on desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            <div
              className="relative w-full h-full flex items-center justify-center"
            >

              {/* --- CARD 1: TEXT AGENT (Back/Left) --- */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: -20, y: 0 }} // Keep x: -20 as per original transform
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="absolute left-0 right-0 mx-auto lg:mx-0 lg:left-8 lg:right-auto top-4 lg:top-20 w-[320px] bg-[#0A0A0A]/90 backdrop-blur-xl rounded-[32px] p-6 shadow-2xl z-10 border border-blue-500/20"
                style={{
                  // transform: 'translateX(-20px)', // Moved to animate prop
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.1)'
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center border border-blue-500/20">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Lumoscale Chat</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span className="text-xs text-zinc-500">Active Now</span>
                    </div>
                  </div>
                </div>

                {/* Messages Sequence */}
                <div className="space-y-3 h-[200px] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent z-10 pointer-events-none" />

                  <AnimatePresence mode="popLayout">
                    {chatMessages.slice(0, Math.min(textStep + 1, chatMessages.length)).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.type === 'out' ? 20 : -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className={`flex ${msg.type === 'out' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`
                          max-w-[85%] px-4 py-3 rounded-2xl text-xs font-medium leading-relaxed
                          ${msg.type === 'out'
                            ? 'bg-black text-blue-400 rounded-tr-none border border-blue-600'
                            : 'bg-black text-zinc-300 rounded-tl-none border border-zinc-800'}
                        `}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {textStep < chatMessages.length && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-1 ml-2 mt-2"
                      >
                        <span className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce" />
                        <span className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce delay-75" />
                        <span className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce delay-150" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>


              {/* --- CARD 2: VOICE AGENT (Front/Right) --- */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 40 }}
                animate={{ opacity: 1, x: 20, y: 0 }} // Keep x: 20 as per original transform
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="absolute left-0 right-0 mx-auto lg:mx-0 lg:left-auto lg:right-8 bottom-4 lg:bottom-32 w-[300px] bg-[#0A0A0A] rounded-[32px] p-8 z-20 border border-purple-500/20"
                style={{
                  // transform: 'translateX(20px)', // Moved to animate prop
                  boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.8), 0 0 50px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="px-2 py-1 rounded bg-transparent border border-red-500/50 text-red-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    Patient Call
                  </span>
                  <span className="text-zinc-500 font-mono text-xs">00:42</span>
                </div>

                {/* Ringing Visual */}
                <div className="relative flex items-center justify-center mb-8">
                  {/* Outer Rings - Static now or CSS only - Removed BG glows */}
                  <div className="absolute inset-0 rounded-full border border-purple-500/20" />
                  
                  {/* Avatar */}
                  <div className="relative w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center overflow-hidden z-10">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                      alt="AI Voice Agent for Real Estate and Healthcare"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute -bottom-3 bg-black text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-500/50 z-20">
                    Speaking...
                  </div>
                </div>

                {/* Waveform */}
                <div className="flex items-center justify-center gap-1 h-8 mb-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-purple-400 rounded-full"
                      style={{ height: [12, 24, 16, 28, 14, 20, 12, 16][i] + 'px' }}
                    />
                  ))}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <button className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-all border border-red-500/50">
                    <X className="w-5 h-5" />
                  </button>
                </div>

              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
