import { Zap, Target, RefreshCw, Brain, Smartphone, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

const features = [
  {
    icon: Zap,
    title: "Replies in Under 60 Seconds",
    description: "Never lose a lead to slow responses. System works 24/7 - even at 2 AM.",
    highlight: "Recover lost revenue from faster replies.",
    number: "01"
  },
  {
    icon: Target,
    title: "Qualifies Every Lead Automatically",
    description: "Cold → nurtured. Warm → engaged. Hot → booking. You only talk to serious buyers.",
    highlight: "No more unqualified calls wasting your time.",
    number: "02"
  },
  {
    icon: RefreshCw,
    title: "Follows Up When Leads Go Silent",
    description: "Automated re-engagement sequences. Never lose a conversation to silence.",
    highlight: "Recover leads that would've been lost.",
    number: "03"
  },
  {
    icon: Brain,
    title: "Pre-Call Intelligence Briefs",
    description: "Their pain points, budget signals, objections = mapped before you say hello.",
    highlight: "Walk in knowing exactly what to say.",
    number: "04"
  },
  {
    icon: Smartphone,
    title: "Multi-Channel Reminders",
    description: "Email + WhatsApp + SMS at 24hr, 6hr, 1hr before attending calls.",
    highlight: "Protect your calendar from no-shows.",
    number: "05"
  },
  {
    icon: BarChart3,
    title: "Complete Performance Visibility",
    description: "Live dashboard with full visibilty. See what converts, what fails using weekly and monthly reports.",
    highlight: "Scale with data, not blind guessing.",
    number: "06"
  }
];

export default function Solution() {
  const isMobile = useIsMobile();
  return (
    <section id="solution" className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Glow Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-xs font-medium text-white/80 uppercase tracking-widest">The Solution</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Your DMs Now Run <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-blue-600">
              Like a Revenue System
            </span>
          </h2>
          <p className="text-xl text-white/50 font-light max-w-2xl mx-auto">
            The complete system that runs your DMs like a sales team.
          </p>
        </div>

        {/* Minimalist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={!isMobile ? "hover" : undefined}
              className="group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden"
            >
              {/* Green Bottom Highlight */}
              <motion.div
                variants={{ hover: { scaleX: 1 } }}
                whileInView={isMobile ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#4ade80] to-transparent scale-x-0 origin-center"
              />

              {/* Hover Gradient Overlay */}
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                whileInView={isMobile ? { opacity: 1 } : undefined}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 rounded-3xl pointer-events-none"
              />

              <div className="relative z-10">
                {/* Header: Icon + Number */}
                <div className="flex justify-between items-start mb-8">
                  <motion.div
                    variants={{ hover: { scale: 1.1, borderColor: "rgba(74,222,128,0.2)" } }}
                    whileInView={isMobile ? { scale: 1.1, borderColor: "rgba(74,222,128,0.2)" } : undefined}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5"
                  >
                    <feature.icon className="w-6 h-6 text-white/80 group-hover:text-[#4ade80] transition-colors" />
                  </motion.div>
                  <span className="text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#4ade80] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 h-10">
                  {feature.description}
                </p>

                {/* Footer Highlight */}
                <div className="pt-6 border-t border-white/5 flex items-center gap-3 text-white/80 group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:text-[#4ade80]" />
                  <span className="text-xs font-bold tracking-wide uppercase group-hover:text-[#4ade80]">{feature.highlight}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
