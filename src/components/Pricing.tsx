import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  Check,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  Building2,
  Zap
} from "lucide-react";
import { useAuditModal } from "../context/AuditModalContext";
import { useIsMobile } from "../hooks/use-mobile";

// ... (Constants TEXT_FEATURES, VOICE_FEATURES, CUSTOM_FEATURES remain the same: lines 16-40)
/* ---------- TEXT AGENT FEATURES ---------- */
const TEXT_FEATURES = [
  "Instagram, WhatsApp & Website automation",
  "Instant responses (<60 sec)",
  "Auto-qualify leads",
  "Smart follow-ups",
  "Performance dashboard",
];

/* ---------- VOICE AGENT FEATURES ---------- */
const VOICE_FEATURES = [
  "Your voice, perfectly cloned",
  "Inbound & outbound calling",
  "Auto-book appointments",
  "Live human transfer",
  "Call analytics & CRM sync",
];

/* ---------- CUSTOM / ENTERPRISE FEATURES ---------- */
const CUSTOM_FEATURES = [
  "Everything above, integrated",
  "Custom AI training",
  "Dedicated infrastructure",
  "White-label dashboard",
  "Priority support",
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
    <section id="pricing" className="relative w-full bg-black py-24 px-6 overflow-hidden">
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
            Select the perfect engine for your business. No hidden fees. No surprises.
          </motion.p>
        </div>

        {/* PRICING GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10"
        >

          <PricingCard
            title="Text Agent Suite"
            subtitle="Stop Missing DMs"
            description="Turn every inquiry into revenue opportunities."
            price=""
            features={TEXT_FEATURES}
            icon={MessageSquare}
            gradient="from-blue-500 to-cyan-500"
            glowColor="rgba(59, 130, 246, 0.4)"
            ctaText="Contact for Pricing"
          />

          <PricingCard
            title="Voice Agent Suite"
            subtitle="Never Miss Another Call"
            description="Your calendar fills while you focus on closing."
            price=""
            features={VOICE_FEATURES}
            icon={Phone}
            isPopular={true}
            gradient="from-emerald-500 to-green-500"
            glowColor="rgba(34, 197, 94, 0.4)"
            ctaText="Contact for Pricing"
          />

          <PricingCard
            title="Custom Pricing"
            subtitle="Total Lead Domination"
            description="Scale without hiring. Dominate without limits."
            price=""
            features={CUSTOM_FEATURES}
            icon={Building2}
            gradient="from-purple-500 to-pink-500"
            glowColor="rgba(168, 85, 247, 0.4)"
            ctaText="Talk to Growth Team"
          />

        </motion.div>

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
