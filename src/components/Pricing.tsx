import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  X,
  ArrowLeft,
  Target,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  Bot,
  Mic,
  Workflow,
  Globe,
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

/* ---------- OUTCOMES ---------- */

const OUTCOMES = [
  {
    title: "No Leads Ever Slip Through",
    desc: "Every DM is handled, qualified, followed up, and tracked until it clearly moves forward or exits the system.",
    icon: Target,
    stat: "100%",
    statLabel: "Coverage",
    color: "cyan",
  },
  {
    title: "Save Hours of time Monthly",
    desc: "We handle everything end-to-end replies, qualification, follow-ups, booking. Completely done-for-you.",
    icon: Clock,
    stat: "60-80",
    statLabel: "Hours/mo",
    color: "emerald",
  },
  {
    title: "Complete Visibility",
    desc: "Live dashboard shows DMs, conversations, bookings, and conversion data, know what drives revenue.",
    icon: TrendingUp,
    stat: "Real-time",
    statLabel: "Analytics",
    color: "violet",
  },
];

/* ---------- ADD ONS ---------- */

const ADDONS = [
  {
    title: "Custom AI Agents",
    desc: "Dedicated AI agents designed around your business logic, sales process, and decision making workflows.",
    icon: Bot,
    gradient: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
  },
  {
    title: "Voice Agent Automation",
    desc: "AI voice agents for both inbound and outbound calls that qualify leads, follow up, and book meetings automatically.",
    icon: Mic,
    gradient: "from-cyan-500 to-blue-500",
    bgGlow: "bg-cyan-500/20",
  },
  {
    title: "No Code Automation Workflows",
    desc: "Custom no code workflows that automate operations, connect tools, and remove repetitive manual tasks.",
    icon: Workflow,
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/20",
  },
  {
    title: "Multi Channel Expansion",
    desc: "WhatsApp, Facebook, Gmail, website chat, and Meta ads connected into one intelligent automation system.",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/20",
  },
];

export default function PricingToggle() {
  const isMobile = useIsMobile();

  return (
    <section id="pricing" className="relative w-full bg-[#030303] py-10 px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/50 mb-6">
              <Sparkles className="w-3 h-3 text-primary" />
              one system. total scale.
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Done-For-You <span className="text-primary">DM Revenue System</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            We own your inbound conversations and run them as a revenue system.
          </motion.p>
        </div>

        {/* OUTCOME CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {OUTCOMES.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              variants={{ hover: { y: -8 } }}
              whileHover={!isMobile ? "hover" : undefined}
              className="group relative"
            >
              {/* Card glow on hover */}
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                whileInView={isMobile ? { opacity: 1 } : undefined}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 rounded-3xl bg-${o.color}-500/10 opacity-0 blur-2xl`}
              />

              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 group-hover:border-white/20 backdrop-blur-sm transition-all duration-300">
                {/* Top row with icon and stat */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    variants={{ hover: { scale: 1.1 } }}
                    whileInView={isMobile ? { scale: 1.1 } : undefined}
                    transition={{ duration: 0.3 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${o.color}-500/20 to-${o.color}-500/5 flex items-center justify-center`}
                  >
                    <o.icon className={`w-6 h-6 text-${o.color}-400`} />
                  </motion.div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold text-${o.color}-400`}>{o.stat}</div>
                    <div className="text-xs uppercase tracking-wider text-white/50">{o.statLabel}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {o.title}
                </h3>

                <p className="text-base text-white/70 leading-relaxed">
                  {o.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GUARANTEE + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-24"
        >
          <div className="relative p-10 rounded-3xl bg-[#0a0a0a] border border-primary/30 overflow-hidden shadow-2xl shadow-primary/10">
            {/* Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-primary/20 blur-[80px] rounded-full" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="relative flex flex-col md:flex-row md:items-center gap-8">
              {/* Left: Shield + Text */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-primary font-bold">30-Day Guarantee</p>
                    <h3 className="text-2xl font-bold text-white">Risk-Free Control</h3>
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed mb-5">
                  Within 30 days, your Instagram DMs will operate as a structured revenue conversation system.
                  If you do not experience this level of control and clarity:
                </p>

                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-white">80% refund of your first month</span>
                </div>
              </div>

              {/* Right: CTA */}
              <div className="flex-shrink-0">
                <motion.button
                  onClick={() => {
                    document.getElementById("finalcta")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm shadow-xl shadow-white/20"
                >
                  See If This Fits
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <p className="text-xs text-white/30 text-center mt-3">Takes 2 minutes</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ADD ONS - Premium Cards */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Expansion Layers</h3>
            <p className="text-sm text-white/40">Scale beyond DMs with optional add-ons</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADDONS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                variants={{ hover: { y: -6, scale: 1.02 } }}
                whileHover={!isMobile ? "hover" : undefined}
                className="group relative"
              >
                {/* Hover glow */}
                <motion.div
                  variants={{ hover: { opacity: 0.5 } }}
                  whileInView={isMobile ? { opacity: 0.5 } : undefined}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 ${a.bgGlow} rounded-2xl blur-2xl opacity-0`}
                />

                <div className="relative h-full p-6 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-white/20 transition-all duration-300 overflow-hidden">
                  {/* Gradient top line */}
                  <motion.div
                    variants={{ hover: { opacity: 1 } }}
                    whileInView={isMobile ? { opacity: 1 } : undefined}
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${a.gradient} opacity-0`}
                  />

                  {/* Icon */}
                  <motion.div
                    variants={{ hover: { scale: 1.1 } }}
                    whileInView={isMobile ? { scale: 1.1 } : undefined}
                    transition={{ duration: 0.3 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center mb-5`}
                  >
                    <a.icon className="w-5 h-5 text-white" />
                  </motion.div>

                  <h4 className="text-lg font-bold text-white mb-2">
                    {a.title}
                  </h4>

                  <p className="text-sm text-white/60 leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>



    </section>
  );
}
