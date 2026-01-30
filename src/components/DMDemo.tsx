import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Calendar, Slack, FileText, Check, Mic, User, Bot, Signal, Wifi, Battery, Video, CheckCircle2, Bell, Clock, Volume2, Plus } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

// Helper for Mouse-following spotlight effect
const SpotlightCard = ({ color, title, subtitle }: { color: "emerald" | "blue", title: string, subtitle: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    const colorClass = color === "emerald" ? "74, 222, 128" : "96, 165, 250"; // Tailwind emerald-400 vs blue-400

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="text-center mb-10 w-full max-w-sm p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl relative overflow-hidden group cursor-crosshair"
        >
            {/* Spotlight Gradient */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${colorClass}, 0.15), transparent 40%)`,
                }}
            />

            {/* Spotlight Border */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-2xl z-10"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${colorClass}, 0.4), transparent 40%)`,
                    maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                }}
            />

            <h3 className="text-xl font-bold text-white mb-2 relative z-20">{title}</h3>
            <p className="text-zinc-400 text-sm font-medium relative z-20">{subtitle}</p>
        </div>
    );
};

// Premium Phone Mockup Component with 3D Tilt and Glass Reflections
const PhoneMockup = ({ children, time = "10:24", accentColor = "emerald" }: { children: React.ReactNode, time?: string, accentColor?: "emerald" | "blue" | "purple" }) => {
    return (
        <motion.div
            animate={{ rotateX: 0, rotateY: 0 }}
            style={{ perspective: 1000 }}
            className="relative mx-auto w-full max-w-[380px] h-[640px] bg-gradient-to-b from-zinc-900 via-black to-zinc-900 rounded-[3rem] border-[4px] border-zinc-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden ring-2 ring-white/5 ml-0 lg:mx-auto group/phone"
        >
            {/* Dynamic Island / Notch Area */}
            <div className="absolute top-0 inset-x-0 h-14 z-50 px-7 flex items-end justify-between pb-2 text-white">
                <span className="text-[14px] font-bold w-14">{time}</span>

                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-full flex items-center justify-center z-50 ring-1 ring-white/10 shadow-inner">
                    <div className="w-2 h-2 rounded-full bg-zinc-950 absolute right-5 ring-1 ring-white/10" />
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
            <div className="absolute inset-0 rounded-[3.5rem] shadow-[inset_0_0_60px_rgba(255,255,255,0.05)] z-30 pointer-events-none" />
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
                                        className={`flex gap-2 ${msg.sender === 'lead' ? 'justify-end' : ''}`}
                                    >
                                        {msg.sender === 'ai' && (
                                            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-800 shrink-0">
                                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" className="w-full h-full object-cover" />
                                            </div>
                                        )}

                                        <div className={`${msg.sender === 'lead'
                                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-sm shadow-md shadow-blue-500/10'
                                            : 'bg-zinc-900/80 backdrop-blur-sm text-zinc-200 border border-white/5 rounded-bl-sm'
                                            } px-4 py-3 rounded-2xl max-w-[80%] shadow-sm`}
                                        >
                                            <p className="text-[13px] leading-relaxed font-normal tracking-wide">
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



const VoiceAgentDemo = () => {
    const [isCallActive, setIsCallActive] = useState(false);
    const [convoStep, setConvoStep] = useState(0);
    const [callDuration, setCallDuration] = useState(0);

    // Active conversation steps (0-indexed)
    const conversation = [
        { speaker: "Sarah", text: "Hi! This is Sarah from Lumoscale. How can I help you today?", delay: 1000 },
        { speaker: "User", text: "I'm looking to automate my lead follow-ups.", delay: 3500 },
        { speaker: "Sarah", text: "Great! Our AI can handle that 24/7. Would you like to see a demo?", delay: 6000 },
        { speaker: "User", text: "Yes, that would be perfect.", delay: 9000 },
        { speaker: "Sarah", text: "Awesome. I'll send the details to your inbox right now.", delay: 11500 },
        { speaker: "User", text: "Thanks, I appreciate it.", delay: 14000 },
        { speaker: "Sarah", text: "You're welcome! Let me know if you have any questions.", delay: 16500 }
    ];

    useEffect(() => {
        if (!isCallActive) {
            setConvoStep(0);
            setCallDuration(0);
            return;
        }

        // Timer for call duration
        const timerInterval = setInterval(() => {
            setCallDuration(prev => prev + 1);
        }, 1000);

        // Conversation flow
        const timers = conversation.map((_, i) =>
            setTimeout(() => setConvoStep(i + 1), conversation[i].delay)
        );

        return () => {
            clearInterval(timerInterval);
            timers.forEach(clearTimeout);
        };
    }, [isCallActive]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentSpeaker = convoStep > 0 && convoStep <= conversation.length ? conversation[convoStep - 1].speaker : "Sarah";
    const isUserSpeaking = currentSpeaker === "User";

    return (
        <PhoneMockup time="10:25" accentColor="emerald">
            {/* INCOMING CALL SCREEN */}
            <AnimatePresence mode="wait">
                {!isCallActive ? (

                    <motion.div
                        key="incoming"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black"
                    >
                         {/* Ambient Background Glow Removed */}
                        <div className="z-10 flex flex-col items-center gap-8">
                            <motion.button
                                onClick={() => setIsCallActive(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative w-24 h-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg transition-all duration-500 hover:border-white/20"
                            >
                                {/* Inner Pulse */}
                                {/* Inner Pulse removed */}
                                
                                <Phone className="w-8 h-8 text-emerald-400 fill-current group-hover:scale-110 transition-transform duration-300" />
                            </motion.button>
                            
                            <div className="text-center">
                                <h3 className="text-white text-xl font-semibold mb-1">Talk to AI</h3>
                                <p className="text-zinc-500 text-sm">Tap to start conversation</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* ACTIVE CALL SCREEN */
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, y: "10%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "10%" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 z-20 flex flex-col bg-black"
                    >
                         {/* Header */}
                         <div className="pt-14 pb-6 flex flex-col items-center justify-center w-full relative z-10 px-6">
                            <div className="flex items-center gap-2 mb-2">
                                 <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" />
                                 </div>
                                 <h3 className="text-xl font-semibold text-white">Sarah</h3>
                            </div>
                            {/* Timestamp Removed/Hidden to save space or keep it small */}
                            {/* <p className="text-emerald-400 text-sm font-medium tracking-wide font-mono">{formatTime(callDuration)}</p> */}
                        </div>

                         {/* Main Content Area */}
                         <div className="flex-1 flex flex-col w-full relative overflow-hidden mb-20">
                            
                            {/* Visualizer Area (Fixed Top) */}
                            <div className="h-24 w-full flex items-center justify-center shrink-0 relative z-20 -mt-2">
                                {/* Listening State (User Turn) */}
                                {isUserSpeaking && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center z-20"
                                    >
                                        <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mb-2 relative">
                                            <div className="absolute inset-0 rounded-full bg-white/5 animate-ping-slow" />
                                            <Mic className="w-6 h-6 text-white/80" />
                                        </div>
                                        <p className="text-white/50 text-sm font-light animate-pulse">Listening...</p>
                                    </motion.div>
                                )}

                                {/* Speaking State (AI Turn) */}
                                <motion.div 
                                    animate={{ 
                                        opacity: isUserSpeaking ? 0.3 : 1,
                                        scale: isUserSpeaking ? 0.9 : 1
                                    }}
                                    className="flex items-center justify-center gap-1.5 h-full w-full"
                                >
                                    {[...Array(isUserSpeaking ? 3 : 12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                height: isUserSpeaking ? [10, 10, 10] : [20, 50 + Math.random() * 30, 20],
                                                backgroundColor: isUserSpeaking ? "#52525b" : "#34d399",
                                                filter: isUserSpeaking ? "none" : "drop-shadow(0 0 8px rgba(52, 211, 153, 0.5))" 
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                repeat: Infinity,
                                                repeatType: "mirror",
                                                delay: i * 0.05,
                                                ease: "easeInOut"
                                            }}
                                            className="w-1.5 rounded-full"
                                            style={{ height: '30px' }}
                                        />
                                    ))}
                                </motion.div>
                            </div>

                            {/* Transcript Area (Scrolling List) */}
                            <div className="flex-1 w-full relative overflow-hidden px-6 flex flex-col justify-end pb-24">
                                {/* Top Fade Gradient */}
                                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/90 to-transparent z-10 pointer-events-none" />

                                <div className="flex flex-col gap-4 justify-end">
                                     <AnimatePresence initial={false} mode="popLayout">
                                        {conversation.slice(0, convoStep).map((msg, idx) => {
                                            const isLast = idx === (conversation.slice(0, convoStep).length - 1);
                                            const dist = conversation.slice(0, convoStep).length - 1 - idx;
                                            return (
                                                <motion.div
                                                    key={idx}
                                                    layout
                                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                                    animate={{ 
                                                        opacity:  Math.max(0.1, 1 - dist * 0.15), 
                                                        y: 0, 
                                                        scale: 1 - dist * 0.02,
                                                        filter: `blur(${dist * 0.5}px)`
                                                    }}
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                    className={`flex w-full ${msg.speaker === 'User' ? 'justify-end' : 'justify-start'} ${isLast ? 'z-20' : 'z-0'}`}
                                                >
                                                    <div className={`max-w-[85%] ${msg.speaker === 'User' ? 'text-right' : 'text-left'}`}>
                                                        <p className={`text-xl font-medium leading-relaxed tracking-tight ${msg.speaker === 'User' ? 'text-zinc-500' : 'text-white drop-shadow-md'}`}>
                                                            "{msg.text}"
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                     </AnimatePresence>
                                </div>
                            </div>
                         </div>



                         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                            <motion.button
                                onClick={() => setIsCallActive(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-600/40"
                            >
                                <Phone className="w-8 h-8 text-white fill-current rotate-[135deg]" />
                            </motion.button>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PhoneMockup>
    );
};

const ToggleSwitch = ({ activeTab, onChange }: { activeTab: 'voice' | 'text', onChange: (tab: 'voice' | 'text') => void }) => {
    return (
        <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 relative">
            {/* Sliding Background */}
            <motion.div
                className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full z-0"
                initial={false}
                animate={{
                    x: activeTab === 'voice' ? 0 : '100%',
                    width: '50%'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ left: 4 }} // manual offset compensation 
            />
             {/* Actual sliding background implementation is tricky with simple percentage, let's use a simpler flex layout approach relative to the container */}
             <div className="absolute inset-1 flex">
                <motion.div 
                     className="w-1/2 h-full bg-zinc-800 rounded-full shadow-lg"
                     layoutId="activeTabBg"
                     initial={false}
                     animate={{ x: activeTab === 'voice' ? 0 : '100%' }}
                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     style={{
                        background: activeTab === 'voice' 
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' // Emerald
                            : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' // Blue
                     }}
                />
             </div>

            <button
                onClick={() => onChange('voice')}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 flex items-center gap-2 ${activeTab === 'voice' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            >
                <Mic className="w-4 h-4" />
                Talk to AI
            </button>
            <button
                onClick={() => onChange('text')}
                className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 flex items-center gap-2 ${activeTab === 'text' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            >
                <MessageSquare className="w-4 h-4" />
                Chat with AI
            </button>
        </div>
    );
};

export default function DMDemo() {
    const [activeTab, setActiveTab] = useState<'voice' | 'text'>('voice');

    return (
        <section id="demo" className="py-24 bg-black overflow-hidden relative">
            {/* Background glow for ambience - Dynamic Color */}
            <motion.div 
                animate={{ background: activeTab === 'voice' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(59, 130, 246, 0.05)' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] pointer-events-none transition-colors duration-1000" 
            />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">Future.</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed mb-8">
                        Interact with our intelligent agents directly. Switch between voice and text modes below.
                    </p>

                    {/* Toggle Switcher */}
                    <div className="flex justify-center mb-12">
                        <ToggleSwitch activeTab={activeTab} onChange={setActiveTab} />
                    </div>
                </div>

                <div className="flex flex-col items-center relative min-h-[800px]">
                    {/* Demos */}
                    <div className="w-full max-w-[500px] mb-12">
                        <AnimatePresence mode="wait">
                            {activeTab === 'voice' ? (
                                <motion.div
                                    key="voice"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <VoiceAgentDemo />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="text"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <TextAgentDemo />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Dynamic Spotlight Card - Now at Bottom */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'voice' ? (
                                <SpotlightCard color="emerald" title="Voice Intelligence" subtitle="Human-like latency with emotional intelligence." />
                            ) : (
                                <SpotlightCard color="blue" title="Conversation Engine" subtitle="Instant lead qualification and booking." />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}