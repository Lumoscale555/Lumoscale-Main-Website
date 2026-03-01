import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Calendar, Slack, FileText, Check, Mic, User, Bot, Signal, Video, CheckCircle2, Bell, Clock, Volume2, Plus, ArrowRight } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import { RetellWebClient } from "retell-client-js-sdk";

const retellWebClient = new RetellWebClient();

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
const PhoneMockup = ({ children, accentColor = "emerald", callDuration }: { children: React.ReactNode, accentColor?: "emerald" | "blue" | "purple", callDuration?: number }) => {
    const formatCallTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (
        <motion.div
            animate={{ rotateX: 0, rotateY: 0 }}
            style={{ perspective: 1000 }}
            className="relative mx-auto w-full max-w-[380px] h-[640px] bg-gradient-to-b from-zinc-900 via-black to-zinc-900 rounded-[3rem] border-[4px] border-zinc-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden ring-2 ring-white/5 ml-0 lg:mx-auto group/phone"
        >
            {/* iOS-style Green Call Timer Bar */}
            <AnimatePresence>
                {callDuration !== undefined && callDuration > 0 && (
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute top-0 inset-x-0 h-10 z-[60] flex items-center justify-between px-7 bg-emerald-600"
                    >
                        <span className="text-white text-xs font-semibold tracking-wide">{formatCallTime(callDuration)}</span>
                        <div className="flex items-center gap-1.5">
                            <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1.5 h-1.5 rounded-full bg-white"
                            />
                            <span className="text-white text-xs font-medium">Lumoscale AI</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dynamic Island / Notch Area */}
            <div className="absolute top-0 inset-x-0 h-14 z-50 px-7 flex items-end justify-between pb-2 text-white">
                <span className="text-[13px] font-semibold tabular-nums opacity-0 select-none">·</span>

                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-full flex items-center justify-center z-50 ring-1 ring-white/10 shadow-inner">
                    <div className="w-2 h-2 rounded-full bg-zinc-950 absolute right-5 ring-1 ring-white/10" />
                </div>

                {/* Premium Session Limit Indicator */}
                <div className="flex items-center gap-1.5 opacity-80 backdrop-blur-md bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-white uppercase select-none">2:30 Limit</span>
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
        <PhoneMockup accentColor="blue">
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
                                        layout
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                                    >
                                        {/* Removed Bot Avatar per user request */}

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
                                        {/* Removed Bot Avatar per user request */}
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
    const [isAgentTalking, setIsAgentTalking] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [callDuration, setCallDuration] = useState(150); // 2:30 in seconds
    const [dailyCalls, setDailyCalls] = useState(0);
    const isMobile = useIsMobile();
    const MAX_DAILY_CALLS = 2;

    const transcriptContainerRef = useRef<HTMLDivElement>(null);

    const fetchDailyCalls = () => {
        try {
            const stored = localStorage.getItem('lumoscale_voice_calls');
            if (stored) {
                const data = JSON.parse(stored);
                // Check if the recorded date is today
                const today = new Date().toDateString();
                if (data.date === today) {
                    setDailyCalls(data.count);
                } else {
                    // Reset if it's a new day
                    localStorage.setItem('lumoscale_voice_calls', JSON.stringify({ date: today, count: 0 }));
                    setDailyCalls(0);
                }
            } else {
                localStorage.setItem('lumoscale_voice_calls', JSON.stringify({ date: new Date().toDateString(), count: 0 }));
            }
        } catch (e) {
            console.error("Local storage error", e);
        }
    };

    // Initialize daily calls from local storage
    useEffect(() => {
        fetchDailyCalls();
        window.addEventListener('storage', fetchDailyCalls);
        window.addEventListener('lumoscale_voice_calls_updated', fetchDailyCalls);
        return () => {
            window.removeEventListener('storage', fetchDailyCalls);
            window.removeEventListener('lumoscale_voice_calls_updated', fetchDailyCalls);
        };
    }, []);
    const [transcript, setTranscript] = useState<{ id: string, speaker: 'User' | 'Sarah', text: string }[]>([]);

    // Auto-scroll transcript to bottom
    useEffect(() => {
        if (transcriptContainerRef.current) {
            transcriptContainerRef.current.scrollTo({
                top: transcriptContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [transcript]);

    useEffect(() => {
        // Setup Retell Event Listeners
        retellWebClient.on("call_started", () => {
            setIsCallActive(true);
            setIsInitializing(false);
            setTranscript([]); // reset on new call
        });

        retellWebClient.on("call_ended", () => {
            setIsCallActive(false);
            setIsAgentTalking(false);
            setIsInitializing(false);
            setTimeout(() => setTranscript([]), 1000); // fade out after a sec
        });

        retellWebClient.on("agent_start_talking", () => setIsAgentTalking(true));
        retellWebClient.on("agent_stop_talking", () => setIsAgentTalking(false));

        // Listen for live transcript updates
        retellWebClient.on("update", (update) => {
            if (update.transcript) {
                // Map the Retell transcript to our UI transcript array
                const parsedTranscript = update.transcript
                    // Filter out truly empty utterances to prevent irrelevant/blank bubbles
                    .filter((utterance) => utterance.content && utterance.content.trim().length > 0)
                    .map((utterance, idx) => ({
                        id: `${utterance.role}-${idx}`,
                        speaker: utterance.role === 'agent' ? 'Sarah' : 'User' as 'Sarah' | 'User',
                        text: utterance.content
                    }));
                setTranscript(parsedTranscript);
            }
        });

        retellWebClient.on("error", (error) => {
            console.error("Retell Error:", error);
            setIsCallActive(false);
            setIsInitializing(false);
            alert("Call failed. Check console for details.");
        });

        // Cleanup
        return () => {
            retellWebClient.removeAllListeners();
            retellWebClient.stopCall();
        };
    }, []);

    // Countdown timer for UI (starts at 2:30, counts down to 0:00)
    useEffect(() => {
        if (!isCallActive) {
            setCallDuration(150);
            return;
        }
        setCallDuration(150);
        const timerInterval = setInterval(() => {
            setCallDuration(prev => {
                if (prev <= 1) { clearInterval(timerInterval); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [isCallActive]);

    const handleStartCall = async () => {
        if (dailyCalls >= MAX_DAILY_CALLS) {
            alert(`You have reached the daily limit of ${MAX_DAILY_CALLS} demo calls. Please try again tomorrow!`);
            return;
        }

        setIsInitializing(true);
        try {
            // ==============================================================================
            // 🚨 ACTION REQUIRED: CONFIGURE YOUR N8N WEBHOOK URL HERE 🚨
            // ==============================================================================
            // To start a secure web call, your frontend needs a temporary `access_token`. 
            // Create an n8n webhook that makes a POST request to: https://api.retellai.com/v2/create-web-call
            // with Header: `Authorization: Bearer YOUR_SECRET_RETELL_API_KEY`
            // and Body: `{ "agent_id": "agent_f0bfa0d5cb79d539d25d0c1000" }`
            // Then, paste that n8n webhook URL below so this frontend can fetch the token securely.
            
            const YOUR_N8N_WEBHOOK_URL = "https://n8n.srv1011051.hstgr.cloud/webhook/8a593fb4-49b5-4301-8ad2-e64a1ec98f48"; 
            
            // 1. Fetch the token from your secure backend (n8n)
            const response = await fetch(YOUR_N8N_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            
            if (!response.ok) throw new Error("Failed to fetch access token from webhook");
            
            const data = await response.json();
            
            // Adjust this based on exactly what your n8n webhook returns. 
            // Normally Retell returns { access_token: "..." }
            const accessToken = data.access_token || data.accessToken || data.token; 
            
            if (!accessToken) throw new Error("No access token found in webhook response");

            // Increment daily calls
            try {
                const newCount = dailyCalls + 1;
                localStorage.setItem('lumoscale_voice_calls', JSON.stringify({ 
                    date: new Date().toDateString(), 
                    count: newCount 
                }));
                setDailyCalls(newCount);
                window.dispatchEvent(new Event('lumoscale_voice_calls_updated'));
            } catch(e) { console.error(e) }

            // 2. Start the Retell WebRTC call
            await retellWebClient.startCall({ accessToken });

        } catch (error) {
            console.error("Failed to start Retell call:", error);
            setIsInitializing(false);
            alert("Failed to start the call. Check the console for more details.");
        }
    };

    const handleEndCall = () => {
        retellWebClient.stopCall();
        setIsCallActive(false);
    };

    const isUserSpeaking = (!isAgentTalking && isCallActive);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative flex flex-col lg:flex-row justify-center items-center lg:items-end w-full max-w-7xl mx-auto gap-8 lg:gap-0">
            <div className="relative w-full max-w-[380px]">
                <PhoneMockup accentColor="emerald" callDuration={0}>
                <div className="flex-1 flex flex-col bg-black h-full relative z-10 overflow-hidden font-sans">
                    
                    {/* Pure Black Background */}
                    <div className="absolute inset-0 bg-black pointer-events-none -z-10" />


                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mt-4">
                        
                        {/* Premium Countdown Timer (Only visible when active) */}
                        <div className="h-[80px] flex items-end justify-center pb-8">
                            <AnimatePresence>
                                {isCallActive && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-center flex flex-col items-center"
                                    >
                                        <div className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center gap-3">
                                            <div className="flex gap-1">
                                                <motion.div
                                                    animate={{ opacity: [1, 0.3, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                                                />
                                            </div>
                                            <span className="text-2xl font-mono tracking-widest text-white/90">
                                                {formatTime(callDuration)}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {/* The "AI Core" 3D Gyroscope Visualizer */}
                        <div className={`relative z-20 ${isMobile && isCallActive ? 'mb-4 mt-0 scale-75' : 'mb-16'} flex items-center justify-center w-[200px] h-[200px] transition-all duration-500`} style={{ perspective: '800px' }}>
                            <AnimatePresence>
                                {/* Outer Ring */}
                                <motion.div
                                    animate={isCallActive ? {
                                        rotateX: [0, 360],
                                        rotateY: [0, 180],
                                        rotateZ: [0, 360],
                                        scale: isAgentTalking ? 1.1 : 1
                                    } : { rotateX: 60, rotateY: 20, rotateZ: 45, scale: 0.9 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className={`absolute w-[180px] h-[180px] rounded-full border border-white/5 shadow-[0_0_30px_rgba(255,255,255,0.02)]`}
                                    style={{ transformStyle: 'preserve-3d' }}
                                />
                                
                                {/* Middle Ring */}
                                <motion.div
                                    animate={isCallActive ? {
                                        rotateX: [360, 0],
                                        rotateY: [180, 0],
                                        rotateZ: [360, 0],
                                        scale: isAgentTalking ? 1.2 : 1,
                                        borderColor: isAgentTalking ? 'rgba(52,211,153,0.3)' : 'rgba(56,189,248,0.2)'
                                    } : { rotateX: -40, rotateY: -30, rotateZ: -60, scale: 0.8 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-[130px] h-[130px] rounded-full border border-white/10 backdrop-blur-[1px]"
                                    style={{ transformStyle: 'preserve-3d' }}
                                />

                                {/* Inner Core Orb */}
                                <motion.div
                                    animate={isCallActive ? {
                                        scale: isAgentTalking ? [1, 1.2, 1] : [1, 1.05, 1],
                                        boxShadow: isAgentTalking 
                                            ? '0 0 60px rgba(52,211,153,0.6), inset 0 0 20px rgba(52,211,153,0.5)' 
                                            : '0 0 40px rgba(56,189,248,0.3), inset 0 0 10px rgba(56,189,248,0.2)',
                                        background: isAgentTalking 
                                            ? 'rgba(16,185,129,0.1)' 
                                            : 'rgba(14,165,233,0.05)'
                                    } : { scale: 1, boxShadow: '0 0 20px rgba(255,255,255,0.05)', background: 'transparent' }}
                                    transition={{ duration: isAgentTalking ? 0.3 : 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute w-[70px] h-[70px] rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md"
                                >
                                    {!isCallActive ? (
                                        <Mic className="w-5 h-5 text-white/50" strokeWidth={1} />
                                    ) : (
                                        <div className="flex gap-1 items-center justify-center h-full">
                                            {[1, 2, 3].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{
                                                        height: isAgentTalking ? [4, 16 + Math.random() * 8, 4] : 4,
                                                        opacity: isAgentTalking ? 1 : 0.6,
                                                        backgroundColor: isAgentTalking ? '#a7f3d0' : '#bae6fd' 
                                                    }}
                                                    transition={{ duration: 0.2 + (i * 0.1), repeat: Infinity, repeatType: 'reverse' }}
                                                    className="w-1 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    {/* Cinematic Typography - Hidden on Mobile during active call */}
                    {!(isMobile && isCallActive) && (
                        <div className="text-center z-20 relative w-full px-8">
                            <AnimatePresence mode="wait">
                                <motion.h2 
                                    key={isCallActive ? (isAgentTalking ? 'analyzing' : 'awaiting') : 'initiate'}
                                    initial={{ opacity: 0, letterSpacing: '0.1em' }}
                                    animate={{ opacity: 1, letterSpacing: '0.2em' }}
                                    exit={{ opacity: 0, letterSpacing: '0.3em' }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="text-[16px] font-bold text-white mb-2 uppercase"
                                >
                                    {!isCallActive ? "Awaiting Initiation" : (isAgentTalking ? "Analyzing Input" : "Listening")}
                                </motion.h2>
                            </AnimatePresence>
                            
                            {/* Subtitle / Transcript Peek */}
                            <motion.div 
                                className="h-10 flex items-center justify-center overflow-hidden"
                                animate={{ opacity: isCallActive ? 1 : 0.8 }}
                            >
                                <p className="text-[13px] text-zinc-400 font-medium tracking-wide">
                                    {!isCallActive ? "Establish Neural Link" : (isAgentTalking ? "Agent dictates..." : "Signal received...")}
                                </p>
                            </motion.div>
                        </div>
                    )}

                    {/* Integrated Mobile Transcript */}
                    <AnimatePresence>
                        {isCallActive && isMobile && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-x-0 top-[280px] bottom-[160px] px-6 overflow-hidden z-10"
                                style={{
                                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'
                                }}
                            >
                                <div 
                                    ref={transcriptContainerRef}
                                    className="flex flex-col gap-4 overflow-y-auto no-scrollbar max-h-full scroll-smooth pt-20 pb-10"
                                >
                                    <AnimatePresence initial={false}>
                                        {transcript.slice(-4).map((msg, idx, arr) => {
                                            const isSarah = msg.speaker !== 'User';
                                            const dist = arr.length - 1 - idx; 
                                            return (
                                                <motion.div
                                                    key={msg.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                                    animate={{ 
                                                        opacity: dist === 0 ? 1 : Math.max(0, 1 - dist * 0.4), 
                                                        y: 0, 
                                                        scale: 1 
                                                    }}
                                                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className={`flex w-full ${isSarah ? 'justify-start' : 'justify-end'}`}
                                                >
                                                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 backdrop-blur-md border ${
                                                        isSarah
                                                            ? 'bg-emerald-500/10 border-emerald-500/20 rounded-tl-sm shadow-[0_4px_20px_rgba(16,185,129,0.1)]'
                                                            : 'bg-white/5 border-white/10 rounded-tr-sm'
                                                    }`}>
                                                        <p className="text-[13px] leading-relaxed text-white font-medium">{msg.text}</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Action Area (Morphing Glass Control) */}
                    <div className="w-full px-8 pb-10 mt-auto relative z-20 flex justify-center">
                        <AnimatePresence mode="wait">
                            {!isCallActive ? (
                                <motion.div 
                                    key="start-btn"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 30, scale: 0.9 }}
                                    className="w-full flex flex-col gap-6 items-center"
                                >
                                    <div className="flex items-center gap-2 opacity-80">
                                        <div className="w-4 h-4 rounded-full border border-white/50 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-zinc-300 uppercase tracking-widest">Mic Permission Auth</span>
                                    </div>
                                    <button
                                        onClick={handleStartCall}
                                        disabled={isInitializing || dailyCalls >= MAX_DAILY_CALLS}
                                        className={`relative w-full max-w-[220px] group overflow-hidden ${
                                            dailyCalls >= MAX_DAILY_CALLS 
                                            ? 'bg-zinc-800 border border-zinc-700 cursor-not-allowed opacity-70' 
                                            : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                                        } transition-all duration-500 py-4 rounded-full flex items-center justify-center gap-3`}
                                    >
                                        {dailyCalls >= MAX_DAILY_CALLS ? (
                                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
                                        ) : isInitializing ? (
                                            <div className="w-4 h-4 rounded-full border-t-2 border-white animate-spin" />
                                        ) : (
                                            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                                        )}
                                        <span className={`font-bold text-[12px] tracking-[0.15em] ${dailyCalls >= MAX_DAILY_CALLS ? 'text-zinc-400' : 'text-white'}`}>
                                            {dailyCalls >= MAX_DAILY_CALLS ? "LIMIT REACHED" : isInitializing ? "CONNECTING..." : "TALK TO AI"}
                                        </span>
                                        {dailyCalls < MAX_DAILY_CALLS && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                        )}
                                    </button>
                                    
                                    {dailyCalls > 0 && dailyCalls < MAX_DAILY_CALLS && (
                                        <p className="text-[10px] text-zinc-500 font-mono absolute -bottom-6">
                                            {MAX_DAILY_CALLS - dailyCalls} calls remaining today
                                        </p>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="end-btn"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="w-full flex flex-col gap-6 items-center"
                                >
                                    <div className="flex items-center gap-2 opacity-80">
                                        <div className="w-4 h-4 rounded-full border border-red-500/50 flex items-center justify-center">
                                            <motion.div
                                                animate={{ opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="w-1.5 h-1.5 bg-red-500 rounded-full"
                                            />
                                        </div>
                                        <span className="text-[11px] font-semibold text-red-400 uppercase tracking-widest">Active Link</span>
                                    </div>
                                    <button
                                        onClick={handleEndCall}
                                        className="relative w-full max-w-[220px] group overflow-hidden bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 border border-red-400/50 transition-all duration-500 py-4 rounded-full flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]"
                                    >
                                        <div className="w-3 h-3 rounded-sm bg-white shadow-[0_0_10px_white]" />
                                        <span className="font-bold text-[12px] tracking-[0.15em] text-white">
                                            END CALL
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                </div>
            </PhoneMockup>
            </div>

            {/* Desktop-only Floating Transcript */}
            <AnimatePresence>
                {isCallActive && !isMobile && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute left-[calc(50%+220px)] top-[10%] bottom-[10%] w-[350px] flex flex-col justify-end z-30 overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />

                        <div 
                            ref={transcriptContainerRef}
                            className="flex flex-col gap-3 pb-4 overflow-y-auto no-scrollbar max-h-full scroll-smooth pointer-events-none"
                        >
                            <AnimatePresence initial={false}>
                                {transcript.slice(-10).map((msg, idx, arr) => {
                                    const isSarah = msg.speaker !== 'User';
                                    const dist = arr.length - 1 - idx; 
                                    return (
                                        <motion.div
                                            key={msg.id}
                                            layout
                                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                            animate={{ opacity: Math.max(0.1, 1 - dist * 0.25), y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -40, scale: 0.95 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className={`flex w-full ${isSarah ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 backdrop-blur-md shadow-xl ${
                                                isSarah
                                                    ? 'bg-emerald-900/40 border border-emerald-700/50 rounded-tl-sm'
                                                    : 'bg-zinc-800/80 border border-zinc-700/50 rounded-tr-sm'
                                            }`}>
                                                <p className={`text-[11px] font-bold mb-1 tracking-wider uppercase ${isSarah ? 'text-emerald-400' : 'text-zinc-400'}`}>
                                                    {isSarah ? 'Sarah' : 'You'}
                                                </p>
                                                <p className="text-sm leading-relaxed text-white">{msg.text}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ToggleSwitch = ({ activeTab, onChange }: { activeTab: 'voice' | 'text', onChange: (tab: 'voice' | 'text') => void }) => {
    return (
        <div className="relative p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-1 max-w-[95vw] md:max-w-none mx-auto">
            {/* Active Tab Background */}
            <div className="absolute inset-1.5 flex pointer-events-none">
                <motion.div 
                    className="w-1/2 h-full rounded-full shadow-lg"
                    layoutId="activeTabBg"
                    initial={false}
                    animate={{ x: activeTab === 'voice' ? 0 : '100%' }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{
                        background: activeTab === 'voice' 
                            ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' // Brand Green
                            : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)' // Brand Blue
                    }}
                />
            </div>

            {/* Voice Button */}
            <button
                onClick={() => onChange('voice')}
                className={`flex-1 relative z-10 px-3 md:px-6 py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === 'voice' 
                        ? 'text-white' 
                        : 'text-zinc-500 hover:text-white'
                }`}
            >
                <div className={`p-1 rounded-full ${activeTab === 'voice' ? 'bg-white/20' : 'bg-transparent'}`}>
                    <Mic className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 ${activeTab === 'voice' ? 'scale-110' : 'scale-100'}`} />
                </div>
                <span className="tracking-wide whitespace-nowrap">Talk to AI</span>
            </button>

            {/* Text Button */}
            <button
                onClick={() => onChange('text')}
                className={`flex-1 relative z-10 px-3 md:px-6 py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === 'text' 
                        ? 'text-white' 
                        : 'text-zinc-500 hover:text-white'
                }`}
            >
                <div className={`p-1 rounded-full ${activeTab === 'text' ? 'bg-white/20' : 'bg-transparent'}`}>
                    <MessageSquare className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 ${activeTab === 'text' ? 'scale-110' : 'scale-100'}`} />
                </div>
                <span className="tracking-wide whitespace-nowrap">Chat with AI</span>
            </button>

            {/* Ambient Glow */}
            <motion.div
                className="absolute inset-0 rounded-full opacity-20 blur-2xl -z-10 transition-colors duration-500"
                animate={{
                    background: activeTab === 'voice'
                        ? 'rgba(74, 222, 128, 0.5)'
                        : 'rgba(59, 130, 246, 0.5)'
                }}
            />
        </div>
    );
};

// Swipe Indicator Component
const SwipeIndicator = ({ activeTab }: { activeTab: 'voice' | 'text' }) => {
    const isMobile = useIsMobile();
    
    // if (!isMobile) return null; // Enabled for desktop as per request

    const swipeText = activeTab === 'voice' ? 'Swipe to chat' : 'Swipe to voice';
    const arrowDirection = activeTab === 'voice' ? '→' : '←';

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="flex justify-center w-full mb-4"
        >
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 shadow-lg">
                <motion.div
                    animate={{ x: activeTab === 'voice' ? [0, 3, 0] : [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-xs font-bold"
                >
                    {arrowDirection}
                </motion.div>
                <span className="text-white/90 text-[10px] font-semibold tracking-wide whitespace-nowrap">{swipeText}</span>
            </div>
        </motion.div>
    );
};

export default function DMDemo() {
    const [activeTab, setActiveTab] = useState<'voice' | 'text'>('voice');
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const isMobile = useIsMobile();

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && activeTab === 'voice') {
            setActiveTab('text');
        }
        if (isRightSwipe && activeTab === 'text') {
            setActiveTab('voice');
        }
    };

    // Mouse Event Handlers for Desktop Swipe
    const onMouseDown = (e: React.MouseEvent) => {
        setTouchEnd(null);
        setTouchStart(e.clientX);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        // Only track move if mouse is down (simulated by checking if touchStart is set)
        if (touchStart !== null) {
             setTouchEnd(e.clientX);
        }
    };

    const onMouseUp = () => {
        onTouchEnd(); // Reuse the same logic
        setTouchStart(null); // Reset
        setTouchEnd(null);
    };

    const onMouseLeave = () => {
        setTouchStart(null);
        setTouchEnd(null);
    }

    const handleTabChange = (tab: 'voice' | 'text') => {
        setActiveTab(tab);
    };

    return (
        <section id="demo" className="py-12 bg-black overflow-hidden relative">
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
                        <ToggleSwitch activeTab={activeTab} onChange={handleTabChange} />
                    </div>
                </div>

                <div 
                    id="demo-interactive" 
                    className="flex flex-col items-center relative min-h-[800px]"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                >
                    {/* Swipe Indicator */}
                    <SwipeIndicator activeTab={activeTab} />

                    {/* Demos */}
                    <div className="w-full max-w-[500px] mb-12 relative">
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