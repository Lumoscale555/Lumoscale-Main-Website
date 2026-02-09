import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  Check,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,

  Zap
} from "lucide-react";
import { useAuditModal } from "../context/AuditModalContext";
import { useIsMobile } from "../hooks/use-mobile";

// ... (Constants TEXT_FEATURES, VOICE_FEATURES, CUSTOM_FEATURES remain the same: lines 16-40)
/* ---------- PLAN 1 FEATURES (AI Messaging Front Desk) ---------- */
const PLAN1_FEATURES = [
  "Handles Instagram, WhatsApp, and website chat",
  "Replies instantly, 24/7",
  "Qualifies buyers or patients with smart, context-aware questions",
  "Automated follow-ups until booked or disqualified",
  "End-to-end visibility in a live dashboard",
  "Unlimited script revisions"
];

/* ---------- PLAN 2 FEATURES (AI Call Receptionist) ---------- */
const PLAN2_FEATURES = [
  "Answers all inbound calls, 24/7",
  "Triggers outbound calls automatically when prospects submit forms",
  "Qualifies callers before booking (saves you time)",
  "Books appointments directly on your calendar in real-time",
  "Transfers only callers who actually need a human agent",
  "Full call history, transcripts, and performance dashboard"
];

/* ---------- PLAN 3 FEATURES (AI Voice SDR) ---------- */
const PLAN3_FEATURES = [
  "Cold calling & lead reactivation",
  "Filters out voicemails & bad numbers",
  "Transfers interested prospects instantly",
  "Books meetings directly on calendar",
  "Detailed call analytics & recordings",
  "Customizable scripts & objections"
];

const plans = [
  {
    title: "AI Text Agents",
    subtitle: "Capture Every Message",
    description: "Instant responses across Instagram, Facebook, and WhatsApp.",
    price: "$297/mo",
    features: PLAN1_FEATURES,
    icon: MessageSquare,
    gradient: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
    ctaText: "Get Started"
  },
  {
    title: "AI Receptionist",
    subtitle: "Never Miss a Call",
    description: "24/7 inbound call handling, booking, and qualification.",
    price: "$497/mo",
    features: PLAN2_FEATURES,
    icon: Phone,
    isPopular: true,
    gradient: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.15)",
    ctaText: "Get Started"
  },
  {
    title: "AI Voice SDR",
    subtitle: "Scale Your Sales",
    description: "Outbound calling to qualify leads and book meetings automatically.",
    price: "$597/mo",
    features: PLAN3_FEATURES,
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.15)",
    ctaText: "Get Started"
  }
];




const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0.01, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

