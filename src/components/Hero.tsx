import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { User, Phone, Calendar, CheckCircle } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────── */
function useCounter(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

/* ─────────────────────────────────────────
   Live Call Demo Card
───────────────────────────────────────── */
const callStages = [
  { label: "Incoming Call", sublabel: "Lead from Google Ad", status: "ringing" },
  { label: "AI Answering", sublabel: "Within 60 seconds", status: "answering" },
  { label: "Qualifying Lead", sublabel: "Budget · Timeline · Need", status: "qualifying" },
  { label: "Appointment Booked", sublabel: "Tomorrow, 10:00 AM ✓", status: "booked" },
];

const transcripts = [
  "Hi! I'm calling about your enquiry",
  "Can I ask a few quick questions?",
  "What's your budget looking like?",
  "Perfect, let me book that for you.",
];

function LiveCallCard() {
  const [stage, setStage] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [timer, setTimer] = useState(0);

  // Advance stage every 3s
  useEffect(() => {
    const iv = setInterval(() => {
      setStage(prev => (prev + 1) % callStages.length);
      setCharIndex(0);
      setTranscript("");
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  // Call timer
  useEffect(() => {
    const iv = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  // Typewriter for transcript
  useEffect(() => {
    const full = transcripts[stage];
    if (charIndex < full.length) {
      const t = setTimeout(() => {
        setTranscript(full.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 40);
      return () => clearTimeout(t);
    }
  }, [charIndex, stage]);

  const mins = String(Math.floor(timer / 60)).padStart(2, "0");
  const secs = String(timer % 60).padStart(2, "0");
  const current = callStages[stage];
  const isBooked = current.status === "booked";

  return (
    <div className="relative w-full max-w-[380px] mx-auto group">
      {/* Flat black premium card */}
      <div className="relative z-10 bg-[#050505] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isBooked ? "bg-emerald-400 animate-ping" : "bg-blue-400 animate-ping"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isBooked ? "bg-emerald-500" : "bg-blue-500"}`} />
            </span>
            <span className={`text-xs font-bold tracking-widest uppercase ${isBooked ? "text-emerald-400" : "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"}`}>
              {isBooked ? "Booked" : "Live Call"}
            </span>
          </div>
          <span className="font-mono text-xs text-blue-200/60 tabular-nums">{mins}:{secs}</span>
        </div>

        {/* Avatar + rings */}
        <div className="flex flex-col items-center pt-8 pb-4 px-8">
          <div className="relative mb-6">
            <div className={`relative w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden transition-all duration-500 ${isBooked ? "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-emerald-500/5" : "border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-blue-500/5"}`}>
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                alt="AI Voice Agent"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            {isBooked && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#050812] shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Stage indicator */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-5"
            >
              <p className={`text-base font-bold mb-0.5 ${isBooked ? "text-emerald-400" : "text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200"}`}>
                {current.label}
              </p>
              <p className="text-xs text-blue-200/50">{current.sublabel}</p>
            </motion.div>
          </AnimatePresence>

          {/* Waveform / booked state */}
          {isBooked ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 mb-5"
            >
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-300">Appointment Confirmed</p>
                <p className="text-[10px] text-emerald-200/60">Added to Google Calendar automatically</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-[4px] h-10 mb-5 w-32 mx-auto">
              {/* Top thinner spike */}
              <motion.div
                className="h-[2px] bg-white/40 rounded-full w-full origin-center"
                animate={{ scaleX: [0.3, 0.8, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              {/* Center main spike */}
              <motion.div
                className="h-[3px] bg-blue-400 rounded-full w-full origin-center"
                animate={{ scaleX: [0.2, 1.2, 0.2] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              {/* Bottom thinner spike */}
              <motion.div
                className="h-[2px] bg-white/40 rounded-full w-full origin-center"
                animate={{ scaleX: [0.4, 0.9, 0.4] }}
                transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </div>
          )}

          {/* Transcript ticker */}
          {!isBooked && (
            <div className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 mb-5 min-h-[44px] flex items-center">
              <p className="text-xs text-blue-100/80 italic leading-relaxed">
                "{transcript}
                <span className="inline-block w-0.5 h-3 bg-blue-400 ml-0.5 align-middle animate-pulse" />
                "
              </p>
            </div>
          )}

          {/* Stage progress dots */}
          <div className="flex gap-2">
            {callStages.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === stage ? "w-6 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : i < stage ? "w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : "w-2 bg-blue-900/30"}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom label */}
        <div className="px-6 py-4 border-t border-white/5 bg-white/[0.015] text-center">
          <p className="text-[11px] text-zinc-500 tracking-wide">
            Powered by <span className="text-zinc-400 font-semibold">Lumoscale Voice Intelligence</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Stat Card
───────────────────────────────────────── */
function StatCard({ value, suffix, label, delay, inView }: { value: number; suffix: string; label: string; delay: number; inView: boolean }) {
  const count = useCounter(value, 1600, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-start"
    >
      <span className="text-3xl md:text-4xl font-bold text-white tracking-tight tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-xs text-zinc-500 mt-0.5 leading-tight">{label}</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Hero
───────────────────────────────────────── */

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-black"
      >
        {/* ── Background effects ── */}
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* ── Content ── */}
        <div className="container mx-auto px-6 pt-32 pb-32 lg:pb-40 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 relative z-10 items-center max-w-7xl min-h-[calc(100vh-100px)]">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-8">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 w-fit px-4 py-1.5 rounded-full border border-blue-900/50 bg-blue-950/20 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
                Voice Intelligence System · Done For You
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-6xl lg:text-[4.5rem] xl:text-[4.75rem] font-bold tracking-tight leading-[1.08]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <span className="text-white block mb-1">Every Missed Call, </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600 block">
                  Lost Revenue.
                </span>
              </h1>
            </motion.div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl md:text-2xl lg:text-[1.75rem] text-zinc-300 font-light max-w-3xl leading-snug mt-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="whitespace-nowrap">
                <span className="text-white font-medium">We build it. We run it.</span>{" "}
                You just take the{" "}
                <span className="relative inline-block text-white font-semibold">
                  appointments.
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-400 to-emerald-400" />
                </span>
              </span>
            </motion.p>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="text-base md:text-[17px] text-zinc-400 max-w-2xl leading-relaxed border-l-2 border-zinc-800 pl-5 mt-4"
            >
              Custom-built around your exact process - contacting every inbound lead within 60 seconds, 24/7, even after hours. Optimized weekly using real call data so your booked appointments grow month after month.
            </motion.p>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center gap-10 pt-2"
            >
              <StatCard value={60} suffix="s" label="Response time" delay={0} inView={statsInView} />
              <div className="w-px h-10 bg-white/10" />
              <StatCard value={24} suffix="/7" label="Always on" delay={0.1} inView={statsInView} />
              <div className="w-px h-10 bg-white/10" />
              <StatCard value={30} suffix="%" label="More bookings guaranteed" delay={0.2} inView={statsInView} />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 pt-1"
            >
              <div className="relative group w-fit mt-4">
                <Button
                  className="relative h-14 px-8 text-base font-bold rounded-full bg-white text-black hover:text-white shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                  onClick={() => window.open("https://cal.com/lumoscale/30min", "_blank")}
                >
                  {/* Hover gradient background matching headline */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    Book a Strategy Call
                    <User className="w-4 h-4 group-hover:text-white text-blue-600 transition-colors duration-300" />
                  </span>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <LiveCallCard />
          </motion.div>

        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>
    </>
  );
};

export default Hero;
