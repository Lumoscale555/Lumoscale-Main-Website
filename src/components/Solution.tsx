import { Clock, CheckCircle2, Calendar, MessageSquare, Bell } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Benefit focused features
const features = [
  {
    icon: Clock,
    title: "Responds to Every DM in 60 Seconds",
    description:
      'No more "Sorry for the late reply." AI engages instantly, even at 2 AM, so you never miss a hot lead while you sleep.',
    metric: "< 60 sec response"
  },
  {
    icon: CheckCircle2,
    title: "Qualifies Hot, Warm, Cold Automatically",
    description:
      "AI scores every lead based on urgency, pain level, and buying intent. You only talk to people ready to book.",
    metric: "3X higher quality"
  },
  {
    icon: Calendar,
    title: "Books Consultations While You Sleep",
    description:
      "AI sends your Cal.com link at the perfect moment in the conversation. You wake up to bookings already confirmed.",
    metric: "24/7 booking"
  },
  {
    icon: Bell,
    title: "Sends 4 Reminders Automatically",
    description:
      "Reduces no shows from 40 percent to 5 percent. WhatsApp plus Email reminders keep your calendar full.",
    metric: "60 to 80 percent fewer no shows"
  },
  {
    icon: MessageSquare,
    title: "Briefs You Before Every Call",
    description:
      "Know their real problem, emotional state, and what to say before you say hello. Walk into every call confident.",
    metric: "Full context"
  }
];

// Container animation
const container: Variants = {
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Card animation
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Solution() {
  return (
    <section className="relative py-40 bg-[#050607]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[15%] w-[36rem] h-[36rem] bg-[#6AF2E1]/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/3 right-[15%] w-[26rem] h-[26rem] bg-[#9BFF9C]/20 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6AF2E1]/10 border border-[#6AF2E1]/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-[#6AF2E1] uppercase tracking-wide">
              The Solution
            </span>
          </div>

          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2]
            bg-gradient-to-r from-[#6AF2E1] to-[#9BFF9C]
            bg-clip-text text-transparent
            drop-shadow-[0_0_25px_rgba(106,242,225,0.35)]
            mx-auto max-w-[90%]"
          >
            How It Works, From Instagram DM to Booked Call
          </h2>

          <p className="mt-6 text-lg text-[#A3B6B2] max-w-3xl mx-auto leading-relaxed">
            Every step happens automatically, no manual work, no lost leads, no wasted time.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { type: "spring", stiffness: 120, damping: 15 }
              }}
              className={`relative group rounded-3xl p-10
                bg-[#0E1416]/85 backdrop-blur-xl border border-[#1C2A2B] overflow-hidden
                ${index === 4 ? "md:col-span-2 md:max-w-2xl md:mx-auto" : ""}`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                bg-gradient-to-br from-[#6AF2E1]/10 to-[#9BFF9C]/10"
              />

              <div className="relative">
                {/* Icon and metric */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6AF2E1]/20 to-[#9BFF9C]/20
                    flex items-center justify-center shadow-[0_0_28px_rgba(106,242,225,0.4)]"
                  >
                    <feature.icon className="w-7 h-7 text-[#EFFFFA]" />
                  </div>

                  <div className="px-3 py-1 bg-[#6AF2E1]/10 border border-[#6AF2E1]/30 rounded-full">
                    <span className="text-xs font-semibold text-[#6AF2E1]">
                      {feature.metric}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-[#EFFFFA] mb-4 leading-snug">
                  {feature.title}
                </h3>

                <p className="text-[#A3B6B2] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => window.open("https://cal.com/vamsivk/30min", "_blank")}
            className="px-10 py-5 text-lg font-semibold rounded-full
              bg-gradient-to-r from-[#6AF2E1] to-[#9BFF9C]
              text-[#050607]
              hover:scale-105 hover:shadow-[0_0_40px_rgba(106,242,225,0.6)]
              transition-all duration-300"
          >
            See It In Action, Book Free Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