export default function Pricing() {
  // ... (Pricing component render logic remains the same: lines 65-160)
  return (
    <section id="pricing" className="relative w-full bg-black py-12 px-6 overflow-hidden">
      {/* Background Gradients/Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              Future-Proof Pricing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">Growth System</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10"
          >
            Select the perfect AI team to handle every call and message, 24/7.
          </motion.p>
        </div>



        {/* SINGLE PRICING CTA CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="relative group">            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-transparent rounded-3xl p-10 text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-6">
                <Sparkles className="w-7 h-7 text-blue-400" />
              </div>

              {/* Heading */}
              <h3 className="text-3xl font-bold text-white mb-3">
                Your Complete AI Team
              </h3>
              
              {/* Bullet List */}
              <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
                <li className="flex items-center gap-3 text-zinc-300">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>AI Voice SDR</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <Check className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>AI Receptionist</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <Check className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>AI Text Agents</span>
                </li>
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => window.open("https://cal.com/lumoscale/30min", "_blank")}
                className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold text-base uppercase tracking-wide hover:bg-zinc-100 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
              >
                Book a Call
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Small text */}
              <p className="text-sm text-zinc-500 mt-6">
                Custom pricing based on your needs
              </p>
            </div>
          </div>
        </motion.div>


        {/* NOTE SECTION */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-20 max-w-4xl mx-auto relative p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm"
        >
            <div className="text-center space-y-3">
                <p className="text-zinc-300 text-sm leading-relaxed">
                    <span className="font-semibold text-white">Note:</span> You still need your team. They handle showings, meetings, and in-person interactions. AI doesn't replace them. It picks up the calls and messages when everyone's busy or unavailable. It works around the clock so interested leads get instant responses instead of going to your competitors.
                </p>
                <p className="text-white font-medium text-base italic">
                    "Your team isn't the problem. Missing leads while they're helping other clients is."
                </p>
            </div>
        </motion.div>

        {/* ADD-ONS SECTION */}
        <div className="mt-32 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16 relative"
            >
                <div className="inline-block mb-4">
                  <span className="py-2 px-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)] text-blue-200 text-xs font-bold tracking-widest uppercase">
                    Premium Add-ons
                  </span>
                </div>
                <motion.h3
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]"
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-purple-400">Custom Solutions</span>
                </motion.h3>
                <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
                  Go beyond standard AI agents with fully customized solutions
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto relative z-10">
                {/* Add-on 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-1">Custom AI Agents</h4>
                        <p className="text-zinc-400 text-sm leading-snug">
                            Specialized agents trained on your unique data and SOPs.
                        </p>
                    </div>
                </motion.div>

                {/* Add-on 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-1">Custom Workflows</h4>
                        <p className="text-zinc-400 text-sm leading-snug">
                            End-to-end automation for your specific business logic.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>


      </div>
    </section>
  );
}

function PricingCard({ title, subtitle, description, price, features, icon: Icon, isPopular = false, gradient, glowColor, ctaText }: any) {
  const { openModal } = useAuditModal();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse Interaction (Desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const isMobile = useIsMobile();

  // Scroll Interaction (Mobile)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to spotlight position (sweep across)
  const scrollX = useTransform(scrollYProgress, [0, 1], [-200, 600]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [-200, 600]);

  // Map scroll to slight tilt effect
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isMobile) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);

    const centerX = width / 2;
    const centerY = height / 2;
    // Desktop tilt is stronger/interactive
    const rotateXValue = ((y - centerY) / centerY) * -2.5;
    const rotateYValue = ((x - centerX) / centerX) * 2.5;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function onMouseLeave() {
    if (isMobile) return;
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(0);
    mouseY.set(0);
  }

  // Opacity transform for mobile spotlight
  const mobileOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);

  const mobileSpotlight = useMotionTemplate`radial-gradient(
    600px circle at ${scrollX}px ${scrollY}px,
    ${glowColor || 'rgba(255, 255, 255, 0.05)'},
    transparent 80%
  )`;

  const desktopSpotlight = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    ${glowColor || 'rgba(255, 255, 255, 0.05)'},
    transparent 80%
  )`;

  // Choose the source for spotlight/tilt based on device
  // We use useMotionTemplate which needs MotionValues.
  // We can't swap MotionValues easily in one template without conditional logic inside or distinct trees.
  // Swapping specific rendered elements for Mobile vs Desktop is cleaner.

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      style={{ perspective: 1000 }}
      className="h-full relative"
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX: isMobile ? scrollRotateX : rotateX,
          rotateY: isMobile ? scrollRotateY : rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group relative flex flex-col p-8 rounded-[32px] overflow-hidden bg-[#0A0A0A] border border-white/5 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-black/50`}
      >
        {/* Animated Rotating Border Gradient Hover (Desktop Only or Subtle?) */}
        {!isMobile && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-[32px]">
            <div className={`absolute -inset-[50%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-20`} />
            </div>
        )}

        {/* Inner Dark Background */}
        <div className="absolute inset-[1px] bg-[#0A0A0A] rounded-[31px] z-0" />

        {/* SPOTLIGHT EFFECT */}
        {isMobile ? (
             <motion.div
                className="pointer-events-none absolute -inset-px transition duration-300 z-10"
                style={{
                  opacity: mobileOpacity,
                  background: mobileSpotlight,
                }}
              />
        ) : (
             <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{
                  background: desktopSpotlight,
                }}
              />
        )}

        {/* GLOWING TOP GRADIENT (Popular Only) */}
        {isPopular && (
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-100 z-20" />
        )}

        {/* Header */}
        <div className="relative z-20 mb-8 transform transition-transform duration-300" style={{ transform: "translateZ(30px)" }}>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradient} bg-opacity-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-white/10`}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Icon className={`w-7 h-7 text-white relative z-10 drop-shadow-lg`} />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{title}</h3>
          <p className="text-sm font-bold text-emerald-400 mb-2">{subtitle}</p>
          <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
        </div>

        {/* Price */}
        {price && price.trim() !== "" && (
          <div className="relative z-20 mb-8 pb-8 border-b border-white/5" style={{ transform: "translateZ(20px)" }}>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white tracking-tight">{price}</span>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="relative z-20 flex-1 space-y-5 mb-10" style={{ transform: "translateZ(10px)" }}>
          {features.map((feature: string) => (
            <div key={feature} className="flex items-start gap-3 group/item">
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-white/5 border border-white/10 group-hover/item:border-white/30 group-hover/item:bg-white/10 transition-all shadow-inner`}>
                <Check className={`w-3 h-3 text-white`} />
              </div>
              <span className="text-sm text-zinc-400 group-hover/item:text-zinc-200 transition-colors">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={openModal}
          className={`relative z-20 w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${isPopular
            ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] hover:bg-zinc-100 hover:scale-[1.02]'
            : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black hover:border-white/20 hover:scale-[1.02]'
            }`}
          style={{ transform: "translateZ(30px)" }}
        >
          {ctaText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

      </motion.div>
    </motion.div>
  );
}
