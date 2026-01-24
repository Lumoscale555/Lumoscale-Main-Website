import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";


const BeforeAfter = () => {

  return (
    <section id="beforeafter" className="py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Compact Header - Blue Accents */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs font-semibold text-blue-300 tracking-wide uppercase">Comparison</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Before Lumoscale vs. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">After Lumoscale</span>
          </h2>
        </div>

        {/* Comparison Container */}
        <div className="relative grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Divider (Desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-12 h-12 bg-black border border-white/10 rounded-full flex items-center justify-center shadow-xl shadow-black/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <span className="text-xs font-black text-white z-10">VS</span>
            </div>
          </div>

          {/* LEFT: BEFORE - Manual Chaos (RED) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col relative rounded-3xl p-8 bg-[#0A0A0A] border border-white/5 overflow-hidden"
          >
            {/* Red Glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/10">
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">BEFORE</h3>
                <p className="text-sm text-red-400 font-medium">Manual Chaos</p>
              </div>
            </div>

            <div className="space-y-6 flex-1 relative z-10">
              {[
                { label: "Manual Response Work", val: "60-80 hrs/month" },
                { label: "Response Time", val: "Minutes to hours (or never)" },
                { label: "Missed Opportunities", val: "40%+ no-shows & ghosted leads" },
                { label: "Performance Visibility", val: "Zero insights or tracking" },
                { label: "Capacity", val: "Struggles with volume, drops leads, burns out team" },
              ].map((item, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block mb-1">{item.label}</span>
                  <span className="text-base text-zinc-300 font-medium">{item.val}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-sm text-zinc-400">
                <span className="text-red-500 text-lg mr-2">❌</span>
                You're drowning in inquiries, not growing your business.
              </p>
            </div>
          </motion.div>


          {/* RIGHT: AFTER - System Control (GREEN) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col relative rounded-3xl p-8 bg-zinc-900/30 border border-emerald-500/20 overflow-hidden shadow-2xl shadow-emerald-900/10"
          >
            {/* Green Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AFTER</h3>
                <p className="text-sm text-emerald-400 font-medium">System Control</p>
              </div>
            </div>

            <div className="space-y-6 flex-1 relative z-10">
              {[
                { label: "Manual Response Work", val: "0 hours (fully automated)" },
                { label: "Response Time", val: "Under 60 seconds, 24/7" },
                { label: "Missed Opportunities", val: "Less than 5% no-shows" },
                { label: "Performance Visibility", val: "Full dashboard with insights" },
                { label: "Capacity", val: "Unlimited handles - 10 or 1,000 inquiries seamlessly" },
              ].map((item, i) => (
                <div key={i} className="border-b border-emerald-500/10 pb-4 last:border-0">
                  <span className="text-xs text-emerald-500/60 uppercase tracking-wider font-semibold block mb-1">{item.label}</span>
                  <span className="text-base text-white font-bold">{item.val}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/10">
              <p className="text-sm text-zinc-300">
                <span className="text-emerald-500 text-lg mr-2">✅</span>
                Every inquiry becomes a trackable, revenue-generating opportunity.
              </p>
            </div>
          </motion.div>

        </div>



      </div>
    </section >
  );
};

export default BeforeAfter;
