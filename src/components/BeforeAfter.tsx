import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const BeforeAfter = () => {
  const isMobile = useIsMobile();
  return (
    <section id="beforeafter" className="py-28 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-[#09090b]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
              From Revenue Leak to Revenue Machine
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight max-w-3xl mx-auto">
            Here's exactly what changes when your inbox becomes a system
          </h2>
        </motion.div>

        {/* Glass Cards Container */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* BEFORE Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={!isMobile ? "hover" : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <div className="relative h-full rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.08] backdrop-blur-xl p-8 overflow-hidden">
              {/* Gradient overlay on hover */}
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                whileInView={isMobile ? { opacity: 1 } : undefined}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0"
              />

              {/* Header */}
              <div className="relative flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Before</h3>
                    <p className="text-xs text-white/40">Manual chaos</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                  <span className="text-xs font-medium text-red-400">Current State</span>
                </div>
              </div>

              {/* Metrics List */}
              <div className="relative space-y-4">
                {[
                  { value: "60-80", unit: "hrs/mo", label: "Manual DM work" },
                  { value: "Minutes to", unit: "hours", label: "Response time" },
                  { value: "40%+", unit: "", label: "No-show rate" },
                  { value: "Zero", unit: "", label: "Performance visibility" },
                  { value: "🔥 VA", unit: "", label: "Struggles with volume, misses leads, no analytics" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                    <span className="text-sm text-white/50">{item.label}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-semibold text-white">{item.value}</span>
                      <span className="text-sm text-white/40">{item.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="relative mt-8 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                <p className="text-sm text-white/60">
                  <span className="text-red-400 font-medium">Reality Check:</span> You're working IN the DMs, not ON the business.
                </p>
              </div>
            </div>
          </motion.div>

          {/* AFTER Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={!isMobile ? "hover" : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group"
          >
            <div className="relative h-full rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.08] backdrop-blur-xl p-8 overflow-hidden">
              {/* Gradient overlay on hover */}
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                whileInView={isMobile ? { opacity: 1 } : undefined}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0"
              />

              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 blur-[80px] rounded-full" />

              {/* Header */}
              <div className="relative flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">After</h3>
                    <p className="text-xs text-white/40">System control</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-xs font-medium text-emerald-400">With System</span>
                </div>
              </div>

              {/* Metrics List */}
              <div className="relative space-y-4">
                {[
                  { value: "0", unit: "hours", label: "Manual DM work" },
                  { value: "<60", unit: "sec", label: "Response time" },
                  { value: "<5%", unit: "", label: "No-show rate" },
                  { value: "Full", unit: "", label: "Performance visibility" },
                  { value: "System", unit: "", label: "Unlimited capacity + intent detection + conversion intelligence" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                    <span className="text-sm text-white/50">{item.label}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-semibold text-white">{item.value}</span>
                      <span className="text-sm text-white/40">{item.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="relative mt-8 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-sm text-white/60">
                  <span className="text-emerald-400 font-medium">Reality Check:</span> DMs become a predictable revenue system you control.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => document.getElementById("finalcta")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
          >
            See how this works for you
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default BeforeAfter;
