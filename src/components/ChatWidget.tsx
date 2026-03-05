import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, X, Send, Mic, Minimize2, User, Bot, ArrowRight } from "lucide-react";
import { RetellWebClient } from "retell-client-js-sdk";

const retellWebClient = new RetellWebClient();

type Tab = 'chat' | 'call';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('chat');
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [showLabelOnLoad, setShowLabelOnLoad] = useState(true);
    
    // Chat State
    const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const sessionId = useRef(`session-${Math.random().toString(36).substring(7)}`).current;
    
    // Call State
    const [isCallActive, setIsCallActive] = useState(false);
    const [isAgentTalking, setIsAgentTalking] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [callDuration, setCallDuration] = useState(150);
    const [dailyCalls, setDailyCalls] = useState(0);
    const MAX_DAILY_CALLS = 2;
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const fetchDailyCalls = () => {
        try {
            const stored = localStorage.getItem('lumoscale_voice_calls');
            if (stored) {
                const data = JSON.parse(stored);
                const today = new Date().toDateString();
                if (data.date === today) {
                    setDailyCalls(data.count);
                } else {
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

    // Setup Retell Event Listeners
    useEffect(() => {
        retellWebClient.on("call_started", () => {
            setIsCallActive(true);
            setIsInitializing(false);
        });

        retellWebClient.on("call_ended", () => {
            setIsCallActive(false);
            setIsAgentTalking(false);
            setIsInitializing(false);
        });

        retellWebClient.on("agent_start_talking", () => setIsAgentTalking(true));
        retellWebClient.on("agent_stop_talking", () => setIsAgentTalking(false));

        retellWebClient.on("error", (error) => {
            console.error("Retell Error:", error);
            setIsCallActive(false);
            setIsInitializing(false);
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

    // Auto-hide the label after 3 seconds on page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLabelOnLoad(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = inputValue.trim();

        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInputValue("");
        setIsTyping(true);

        try {
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
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsTyping(false);
        }
    };

    const handleStartCall = async () => {
        if (dailyCalls >= MAX_DAILY_CALLS) {
            alert(`You have reached the daily limit of ${MAX_DAILY_CALLS} demo calls. Please try again tomorrow!`);
            return;
        }

        setIsInitializing(true);
        try {
            const YOUR_N8N_WEBHOOK_URL = "https://n8n.srv1011051.hstgr.cloud/webhook/8a593fb4-49b5-4301-8ad2-e64a1ec98f48"; 
            const response = await fetch(YOUR_N8N_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            
            if (!response.ok) throw new Error("Failed to fetch access token from webhook");
            const data = await response.json();
            const accessToken = data.access_token || data.accessToken || data.token; 
            
            if (!accessToken) throw new Error("No access token found in webhook response");

            try {
                const newCount = dailyCalls + 1;
                localStorage.setItem('lumoscale_voice_calls', JSON.stringify({ 
                    date: new Date().toDateString(), 
                    count: newCount 
                }));
                setDailyCalls(newCount);
                window.dispatchEvent(new Event('lumoscale_voice_calls_updated'));
            } catch(e) { console.error(e) }

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

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-sans antialiased pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-[340px] h-[500px] bg-zinc-950/80 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-black/40">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#09090b] rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">Lumoscale Assistant</h3>
                                    <p className="text-zinc-500 text-xs">Always active</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-zinc-500 transition-colors"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="px-5 pt-4 pb-2">
                            <div className="p-1 bg-zinc-900/50 rounded-xl grid grid-cols-2 gap-1 border border-white/5">
                                <button
                                    onClick={() => setActiveTab('chat')}
                                    className={`
                                        flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium transition-all
                                        ${activeTab === 'chat'
                                            ? 'bg-white/10 text-white shadow-sm border border-white/5'
                                            : 'text-zinc-500 hover:text-zinc-300'
                                        }
                                    `}
                                >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    Live Chat
                                </button>
                                <button
                                    onClick={() => setActiveTab('call')}
                                    className={`
                                        flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium transition-all
                                        ${activeTab === 'call'
                                            ? 'bg-white/10 text-white shadow-sm border border-white/5'
                                            : 'text-zinc-500 hover:text-zinc-300'
                                        }
                                    `}
                                >
                                    <Phone className="w-3.5 h-3.5" />
                                    Live Call
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-hidden relative bg-gradient-to-b from-transparent to-black/40">
                            <AnimatePresence mode="wait">
                                {activeTab === 'chat' ? (
                                    <motion.div
                                        key="chat"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="h-full flex flex-col"
                                    >
                                        {/* Messages */}
                                        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
                                            {messages.length === 0 && (
                                                <div className="flex flex-col items-center justify-center h-full text-center opacity-50 pb-10">
                                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                                        <MessageSquare className="w-8 h-8 text-zinc-500" />
                                                    </div>
                                                    <p className="text-sm text-zinc-400">Start a conversation...</p>
                                                </div>
                                            )}
                                            
                                            {messages.map((msg, idx) => (
                                                
                                                <motion.div
                                                    key={idx}
                                                    layout
                                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                                                >
                                                    {msg.sender === 'ai' && (
                                                        <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10 shrink-0 flex items-center justify-center bg-zinc-900 shadow-sm mt-1">
                                                            <Bot className="w-3.5 h-3.5 text-blue-400" />
                                                        </div>
                                                    )}
                                                    <div
                                                        className={`
                                                            max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed
                                                            ${msg.sender === 'user'
                                                                ? 'bg-blue-600/10 text-blue-50 border border-blue-500/20 rounded-tr-sm shadow-[0_0_15px_rgba(37,99,235,0.05)]'
                                                                : 'bg-white/5 backdrop-blur-md text-zinc-200 border border-white/5 rounded-tl-sm shadow-sm'
                                                            }
                                                        `}
                                                    >
                                                        <p className="whitespace-pre-wrap">
                                                            {msg.text.includes('https://') ? (
                                                                <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/(https:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/30 transition-colors font-medium">$1</a>') }} />
                                                            ) : msg.text}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}

                                            {isTyping && (
                                                <motion.div 
                                                    layout
                                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex gap-3 items-start"
                                                >
                                                    <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10 shrink-0 flex items-center justify-center bg-zinc-900 mt-1">
                                                         <Bot className="w-3.5 h-3.5 text-blue-400" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="bg-white/5 px-3 py-2.5 rounded-2xl rounded-tl-sm border border-white/5 backdrop-blur-sm">
                                                            <div className="flex gap-1 opacity-60">
                                                                <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce" />
                                                                <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce delay-75" />
                                                                <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce delay-150" />
                                                            </div>
                                                        </div>
                                                        <span className="text-[10px] text-zinc-500 px-1 italic">AI is typing...</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                            <div ref={messagesEndRef} />
                                        </div>

                                        {/* Input */}
                                        <div className="p-4 border-t border-white/5 bg-zinc-900/50 backdrop-blur-md">
                                            <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-2 py-1.5 focus-within:bg-white/10 focus-within:border-white/10 transition-all duration-300 shadow-inner">
                                                <input
                                                    type="text"
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(e)}
                                                    placeholder="Ask anything..."
                                                    className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
                                                />
                                                <button
                                                    onClick={(e) => handleSendMessage(e as any)}
                                                    disabled={!inputValue.trim() || isTyping}
                                                    className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-400 transition-all disabled:opacity-20 disabled:scale-95 shadow-lg shadow-blue-500/20"
                                                >
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <p className="text-center text-[10px] text-zinc-600 mt-2 font-medium tracking-wide">
                                                Powered by Lumoscale AI
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="call"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="h-full flex flex-col relative overflow-hidden bg-black font-sans"
                                    >
                                        {/* Exact Voice Agent Ethereal UI adapted for widget */}
                                        <div className="absolute inset-0 bg-black pointer-events-none -z-10" />

                                        {/* Premium Countdown Timer (Only visible when active) */}
                                        <div className="h-[60px] flex items-end justify-center pb-4 mt-2">
                                            <AnimatePresence>
                                                {isCallActive && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        className="text-center flex flex-col items-center"
                                                    >
                                                        <div className="px-4 py-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2">
                                                            <div className="flex gap-1">
                                                                <motion.div
                                                                    animate={{ opacity: [1, 0.3, 1] }}
                                                                    transition={{ duration: 2, repeat: Infinity }}
                                                                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                                                                />
                                                            </div>
                                                            <span className="text-xl font-mono tracking-widest text-white/90">
                                                                {Math.floor(callDuration / 60).toString().padStart(2, '0')}:{ (callDuration % 60).toString().padStart(2, '0') }
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        
                                        {/* The "AI Core" 3D Gyroscope Visualizer */}
                                        <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
                                            <div className="relative z-20 flex items-center justify-center w-[160px] h-[160px]" style={{ perspective: '800px' }}>
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
                                                        className={`absolute w-[140px] h-[140px] rounded-full border border-white/5 shadow-[0_0_30px_rgba(255,255,255,0.02)]`}
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
                                                        className="absolute w-[100px] h-[100px] rounded-full border border-white/10 backdrop-blur-[1px]"
                                                        style={{ transformStyle: 'preserve-3d' }}
                                                    />

                                                    {/* Inner Core Orb */}
                                                    <motion.div
                                                        animate={isCallActive ? {
                                                            scale: isAgentTalking ? [1, 1.2, 1] : [1, 1.05, 1],
                                                            boxShadow: isAgentTalking 
                                                                ? '0 0 40px rgba(52,211,153,0.6), inset 0 0 20px rgba(52,211,153,0.5)' 
                                                                : '0 0 30px rgba(56,189,248,0.3), inset 0 0 10px rgba(56,189,248,0.2)',
                                                            background: isAgentTalking 
                                                                ? 'rgba(16,185,129,0.1)' 
                                                                : 'rgba(14,165,233,0.05)'
                                                        } : { scale: 1, boxShadow: '0 0 20px rgba(255,255,255,0.05)', background: 'transparent' }}
                                                        transition={{ duration: isAgentTalking ? 0.3 : 2, repeat: Infinity, ease: "easeInOut" }}
                                                        className="absolute w-[60px] h-[60px] rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md"
                                                    >
                                                        {!isCallActive ? (
                                                            <Mic className="w-4 h-4 text-white/50" strokeWidth={1} />
                                                        ) : (
                                                            <div className="flex gap-1 items-center justify-center h-full">
                                                                {[1, 2, 3].map((i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        animate={{
                                                                            height: isAgentTalking ? [3, 12 + Math.random() * 6, 3] : 3,
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

                                            {/* Cinematic Typography */}
                                            <div className="text-center z-20 relative w-full px-4 mt-6">
                                                <AnimatePresence mode="wait">
                                                    <motion.h2 
                                                        key={isCallActive ? (isAgentTalking ? 'analyzing' : 'awaiting') : 'initiate'}
                                                        initial={{ opacity: 0, letterSpacing: '0.05em' }}
                                                        animate={{ opacity: 1, letterSpacing: '0.15em' }}
                                                        exit={{ opacity: 0, letterSpacing: '0.2em' }}
                                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                                        className="text-[13px] font-bold text-white mb-1 uppercase"
                                                    >
                                                        {!isCallActive ? "Awaiting Initiation" : (isAgentTalking ? "Analyzing Input" : "Listening")}
                                                    </motion.h2>
                                                </AnimatePresence>
                                                
                                                {/* Subtitle / Transcript Peek */}
                                                <motion.div 
                                                    className="h-6 flex items-center justify-center overflow-hidden"
                                                    animate={{ opacity: isCallActive ? 1 : 0.8 }}
                                                >
                                                    <p className="text-[11px] text-zinc-400 font-medium tracking-wide">
                                                        {!isCallActive ? "Establish Neural Link" : (isAgentTalking ? "Agent dictates..." : "Signal received...")}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Bottom Action Area */}
                                        <div className="w-full px-6 pb-6 mt-auto relative z-20 flex justify-center">
                                            <AnimatePresence mode="wait">
                                                {!isCallActive ? (
                                                    <motion.div 
                                                        key="start-btn"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                                        className="w-full flex flex-col gap-4 items-center"
                                                    >
                                                        <div className="flex items-center gap-2 opacity-80">
                                                            <div className="w-3 h-3 rounded-full border border-white/50 flex items-center justify-center">
                                                                <div className="w-1 h-1 bg-white rounded-full" />
                                                            </div>
                                                            <span className="text-[9px] font-semibold text-zinc-300 uppercase tracking-widest">Mic Permission Auth</span>
                                                        </div>
                                                        <button
                                                            onClick={handleStartCall}
                                                            disabled={isInitializing || dailyCalls >= MAX_DAILY_CALLS}
                                                            className={`relative w-full group overflow-hidden ${
                                                                dailyCalls >= MAX_DAILY_CALLS 
                                                                ? 'bg-zinc-800 border border-zinc-700 cursor-not-allowed opacity-70' 
                                                                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 border border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                                            } transition-all duration-500 py-3 rounded-full flex items-center justify-center gap-2`}
                                                        >
                                                            {dailyCalls >= MAX_DAILY_CALLS ? (
                                                                <div className="w-2 h-2 rounded-full bg-zinc-500" />
                                                            ) : isInitializing ? (
                                                                <div className="w-3 h-3 rounded-full border-t-2 border-white animate-spin" />
                                                            ) : (
                                                                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                                                            )}
                                                            <span className={`font-bold text-[11px] tracking-[0.1em] ${dailyCalls >= MAX_DAILY_CALLS ? 'text-zinc-400' : 'text-white'}`}>
                                                                {dailyCalls >= MAX_DAILY_CALLS ? "LIMIT REACHED" : isInitializing ? "CONNECTING..." : "TALK TO AI"}
                                                            </span>
                                                            {dailyCalls < MAX_DAILY_CALLS && (
                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                                            )}
                                                        </button>
                                                        
                                                        {dailyCalls > 0 && dailyCalls < MAX_DAILY_CALLS && (
                                                            <p className="text-[9px] text-zinc-500 font-mono absolute -bottom-5">
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
                                                        className="w-full flex flex-col gap-4 items-center"
                                                    >
                                                        <div className="flex items-center gap-2 opacity-80">
                                                            <div className="w-3 h-3 rounded-full border border-red-500/50 flex items-center justify-center">
                                                                <motion.div
                                                                    animate={{ opacity: [1, 0.5, 1] }}
                                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                                    className="w-1 h-1 bg-red-500 rounded-full"
                                                                />
                                                            </div>
                                                            <span className="text-[9px] font-semibold text-red-400 uppercase tracking-widest">Active Link</span>
                                                        </div>
                                                        <button
                                                            onClick={handleEndCall}
                                                            className="relative w-full group overflow-hidden bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 border border-red-400/50 transition-all duration-500 py-3 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                                                        >
                                                            <div className="w-2.5 h-2.5 rounded-sm bg-white shadow-[0_0_10px_white]" />
                                                            <span className="font-bold text-[11px] tracking-[0.1em] text-white">
                                                                END CALL
                                                            </span>
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button with Hover Label */}
            <div className="relative pointer-events-auto flex items-center gap-3">
                {/* Hover Label - Smooth & Simple */}
                <AnimatePresence>
                    {!isOpen && isButtonHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 10, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 5, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-full mr-4 pointer-events-none flex items-center"
                        >
                            <div className="relative flex items-center gap-3 px-4 py-2.5 bg-black/90 border border-white/10 rounded-xl shadow-lg backdrop-blur-md">
                                
                                {/* Status Dot */}
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                
                                {/* Simple Text */}
                                <span className="text-sm font-medium text-white whitespace-nowrap">
                                    Need help?
                                </span>

                                {/* Connector Arrow */}
                                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-black/90 border-r border-t border-white/10 rotate-45 transform"></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                        w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative
                        ${isOpen
                            ? 'bg-zinc-800 text-white rotate-90'
                            : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/30'
                        }
                    `}
                >
                    {/* Pulse ring when closed */}
                    {!isOpen && (
                        <span className="absolute inset-0 rounded-full border border-blue-400/50 animate-ping [animation-duration:2s]" />
                    )}

                    {isOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <MessageSquare className="w-6 h-6 fill-current" />
                    )}
                </motion.button>
            </div>
        </div>
    );
}
