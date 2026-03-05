import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Zap,
  ArrowRight,
  Sparkles,
  Phone,
  Globe,
  MessageSquare,
  Database,
} from "lucide-react";

/* ---------- CONFIG ---------- */

const FEATURES = [
  "DM automation with instant responses",
  "Smart lead qualification and filtering",
  "Automated follow up triggers based on user intent",
  "Calendar based booking system",
  "Multi channel meeting reminders via WhatsApp and Email",
  "Pre call intelligence brief before every meeting",
  "Post call summary and lead insights",
  "Live dashboard to track leads and conversions",
  "Monthly performance and growth report",
];

const ADDONS = [
  {
    title: "Custom AI Agents",
    desc: "Dedicated AI agents built for your exact business logic, sales flow, and decision making.",
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    title: "Voice Agent Automation",
    desc: "AI voice agents that answer inbound calls, qualify leads, and book meetings automatically.",
    icon: Phone,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
  {
    title: "No Code Automation Workflows",
    desc: "Custom no code workflows that connect your tools, automate tasks, and remove manual operations.",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    title: "Channel Expansion On Demand",
    desc: "Additional channels activated only when needed based on your audience and growth stage.",
    icon: MessageSquare,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

export default function PricingToggle() {
  return (
    <section
      id="pricing"
      className="relative w-full bg-[#050505] py-24 px-6 overflow-hidden flex flex-col items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-cyan-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Limited Availability
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white">
            One System.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Total Scale.
            </span>
          </h2>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-[2.5rem] border border-white/10 bg-zinc-900/60 backdrop-blur-xl overflow-hidden shadow-2xl mb-20"
        >
          <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-green-500 text-black text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase">
            First 5 Founding Clients, 40% Off
          </div>

          <div className="grid lg:grid-cols-12">
            {/* Features */}
            <div className="lg:col-span-7 p-10 border-r border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-green-500/20 rounded-lg border border-cyan-500/30">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                Core Infrastructure
              </h3>

              <div className="space-y-4">
                {FEATURES.map((feature, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-cyan-400" />
                    </div>
                    <span className="text-slate-300 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-500 font-mono">
                <Database className="w-4 h-4" />
                DATA ENCRYPTED AND SECURE
              </div>
            </div>

            {/* Pricing */}
            <div className="lg:col-span-5 p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase mb-4">
                Founding Client Access
              </div>

              <h4 className="text-3xl font-bold text-white leading-tight mb-6">
                Contact For Pricing
              </h4>

              <a
                href="https://cal.com/lumoscale/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                Book A Call
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Add Ons */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
            Optional Add Ons
          </p>
          <h3 className="text-2xl font-bold text-white">
            Scale The System Without Rebuilding Anything
          </h3>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {ADDONS.map((addon, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`p-5 rounded-2xl border ${addon.border} bg-zinc-900/40`}
            >
              <div
                className={`w-10 h-10 rounded-lg ${addon.bg} ${addon.color} flex items-center justify-center mb-4`}
              >
                <addon.icon className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm mb-2">
                {addon.title}
              </h4>
              <p className="text-xs text-slate-400">
                {addon.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
