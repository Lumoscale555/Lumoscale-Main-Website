import React, { useRef, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
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

/* ---------- TEXT AGENT FEATURES ---------- */
const TEXT_FEATURES = [
  "Social Media DM Automation",
  "Website Chatbot",
  "WhatsApp Business API",
  "Instant 24/7 Responses",
  "Lead Qualification",
];

/* ---------- VOICE AGENT FEATURES ---------- */
const VOICE_FEATURES = [
  "Inbound & Outbound Calling",
  "Human-like Voice Clones",
  "Appointment Setting",
  "Live Call Transfers",
  "Call Transcripts & CRM Sync",
];

/* ---------- CUSTOM / ENTERPRISE FEATURES ---------- */
const CUSTOM_FEATURES = [
  "Full Text + Voice Suite",
  "Custom AI Model Training",
  "Dedicated Server Infrastructure",
  "White-Label Dashboard",
  "Priority 24/7 Support",
  "Custom CRM Integrations",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Pricing() {


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
            Simple Plans. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">Serious Growth.</span>
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
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10"
        >

          <PricingCard
            title="Text Agent"
            subtitle="Chat Automation"
            price="Book a Call"
            features={TEXT_FEATURES}
            icon={MessageSquare}
            gradient="from-blue-500 to-cyan-500"
            glowColor="rgba(59, 130, 246, 0.4)"
            borderGradient="from-blue-500 via-cyan-400 to-blue-600"
          />

          <PricingCard
            title="Voice Agent"
            subtitle="Call Handling"
            price="Book a Call"
            features={VOICE_FEATURES}
            icon={Phone}
            gradient="from-emerald-500 to-green-500"
            glowColor="rgba(34, 197, 94, 0.4)"
            borderGradient="from-emerald-500 via-green-400 to-emerald-600"
          />

          <PricingCard
            title="Custom Build"
            subtitle="Enterprise Scale"
            price="Contact Us"
            features={CUSTOM_FEATURES}
            icon={Building2}
            isPopular={true}
            gradient="from-purple-500 to-pink-500"
            glowColor="rgba(168, 85, 247, 0.4)"
            borderGradient="from-purple-500 via-pink-400 to-purple-600"
          />

        </motion.div>

      </div>
    </section>
  );
}




function PricingCard({ title, subtitle, price, features, icon: Icon, isPopular = false, gradient, glowColor, borderGradient }: any) {
  const { openModal } = useAuditModal();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt Values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) return;

    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      // Simulate mouse movement in a figure-8 or circle
      // Center is roughly 200, 200 depending on card size.
      // Let's assume a generic center.
      const cx = 150;
      const cy = 200;

      const x = cx + Math.sin(elapsed * 0.001) * 100;
      const y = cy + Math.cos(elapsed * 0.001) * 100;

      mouseX.set(x);
      mouseY.set(y);

      // Tilt
      rotateX.set(((y - cy) / cy) * -2.5);
      rotateY.set(((x - cx) / cx) * 2.5);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile, mouseX, mouseY, rotateX, rotateY]);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isMobile) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);

    // Subtle Tilt
    const centerX = width / 2;
    const centerY = height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -2.5; // Reduced from 5
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

  return (
    <motion.div
      variants={cardVariants}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group relative flex flex-col p-8 rounded-[32px] overflow-hidden bg-[#0A0A0A] border border-white/5 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-black/50`}
      >
        {/* Animated Rotating Border Gradient Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-[32px]">
          <div className={`absolute -inset-[50%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-20`} />
        </div>

        {/* Inner Dark Background to sit on top of rotating border */}
        <div className="absolute inset-[1px] bg-[#0A0A0A] rounded-[31px] z-0" />

        {/* SPOTLIGHT EFFECT */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${glowColor || 'rgba(255, 255, 255, 0.05)'},
              transparent 80%
            )
          `,
          }}
        />

        {/* GLOWING TOP GRADIENT (Popular Only) */}
        {isPopular && (
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-100 z-20" />
        )}

        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute top-6 right-6 z-20 transform translate-z-20" style={{ transform: "translateZ(20px)" }}>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Sparkles className="w-3 h-3" /> Popular
            </span>
          </div>
        )}

        {/* Header - Raised Z-Index */}
        <div className="relative z-20 mb-8 transform transition-transform duration-300" style={{ transform: "translateZ(30px)" }}>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradient} bg-opacity-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-white/10`}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Icon className={`w-7 h-7 text-white relative z-10 drop-shadow-lg`} />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{title}</h3>
          <p className="text-sm text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">{subtitle}</p>
        </div>

        {/* Price */}
        <div className="relative z-20 mb-8 pb-8 border-b border-white/5" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white tracking-tight">{price}</span>
          </div>
        </div>

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
          Contact for Pricing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

      </motion.div>
    </motion.div>
  )
}
