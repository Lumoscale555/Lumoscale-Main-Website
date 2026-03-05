import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, X, Send, Mic, Minimize2, User, Bot, ArrowRight } from "lucide-react";

type Tab = 'chat' | 'call';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('chat');
    
    // Chat State
    const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const sessionId = useRef(`session-${Math.random().toString(36).substring(7)}`).current;
    
    // Call State
    const [isCallActive, setIsCallActive] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const toggleCall = () => {
        setIsCallActive(!isCallActive);
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
                                        className="h-full flex flex-col items-center justify-center p-6 text-center"
                                    >
                                        <div className="relative mb-8">
                                            {/* Ripple Animation */}
                                            {isCallActive && (
                                                <>
                                                    <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                                                    <div className="absolute -inset-4 rounded-full bg-blue-500/10 animate-pulse delay-75" />
                                                </>
                                            )}

                                            <div className="w-24 h-24 rounded-full bg-black border border-blue-500/20 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                                                <Bot className="w-10 h-10 text-blue-400" />
                                            </div>

                                            {isCallActive && (
                                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[#09090b] z-20">
                                                    <Mic className="w-4 h-4 text-white animate-pulse" />
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {isCallActive ? "Talking with AI..." : "Start Voice Call"}
                                        </h3>
                                        <p className="text-xs text-zinc-400 max-w-[240px] mx-auto mb-8 leading-relaxed">
                                            {isCallActive
                                                ? "Ask about our services, pricing, or technical details."
                                                : "Experience our ultra-low latency voice AI agent."
                                            }
                                        </p>

                                        {isCallActive ? (
                                            <div className="w-full space-y-6">
                                                {/* Waveform Visualization */}
                                                <div className="flex items-center justify-center gap-1 h-8">
                                                    {[...Array(6)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{
                                                                height: [8, 24, 8],
                                                                opacity: [0.3, 1, 0.3]
                                                            }}
                                                            transition={{
                                                                duration: 0.8,
                                                                repeat: Infinity,
                                                                delay: i * 0.1,
                                                                ease: "easeInOut"
                                                            }}
                                                            className="w-1 bg-blue-400 rounded-full"
                                                        />
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={toggleCall}
                                                    className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-sm"
                                                >
                                                    <Phone className="w-4 h-4 fill-current" />
                                                    End Call
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={toggleCall}
                                                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 text-sm"
                                            >
                                                <Phone className="w-4 h-4 fill-current" />
                                                Start Call
                                            </button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                    w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative group pointer-events-auto
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
    );
}
