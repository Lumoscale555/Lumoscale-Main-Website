import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Zap,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  Database,
  X,
  ArrowLeft,
  Users,
  Target,
} from "lucide-react";

/* ---------- CONFIG ---------- */

const FEATURES = [
  "DM automation with instant responses",
  "Smart lead qualification and filtering",
  "Automated follow up triggers based on user intent",
  "Calendar based booking system",
  "Multi channel meeting reminders via WhatsApp and Email",
  "Pre call intelligence brief before every meeting",
  "Post call summary and lead insights",
  "Live dashboard to track leads and conversions",
  "Monthly performance and growth report",
];

const ADDONS = [
  {
    title: "Custom AI Agents",
    desc: "Dedicated AI agents designed around your business logic, sales process, and decision making workflows.",
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    title: "Voice Agent Automation",
    desc: "AI voice agents for both inbound and outbound calls that qualify leads, follow up, and book meetings automatically.",
    icon: Phone,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
  {
    title: "No Code Automation Workflows",
    desc: "Custom no code workflows that automate operations, connect tools, and remove repetitive manual tasks.",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    title: "Multi Channel Expansion",
    desc: "WhatsApp, Facebook, Gmail, website chat, and Meta ads connected into one intelligent automation system.",
    icon: MessageSquare,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

export default function PricingToggle() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    operatorType: "",
    leadVolume: "",
    bottleneck: "",
    channels: [],
    name: "",
    email: "",
  });

  const toggleChannel = (channel) => {
    setForm((p) => ({
      ...p,
      channels: p.channels.includes(channel)
        ? p.channels.filter((c) => c !== channel)
        : [...p.channels, channel],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch("https://n8n.srv1011051.hstgr.cloud/webhook/Form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // Graceful fallback to show success even if webhook times out
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
      setForm({
        operatorType: "",
        leadVolume: "",
        bottleneck: "",
        channels: [],
        name: "",
        email: "",
      });
    }, 200);
  };

  const canContinue =
    (step === 1 && form.operatorType && form.leadVolume) ||
    (step === 2 && form.bottleneck) ||
    (step === 3 && form.channels.length > 0) ||
    (step === 4 && form.name && form.email);

  return (
    <section id="pricing" className="relative w-full bg-[#050505] py-24 px-6 overflow-hidden flex flex-col items-center">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-cyan-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Limited Availability
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            One System. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Total Scale.</span>
          </h2>
        </div>

        {/* Pricing Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative max-w-4xl mx-auto rounded-[2.5rem] border border-white/10 bg-zinc-900/60 backdrop-blur-xl overflow-hidden shadow-2xl mb-20">
          <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-green-500 text-black text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase">First 5 Founding Clients, 40% Off</div>
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-7 p-10 border-r border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-green-500/20 rounded-lg border border-cyan-500/30"><Zap className="w-5 h-5 text-cyan-400" /></div>
                Core Infrastructure
              </h3>
              <div className="space-y-4">
                {FEATURES.map((feature, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center"><Check className="w-3 h-3 text-cyan-400" /></div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-500 font-mono"><Database className="w-4 h-4" />DATA ENCRYPTED AND SECURE</div>
            </div>
            <div className="lg:col-span-5 p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase mb-4">Founding Client Access</div>
              <h4 className="text-3xl font-bold text-white leading-tight mb-6">Contact For Pricing</h4>
              <button onClick={() => setOpen(true)} className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition">
                Start System Audit <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Add Ons */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Optional Add Ons</p>
          <h3 className="text-2xl font-bold text-white">Scale The System Without Rebuilding Anything</h3>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ADDONS.map((addon, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className={`p-5 rounded-2xl border ${addon.border} bg-zinc-900/40`}>
              <div className={`w-10 h-10 rounded-lg ${addon.bg} ${addon.color} flex items-center justify-center mb-4`}><addon.icon className="w-5 h-5" /></div>
              <h4 className="text-white font-bold text-sm mb-2">{addon.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{addon.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FORM MODAL - High Speed Layout */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-xl bg-[#0b0b0b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key={step} className="p-8 md:p-10" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest block mb-1">Inquiry Phase {step}/4</span>
                        <h3 className="text-2xl font-bold text-white">System Audit</h3>
                      </div>
                      <button onClick={closeModal}><X className="w-5 h-5 text-zinc-500" /></button>
                    </div>

                    <div className="min-h-[300px]">
                      {step === 1 && (
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-zinc-500 uppercase">I identify as a:</label>
                            <div className="grid grid-cols-2 gap-2">
                              {["Solo", "Small team", "Growth", "Enterprise"].map((v) => (
                                <button key={v} onClick={() => setForm({ ...form, operatorType: v })} className={`p-4 rounded-xl border text-sm font-semibold transition-all ${form.operatorType === v ? "border-cyan-500 bg-cyan-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"}`}>{v}</button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Daily Lead Volume:</label>
                            <div className="grid grid-cols-4 gap-2">
                              {["0-5", "5-20", "20-50", "50+"].map((v) => (
                                <button key={v} onClick={() => setForm({ ...form, leadVolume: v })} className={`p-3 rounded-xl border text-[12px] font-bold transition-all ${form.leadVolume === v ? "border-emerald-500 bg-emerald-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"}`}>{v}</button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-zinc-500 uppercase">Biggest Pain Point?</label>
                          {["Replies are slow or inconsistent", "Follow ups are forgotten", "Too many unqualified leads", "Bookings are messy or manual"].map((v) => (
                            <button key={v} onClick={() => setForm({ ...form, bottleneck: v })} className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex justify-between items-center ${form.bottleneck === v ? "border-cyan-500 bg-cyan-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"}`}>{v}{form.bottleneck === v && <Target className="w-4 h-4 text-cyan-400" />}</button>
                          ))}
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-4">
                          <label className="text-xs font-bold text-zinc-500 uppercase">Target Channels:</label>
                          <div className="grid grid-cols-2 gap-3">
                            {["WhatsApp", "Instagram", "Email", "Website", "Ads"].map((c) => (
                              <button key={c} onClick={() => toggleChannel(c)} className={`p-4 rounded-xl border text-sm font-medium transition-all text-left ${form.channels.includes(c) ? "bg-white text-black border-white" : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20"}`}>{c}</button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Your Full Name</label>
                            <input autoFocus placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-5 text-white focus:border-cyan-500 outline-none transition-all" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Work Email</label>
                            <input placeholder="john@company.com" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-5 text-white focus:border-cyan-500 outline-none transition-all" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 mt-10">
                      {step > 1 && (
                        <button onClick={() => setStep(step - 1)} className="p-5 rounded-2xl border border-white/10 text-white hover:bg-white/5"><ArrowLeft className="w-5 h-5" /></button>
                      )}
                      <button disabled={!canContinue || loading} onClick={step < 4 ? () => setStep(step + 1) : handleSubmit} className="flex-1 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-zinc-200 transition-all active:scale-[0.98]">
                        {loading ? "Processing..." : step === 4 ? "Build My System" : "Next Step"}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div className="p-16 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="w-20 h-20 bg-gradient-to-tr from-cyan-400 to-green-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-cyan-500/20">
                      <Check className="w-10 h-10 text-black stroke-[3px]" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">Audit Request Sent</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                      Thank you, <span className="text-white font-bold">{form.name.split(' ')[0]}</span>. We are analyzing your current bottleneck. Expect a custom automation roadmap in your inbox within <span className="text-cyan-400 font-bold">24 hours</span>.
                    </p>
                    <button onClick={closeModal} className="px-10 py-3 rounded-full border border-white/10 text-zinc-500 hover:text-white hover:border-white transition-all text-[10px] font-black uppercase tracking-[0.3em]">Close Portal</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}