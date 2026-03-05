import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, X, Send, Mic, Radio, Minimize2, Video, Volume2, User } from "lucide-react";

type Tab = 'chat' | 'call';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('chat');
    const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'ai' }[]>([
        { text: "Hi there! I'm Lumoscale's AI assistant. How can I help you automate your business today?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isCallActive, setIsCallActive] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const newMessages = [...messages, { text: inputValue, sender: 'user' as const }];
        setMessages(newMessages);
        setInputValue("");

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "That's a great question! Our AI agents can handle thousands of concurrent interactions 24/7. Would you like to see a demo of our Voice Agent?",
                sender: 'ai'
            }]);
        }, 1000);
    };

    const toggleCall = () => {
        setIsCallActive(!isCallActive);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans antialiased">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-[380px] h-[600px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-950">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-zinc-950 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">Lumoscale Assistant</h3>
                                    <p className="text-zinc-500 text-xs">Always active</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-zinc-500 transition-colors"
                                >
                                    <Minimize2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="px-5 pt-4 pb-2">
                            <div className="p-1 bg-zinc-900 rounded-xl grid grid-cols-2 gap-1 border border-zinc-800">
                                <button
                                    onClick={() => setActiveTab('chat')}
                                    className={`
                                        flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
                                        ${activeTab === 'chat'
                                            ? 'bg-zinc-800 text-white shadow-sm'
                                            : 'text-zinc-500 hover:text-zinc-300'
                                        }
                                    `}
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Live Chat
                                </button>
                                <button
                                    onClick={() => setActiveTab('call')}
                                    className={`
                                        flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
                                        ${activeTab === 'call'
                                            ? 'bg-zinc-800 text-white shadow-sm'
                                            : 'text-zinc-500 hover:text-zinc-300'
                                        }
                                    `}
                                >
                                    <Phone className="w-4 h-4" />
                                    Live Call
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-hidden relative">
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
                                            {messages.map((msg, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`
                                                            max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                                                            ${msg.sender === 'user'
                                                                ? 'bg-white text-zinc-950 rounded-br-sm font-medium'
                                                                : 'bg-zinc-900 text-zinc-300 rounded-bl-sm border border-zinc-800'
                                                            }
                                                        `}
                                                    >
                                                        {msg.text}
                                                    </div>
                                                </div>
                                            ))}
                                            <div ref={messagesEndRef} />
                                        </div>

                                        {/* Input */}
                                        <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
                                            <form
                                                onSubmit={handleSendMessage}
                                                className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 focus-within:ring-1 focus-within:ring-white/20 transition-all"
                                            >
                                                <input
                                                    type="text"
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    placeholder="Ask anything..."
                                                    className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 outline-none"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={!inputValue.trim()}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-black disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all hover:scale-105 active:scale-95"
                                                >
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </form>
                                            <p className="text-center text-[10px] text-zinc-600 mt-2">
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
                                                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                                                    <div className="absolute -inset-4 rounded-full bg-emerald-500/10 animate-pulse delay-75" />
                                                </>
                                            )}

                                            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center relative z-10">
                                                <User className="w-10 h-10 text-zinc-500" />
                                            </div>

                                            {isCallActive && (
                                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-zinc-950 z-20">
                                                    <Mic className="w-4 h-4 text-black animate-pulse" />
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-medium text-white mb-2">
                                            {isCallActive ? "Talking with AI Agent..." : "Start a Voice Call"}
                                        </h3>
                                        <p className="text-sm text-zinc-400 max-w-[260px] mx-auto mb-8 leading-relaxed">
                                            {isCallActive
                                                ? "Ask about our services, pricing, or technical details."
                                                : "Experience our ultra-low latency voice AI. Talk naturally, just like a human."
                                            }
                                        </p>

                                        {isCallActive ? (
                                            <div className="w-full space-y-6">
                                                {/* Waveform Visualization */}
                                                <div className="flex items-center justify-center gap-1 h-12">
                                                    {[...Array(8)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{
                                                                height: [12, 32, 12],
                                                                opacity: [0.5, 1, 0.5]
                                                            }}
                                                            transition={{
                                                                duration: 1,
                                                                repeat: Infinity,
                                                                delay: i * 0.1,
                                                                ease: "easeInOut"
                                                            }}
                                                            className="w-1.5 bg-emerald-500 rounded-full"
                                                        />
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={toggleCall}
                                                    className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl font-medium flex items-center justify-center gap-2 transition-all group"
                                                >
                                                    <Phone className="w-5 h-5 fill-current" />
                                                    End Call
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={toggleCall}
                                                className="w-full py-4 bg-white hover:bg-zinc-200 text-black rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/5 active:scale-[0.98]"
                                            >
                                                <Phone className="w-5 h-5 fill-current" />
                                                Start Live Call
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
                    w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative group
                    ${isOpen
                        ? 'bg-zinc-800 text-white rotate-90'
                        : 'bg-white text-black hover:bg-zinc-100' // High visibility
                    }
                `}
            >
                {/* Pulse ring when closed */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full border border-white/20 animate-ping [animation-duration:2s]" />
                )}

                {isOpen ? (
                    <X className="w-7 h-7" />
                ) : (
                    <MessageSquare className="w-7 h-7 fill-current" />
                )}
            </motion.button>
        </div>
    );
}
