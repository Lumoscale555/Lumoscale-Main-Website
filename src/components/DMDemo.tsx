import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Calendar, Slack, FileText, Check, Mic, User, Bot, Signal, Wifi, Battery, Video, CheckCircle2, Bell, Clock, Volume2, Plus, ArrowRight } from "lucide-react";
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
    const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([]);
    const [isChatActive, setIsChatActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const sessionId = useRef(`session-${Math.random().toString(36).substring(7)}`).current;
    const chatContainerRef = useRef<HTMLDivElement>(null);

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
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg = inputValue.trim();

        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInputValue("");
        setIsTyping(true);

        try {
            // Updated webhook URL based on user context
            const response = await fetch("https://n8n.srv1011051.hstgr.cloud/webhook/website-text%20agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    entry: [
                        {
                            messaging: [
                                {
                                    sender: { id: sessionId },
                                    message: { text: userMsg }
                                }
                            ]
                        }
                    ]
                })
            });

            const data = await response.json();
            
            if (data.reply) {
                setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
            } else {
                 // Fallback if no reply structure key matches
                 console.error("Unexpected response format:", data);
            }

        } catch (error) {
            console.error("Error sending message:", error);
            // Optional: Add error message to chat
        } finally {
            setIsTyping(false);
        }
    };



    const handleStartChat = () => {
        setIsChatActive(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <PhoneMockup time="10:23" accentColor="blue">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-zinc-900/50 flex justify-between items-center bg-black sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-500/20 bg-transparent flex items-center justify-center">
                            <Bot className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-black"></div>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">Lumoscale AI</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="text-blue-500 text-[10px] font-bold">ONLINE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-black relative overflow-hidden flex flex-col">
                {!isChatActive ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-black to-zinc-950">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative">
                                <div className="absolute inset-0 rounded-full bg-blue-500/5 animate-ping" />
                                <Bot className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-3">Start Conversation</h3>
                            <p className="text-zinc-500 text-xs text-center mb-8 max-w-[220px] leading-relaxed">
                                Experience how our AI agent handles leads and qualifies them automatically.
                            </p>
                            <button
                                onClick={handleStartChat}
                                className="group relative px-6 py-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 font-medium text-sm hover:bg-blue-600/20 hover:border-blue-500/40 transition-all flex items-center gap-2 overflow-hidden"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Chat with AI</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            </button>
                        </motion.div>
                    </div>
                ) : (
                    <>
                        <div
                            ref={chatContainerRef}
                            className="flex-1 p-5 flex flex-col justify-start space-y-6 pb-6 overflow-y-auto no-scrollbar scroll-smooth bg-gradient-to-b from-black to-zinc-950"
                        >
                            <div className="flex-1" />
                            <AnimatePresence mode="popLayout" initial={false}>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                                    >
                                        {msg.sender === 'ai' && (
                                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 flex items-center justify-center bg-zinc-900 shadow-sm relative top-1">
                                                <Bot className="w-4 h-4 text-blue-400" />
                                            </div>
                                        )}

                                        <div className={`${msg.sender === 'user'
                                            ? 'bg-blue-600/10 text-blue-50 border border-blue-500/20 rounded-2xl rounded-tr-sm shadow-[0_0_15px_rgba(37,99,235,0.05)]'
                                            : 'bg-white/5 backdrop-blur-md text-zinc-200 border border-white/5 rounded-2xl rounded-tl-sm shadow-sm'
                                            } px-5 py-3.5 max-w-[85%]`}
                                        >
                                            <p className="text-xs leading-relaxed font-normal tracking-wide whitespace-pre-wrap">
                                                {msg.text.includes('https://') ? (
                                                    <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/(https:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/30 transition-colors font-medium">$1</a>') }} />
                                                ) : msg.text}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-3 items-start"
                                    >
                                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 flex items-center justify-center bg-zinc-900 top-1 relative">
                                             <Bot className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 backdrop-blur-sm">
                                                <div className="flex gap-1.5 opacity-60">
                                                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                                                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-75" />
                                                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-150" />
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-zinc-500 px-1 italic">AI is typing...</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5">
                            <div className="flex gap-3 items-center bg-white/5 border border-white/5 rounded-full px-2 py-1.5 focus-within:bg-white/10 focus-within:border-white/10 transition-all duration-300 shadow-inner">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-400 transition-all disabled:opacity-20 disabled:scale-95 disabled:hover:bg-blue-500 shadow-lg shadow-blue-500/20"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
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

                <div id="demo-interactive" className="flex flex-col items-center relative min-h-[800px]">
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