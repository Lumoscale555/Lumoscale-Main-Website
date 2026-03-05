import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, ArrowRight, Sparkles, Phone, Globe, MessageSquare, Database } from "lucide-react";

// --- Configuration ---
const FEATURES = [
  "24/7 Instagram DM automation",
  "Lead qualification (Hot/Warm/Cold)",
  "Auto-booking via Cal.com",
  "3x reminder system (WhatsApp + Email)",
  "Pre-call intelligence briefs",
  "Live Dashboard to track leads",
  "Monthly performance report"
];

const ADDONS = [
  {
    title: "Omni-Channel Expansion",
    desc: "Unifies Facebook, LinkedIn, Email & Website chat into one single AI stream.",
    icon: MessageSquare,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20"
  },
  {
    title: "Native Polyglot",
    desc: "Fluent negotiation in Hindi, Spanish, French & 30+ languages.",
    icon: Globe,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20"
  },
  {
    title: "Voice AI Agents",
    desc: "AI that speaks. Handles inbound calls, qualifies leads, and books meetings vocally.",
    icon: Phone,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20"
  },
  {
    title: "Enterprise CRM Bridge",
    desc: "Deep 2-way sync with HubSpot, Salesforce, or Zoho to keep data pristine.",
    icon: Database,
    color: "text-lime-400",
    bg: "bg-lime-500/10",
    border: "border-lime-500/20"
  }
];

export default function PricingToggle() {
  const [billing, setBilling] = useState("monthly"); // 'monthly' | 'quarterly'

  return (
    <section className="relative w-full bg-[#050505] py-24 px-6 overflow-hidden font-sans flex flex-col items-center">
      
      {/* 1. Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-cyan-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="container relative z-10 max-w-5xl">
        
        {/* 2. Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Limited Availability
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            One System. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Total Scale.</span>
          </motion.h2>
        </div>

        {/* 3. THE TOGGLE SWITCH */}
        <div className="flex justify-center mb-10">
            <div className="bg-zinc-900/80 p-1.5 rounded-full border border-white/10 flex relative shadow-lg">
                {/* Background Sliding Pill */}
                <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute h-[calc(100%-12px)] top-[6px] bottom-[6px] rounded-full bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/30 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)] z-0"
                    style={{
                        left: billing === "monthly" ? "6px" : "50%",
                        width: "calc(50% - 6px)",
                        x: billing === "monthly" ? 0 : 0
                    }}
                />
                
                <button 
                    onClick={() => setBilling("monthly")}
                    className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${billing === "monthly" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
                >
                    Monthly Pay
                </button>
                <button 
                    onClick={() => setBilling("quarterly")}
                    className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 flex items-center gap-2 ${billing === "quarterly" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
                >
                    3-Month Bundle
                    <span className="bg-green-500 text-black text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase">Save $1k+</span>
                </button>
            </div>
        </div>

        {/* 4. THE MAIN CARD (Dynamic Content) */}
        <motion.div 
            layout
            className="relative max-w-4xl mx-auto rounded-[2.5rem] border border-white/10 bg-zinc-900/60 backdrop-blur-xl overflow-hidden shadow-2xl mb-20"
        >
            {/* Top highlight bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${billing === "monthly" ? "from-slate-700 to-slate-500" : "from-cyan-400 via-green-400 to-cyan-400"}`} />

            <div className="grid lg:grid-cols-12 min-h-[500px]">
                
                {/* LEFT: Features (Static) */}
                <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-white/[0.01]">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-green-500/20 rounded-lg border border-cyan-500/30">
                            <Zap className="w-5 h-5 text-cyan-400" />
                        </div>
                        Core Infrastructure
                    </h3>

                    <div className="grid md:grid-cols-1 gap-4">
                        {FEATURES.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 group">
                                <div className="mt-1 min-w-[20px] h-5 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                    <Check className="w-3 h-3 text-cyan-400" />
                                </div>
                                <span className="text-slate-300 text-sm font-medium leading-tight group-hover:text-white transition-colors">{feature}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <Database className="w-4 h-4 text-slate-600" />
                        <span>DATA ENCRYPTED & SECURE</span>
                    </div>
                </div>

                {/* RIGHT: Pricing (Dynamic) */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-b from-white/[0.03] to-transparent">
                    
                    {/* Badge */}
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-green-500 text-black text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                        First 5 Clients Only
                    </div>

                    <div className="mb-8 mt-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={billing}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wide">
                                    {billing === "monthly" ? "Monthly Access" : "Quarterly Accelerator"}
                                </p>
                                
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-lg text-slate-500 line-through decoration-red-500/50 decoration-2">
                                        {billing === "monthly" ? "$797" : "$2,397"}
                                    </span>
                                    <span className="text-6xl font-bold text-white tracking-tight">
                                        {billing === "monthly" ? "$497" : "$1,299"}
                                    </span>
                                </div>

                                {billing === "quarterly" && (
                                    <div className="inline-block bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-1.5 mb-4">
                                        <p className="text-xs font-bold text-green-400 flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" /> You save $1,098 instantly
                                        </p>
                                    </div>
                                )}

                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <span>Setup Fee:</span>
                                        <span className="line-through decoration-slate-600 text-slate-600">$1,497</span>
                                        <span className="text-green-400 font-bold">$749</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500">
                                        *50% OFF Setup applied automatically
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className="w-full group relative py-4 px-6 rounded-xl overflow-hidden bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(74,222,128,0.5)] transition-all duration-300 active:scale-[0.98]">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                        I Want This System 
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
                    </button>

                    <p className="text-center text-xs text-slate-500 mt-6">
                        No credit card required. Strategy session first.
                    </p>
                </div>

            </div>
        </motion.div>

        {/* 5. EXPANSION MODULES (Add-ons Grid) */}
        <div className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-10 opacity-60">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-600" />
                <h4 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Available Expansions</h4>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-600" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ADDONS.map((addon, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className={`p-5 rounded-2xl border ${addon.border} bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors group cursor-default`}
                    >
                        <div className={`w-10 h-10 rounded-lg ${addon.bg} ${addon.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <addon.icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-white font-bold text-sm mb-2">{addon.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{addon.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* 6. Guarantee / Trust */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-8 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-2 hover:text-green-400 transition-colors">
                <Check className="w-4 h-4 text-green-500" />
                30-Day Growth Guarantee
            </span>
            <span className="flex items-center gap-2 hover:text-green-400 transition-colors">
                <Check className="w-4 h-4 text-green-500" />
                No Long-Term Contracts
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}