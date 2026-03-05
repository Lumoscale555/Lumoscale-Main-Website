import { CheckCircle2, MessageCircle, Bell, Calendar, FileText, TrendingUp, Zap, Bot, Loader2, Video, Clock, Mail, Users, ArrowRight, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration for avatars
const AVATARS = {
    user: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces&q=80",
    ai: "bot"
};

const messages = [
    { sender: "lead", text: "Hey, I have 100+ leads sitting in my DMs right now and I can't get to them.", delay: 0 },
    { sender: "ai", text: "Oof, that's a great problem to have... but also painful if they go cold. Are you handling all those yourself or do you have someone helping?", delay: 2500 },
    { sender: "lead", text: "My VA tries, but she's too slow and misses the qualified ones. I'm definitely losing revenue.", delay: 5500 },
    { sender: "ai", text: "Yeah, I hear that a lot. Speed kills in DMs, by the time someone replies 6 hours later, the lead's already talking to 3 other people. How much time are you spending managing this daily?", delay: 8500 },
    { sender: "lead", text: "Honestly? Too much. And the VA still needs me to step in constantly.", delay: 11500 },
    { sender: "ai", text: "Makes sense. That's exactly why we built this—takes the whole thing off your plate. Replies in under a minute, sorts who's serious vs who's browsing, and only sends you people ready to buy. No VA needed.", delay: 15000 },
    { sender: "lead", text: "I'm interested, but I don't want it to sound like a generic bot. My brand is premium.", delay: 18000 },
    { sender: "ai", text: "Totally get it. That's why we don't use templates, we actually train it on your past conversations. Your tone, your style, how you handle objections. It sounds like you, not a robot. Want to see how it works with a quick demo?", delay: 22000 },
    { sender: "lead", text: "Yeah, let's see it.", delay: 25000 },
    { sender: "ai", text: "Perfect. Here's the link: https://cal.com/lumoscale/30min. We can walk through exactly how it'd handle your 100 leads and get them moving again. Sound good?", delay: 27500 },
    { sender: "lead", text: "Sounds good, booked.", delay: 30000 },
    { sender: "ai", text: "Awesome. Talk soon! 🚀", delay: 31500 }
];

// The 5 specific steps requested
const checkpoints = [
    { text: "Reply Instantly", sub: "Responds in seconds", icon: Zap },
    { text: "Pitches Solution", sub: "Qualifies & Offers", icon: Bot },
    { text: "Booking Link", sub: "sends calendar link", icon: Calendar },
    { text: "Team Alert", sub: "Slack/Email Notification", icon: Bell },
    { text: "Pre Call Brief", sub: "AI Generated Report", icon: FileText }
];

const DMDemo = () => {
    // 0: DM, 1: Booking, 2: Alert, 3: Brief
    const [demoStep, setDemoStep] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState(0);
    const [isBooked, setIsBooked] = useState(false);

    // Active Checkpoint State (0-4)
    const [activeCheckpoint, setActiveCheckpoint] = useState(0);

    const timerRef = useRef<number | null>(null);
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
    const dmScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => { setInView(entry.isIntersecting); },
            { threshold: 0.3 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const clearTimers = () => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    // Auto-scroll chat
    useEffect(() => {
        if (demoStep === 0 && dmScrollRef.current) {
            requestAnimationFrame(() => {
                dmScrollRef.current?.scrollTo({ top: dmScrollRef.current.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [visibleMessages, demoStep]);

    // Handle Reset on Scroll Out
    useEffect(() => {
        if (!inView) {
            resetDemo();
        }
    }, [inView]);

    const resetDemo = () => {
        clearTimers();
        setDemoStep(0);
        setVisibleMessages(0);
        setIsBooked(false);
        setActiveCheckpoint(0);
    };

    // Main Sequence Controller
    useEffect(() => {
        if (!inView) return;

        // Step 0: Run Chat
        if (demoStep === 0) {
            let mounted = true;

            // Logic to update checkpoints based on chat progress
            // Total messages = 8 (indices 0-7)
            // 0: Lead (Hi)
            // 1: AI (Reply) -> "Reply Instantly" (Checkpoint 0)
            // 3: AI (Pitch) -> "Pitches Solution" (Checkpoint 1)
            // 7: AI (Link) -> "Booking Link" (Checkpoint 2)

            const runChat = (index: number) => {
                if (!mounted) return;

                // Update Checkpoint based on message index
                if (index >= 1 && index < 5) setActiveCheckpoint(0); // Reply
                if (index >= 5 && index < 9) setActiveCheckpoint(1); // Pitch
                if (index >= 9) setActiveCheckpoint(2); // Booking Link

                if (index > messages.length) {
                    // Chat done, wait a bit then go to booking screen
                    timerRef.current = window.setTimeout(() => {
                        setDemoStep(1);
                    }, 2000);
                    return;
                }
                setVisibleMessages(index);
                const currentMsg = messages[index - 1];
                const nextMsg = messages[index];

                const delay = nextMsg?.delay
                    ? nextMsg.delay - (currentMsg?.delay || 0)
                    : 2000;

                timerRef.current = window.setTimeout(() => {
                    runChat(index + 1);
                }, Math.max(300, delay));
            };

            // Only start if we are at start
            if (visibleMessages === 0) {
                setActiveCheckpoint(0);
                runChat(1);
            }

            return () => { mounted = false; clearTimers(); };
        }

        // Step 1: Booking Screen
        if (demoStep === 1) {
            setActiveCheckpoint(2); // Ensure Booking Link is highlighted

            // Auto click "Confirm Booking" after 2s
            timerRef.current = window.setTimeout(() => {
                setIsBooked(true);
                // Then move to step 2 after success msg
                timerRef.current = window.setTimeout(() => {
                    setDemoStep(2);
                }, 2000);
            }, 2000);
            return () => clearTimers();
        }

        // Step 2: Alert Screen
        if (demoStep === 2) {
            setActiveCheckpoint(3); // Team Alert
            // Show alert for 4s then move to brief
            timerRef.current = window.setTimeout(() => {
                setDemoStep(3);
            }, 4000);
            return () => clearTimers();
        }

        // Step 3: Brief Screen
        if (demoStep === 3) {
            setActiveCheckpoint(4); // Pre Call Brief
            // Show Brief for 5s then RESTART
            timerRef.current = window.setTimeout(() => {
                resetDemo();
            }, 8000);
            return () => clearTimers();
        }

    }, [demoStep, inView]);


    return (
        <section id="demo" ref={sectionRef} className="py-10 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">

                    {/* HEADING */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                Live System Demo
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Watch It Happen <span className="text-primary">Step-by-Step</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            See how our AI handles lead overflow, qualifies prospects, and books sales calls on autopilot.
                        </p>
                    </motion.div>

                    {/* VISUAL PROGRESS BAR FOR STEPS */}
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center gap-2">
                            {[0, 1, 2, 3].map((step) => (
                                <div key={step} className={`h-1.5 rounded-full transition-all duration-500 ${demoStep === step ? "w-12 bg-[#4ade80] shadow-[0_0_10px_#4ade80]" : "w-3 bg-white/10"
                                    }`} />
                            ))}
                        </div>
                    </div>

                    {/* MAIN GRID */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center justify-center mb-24">

                        {/* LEFT SIDE: PHONE MOCKUP */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] bg-primary/15 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative z-10 w-full max-w-[420px]">
                                {/* Premium Mockup Frame */}
                                <div className="bg-[#121417] border-[6px] border-[#2a2d33] rounded-[3rem] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                                    {/* Notch */}
                                    <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20 pointer-events-none">
                                        <div className="w-40 h-full bg-[#121417] rounded-b-2xl" />
                                    </div>

                                    <div className="relative bg-[#000] h-[680px] flex flex-col overflow-hidden">

                                        {/* Dynamic Header */}
                                        <div className="pt-12 pb-4 px-6 bg-gradient-to-b from-white/10 to-transparent flex items-center justify-between border-b border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4ade80] to-[#84cc16] flex items-center justify-center text-black font-bold text-xs ring-2 ring-white/10 shadow-[0_0_10px_rgba(74,222,128,0.3)]">
                                                    AI
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm leading-none">Lumoscale AI</h4>
                                                    <span className="text-[10px] text-[#4ade80] font-medium flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse"></span>
                                                        Online
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                                <Video className="w-4 h-4 text-white/40" />
                                            </div>
                                        </div>

                                        {/* CONTENT AREA */}
                                        <div className="flex-1 overflow-hidden relative p-4 flex flex-col bg-[#050505]">

                                            {/* STEP 0: AI CHAT */}
                                            {demoStep === 0 && (
                                                <div ref={dmScrollRef} className="h-full overflow-y-auto pr-2 scrollbar-hide space-y-4 pb-12">
                                                    <div className="text-center py-4">
                                                        <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Today 10:23 AM</span>
                                                    </div>

                                                    <AnimatePresence initial={false}>
                                                        {messages.slice(0, visibleMessages).map((msg, i) => {
                                                            const isLead = msg.sender === "lead";
                                                            return (
                                                                <motion.div
                                                                    key={i}
                                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                                    className={`flex items-end gap-3 ${isLead ? "justify-end" : "justify-start"}`}
                                                                >
                                                                    {!isLead && <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center mb-1 flex-shrink-0 shadow-lg border border-white/10"><Bot className="w-3 h-3 text-[#4ade80]" /></div>}
                                                                    <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm border text-[13px] leading-relaxed ${isLead
                                                                        ? "bg-gradient-to-r from-[#84cc16] to-[#4ade80] text-black font-medium rounded-tr-sm border-transparent shadow-[0_0_15px_rgba(74,222,128,0.1)]"
                                                                        : "bg-[#1a1d21] text-gray-100 border-white/5 rounded-tl-sm"
                                                                        }`}>
                                                                        <p>{msg.text}</p>
                                                                    </div>
                                                                    {isLead && <img src={AVATARS.user} alt="User" className="w-6 h-6 rounded-full object-cover border-2 border-white/10 mb-1 flex-shrink-0" />}
                                                                </motion.div>
                                                            );
                                                        })}
                                                    </AnimatePresence>

                                                    {visibleMessages < messages.length && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-muted-foreground text-[10px] ml-11">
                                                            <div className="flex gap-1">
                                                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            )}

                                            {/* STEP 1: BOOKING */}
                                            {demoStep === 1 && (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-center px-4">
                                                    {!isBooked ? (
                                                        <div className="bg-[#1a1d21] rounded-3xl p-6 shadow-xl relative overflow-hidden border border-white/5">
                                                            <div className="flex justify-between items-center mb-6">
                                                                <h5 className="font-bold text-white text-lg">Select a Time</h5>
                                                                <div className="bg-[#2d3339] text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10">30 min</div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-3 mb-6">
                                                                <div className="bg-[#4ade80] text-black font-bold text-center py-4 rounded-xl text-sm shadow-lg transform scale-105 relative ring-2 ring-[#4ade80]/50">
                                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full border-2 border-[#4ade80] flex items-center justify-center">
                                                                        <CheckCircle2 className="w-3 h-3 text-[#4ade80]" />
                                                                    </div>
                                                                    2:00 PM
                                                                </div>
                                                                <div className="bg-[#22262b] text-white/40 text-center py-4 rounded-xl text-sm border border-white/5">
                                                                    2:30 PM
                                                                </div>
                                                                <div className="bg-[#22262b] text-white/40 text-center py-4 rounded-xl text-sm border border-white/5">
                                                                    3:00 PM
                                                                </div>
                                                                <div className="bg-[#22262b] text-white/40 text-center py-4 rounded-xl text-sm border border-white/5">
                                                                    3:30 PM
                                                                </div>
                                                            </div>

                                                            <button className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                                                                <Calendar className="w-4 h-4" />
                                                                Confirm Booking
                                                                <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse ml-2" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#111316] rounded-3xl p-6 border border-white/10 relative overflow-hidden">
                                                            {/* Top Green Bar */}
                                                            <div className="absolute top-0 left-0 right-0 h-1 bg-[#4ade80]" />

                                                            <div className="flex items-center gap-4 mb-6 mt-2">
                                                                <div className="w-12 h-12 rounded-full bg-[#1a2e22] flex items-center justify-center">
                                                                    <CheckCircle2 className="w-6 h-6 text-[#4ade80]" />
                                                                </div>
                                                                <div>
                                                                    <h3 className="text-xl font-bold text-white leading-tight">Booking Confirmed</h3>
                                                                    <p className="text-white/40 text-xs">Check your email for details</p>
                                                                </div>
                                                            </div>

                                                            <div className="bg-[#1a1d21] rounded-2xl p-4 border border-white/5 space-y-4">
                                                                <div>
                                                                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-1">EVENT</p>
                                                                    <p className="text-white font-bold text-sm">Strategy Session: Scale AI</p>
                                                                </div>

                                                                <div className="flex items-start gap-3">
                                                                    <Calendar className="w-4 h-4 text-[#4ade80] mt-0.5" />
                                                                    <div>
                                                                        <p className="text-white text-xs font-medium">Wednesday, October 24th</p>
                                                                        <p className="text-white/40 text-[10px]">2:00 PM - 2:30 PM EST</p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-start gap-3">
                                                                    <Video className="w-4 h-4 text-[#4ade80] mt-0.5" />
                                                                    <div>
                                                                        <p className="text-white text-xs font-medium">Google Meet</p>
                                                                        <p className="text-blue-400 text-[10px] underline">meet.google.com/abc-xyz</p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-start gap-3">
                                                                    <FileText className="w-4 h-4 text-[#4ade80] mt-0.5" />
                                                                    <div>
                                                                        <p className="text-white text-xs font-medium">Agenda</p>
                                                                        <p className="text-white/40 text-[10px]">Lead Flow Analysis & Automation Demo</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            )}

                                            {/* STEP 2: ALERT (Slack Style) */}
                                            {demoStep === 2 && (
                                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col justify-center px-2">
                                                    <div className="bg-[#1a1d21] rounded-lg overflow-hidden shadow-2xl relative border border-white/10">
                                                        <div className="bg-[#2d3339] px-4 py-3 flex items-center justify-between border-b border-white/5">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-white/70 font-bold text-sm"># closed-deals</span>
                                                            </div>
                                                            <Bell className="w-4 h-4 text-white/50" />
                                                        </div>

                                                        <div className="p-5 bg-[#111316]">
                                                            <div className="flex gap-3">
                                                                <div className="w-9 h-9 rounded bg-[#4ade80] flex items-center justify-center text-black shrink-0 mt-1">
                                                                    <Bot className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-white font-bold text-sm">Lumoscale Bot</span>
                                                                        <span className="bg-white/10 text-white/60 text-[10px] px-1 rounded uppercase font-bold">APP</span>
                                                                        <span className="text-white/30 text-xs">10:48 AM</span>
                                                                    </div>

                                                                    <div className="mt-1 text-white/90 text-sm">
                                                                        <p className="font-bold mb-1">🔥 NEW DEMO BOOKED!</p>
                                                                        <p className="text-white/70">A high-value lead just booked a time slot.</p>
                                                                    </div>

                                                                    <div className="mt-3 pl-3 border-l-2 border-[#4ade80] bg-[#4ade80]/10 p-3 rounded-r-lg">
                                                                        <div className="grid grid-cols-2 gap-y-2 text-xs">
                                                                            <div><span className="text-white/40 block text-[10px] uppercase">Name</span> <span className="font-bold text-white">Mike Chen</span></div>
                                                                            <div><span className="text-white/40 block text-[10px] uppercase">Value</span> <span className="font-bold text-[#4ade80]">$5k - $10k</span></div>
                                                                            <div className="col-span-2"><span className="text-white/40 block text-[10px] uppercase">Context</span> <span className="text-white/80 italic">"Losing revenue, VA is too slow..."</span></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 3: BRIEF */}
                                            {demoStep === 3 && (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-center px-4">
                                                    <div className="bg-[#0f1115] rounded-3xl p-6 shadow-2xl relative border border-white/10 h-full max-h-[600px] overflow-hidden">
                                                        {/* Header */}
                                                        <div className="flex items-center gap-4 mb-6">
                                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                                                                <FileText className="w-6 h-6 text-black" />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-white font-bold text-lg leading-none mb-1">Pre-Call Brief</h4>
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                                                                    <span className="text-white/40 text-xs">System Active</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Main Card */}
                                                        <div className="bg-[#16191d] rounded-2xl p-5 border border-white/5 relative overflow-hidden">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <div className="flex items-center gap-2">
                                                                    <FileText className="w-3 h-3 text-[#4ade80]" />
                                                                    <span className="text-[#4ade80] text-xs font-bold tracking-widest uppercase">Pre-Call Brief</span>
                                                                </div>
                                                                <span className="text-[10px] text-white/20 font-mono">DELIVERED 1HR BEFORE CALL</span>
                                                            </div>

                                                            {/* Core Problem */}
                                                            <div className="bg-[#1f2329] rounded-xl p-3 mb-3 border border-white/5">
                                                                <span className="text-[#4ade80]/60 text-[10px] font-bold uppercase tracking-wider block mb-1">Core Problem</span>
                                                                <p className="text-white text-sm font-medium leading-relaxed">
                                                                    Manual follow-up is broken. Drowning in 100+ unread leads/week.
                                                                </p>
                                                            </div>

                                                            {/* Grid: Urgency & Style */}
                                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                                <div className="bg-[#1f2329] rounded-xl p-3 border border-white/5">
                                                                    <span className="text-[#4ade80]/60 text-[10px] font-bold uppercase tracking-wider block mb-1">Urgency Level</span>
                                                                    <p className="text-[#f87171] text-xs font-bold">HIGH - Ready to act</p>
                                                                </div>
                                                                <div className="bg-[#1f2329] rounded-xl p-3 border border-white/5">
                                                                    <span className="text-[#4ade80]/60 text-[10px] font-bold uppercase tracking-wider block mb-1">Comm Style</span>
                                                                    <p className="text-white text-xs font-bold">Direct, Frustrated</p>
                                                                </div>
                                                            </div>

                                                            {/* Opening Approach */}
                                                            <div className="bg-[#1f2329] rounded-xl p-3 mb-3 border border-white/5">
                                                                <span className="text-[#4ade80]/60 text-[10px] font-bold uppercase tracking-wider block mb-1">Opening Approach</span>
                                                                <p className="text-white/80 text-xs italic">
                                                                    "I can see you're leaving money on the table. Let's fix that today."
                                                                </p>
                                                            </div>

                                                            {/* What They Need */}
                                                            <div className="bg-[#1f2329] rounded-xl p-3 border border-white/5 mb-4">
                                                                <span className="text-[#4ade80]/60 text-[10px] font-bold uppercase tracking-wider block mb-1">What They Need</span>
                                                                <p className="text-white text-xs font-bold">
                                                                    Automation that feels human + Immediate ROI
                                                                </p>
                                                            </div>

                                                            {/* Footer */}
                                                            <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                                                                <div className="text-[10px] text-white/50">
                                                                    <span className="text-white font-bold">Why this matters:</span> Know exactly how to close.
                                                                </div>
                                                                <span className="bg-[#4ade80] text-black text-[10px] font-bold px-2 py-1 rounded">
                                                                    +50% Close Rate
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Restart Indicator */}
                                                        <div className="mt-4 flex items-center justify-center gap-2 text-[#4ade80] opacity-80">
                                                            <div className="w-5 h-5 rounded-full border border-[#4ade80] flex items-center justify-center">
                                                                <CheckCircle2 className="w-3 h-3" />
                                                            </div>
                                                            <span className="text-sm font-bold">Brief Sent to You</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: CHECKPOINTS */}
                        <div className="flex flex-col justify-center h-full pl-0 lg:pl-12">
                            <div className="space-y-4">
                                {checkpoints.map((checkpoint, i) => {
                                    // SIMPLE LOGIC: Highlight the "activeCheckpoint" state
                                    const active = i === activeCheckpoint;
                                    // Also show completed state? 
                                    const completed = i < activeCheckpoint;

                                    return (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                scale: active ? 1.05 : 1,
                                                borderColor: active ? "#ffffff" : "rgba(255,255,255, 0.1)",
                                                backgroundColor: active ? "rgba(255,255,255, 0.1)" : "rgba(255,255,255, 0.02)",
                                                opacity: active ? 1 : (completed ? 0.5 : 0.3),
                                                x: active ? 20 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center gap-5 p-4 rounded-2xl border backdrop-blur-sm"
                                        >
                                            <div className="relative">
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" :
                                                    completed ? "bg-green-500 text-black" :
                                                        "bg-white/5 text-white/20 border border-white/5"
                                                    }`}>
                                                    {completed ? <CheckCircle2 className="w-6 h-6" /> : <checkpoint.icon className="w-6 h-6" />}
                                                </div>
                                                {/* Connecting Line */}
                                                {i < checkpoints.length - 1 && (
                                                    <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-8 ${completed ? "bg-green-500/30" : "bg-white/5"
                                                        }`} />
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <h4 className={`text-lg font-bold transition-colors duration-300 ${active ? "text-white" : "text-white/40"}`}>
                                                    {checkpoint.text}
                                                </h4>
                                                <p className={`text-sm transition-colors duration-300 ${active ? "text-blue-200" : "text-white/20"}`}>{checkpoint.sub}</p>
                                            </div>

                                            {active && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* RESTORED RESULT CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center w-full"
                    >
                        <div className="relative p-1 rounded-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full max-w-3xl">
                            <div className="relative bg-card/80 backdrop-blur-xl border border-white/10 p-8 rounded-[22px] text-center shadow-2xl">
                                <div className="flex justify-center mb-4">
                                    <div className="p-4 bg-white rounded-full border border-white/50 shadow-lg shadow-white/20">
                                        <TrendingUp className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                                    Result: You Wake Up to Booked Consultations
                                </h3>
                                <p className="text-slate-400 text-lg">
                                    All this happened while you were asleep. <br className="hidden md:block" />
                                    <span className="text-white font-medium">Zero manual work. Zero missed leads.</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DMDemo;