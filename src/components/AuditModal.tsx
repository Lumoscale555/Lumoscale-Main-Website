import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check, Phone, MessageSquare, Layers } from "lucide-react";
import { useAuditModal } from "@/context/AuditModalContext";

type StepID =
    | "service-selection"
    | "voice-volume"
    | "voice-pain"
    | "text-volume"
    | "text-pain"
    | "business-info"
    | "primary-goal"
    | "contact";

export default function AuditModal() {
    const { isOpen, closeModal } = useAuditModal();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        // Step 1
        serviceType: "" as "voice" | "text" | "both" | "",
        industry: "" as "Real Estate" | "",

        // Voice 
        callVolume: "",
        callHandling: "",
        callPainPoints: [] as string[],

        // Text
        dmVolume: "",
        dmChannels: [] as string[],
        textPainPoints: [] as string[],

        // Business Info
        businessSetup: "",
        revenueRange: "",

        // Goal
        primaryGoal: "",

        // Contact
        name: "",
        email: "",
        whatsapp: "",
    });

    // Calculate dynamic steps based on selection
    const getSteps = (): StepID[] => {
        const steps: StepID[] = ["service-selection"];

        if (form.serviceType === "both") {
            steps.push("contact");
            return steps;
        }

        if (form.serviceType === "voice") {
            steps.push("voice-volume");
            steps.push("voice-pain");
        }

        if (form.serviceType === "text") {
            steps.push("text-volume");
            steps.push("text-pain");
        }

        // Common ending for Voice/Text (but skipped for 'Both')
        if (form.serviceType === "voice" || form.serviceType === "text") {
            steps.push("business-info");
            steps.push("primary-goal");
            steps.push("contact");
        }

        return steps;
    };

    const steps = getSteps();
    const currentStepID = steps[currentStepIndex];
    const totalSteps = steps.length;

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const toggleSelection = (field: "callPainPoints" | "dmChannels" | "textPainPoints", value: string) => {
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

    const handleClose = () => {
        closeModal();
        setTimeout(() => {
            setCurrentStepIndex(0);
            setSubmitted(false);
            setForm({
                serviceType: "",
                industry: "",
                callVolume: "",
                callHandling: "",
                callPainPoints: [],
                dmVolume: "",
                dmChannels: [],
                textPainPoints: [],
                businessSetup: "",
                revenueRange: "",
                primaryGoal: "",
                name: "",
                email: "",
                whatsapp: "",
            });
        }, 200);
    };

    const canContinue = () => {
        switch (currentStepID) {
            case "service-selection": return !!form.serviceType && !!form.industry;

            // Voice
            case "voice-volume": return !!form.callVolume && !!form.callHandling;
            case "voice-pain": return form.callPainPoints.length > 0;

            // Text
            case "text-volume": return !!form.dmVolume && form.dmChannels.length > 0;
            case "text-pain": return form.textPainPoints.length > 0;

            // Common
            case "business-info":
                if (form.serviceType === "text") {
                    return !!form.businessSetup && !!form.revenueRange;
                }
                return !!form.revenueRange;
            case "primary-goal": return !!form.primaryGoal;
            case "contact":
                const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
                return !!form.name && isEmailValid && !!form.whatsapp;
            default: return false;
        }
    };

    /* ---------- DATA LISTS ---------- */
    const INDUSTRIES = ["Real Estate"];

    const VOICE_PAIN = [
        "Missed calls during off-hours or busy times",
        "Calls go to voicemail and prospects don't leave messages",
        "Spending too much time on unqualified callers",
        "No one to answer when I'm with clients/patients",
        "Hard to track which calls converted vs. didn't",
        "Receptionist/VA inconsistent at qualifying leads",
        "Losing deals because response time is too slow"
    ];

    const TEXT_PAIN = [
        "Responses are slow (hours or days late)",
        "Follow-ups get forgotten or fall through cracks",
        "Too many unqualified inquiries waste my time",
        "No clear system for handling volume",
        "Can't keep up during launches or busy periods",
        "VA/team is inconsistent at converting leads",
        "No visibility into what messages convert vs. fail"
    ];

    const GOALS = [
        "Book more qualified appointments automatically",
        "Stop losing leads to slow response times",
        "Free up my time to focus on closing deals",
        "Scale without hiring more staff",
        "Get consistent lead qualification 24/7",
        "Increase conversion rate from inquiries"
    ];

    const REVENUE_RANGES = ["Under ₹2L", "₹2L - ₹5L", "₹5L - ₹10L", "₹10L+"];

    const SETUP_OPTIONS = [
        "Solo agent",
        "Team (2-5 agents)",
        "Mid-size brokerage",
        "Large brokerage/enterprise"
    ];
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className="w-full max-w-3xl bg-[#0b0b0b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.div
                                    key={currentStepIndex}
                                    className="flex flex-col h-full overflow-hidden"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-end px-6 py-4 border-b border-white/5 bg-[#0b0b0b] z-20 shrink-0">
                                        <div>
                                            <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest block mb-1">
                                                Step {currentStepIndex + 1}/{totalSteps}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-bold text-white">System Audit</h3>
                                        </div>
                                        <button onClick={handleClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                            <X className="w-5 h-5 text-zinc-500 hover:text-white" />
                                        </button>
                                    </div>

                                    {/* CONTENT AREA */}
                                    <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">

                                        {/* STEP 1: SERVICE & INDUSTRY */}
                                        {currentStepID === "service-selection" && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-base font-bold text-white mb-3">Which AI solution are you interested in?</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                        {[
                                                            { id: "voice", label: "AI Voice Agents", icon: Phone },
                                                            { id: "text", label: "AI Text Agents", icon: MessageSquare },
                                                            { id: "both", label: "Both Voice + Text", icon: Layers },
                                                        ].map((item) => (
                                                            <button
                                                                key={item.id}
                                                                onClick={() => setForm({ ...form, serviceType: item.id as any })}
                                                                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${form.serviceType === item.id
                                                                    ? "border-cyan-500 bg-cyan-500/10 text-white"
                                                                    : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                                                                    }`}
                                                            >
                                                                <item.icon className={`w-6 h-6 ${form.serviceType === item.id ? "text-cyan-400" : "text-zinc-500"}`} />
                                                                <span className="font-bold text-sm tracking-wide text-center">{item.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-base font-bold text-white mb-3">What industry are you in?</h4>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {INDUSTRIES.map((ind) => (
                                                            <button
                                                                key={ind}
                                                                onClick={() => setForm({ ...form, industry: ind as any })}
                                                                className={`p-3 rounded-xl border text-sm font-bold uppercase tracking-wide transition-all ${form.industry === ind
                                                                    ? "border-purple-500 bg-purple-500/10 text-white"
                                                                    : "border-white/5 bg-white/5 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                                                                    }`}
                                                            >
                                                                {ind}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* --- VOICE FLOW --- */}
                                        {currentStepID === "voice-volume" && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-base font-bold text-white mb-3">Tell us about your call volume</h4>
                                                    <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">How many inbound calls/inquiries do you get daily?</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {["Less than 10 calls/day", "10-30 calls/day", "30-70 calls/day", "70+ calls/day"].map(v => (
                                                            <button key={v} onClick={() => setForm({ ...form, callVolume: v })}
                                                                className={`p-3 rounded-xl border text-left text-sm font-medium transition-all ${form.callVolume === v ? "border-emerald-500 bg-emerald-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"}`}>
                                                                {v}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">How do you currently handle calls?</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {["Me personally (solo)", "Receptionist/Front desk team", "Virtual assistant", "Mostly goes to voicemail"].map(v => (
                                                            <button key={v} onClick={() => setForm({ ...form, callHandling: v })}
                                                                className={`p-3 rounded-xl border text-left text-sm font-medium transition-all ${form.callHandling === v ? "border-blue-500 bg-blue-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"}`}>
                                                                {v}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {currentStepID === "voice-pain" && (
                                            <div>
                                                <h4 className="text-base font-bold text-white mb-2">What's your biggest challenge with phone calls?</h4>
                                                <p className="text-xs text-zinc-500 mb-4">Select all that apply:</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {VOICE_PAIN.map(v => (
                                                        <button key={v} onClick={() => toggleSelection("callPainPoints", v)}
                                                            className={`w-full p-3 rounded-xl border text-left text-xs md:text-sm transition-all flex justify-between items-center gap-2 ${form.callPainPoints.includes(v) ? "border-red-500 bg-red-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"
                                                                }`}>
                                                            <span>{v}</span>
                                                            {form.callPainPoints.includes(v) && <Check className="w-4 h-4 text-red-500 shrink-0" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* --- TEXT FLOW --- */}
                                        {currentStepID === "text-volume" && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-base font-bold text-white mb-3">Tell us about your message volume</h4>
                                                    <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">How many DMs/messages do you get daily?</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {["Less than 20/day", "20-50/day", "50-100/day", "100+/day"].map(v => (
                                                            <button key={v} onClick={() => setForm({ ...form, dmVolume: v })}
                                                                className={`p-3 rounded-xl border text-left text-sm font-medium transition-all ${form.dmVolume === v ? "border-cyan-500 bg-cyan-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"}`}>
                                                                {v}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Which channels do you use? (Select all that apply)</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {["Instagram DMs", "WhatsApp", "Website chat/forms", "Facebook Messenger", "SMS/Text messages"].map(c => (
                                                            <button key={c} onClick={() => toggleSelection("dmChannels", c)}
                                                                className={`p-3 rounded-xl border text-left text-sm font-medium flex justify-between items-center transition-all ${form.dmChannels.includes(c) ? "border-emerald-500 bg-emerald-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"
                                                                    }`}>
                                                                {c}
                                                                {form.dmChannels.includes(c) && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {currentStepID === "text-pain" && (
                                            <div>
                                                <h4 className="text-base font-bold text-white mb-2">What's your biggest challenge with DMs/messages?</h4>
                                                <p className="text-xs text-zinc-500 mb-4">Select all that apply:</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {TEXT_PAIN.map(v => (
                                                        <button key={v} onClick={() => toggleSelection("textPainPoints", v)}
                                                            className={`w-full p-3 rounded-xl border text-left text-xs md:text-sm transition-all flex justify-between items-center gap-2 ${form.textPainPoints.includes(v) ? "border-orange-500 bg-orange-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"
                                                                }`}>
                                                            <span>{v}</span>
                                                            {form.textPainPoints.includes(v) && <Check className="w-4 h-4 text-orange-500 shrink-0" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* --- COMMON BUSINESS INFO --- */}
                                        {currentStepID === "business-info" && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-base font-bold text-white mb-3">Tell us about your business</h4>

                                                    {form.serviceType === "text" && (
                                                        <div className="mb-6">
                                                            <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">What best describes your current setup?</label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {SETUP_OPTIONS.map(v => (
                                                                    <button key={v} onClick={() => setForm({ ...form, businessSetup: v })}
                                                                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${form.businessSetup === v ? "border-purple-500 bg-purple-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"}`}>
                                                                        {v}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Current Monthly Revenue Range:</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {REVENUE_RANGES.map(v => (
                                                            <button key={v} onClick={() => setForm({ ...form, revenueRange: v })}
                                                                className={`p-3 rounded-xl border text-sm font-medium transition-all ${form.revenueRange === v ? "border-green-500 bg-green-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"}`}>
                                                                {v}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {currentStepID === "primary-goal" && (
                                            <div>
                                                <h4 className="text-base font-bold text-white mb-4">What's your #1 goal with AI automation?</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {GOALS.map(v => (
                                                        <button key={v} onClick={() => setForm({ ...form, primaryGoal: v })}
                                                            className={`w-full p-3 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-2 ${form.primaryGoal === v ? "border-cyan-500 bg-cyan-500/10 text-white" : "border-white/5 bg-white/5 text-zinc-400 hover:border-white/20"}`}>
                                                            <span>{v}</span>
                                                            {form.primaryGoal === v && <Check className="w-4 h-4 text-cyan-500 shrink-0" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {currentStepID === "contact" && (
                                            <div>
                                                {form.serviceType === "both" ? (
                                                    <div className="mb-6">
                                                        <h4 className="text-lg font-bold text-white mb-2">Let's discuss your complete AI system</h4>
                                                        <p className="text-zinc-400 text-sm leading-relaxed">Since you need both voice and text automation, we'll create a custom strategy for you.</p>
                                                    </div>
                                                ) : (
                                                    <h4 className="text-lg font-bold text-white mb-6">Almost done! How should we reach you?</h4>
                                                )}

                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Full Name</label>
                                                            <input autoFocus placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-cyan-500 outline-none" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-end ml-1">
                                                                <label className="text-[10px] font-bold text-zinc-500 uppercase">Email</label>
                                                                {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                                                                    <span className="text-[10px] text-red-500 font-bold animate-pulse">
                                                                        Please type your email (e.g. name@gmail.com)
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <input type="email" placeholder="john@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                                                className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-white outline-none transition-colors ${form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-500'}`} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">WhatsApp Number</label>
                                                        <input type="tel" placeholder="+1 234..." value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                                                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-cyan-500 outline-none" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                    {/* Navigation Footer */}
                                    <div className="p-4 border-t border-white/5 bg-[#0b0b0b] z-20 shrink-0">
                                        <div className="flex gap-3">
                                            {currentStepIndex > 0 && (
                                                <button onClick={() => setCurrentStepIndex(currentStepIndex - 1)} className="p-4 rounded-2xl border border-white/10 text-white hover:bg-white/5 transition-colors">
                                                    <ArrowLeft className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button
                                                disabled={!canContinue() || loading}
                                                onClick={currentStepIndex < totalSteps - 1 ? () => setCurrentStepIndex(currentStepIndex + 1) : handleSubmit}
                                                className="flex-1 py-3 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? "Processing..." : currentStepIndex === totalSteps - 1 ? "Submit" : "Continue"}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                // SUCCESS STATE
                                <motion.div
                                    className="relative p-8 text-center flex flex-col items-center justify-center h-full max-w-lg mx-auto overflow-hidden"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                                    }}
                                >
                                    {/* Background Glows */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[400px] pointer-events-none">
                                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]" />
                                    </div>

                                    {/* Animated Checkmark */}
                                    <motion.div
                                        variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } } }}
                                        className="relative w-20 h-20 mb-6 flex items-center justify-center"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse" />
                                        <div className="relative w-full h-full bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30 ring-1 ring-white/20">
                                            <Check className="w-8 h-8 text-white drop-shadow-md" />
                                        </div>
                                    </motion.div>

                                    <motion.h3 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-xl md:text-2xl font-black text-white mb-2 leading-tight relative z-10">
                                        You're Qualified
                                    </motion.h3>

                                    <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-base text-zinc-300 font-medium mb-6 relative z-10 max-w-sm mx-auto">
                                        Perfect fit, <span className="text-white font-bold">{form.name.split(" ")[0]}</span>. Based on your {form.serviceType === "both" ? "complete" : form.serviceType} needs, we're building your custom roadmap.
                                    </motion.p>

                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-left mb-6 max-w-sm mx-auto">
                                        <p className="text-xs text-zinc-300 mb-3"><strong>Next Step:</strong> Check your email at <span className="text-white">{form.email}</span> for your strategy session link.</p>
                                        <p className="text-xs text-zinc-400">OR book immediately below:</p>
                                    </div>

                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-3 w-full relative z-10">
                                        <button onClick={() => window.open("https://cal.com/lumoscale/30min", "_blank")} className="group relative w-full overflow-hidden px-6 py-3 bg-gradient-to-r from-[#059669] to-[#10b981] text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all shadow-[0_0_20px_rgba(16,185,129,0.1)] active:scale-[0.98]">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Book Strategy Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </button>
                                        <button onClick={handleClose} className="px-6 py-2 rounded-xl text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                            Close
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
