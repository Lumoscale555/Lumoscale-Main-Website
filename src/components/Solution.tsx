import { Bot, Sparkles, Zap, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Bot,
    title: "AI Qualification Agent",
    description:
      "AI talks to every lead in real time, understands intent, and filters buyers automatically so you only speak with serious prospects.",
  },
  {
    icon: Sparkles,
    title: "Smart Booking System",
    description:
      "Your calendar is protected by AI. Only high intent leads are allowed through, saving hours every week.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description:
      "Before each call you get a briefing with goals, urgency, and context so you never walk in blind.",
  },
  {
    icon: MessageSquare,
    title: "AI Auto Messaging",
    description:
      "Every inbox runs on autopilot. Website chat, Instagram, and Facebook replies happen instantly and intelligently.",
  },
];

const container = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const float = {
  hover: {
    y: -12,
    scale: 1.02,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

const iconAnim = {
  hover: {
    rotate: 8,
    scale: 1.15,
    transition: { type: "spring", stiffness: 200 },
  },
};

export default function Solution() {
  return (
    <section className="relative py-40 bg-[#050607]">

      {/* BACKGROUND GLOW (NOT CUT ANYMORE) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[15%] w-[36rem] h-[36rem] bg-[#6AF2E1]/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/3 right-[15%] w-[26rem] h-[26rem] bg-[#9BFF9C]/20 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* HEADING FIXED */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold 
              leading-[1.2]
              bg-gradient-to-r from-[#6AF2E1] to-[#9BFF9C] 
              bg-clip-text text-transparent 
              drop-shadow-[0_0_25px_rgba(106,242,225,0.35)]
              mx-auto max-w-[90%]"
          >
            Your Entire Lead System, Fully Automated
          </h2>

          <p className="mt-6 text-lg text-[#A3B6B2] max-w-3xl mx-auto leading-relaxed">
            Every message, every lead, and every booking is handled by AI from the first hello to confirmed call.
          </p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover="hover"
              className="relative group rounded-3xl p-12 
                bg-[#0E1416]/85 backdrop-blur-xl 
                border border-[#1C2A2B] overflow-hidden"
            >

              {/* SOFT HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 
                bg-gradient-to-br from-[#6AF2E1]/10 to-[#9BFF9C]/10" />

              {/* CONTENT */}
              <motion.div variants={float} className="relative">

                {/* ICON */}
                <motion.div
                  variants={iconAnim}
                  className="w-16 h-16 mb-8 rounded-xl 
                    bg-gradient-to-br from-[#6AF2E1]/20 to-[#9BFF9C]/20 
                    flex items-center justify-center
                    shadow-[0_0_28px_rgba(106,242,225,0.4)]"
                >
                  <feature.icon className="w-8 h-8 text-[#EFFFFA]" />
                </motion.div>

                <h3 className="text-2xl font-semibold text-[#EFFFFA] mb-4">
                  {feature.title}
                </h3>

                <p className="text-[#A3B6B2] leading-relaxed">
                  {feature.description}
                </p>

              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
