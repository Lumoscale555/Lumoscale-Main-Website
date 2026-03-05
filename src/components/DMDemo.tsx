import { CheckCircle2, MessageCircle, Bell, Calendar, FileText, TrendingUp, Zap, Bot, Loader2, Video, Clock, MapPin, ArrowRight, ExternalLink, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration for avatars
const AVATARS = {
  user: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces&q=80",
  ai: "bot"
};

const messages = [
  { sender: "lead", text: "Hey, I saw your case study. I have 100+ leads sitting in my DMs right now and I can't get to them.", delay: 0 },
  { sender: "ai", text: "That's a good problem, but expensive if they go cold. Are you manually replying to all of them yourself?", delay: 2000 },
  { sender: "lead", text: "My VA tries, but she's too slow and misses the qualified ones. I'm definitely losing revenue.", delay: 4500 },
  { sender: "ai", text: "Speed is everything. We build AI setters that reply in seconds, qualify the budget, and book calls directly into your calendar. No human needed.", delay: 7000 },
  { sender: "lead", text: "I'm interested, but I don't want it to sound like a generic bot. My brand is premium.", delay: 9500 },
  { sender: "ai", text: "Understood. We train the model on *your* specific tone and past successful chats. It feels 100% human. Want to see a live demo of how it handles objections?", delay: 12000 },
  { sender: "lead", text: "Yeah, let's see it.", delay: 14000 },
  { sender: "ai", text: "Awesome. Here's the link to the private demo: https://cal.com/agency/demo. Let's get those 100 leads converted. 🚀", delay: 15500 }
];

const checkpoints = [
  { text: "Responds Instantly", sub: "Speed to Lead", icon: Zap },
  { text: "Identifies Bottleneck", sub: "Manual VA Process", icon: TrendingUp },
  { text: "Agitates Pain", sub: "Lost Revenue", icon: Bell },
  { text: "Pitches Solution", sub: "24/7 AI Setter", icon: Bot },
  { text: "Handles Objection", sub: "Tone Matching", icon: CheckCircle2 },
  { text: "Closes the Call", sub: "Calendar Sync", icon: Calendar }
];

const DMDemo = () => {
  const [activeTab, setActiveTab] = useState("dm");
  const [visibleMessages, setVisibleMessages] = useState(0);

  const [bookingState, setBookingState] = useState({ sent: false, booked: false, when: null });
  const [slackFired, setSlackFired] = useState(false);
  const [briefReady, setBriefReady] = useState(false);

  const timerRef = useRef<number | null>(null);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const dmScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.4 }
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

  useEffect(() => {
    clearTimers();
    setVisibleMessages(0);
    setBookingState({ sent: false, booked: false, when: null });
    setSlackFired(false);
    setBriefReady(false);

    if (!inView) return;

    if (activeTab === "dm") playDMSequence();
    if (activeTab === "booking") playBookingSequence();
    if (activeTab === "slack") playSlackSequence();
    if (activeTab === "brief") playBriefSequence();

    return () => clearTimers();
  }, [activeTab, inView]);

  useEffect(() => {
    if (activeTab !== "dm") return;
    const container = dmScrollRef.current;
    if (container) {
        requestAnimationFrame(() => {
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        });
    }
  }, [visibleMessages, activeTab]);

  const playDMSequence = () => {
    const step = (index = 0) => {
      if (index > messages.length) return;
      setVisibleMessages(index);
      const delay = messages[index]?.delay
        ? messages[index].delay - (messages[index - 1]?.delay || 0)
        : 1000;
      timerRef.current = window.setTimeout(() => {
        if (index + 1 <= messages.length) step(index + 1);
      }, Math.max(300, delay));
    };
    step(1);
  };

  const playBookingSequence = () => {
    timerRef.current = window.setTimeout(() => {
      setBookingState((s) => ({ ...s, sent: true }));
      timerRef.current = window.setTimeout(() => {
        const time = new Date();
        time.setDate(time.getDate() + 1);
        time.setHours(14, 0, 0, 0);
        setBookingState({ sent: true, booked: true, when: time });
      }, 1500);
    }, 800);
  };

  const playSlackSequence = () => {
    timerRef.current = window.setTimeout(() => { setSlackFired(true); }, 1200);
  };

  const playBriefSequence = () => {
    timerRef.current = window.setTimeout(() => { setBriefReady(true); }, 900);
  };

  const handleManualBook = () => {
    const time = new Date();
    time.setDate(time.getDate() + 1);
    time.setHours(14, 0, 0, 0);
    setBookingState({ sent: true, booked: true, when: time });
    timerRef.current = window.setTimeout(() => setSlackFired(true), 600);
    timerRef.current = window.setTimeout(() => setBriefReady(true), 1200);
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent">
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

            <h2 className="text-4xl md:text-5xl font-bold gradient-text shimmer mb-6">
              Watch a Real Conversation Unfold
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how our AI handles lead overflow, qualifies prospects, and books sales calls on autopilot.
            </p>
          </motion.div>

          {/* TABS */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: "dm", label: "Instagram DM", icon: MessageCircle },
              { id: "booking", label: "Booking", icon: Calendar },
              { id: "slack", label: "Team Alert", icon: Bell },
              { id: "brief", label: "Pre-Call Brief", icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-secondary text-black shadow-[0_8px_30px_hsl(var(--primary)/0.3)] ring-2 ring-primary/20 scale-105"
                    : "bg-card border border-primary/20 text-foreground hover:bg-card/80 hover:border-primary/40 hover:scale-105"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-2 gap-12 items-center justify-center mb-24">

            {/* ============================================
                LEFT SIDE: FLOATING CARD
                ============================================ */}
            <div className="relative flex justify-center lg:justify-end">
              
              {/* Performance Optimized Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] bg-primary/15 blur-[80px] rounded-full pointer-events-none" />

              {/* CARD CONTAINER */}
              <div className="relative z-10 w-full max-w-[450px]">
                <div className="bg-card/95 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6 shadow-2xl ring-1 ring-white/10">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black shadow-lg">
                                {activeTab === "dm" && <MessageCircle className="w-5 h-5" />}
                                {activeTab === "booking" && <Calendar className="w-5 h-5" />}
                                {activeTab === "slack" && <Bell className="w-5 h-5" />}
                                {activeTab === "brief" && <FileText className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="font-bold text-sm">
                                    {activeTab === "dm" && "Instagram DM"}
                                    {activeTab === "booking" && "Calendar Booking"}
                                    {activeTab === "slack" && "Slack Team Alert"}
                                    {activeTab === "brief" && "Pre-Call Brief"}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <p className="text-[10px] text-muted-foreground font-medium">System Active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT WINDOW */}
                    <div className="h-[500px] overflow-hidden relative">
                        
                        {/* 1. DM VIEW */}
                        {activeTab === "dm" && (
                            <div ref={dmScrollRef} className="space-y-4 h-full overflow-y-auto pr-2 scrollbar-hide">
                                <AnimatePresence initial={false}>
                                    {messages.slice(0, visibleMessages).map((msg, i) => {
                                        const isLead = msg.sender === "lead";
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className={`flex items-end gap-3 ${isLead ? "justify-end" : "justify-start"}`}
                                            >
                                                {!isLead && <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mb-1 flex-shrink-0"><Bot className="w-4 h-4 text-primary" /></div>}
                                                <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm border text-xs leading-relaxed ${
                                                    isLead ? "bg-gradient-to-r from-primary/90 to-secondary/90 text-black rounded-tr-none border-transparent" : "bg-muted/50 backdrop-blur-sm border-white/5 text-foreground rounded-tl-none"
                                                }`}>
                                                    <p>{msg.text}</p>
                                                </div>
                                                {isLead && <img src={AVATARS.user} alt="User" className="w-7 h-7 rounded-full object-cover border border-primary/30 mb-1 flex-shrink-0" />}
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                                {visibleMessages < messages.length && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-muted-foreground text-xs ml-11">
                                        <Loader2 className="w-3 h-3 animate-spin" /> AI is thinking...
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* 2. BOOKING VIEW (UPDATED: Calendar -> Success Ticket) */}
                        {activeTab === "booking" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col pt-2">
                                
                                {!bookingState.booked ? (
                                    <>
                                        {/* CALENDAR PICKER STATE */}
                                        <div className="flex-1 bg-white text-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 flex flex-col">
                                            <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">A</div>
                                                    <div>
                                                        <p className="text-[10px] text-gray-500 font-bold uppercase">Agency Demo</p>
                                                        <p className="text-sm font-bold">Strategy Session</p>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-400 font-medium">30 Min</div>
                                            </div>

                                            <div className="p-4 flex-1 flex flex-col justify-center">
                                                <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                                                    {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-[10px] text-gray-400">{d}</span>)}
                                                    {Array.from({length: 21}).map((_, i) => (
                                                        <div key={i} className={`h-8 w-8 flex items-center justify-center rounded-full text-xs ${i === 15 ? 'bg-black text-white font-bold' : 'text-gray-400'}`}>
                                                            {i + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                                    <div className="border border-blue-600 bg-blue-50 text-blue-700 font-bold text-center py-2 rounded-md text-xs cursor-pointer shadow-sm">
                                                        2:00 PM
                                                    </div>
                                                    <div className="border border-gray-200 text-gray-300 text-center py-2 rounded-md text-xs cursor-not-allowed">
                                                        2:30 PM
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={handleManualBook} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                            Confirm Booking
                                        </button>
                                    </>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full flex flex-col items-center pt-2"
                                    >
                                        {/* SUCCESS TICKET CARD */}
                                        <div className="w-full bg-card border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl">
                                            
                                            {/* Top Color Bar */}
                                            <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-600 w-full" />
                                            
                                            <div className="p-6">
                                                {/* Success Header */}
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white">Booking Confirmed</h3>
                                                        <p className="text-xs text-slate-400">Check your email for details</p>
                                                    </div>
                                                </div>

                                                {/* Event Details Card */}
                                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-4">
                                                    <div>
                                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Event</p>
                                                        <p className="text-sm font-bold text-white">Strategy Session: Scale AI</p>
                                                    </div>

                                                    <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                                                        <Calendar className="w-4 h-4 text-primary mt-0.5" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-200">Wednesday, October 24th</p>
                                                            <p className="text-[10px] text-slate-400">2:00 PM - 2:30 PM EST</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3">
                                                        <Video className="w-4 h-4 text-primary mt-0.5" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-200">Google Meet</p>
                                                            <p className="text-[10px] text-blue-400 underline cursor-pointer">meet.google.com/abc-xyz</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-start gap-3">
                                                        <FileText className="w-4 h-4 text-primary mt-0.5" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-200">Agenda</p>
                                                            <p className="text-[10px] text-slate-400">Lead Flow Analysis & Automation Demo</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom Actions */}
                                            <div className="bg-black/20 p-4 border-t border-white/5 flex gap-2">
                                                <button className="flex-1 py-2.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
                                                    Add to Google Cal
                                                </button>
                                                <button className="flex-1 py-2.5 rounded-lg border border-white/20 text-white text-xs font-bold hover:bg-white/10 transition-colors">
                                                    Add to Outlook
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-[10px] text-slate-500 mt-4">
                                            A confirmation email has been sent to mike@coaching.com
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                        
                        {/* 3. SLACK VIEW (Exact Slack UI) */}
                         {activeTab === "slack" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col pt-2">
                                <div className="bg-[#1A1D21] rounded-2xl border border-gray-700 shadow-xl overflow-hidden flex-1 flex flex-col">
                                     {/* Slack Sidebar Fake */}
                                     <div className="flex h-full">
                                         <div className="w-14 bg-[#121417] border-r border-gray-800 flex flex-col items-center py-4 gap-4 hidden sm:flex">
                                             <div className="w-8 h-8 rounded-lg bg-white/10" />
                                             <div className="w-8 h-8 rounded-lg bg-white/5" />
                                         </div>
                                         <div className="flex-1 flex flex-col">
                                             {/* Slack Header */}
                                             <div className="h-12 border-b border-gray-700 flex items-center px-4 justify-between bg-[#1A1D21]">
                                                 <div className="font-bold text-white text-xs"># high-value-leads</div>
                                                 <div className="text-gray-500 text-[10px]">ℹ️</div>
                                             </div>
                                             {/* Slack Message Area */}
                                             <div className="p-5">
                                                <div className="flex gap-3">
                                                    <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-[10px] mt-1">APP</div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-white text-xs">LeadBot</span>
                                                            <span className="bg-gray-700 text-gray-300 text-[9px] px-1 rounded">APP</span>
                                                            <span className="text-gray-500 text-[10px]">10:42 AM</span>
                                                        </div>
                                                        <div className="text-gray-300 text-xs mt-1">
                                                            🚀 <span className="font-bold text-white">New Strategy Call Booked</span>
                                                        </div>
                                                        <div className="mt-3 pl-3 border-l-4 border-green-500 space-y-2">
                                                            <p className="text-[10px] text-gray-400 uppercase font-bold">Prospect</p>
                                                            <p className="text-xs text-white">Mike (Coach) • <span className="text-blue-400">@mike_coaching</span></p>
                                                            
                                                            <p className="text-[10px] text-gray-400 uppercase font-bold mt-2">Identified Pain</p>
                                                            <p className="text-xs text-white">"Losing 100+ leads/week due to slow replies."</p>

                                                            <div className="flex gap-2 mt-2">
                                                                <span className="bg-[#222529] border border-gray-700 text-green-400 text-[9px] px-2 py-0.5 rounded">High Intent</span>
                                                                <span className="bg-[#222529] border border-gray-700 text-yellow-400 text-[9px] px-2 py-0.5 rounded"> Urgent</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                             </div>
                                         </div>
                                     </div>
                                </div>
                                {!slackFired ? (
                                    <button onClick={() => setSlackFired(true)} className="w-full mt-4 py-3 rounded-xl bg-[#1A1D21] border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                                        <Bell className="w-4 h-4" /> Trigger Alert
                                    </button>
                                ) : (
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4 bg-green-500/10 border border-green-500/30 p-3 rounded-xl flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        <span className="font-bold text-green-500">Posted to Slack</span>
                                    </motion.div>
                                )}
                            </motion.div>
                         )}

                         {/* 4. PRE-CALL BRIEF VIEW (Exact Structure Requested) */}
                         {activeTab === "brief" && (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col pt-2">
                                <div className="bg-emerald-950/20 rounded-2xl p-5 border border-emerald-500/20 flex-1 flex flex-col justify-between">
                                    
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-emerald-400">
                                            <FileText className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Pre-Call Brief</span>
                                        </div>
                                        <span className="text-[9px] text-emerald-500/60 font-mono">DELIVERED 1HR BEFORE CALL</span>
                                    </div>

                                    <div className="space-y-3">
                                        
                                        {/* Core Problem */}
                                        <div className="p-3 bg-background/40 rounded-xl border border-white/5">
                                            <div className="text-emerald-500/80 text-[9px] uppercase font-bold mb-1">Core Problem</div>
                                            <div className="text-xs font-medium text-white">Manual follow-up is broken. Drowning in 100+ unread leads/week.</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            {/* Urgency */}
                                            <div className="p-3 bg-background/40 rounded-xl border border-white/5">
                                                <div className="text-emerald-500/80 text-[9px] uppercase font-bold mb-1">Urgency Level</div>
                                                <div className="text-xs font-bold text-red-400">HIGH - Ready to act</div>
                                            </div>
                                            {/* Style */}
                                            <div className="p-3 bg-background/40 rounded-xl border border-white/5">
                                                <div className="text-emerald-500/80 text-[9px] uppercase font-bold mb-1">Comm Style</div>
                                                <div className="text-xs font-medium text-white">Direct, Frustrated</div>
                                            </div>
                                        </div>

                                        {/* Opening Approach */}
                                        <div className="p-3 bg-background/40 rounded-xl border border-white/5">
                                            <div className="text-emerald-500/80 text-[9px] uppercase font-bold mb-1">Opening Approach</div>
                                            <div className="text-xs text-slate-300 italic">"I can see you're leaving money on the table. Let's fix that today."</div>
                                        </div>

                                        {/* What They Need */}
                                        <div className="p-3 bg-background/40 rounded-xl border border-white/5">
                                            <div className="text-emerald-500/80 text-[9px] uppercase font-bold mb-1">What They Need</div>
                                            <div className="text-xs font-medium text-white">Automation that feels human + Immediate ROI</div>
                                        </div>
                                    </div>
                                    
                                    {/* Footer */}
                                    <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                                        <p className="text-[10px] text-slate-400">
                                            <span className="font-bold text-white">Why this matters:</span> Know exactly how to close.
                                        </p>
                                        <div className="bg-emerald-500 text-black text-[9px] font-bold px-2 py-0.5 rounded">
                                            +50% Close Rate
                                        </div>
                                    </div>
                                </div>

                                {!briefReady ? (
                                    <button onClick={() => setBriefReady(true)} className="w-full mt-4 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                                        Generate Brief
                                    </button>
                                ) : (
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        <span className="font-bold text-emerald-500">Brief Sent to You</span>
                                    </motion.div>
                                )}
                             </motion.div>
                         )}
                    </div>
                </div>
              </div>
            </div>

            {/* ============================================
                RIGHT SIDE: ANIMATED SYSTEM STEPS
                ============================================ */}
            <div className="flex flex-col justify-center h-full pl-0 lg:pl-12">
              <div className="space-y-4">
                {checkpoints.map((checkpoint, i) => {
                    const progressIndex = Math.min(
                        Math.floor((visibleMessages - 1) / (messages.length / checkpoints.length)),
                        checkpoints.length
                    );
                    const active = activeTab === "dm" ? i < progressIndex : false;
                    const isNext = activeTab === "dm" ? i === progressIndex : false;

                    return (
                    <motion.div
                        key={i}
                        animate={{ 
                            scale: active ? 1.02 : 1,
                            borderColor: active ? "rgba(var(--primary), 0.5)" : "rgba(255,255,255, 0.05)",
                            backgroundColor: active ? "rgba(var(--primary), 0.05)" : "rgba(255,255,255, 0.02)",
                            opacity: active || isNext ? 1 : 0.5,
                            x: active ? 10 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-5 p-4 rounded-2xl border backdrop-blur-sm"
                    >
                        <div className="relative">
                            <motion.div 
                                animate={{ scale: active ? [1, 1.1, 1] : 1 }}
                                transition={{ repeat: active ? Infinity : 0, duration: 2 }}
                                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${
                                active ? "bg-gradient-to-br from-primary to-secondary text-black shadow-lg shadow-primary/25" : "bg-muted text-muted-foreground"
                                }`}
                            >
                                <checkpoint.icon className="w-6 h-6" />
                            </motion.div>
                            {active && <div className="absolute inset-0 rounded-full bg-primary blur-lg opacity-40 -z-10" />}
                        </div>

                        <div className="flex-1">
                            <h4 className={`text-lg font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}>
                                {checkpoint.text}
                            </h4>
                            <p className="text-sm text-muted-foreground/80">{checkpoint.sub}</p>
                        </div>

                        {active && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-500">
                                <CheckCircle2 className="w-6 h-6" />
                            </motion.div>
                        )}
                        
                        {isNext && (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary">
                                <Loader2 className="w-5 h-5 animate-spin" />
                             </motion.div>
                        )}
                    </motion.div>
                    );
                })}
              </div>
            </div>

          </div>

          {/* ============================================
              BOTTOM MIDDLE: RESULT CARD
              ============================================ */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center w-full"
          >
            <div className="relative p-1 rounded-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full max-w-3xl">
                <div className="relative bg-card/80 backdrop-blur-xl border border-white/10 p-8 rounded-[22px] text-center shadow-2xl">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 shadow-lg shadow-green-500/10">
                            <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                    Result: You Wake Up to Booked Consultations
                    </h3>
                    <p className="text-slate-400 text-lg">
                    All this happened while you were asleep. <br className="hidden md:block"/>
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