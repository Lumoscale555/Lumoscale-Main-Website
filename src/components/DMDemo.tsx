import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Calendar, Slack, FileText, Check, Mic, User, Bot, Signal, Wifi, Battery, Video, CheckCircle2, Bell } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

// Premium Phone Mockup Component with 3D Tilt and Glass Reflections
const PhoneMockup = ({ children, time = "10:24", accentColor = "emerald" }: { children: React.ReactNode, time?: string, accentColor?: "emerald" | "blue" | "purple" }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const isMobile = useIsMobile();

    useEffect(() => {
        // Disable auto-sway on mobile to prevent performance lag
        if (isMobile) {
            setRotateX(0);
            setRotateY(0);
            return;
        }

        let animationFrameId: number;
        let startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            // Gentle figure-8 sway
            setRotateX(Math.sin(elapsed * 0.001) * 3); // Slightly reduced range for phone
            setRotateY(Math.cos(elapsed * 0.0015) * 3);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isMobile]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (max 12 degrees for more dynamic feel)
        setRotateX((y - centerY) / 22);
        setRotateY((centerX - x) / 22);

    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={isMobile ? { duration: 0 } : { type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
            style={{ perspective: 1000 }}
            className="relative mx-auto w-full max-w-[450px] h-[750px] bg-gradient-to-b from-zinc-900 via-black to-zinc-900 rounded-[3.5rem] border-[6px] border-zinc-800/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),0_0_60px_-10px_rgba(99,102,241,0.15)] overflow-hidden ring-2 ring-white/5 ml-0 lg:mx-auto group/phone"
        >
            {/* Dynamic Island / Notch Area */}
            <div className="absolute top-0 inset-x-0 h-14 z-50 px-7 flex items-end justify-between pb-2 text-white">
                <span className="text-[14px] font-bold w-14">{time}</span>

                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-full flex items-center justify-center z-50 ring-1 ring-white/10 shadow-inner">
                    <div className={`w-2 h-2 rounded-full bg-zinc-950 absolute right-5 ring-1 ${accentColor === "blue" ? "ring-blue-500/20" : "ring-emerald-500/20"}`} />
                </div>

                <div className="flex items-center gap-2 w-14 justify-end">
                    <Signal className="w-4 h-4" />
                    <Wifi className="w-4 h-4" />
                    <Battery className="w-5 h-5 ml-0.5" />
                </div>
            </div>

            {/* Screen Content Wrapper */}
            <div className="absolute inset-x-[3px] inset-y-[3px] rounded-[3.2rem] overflow-hidden bg-black flex flex-col">
                <div className="absolute inset-0 pt-12 bg-black flex flex-col">
                    {children}
                </div>
            </div>

            {/* Home Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-white rounded-full z-50 opacity-30" />

            {/* Edge Highlight Lighting */}
            <div className="absolute inset-0 rounded-[3.5rem] border-2 border-white/10 z-30 pointer-events-none" />

            {/* Premium Glow Effect */}
            <div className="absolute inset-0 rounded-[3.5rem] shadow-[inset_0_0_60px_rgba(99,102,241,0.1)] z-30 pointer-events-none" />
        </motion.div>
    );
};

const TextAgentDemo = () => {
    const [step, setStep] = useState(0); // 0: Chat, 1: Booking, 2: Slack, 3: Brief
    const [visibleMessages, setVisibleMessages] = useState<any[]>([]);
    const [typingState, setTypingState] = useState<{ type: 'user' | 'ai' | null }>({ type: null });
    const [isBooked, setIsBooked] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [visibleMessages, typingState]);

    // The script provided by the user
    const script = [
        { sender: "lead", text: "Hey, I have 100+ leads sitting in my DMs right now and I can't get to them.", delay: 500 },
        { sender: "ai", text: "Oof, that's a great problem to have... but also painful if they go cold. Are you handling all those yourself or do you have someone helping?", delay: 3500 },
        { sender: "lead", text: "My VA tries, but she's too slow and misses the qualified ones. I'm definitely losing revenue.", delay: 6500 },
        { sender: "ai", text: "Yeah, I hear that a lot. Speed kills in DMs, by the time someone replies 6 hours later, the lead's already talking to 3 other people. How much time are you spending managing this daily?", delay: 10500 },
        { sender: "lead", text: "Honestly? Too much. And the VA still needs me to step in constantly.", delay: 13500 },
        { sender: "ai", text: "Makes sense. That's exactly why we built this—takes the whole thing off your plate. Replies in under a minute, sorts who's serious vs who's browsing, and only sends you people ready to buy. No VA needed.", delay: 18000 },
        { sender: "lead", text: "I'm interested, but I don't want it to sound like a generic bot. My brand is premium.", delay: 21500 },
        { sender: "ai", text: "Totally get it. That's why we don't use templates, we actually train it on your past conversations. Your tone, your style, how you handle objections. It sounds like you, not a robot. Want to see how it works with a quick demo?", delay: 26000 },
        { sender: "lead", text: "Yeah, let's see it.", delay: 29000 },
        { sender: "ai", text: "Perfect. Here's the link: https://cal.com/lumoscale/30min. We can walk through exactly how it'd handle your 100 leads and get them moving again. Sound good?", delay: 33000 },
        { sender: "lead", text: "Sounds good, booked.", delay: 36000 },
        { sender: "ai", text: "Awesome. Talk soon! 🚀", delay: 38500 }
    ];

    // Chat Sequence Controller
    useEffect(() => {
        if (step !== 0) return;

        let timeouts: NodeJS.Timeout[] = [];
        let startTime = Date.now();

        // clear previous state
        setVisibleMessages([]);
        setTypingState({ type: null });

        // Schedule messages and typing indicators
        script.forEach((msg, index) => {
            // Schedule Message Appearance
            timeouts.push(setTimeout(() => {
                setVisibleMessages(prev => [...prev, msg]);
                setTypingState({ type: null }); // Stop typing when msg appears

                // If this is the last message, schedule transition
                if (index === script.length - 1) {
                    setTimeout(() => setStep(1), 3000);
                }
            }, msg.delay));

            // Schedule Typing Indicator (1.5s before message, except first one if too fast)
            const typingStart = msg.delay - 1500;
            if (typingStart > 0) {
                timeouts.push(setTimeout(() => {
                    setTypingState({ type: msg.sender === 'lead' ? 'user' : 'ai' });
                }, typingStart));
            } else if (index === 0) {
                // Special case for first message if needed, or just let it pop
                timeouts.push(setTimeout(() => {
                    setTypingState({ type: msg.sender === 'lead' ? 'user' : 'ai' });
                }, 0));
            }
        });

        return () => timeouts.forEach(clearTimeout);
    }, [step]);

    // App Sequence (Booking -> Slack -> Brief -> Reset)
    useEffect(() => {
        if (step === 0) return;

        const stepTimers = [
            { step: 1, duration: 8000 }, // Booking (Simulated Interaction)
            { step: 2, duration: 5000 }, // Slack
            { step: 3, duration: 6000 }  // Brief
        ];

        const currentTimer = stepTimers.find(s => s.step === step);
        if (currentTimer) {
            const timer = setTimeout(() => {
                setStep(prev => (prev + 1) > 3 ? 0 : prev + 1);
            }, currentTimer.duration);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <PhoneMockup time="10:23" accentColor="blue">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-zinc-900/50 flex justify-between items-center bg-black sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    {step === 0 && (
                        <>
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-400/20">
                                    <img
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                                        alt="AI Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400 rounded-full border-2 border-black"></div>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">Lumoscale AI</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-blue-400 text-[10px] font-bold">ONLINE</span>
                                </div>
                            </div>
                        </>
                    )}
                    {step === 1 && (
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-400/10 rounded-lg"><Calendar className="w-4 h-4 text-blue-400" /></div>
                            <span className="text-white font-bold">Booking</span>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-[#4A154B]/20 rounded-lg"><Slack className="w-4 h-4 text-white" /></div>
                            <span className="text-white font-bold">Slack</span>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg"><FileText className="w-4 h-4 text-blue-400" /></div>
                            <span className="text-white font-bold">Brief</span>
                        </div>
                    )}
                </div>
                {step === 0 && (
                    <button className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors">
                        <Video className="w-4 h-4 text-zinc-400" />
                    </button>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-black relative overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">

                    {/* STEP 0: CHAT */}
                    {step === 0 && (
                        <div
                            ref={chatContainerRef}
                            className="flex-1 p-5 flex flex-col justify-start space-y-4 pb-8 overflow-y-auto no-scrollbar scroll-smooth"
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                {visibleMessages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        layout={!isMobile}
                                        className={`flex gap-2 ${msg.sender === 'lead' ? 'justify-end' : ''}`}
                                    >
                                        {msg.sender === 'ai' && (
                                            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-800 shrink-0">
                                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" className="w-full h-full object-cover" />
                                            </div>
                                        )}

                                        <div className={`${msg.sender === 'lead'
                                            ? 'bg-blue-500 text-white rounded-br-sm'
                                            : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-sm'
                                            } px-4 py-3 rounded-2xl max-w-[80%] shadow-lg`}
                                        >
                                            <p className="text-xs leading-relaxed">
                                                {/* Render links if present */}
                                                {msg.text.includes('https://') ? (
                                                    <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/(https:\/\/[^\s]+)/g, '<span class="underline decoration-black/30 font-bold">$1</span>') }} />
                                                ) : msg.text}
                                            </p>
                                        </div>

                                        {msg.sender === 'lead' && (
                                            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-700 shrink-0">
                                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150" alt="User" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Typing Indicators (Always at bottom) */}
                                {typingState.type === 'user' && (
                                    <motion.div
                                        key="typing-user"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        layout
                                        className="flex justify-end gap-2"
                                    >
                                        <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-br-sm">
                                            <div className="flex gap-1"><span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-75" /><span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150" /></div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-700 shrink-0">
                                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150" alt="User" className="w-full h-full object-cover" />
                                        </div>
                                    </motion.div>
                                )}

                                {typingState.type === 'ai' && (
                                    <motion.div
                                        key="typing-ai"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        layout
                                        className="flex flex-col gap-1"
                                    >
                                        <div className="flex gap-2 items-center">
                                            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-800 shrink-0">
                                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="bg-zinc-900 px-4 py-3 rounded-2xl rounded-bl-sm border border-zinc-800">
                                                <div className="flex gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75" /><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150" /></div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-zinc-500 font-medium ml-11">AI is generating response...</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* STEP 1: BOOKING */}
                    {step === 1 && (
                        <motion.div
                            key="booking"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="h-full flex flex-col justify-center px-4"
                        >
                            <AnimatePresence mode="wait">
                                {!isBooked ? (
                                    <motion.div
                                        key="selection"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-[#1a1d21] rounded-3xl p-6 shadow-xl relative overflow-hidden border border-white/5"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h5 className="font-bold text-white text-base">Select a Time</h5>
                                            <div className="bg-[#2d3339] text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white/10">30 min</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <div className="bg-blue-500 text-white font-bold text-center py-4 rounded-xl text-xs shadow-lg transform scale-105 relative ring-2 ring-white/10">
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full border-2 border-blue-500 flex items-center justify-center">
                                                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                                </div>
                                                2:00 PM
                                            </div>
                                            <div className="bg-[#22262b] text-white/40 text-center py-4 rounded-xl text-xs border border-white/5">
                                                2:30 PM
                                            </div>
                                            <div className="bg-[#22262b] text-white/40 text-center py-4 rounded-xl text-xs border border-white/5">
                                                3:00 PM
                                            </div>
                                            <div className="bg-[#22262b] text-white/40 text-center py-4 rounded-xl text-xs border border-white/5">
                                                3:30 PM
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setIsBooked(true)}
                                            className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Calendar className="w-4 h-4" />
                                            Confirm Booking
                                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-2" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="confirmed"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="bg-[#111316] rounded-3xl p-6 border border-white/10 relative overflow-hidden"
                                    >
                                        {/* Top Green Bar */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />

                                        <div className="flex items-center gap-4 mb-6 mt-2">
                                            <div className="w-12 h-12 rounded-full bg-[#1a2e22] flex items-center justify-center">
                                                <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white leading-tight">Booking Confirmed</h3>
                                                <p className="text-white/40 text-[10px]">Check your email for details</p>
                                            </div>
                                        </div>

                                        <div className="bg-[#1a1d21] rounded-2xl p-4 border border-white/5 space-y-4">
                                            <div>
                                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-1">EVENT</p>
                                                <p className="text-white font-bold text-sm">Strategy Session: Scale AI</p>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Calendar className="w-4 h-4 text-blue-500 mt-0.5" />
                                                <div>
                                                    <p className="text-white text-[10px] font-medium">Tomorrow (Oct 25th)</p>
                                                    <p className="text-white/40 text-[10px]">2:00 PM - 2:30 PM EST</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Video className="w-4 h-4 text-blue-500 mt-0.5" />
                                                <div>
                                                    <p className="text-white text-[10px] font-medium">Google Meet</p>
                                                    <p className="text-blue-400 text-[10px] underline">meet.google.com/abc-xyz</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <FileText className="w-4 h-4 text-blue-500 mt-0.5" />
                                                <div>
                                                    <p className="text-white text-[10px] font-medium">Agenda</p>
                                                    <p className="text-white/40 text-[10px]">Lead Flow Analysis & Automation Demo</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* STEP 2: SLACK */}
                    {step === 2 && (
                        <motion.div
                            key="slack"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="h-full flex flex-col justify-center px-2"
                        >
                            <div className="bg-[#1a1d21] rounded-lg overflow-hidden shadow-2xl relative border border-white/10">
                                <div className="bg-[#2d3339] px-4 py-3 flex items-center justify-between border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white/70 font-bold text-xs"># closed-deals</span>
                                    </div>
                                    <Bell className="w-4 h-4 text-white/50" />
                                </div>

                                <div className="p-5 bg-[#111316]">
                                    <div className="flex gap-3">
                                        <div className="w-9 h-9 rounded bg-blue-500 flex items-center justify-center text-white shrink-0 mt-1">
                                            <Bot className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-bold text-sm">Lumoscale Bot</span>
                                                <span className="bg-white/10 text-white/60 text-[10px] px-1 rounded uppercase font-bold">APP</span>
                                                <span className="text-white/30 text-xs">10:48 AM</span>
                                            </div>

                                            <div className="mt-1 text-white/90 text-xs">
                                                <p className="font-bold mb-1">🔥 NEW DEMO BOOKED!</p>
                                                <p className="text-white/70">A high-value lead just booked a time slot.</p>
                                            </div>

                                            <div className="mt-3 pl-3 border-l-2 border-blue-500 bg-blue-500/10 p-3 rounded-r-lg">
                                                <div className="grid grid-cols-2 gap-y-2 text-[10px]">
                                                    <div><span className="text-white/40 block text-[10px] uppercase">Name</span> <span className="font-bold text-white">Mike Chen</span></div>
                                                    <div><span className="text-white/40 block text-[10px] uppercase">Value</span> <span className="font-bold text-blue-400">$5k - $10k</span></div>
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
                    {step === 3 && (
                        <motion.div
                            key="brief"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col justify-center px-4"
                        >
                            <div className="bg-[#0f1115] rounded-3xl p-6 shadow-2xl relative border border-white/10 h-full max-h-[600px] overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-base leading-none mb-1">Pre-Call Brief</h4>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                            <span className="text-white/40 text-[10px]">System Active</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Card */}
                                <div className="bg-[#16191d] rounded-2xl p-5 border border-white/5 relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-3 h-3 text-blue-500" />
                                            <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">Pre-Call Brief</span>
                                        </div>
                                        <span className="text-[10px] text-white/20 font-mono">DELIVERED 1HR BEFORE CALL</span>
                                    </div>

                                    {/* Core Problem */}
                                    <div className="bg-[#1f2329] rounded-xl p-3 mb-3 border border-white/5">
                                        <span className="text-blue-500/60 text-[10px] font-bold uppercase tracking-wider block mb-1">Core Problem</span>
                                        <p className="text-white text-xs font-medium leading-relaxed">
                                            Manual follow-up is broken. Drowning in 100+ unread leads/week.
                                        </p>
                                    </div>

                                    {/* Grid: Urgency & Style */}
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div className="bg-[#1f2329] rounded-xl p-3 border border-white/5">
                                            <span className="text-blue-500/60 text-[10px] font-bold uppercase tracking-wider block mb-1">Urgency Level</span>
                                            <p className="text-[#f87171] text-xs font-bold">HIGH - Ready to act</p>
                                        </div>
                                        <div className="bg-[#1f2329] rounded-xl p-3 border border-white/5">
                                            <span className="text-blue-500/60 text-[10px] font-bold uppercase tracking-wider block mb-1">Comm Style</span>
                                            <p className="text-white text-[10px] font-bold">Direct, Frustrated</p>
                                        </div>
                                    </div>

                                    {/* Opening Approach */}
                                    <div className="bg-[#1f2329] rounded-xl p-3 mb-3 border border-white/5">
                                        <span className="text-blue-500/60 text-[10px] font-bold uppercase tracking-wider block mb-1">Opening Approach</span>
                                        <p className="text-white/80 text-xs italic">
                                            "I can see you're leaving money on the table. Let's fix that today."
                                        </p>
                                    </div>

                                    {/* What They Need */}
                                    <div className="bg-[#1f2329] rounded-xl p-3 border border-white/5 mb-4">
                                        <span className="text-blue-500/60 text-[10px] font-bold uppercase tracking-wider block mb-1">What They Need</span>
                                        <p className="text-white text-xs font-bold">
                                            Automation that feels human + Immediate ROI
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                                        <div className="text-[10px] text-white/50">
                                            <span className="text-white font-bold">Why this matters:</span> Know exactly how to close.
                                        </div>
                                        <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                            +50% Close Rate
                                        </span>
                                    </div>
                                </div>

                                {/* Restart Indicator */}
                                <div className="mt-4 flex items-center justify-center gap-2 text-blue-500 opacity-80">
                                    <div className="w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center">
                                        <CheckCircle2 className="w-3 h-3" />
                                    </div>
                                    <span className="text-sm font-bold">Brief Sent to You</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </PhoneMockup>
    );
};

const VoiceWave = () => {
    return (
        <div className="flex items-center gap-1 h-8">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        scaleY: [0.4, 1, 0.4],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "linear"
                    }}
                    className="w-1.5 bg-emerald-400 rounded-full origin-center"
                    style={{ height: '24px' }}
                />
            ))}
        </div>
    );
};

const VoiceAgentDemo = () => {
    const [isCallActive, setIsCallActive] = useState(false);
    const [convoStep, setConvoStep] = useState(0);

    // Active conversation steps
    const conversation = [
        { speaker: "Sarah", text: "Hi! This is Sarah from Lumoscale. How can I help you today?", delay: 1000 },
        { speaker: "User", text: "I'm looking to automate my lead follow-ups.", delay: 3500 },
        { speaker: "Sarah", text: "Great! Our AI can handle that 24/7. Would you like to see a demo?", delay: 6000 },
        { speaker: "User", text: "Yes, that would be perfect.", delay: 9000 }
    ];

    useEffect(() => {
        if (!isCallActive) {
            setConvoStep(0);
            return;
        }

        const timers = conversation.map((_, i) =>
            setTimeout(() => setConvoStep(i + 1), conversation[i].delay)
        );

        return () => timers.forEach(clearTimeout);
    }, [isCallActive]);

    return (
        <PhoneMockup time="10:25" accentColor="emerald">
            {/* App Header */}
            {!isCallActive && (
                <div className="absolute top-0 inset-x-0 pt-14 px-6 z-20 flex justify-between items-start pointer-events-none">
                    <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 mx-auto mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-500 text-[10px] font-bold tracking-widest uppercase">Incoming Call</span>
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className={`flex-1 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 bg-zinc-950`}>

                {/* Premium Animated Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
                </div>

                <AnimatePresence mode="wait">
                    {!isCallActive ? (
                        <motion.div
                            key="incoming"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.5 } }}
                            className="w-full h-full flex flex-col items-center justify-between py-12 px-8 relative z-10"
                        >
                            {/* Caller Info */}
                            <div className="flex flex-col items-center mt-8">
                                <div className="relative mb-8 group">
                                    {/* Ambient Glows */}
                                    <div className="absolute inset-0 bg-emerald-500/30 blur-[40px] rounded-full animate-pulse-slow" />

                                    {/* Avatar Container */}
                                    <div className="w-32 h-32 rounded-full relative z-10 p-1 bg-gradient-to-br from-white/10 to-transparent ring-1 ring-white/20 shadow-2xl">
                                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-black relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt="Sarah - AI Agent"
                                                className="w-full h-full object-cover scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent mix-blend-overlay" />
                                        </div>

                                        {/* Status Dot */}
                                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-black rounded-full z-20 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    </div>

                                    {/* Ripples */}
                                    <div className="absolute inset-0 border border-emerald-500/30 rounded-full animate-[ping_3s_linear_infinite]" />
                                    <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite_1s]" />
                                </div>

                                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Lumoscale AI</h2>
                                <p className="text-emerald-400/80 text-sm font-medium tracking-widest uppercase">Verified Business</p>
                            </div>

                            {/* Action Button */}
                            <div className="w-full pb-6">
                                <motion.button
                                    onClick={() => setIsCallActive(true)}
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        boxShadow: [
                                            "0 20px 40px -10px rgba(16, 185, 129, 0.3)",
                                            "0 20px 60px -10px rgba(16, 185, 129, 0.6)",
                                            "0 20px 40px -10px rgba(16, 185, 129, 0.3)"
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-bold text-lg flex items-center justify-center gap-3 overflow-hidden group shadow-emerald-900/20"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                                    {/* Shaking Icon */}
                                    <motion.div
                                        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatDelay: 0.5,
                                            ease: "linear"
                                        }}
                                    >
                                        <Phone className="w-6 h-6 fill-current" />
                                    </motion.div>

                                    <span className="relative z-10">Answer Call</span>

                                    {/* Shine effect */}
                                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                                </motion.button>
                                <p className="text-center text-white/30 text-xs mt-4">Average response time: &lt;1s</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full flex flex-col pt-20 pb-8 px-6 relative z-10"
                        >
                            {/* Active Call Header */}
                            <div className="text-center mb-12">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="inline-block relative mb-4"
                                >
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 ring-4 ring-emerald-500/20 shadow-2xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Sarah"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-4 border-zinc-950">
                                        <Mic className="w-3 h-3 text-black fill-current" />
                                    </div>
                                </motion.div>

                                <h3 className="text-2xl font-bold text-white mb-2">Sarah (AI)</h3>
                                <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 py-1.5 px-3 rounded-full inline-flex border border-emerald-500/20">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    00:{convoStep < 4 ? '12' : '24'}
                                </div>
                            </div>

                            {/* Dynamic Voice Visualization */}
                            <div className="flex-1 flex items-center justify-center mb-8">
                                <div className="flex items-center gap-1.5 h-16">
                                    {[...Array(7)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                scaleY: [0.3, 1, 0.3],
                                                opacity: [0.3, 1, 0.3]
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                delay: i * 0.1,
                                            }}
                                            className="w-2 bg-gradient-to-t from-emerald-600 to-emerald-300 rounded-full origin-center"
                                            style={{ height: '60px' }}
                                        />
                                    ))}
                                </div>
                            </div>


                            {/* Floating Captions */}
                            <div className="h-[140px] relative mb-8">
                                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 z-10 pointer-events-none" />
                                <AnimatePresence mode="popLayout">
                                    {conversation.slice(0, convoStep).slice(-1).map((msg, i) => (
                                        <motion.div
                                            key={convoStep + i}
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                            className="absolute bottom-0 inset-x-0 text-center"
                                        >
                                            <p className="text-lg font-medium text-white/90 leading-relaxed px-4 drop-shadow-md">
                                                "{msg.text}"
                                            </p>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Glass Controls */}
                            <div className="grid grid-cols-4 gap-4 px-2">
                                <button className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/5">
                                    <Mic className="w-6 h-6" />
                                </button>
                                <button className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/5">
                                    <Video className="w-6 h-6" />
                                </button>
                                <button className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/5">
                                    <User className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => setIsCallActive(false)}
                                    className="aspect-square rounded-2xl bg-red-500/90 hover:bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105"
                                >
                                    <Phone className="w-7 h-7 fill-current rotate-[135deg]" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PhoneMockup>
    );
};

export default function DMDemo() {
    return (
        <section id="demo" className="py-24 bg-black overflow-hidden relative">
            {/* Background glow for ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">Future.</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Watch how our AI Text and Voice agents seamlessly handle customer interactions,
                        running on realistic mobile infrastructure.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative">
                    {/* Center Divider Line - Only visible on large screens */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />

                    <div className="flex flex-col items-center">
                        <div className="text-center mb-10 w-full max-w-sm p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Voice Intelligence</h3>
                            <p className="text-zinc-400 text-sm font-medium relative z-10">Human-like latency with emotional intelligence.</p>
                        </div>
                        <VoiceAgentDemo />
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="text-center mb-10 w-full max-w-sm p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Conversation Engine</h3>
                            <p className="text-zinc-400 text-sm font-medium relative z-10">Instant lead qualification and booking.</p>
                        </div>
                        <TextAgentDemo />
                    </div>
                </div>
            </div>
        </section>
    );
}   