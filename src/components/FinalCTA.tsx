import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ArrowLeft, Target, Check, Sparkles } from "lucide-react";

export default function FinalCTA() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    businessStage: "",
    dmVolume: "",
    painPoints: [] as string[],
    salesChannels: [] as string[],
    revenueRange: "",
    offerType: "",
    offerTypeOther: "",
    name: "",
    email: "",
    whatsapp: "",
    instagram: "",
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const toggleSelection = (field: "painPoints" | "salesChannels", value: string) => {
    setForm((p) => ({
      ...p,
      [field]: p[field].includes(value)
        ? p[field].filter((item) => item !== value)
        : [...p[field], value],
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
      setSubmitted(true);
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
        businessStage: "",
        dmVolume: "",
        painPoints: [],
        salesChannels: [],
        revenueRange: "",
        offerType: "",
        offerTypeOther: "",
        name: "",
        email: "",
        whatsapp: "",
        instagram: "",
      });
    }, 200);
  };

  const canContinue = () => {
    switch (step) {
      case 1:
        return form.businessStage && form.dmVolume;
      case 2:
        return form.painPoints.length > 0;
      case 3:
        return form.salesChannels.length > 0;
      case 4:
        return form.revenueRange && (form.offerType === "Other" ? form.offerTypeOther : form.offerType);
      case 5:
        return form.name && form.email;
      default:
        return false;
    }
  };

  return (
    <section id="finalcta" className="relative py-32 px-6 overflow-hidden bg-[#030303]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-cyan-400 mb-8"
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
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
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300"
        >
          <span>Get Your Free System Audit</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

          {/* Button shine effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine" />
          </div>
        </motion.button>


      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="w-full max-w-2xl bg-[#0b0b0b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] md:max-h-[90vh]">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key={step}
                    className="flex flex-col h-full overflow-hidden"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-end p-6 border-b border-white/5 bg-[#0b0b0b] z-20 shrink-0">
                      <div>
                        <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest block mb-1">
                          Step {step}/5
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white">System Audit</h3>
                      </div>
                      <button onClick={closeModal} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X className="w-5 h-5 text-zinc-500 hover:text-white" />
                      </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                      {step === 1 && (
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-4">
                              Tell us about your business
                            </h4>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-3">
                              What best describes your current setup?
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {[
                                "Solo founder (handling DMs myself)",
                                "Small team (me + 1-2 people)",
                                "Growing team (3-5 people)",
                                "Established business (5+ people)"
                              ].map((v) => (
                                <button
                                  key={v}
                                  onClick={() => setForm({ ...form, businessStage: v })}
                                  className={`p-4 rounded-xl border text-sm font-medium text-left transition-all ${form.businessStage === v
                                    ? "border-cyan-500 bg-cyan-500/10 text-white"
                                    : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"
                                    }`}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-3">
                              Weekly Inbound DMs (Estimate):
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                "Less than 20 DMs/day",
                                "20-50 DMs/day",
                                "50-100 DMs/day",
                                "100+ DMs/day"
                              ].map((v) => (
                                <button
                                  key={v}
                                  onClick={() => setForm({ ...form, dmVolume: v })}
                                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${form.dmVolume === v
                                    ? "border-emerald-500 bg-emerald-500/10 text-white"
                                    : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"
                                    }`}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-4">
                              What's your biggest DM challenge right now?
                            </h4>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-3">
                              Select all that apply:
                            </label>
                            <div className="space-y-2">
                              {[
                                "Replies are slow or I respond late",
                                "Follow-ups get forgotten or fall through cracks",
                                "Too many unqualified leads waste my time",
                                "No clear system",
                                "Can't handle volume during launches or busy periods",
                                "VA is inconsistent on converting leads",
                                "No visibility into what messages convert vs. fail"
                              ].map((v) => (
                                <button
                                  key={v}
                                  onClick={() => toggleSelection("painPoints", v)}
                                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex justify-between items-center ${form.painPoints.includes(v)
                                    ? "border-cyan-500 bg-cyan-500/10 text-white"
                                    : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"
                                    }`}
                                >
                                  <span className="pr-4">{v}</span>
                                  {form.painPoints.includes(v) && (
                                    <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-4">
                              Where do your leads come from?
                            </h4>
                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-3">
                              Select all that apply:
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                              {[
                                "Instagram DMs (organic content)",
                                "Instagram DMs (paid ads)",
                                "WhatsApp",
                                "Email",
                                "Website forms"
                              ].map((c) => (
                                <button
                                  key={c}
                                  onClick={() => toggleSelection("salesChannels", c)}
                                  className={`p-4 rounded-xl border text-sm font-medium transition-all text-left flex justify-between items-center ${form.salesChannels.includes(c)
                                    ? "border-emerald-500 bg-emerald-500/10 text-white"
                                    : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20"
                                    }`}
                                >
                                  {c}
                                  {form.salesChannels.includes(c) && (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-4">
                              Help us understand your offer
                            </h4>
                            <div className="space-y-6">
                              <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase block mb-3">
                                  Current Monthly Revenue Range:
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                  {[
                                    "Under ₹50,000",
                                    "₹50,000 - ₹2L",
                                    "₹2L - ₹5L",
                                    "₹5L+"
                                  ].map((v) => (
                                    <button
                                      key={v}
                                      onClick={() => setForm({ ...form, revenueRange: v })}
                                      className={`p-4 rounded-xl border text-sm font-medium transition-all ${form.revenueRange === v
                                        ? "border-cyan-500 bg-cyan-500/10 text-white"
                                        : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"
                                        }`}
                                    >
                                      {v}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase block mb-3">
                                  What do you sell?
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                  {[
                                    "Coaching program",
                                    "Consulting services",
                                    "Course/training",
                                    "Agency services",
                                    "Other"
                                  ].map((v) => (
                                    <button
                                      key={v}
                                      onClick={() => setForm({ ...form, offerType: v })}
                                      className={`p-4 rounded-xl border text-sm font-medium text-left transition-all ${form.offerType === v
                                        ? "border-cyan-500 bg-cyan-500/10 text-white"
                                        : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"
                                        }`}
                                    >
                                      {v}
                                    </button>
                                  ))}
                                </div>
                                {form.offerType === "Other" && (
                                  <input
                                    autoFocus
                                    placeholder="Please specify..."
                                    value={form.offerTypeOther}
                                    onChange={(e) => setForm({ ...form, offerTypeOther: e.target.value })}
                                    className="w-full mt-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all placeholder:text-zinc-600 appearance-none"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-6">
                              Almost done! How should we reach you?
                            </h4>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">
                                  Full Name
                                </label>
                                <input
                                  autoFocus
                                  placeholder="John Doe"
                                  value={form.name}
                                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all placeholder:text-zinc-600 appearance-none"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  placeholder="john@company.com"
                                  value={form.email}
                                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all placeholder:text-zinc-600 appearance-none"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">
                                  WhatsApp Number (Optional)
                                </label>
                                <input
                                  type="tel"
                                  placeholder="+1 234 567 890"
                                  value={form.whatsapp}
                                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all placeholder:text-zinc-600 appearance-none"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">
                                  Instagram Handle (Optional)
                                </label>
                                <input
                                  placeholder="@username"
                                  value={form.instagram}
                                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all placeholder:text-zinc-600 appearance-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer / Buttons */}
                    <div className="p-6 border-t border-white/5 bg-[#0b0b0b] z-20 shrink-0">
                      <div className="flex gap-3">
                        {step > 1 && (
                          <button
                            onClick={() => setStep(step - 1)}
                            className="p-5 rounded-2xl border border-white/10 text-white hover:bg-white/5 transition-colors"
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          disabled={!canContinue() || loading}
                          onClick={step < 5 ? () => setStep(step + 1) : handleSubmit}
                          className="flex-1 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading
                            ? "Processing..."
                            : step === 5
                              ? "Submit"
                              : "Next Step"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="p-16 text-center flex flex-col items-center justify-center h-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-tr from-cyan-400 to-green-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-cyan-500/20">
                      <Check className="w-10 h-10 text-black stroke-[3px]" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">
                      Audit Request Sent
                    </h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                      Thank you,{" "}
                      <span className="text-white font-bold">
                        {form.name.split(" ")[0]}
                      </span>
                      . We are analyzing your current bottleneck. Expect a custom
                      automation roadmap in your inbox within{" "}
                      <span className="text-cyan-400 font-bold">24 hours</span>.
                    </p>
                    <button
                      onClick={closeModal}
                      className="px-10 py-3 rounded-full border border-white/10 text-zinc-500 hover:text-white hover:border-white transition-all text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                      Close Portal
                    </button>
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