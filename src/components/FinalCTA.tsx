import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ArrowLeft, Target, Check, Sparkles } from "lucide-react";
import { useAuditModal } from "@/context/AuditModalContext";

export default function FinalCTA() {
  const { openModal } = useAuditModal();

  return (
    <section id="finalcta" className="relative py-12 px-6 overflow-hidden bg-black">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-blue-400 mb-8"
        >
          <Sparkles className="w-3 h-3" />
          <span>Final Step: Verification</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          See If You <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">
            Qualify For Growth
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          <span className="text-white font-bold">Important:</span> To ensure we can deliver results, we must verify your current lead volume. Please fill this out accurately.
        </motion.p>

        <motion.button
          onClick={openModal}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-300 border border-white/10"
        >
          <span>Get Your Free System Audit</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-black group-hover:text-white" />

          {/* Button shine effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine" />
          </div>
        </motion.button>
      </div>
    </section>
  );
}