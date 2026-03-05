import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const FAQS = [
    {
        question: "Does it actually sound like me or will people know it's AI?",
        answer: "We clone your exact voice in 30 seconds. 95% accuracy. Most people genuinely can't tell the difference. It sounds like you, talks like you, even pauses like you.",
        category: "Quality"
    },
    {
        question: "Is this legal? Will my Instagram, WhatsApp, or phone number get banned?",
        answer: "100% safe and compliant. We use official Meta API for Instagram and WhatsApp (verified business accounts). Fully HIPAA compliant for healthcare. Follow all telephony regulations. Zero risk of bans or flags.",
        category: "Security"
    },
    {
        question: "How much of my time does this actually take?",
        answer: "Under 2 hours total. Record a 30-second voice sample, one feedback call, done. We handle everything else. Live in 3 days, not weeks.",
        category: "Onboarding"
    },
    {
        question: "Why wouldn't I just hire someone instead?",
        answer: "A VA or receptionist at $500-800/month works 8 hours a day, 5 days a week, handles one call at a time, takes sick days, needs training, and quits. Our AI costs similar or less, works 24/7/365, handles 100+ conversations simultaneously, never calls in sick, and gets better every week.",
        category: "Comparison"
    },
    {
        question: "How do you stop random people or tire-kickers from booking my calendar?",
        answer: "The AI asks your exact qualifying questions: budget, timeline, decision-making authority, specific needs, whatever matters to you. Only pre-qualified, serious prospects get through. Time-wasters get politely filtered out automatically.",
        category: "Process"
    },
    {
        question: "What if the AI doesn't know how to answer something?",
        answer: "It transfers to you instantly with the full conversation summary. You never start from scratch. You stay in control and only handle what actually needs you.",
        category: "Control"
    },
    {
        question: "How is this different from ManyChat, chatbots, Dialpad, or other tools?",
        answer: "Those are DIY platforms. You build it, manage it, fix it, optimize it. We're done-for-you. We build your custom AI, clone your voice, write the scripts, integrate everything, monitor performance, and optimize weekly. You get a dedicated growth partner, not software you have to figure out.",
        category: "Service"
    },
    {
        question: "Do I need to manage or monitor the system daily?",
        answer: "Zero daily management. It runs completely on autopilot. Check your dashboard for insights whenever you want. We handle all monitoring, script updates, performance optimization, and technical maintenance in the background.",
        category: "Management"
    },
    {
        question: "What if I want to change how the AI responds or add new services?",
        answer: "Just tell us. We update scripts, add new services, or change responses within 24-48 hours. Unlimited revisions. As your business evolves, your AI evolves with it.",
        category: "Flexibility"
    },
    {
        question: "How do I know this will actually work for MY specific business?",
        answer: "Book a free 15-minute strategy call. We'll review your current lead flow, show you a custom demo for your industry, and you'll see exactly how it works for your business. No pitch, just honest assessment.",
        category: "Next Steps"
    }
];

const FAQItem = ({ faq, index, isOpen, onClick }: { faq: typeof FAQS[0], index: number, isOpen: boolean, onClick: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={onClick}
            className={`
                relative p-1 rounded-2xl cursor-pointer bg-gradient-to-br from-white/10 to-white/0 
                hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-500
                ${isOpen ? 'from-emerald-500/20 to-blue-500/20' : ''}
            `}
        >
            <div className={`
                relative h-full bg-zinc-950/90 backdrop-blur-xl rounded-xl p-6 border border-white/5
                hover:bg-zinc-900/90 transition-all duration-300 overflow-hidden
            `}>
                {/* Glow Effect */}
                {isOpen && (
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none" />
                )}

                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <h3 className={`text-base font-semibold leading-relaxed transition-colors ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                            {faq.question}
                        </h3>
                    </div>
                    <div className={`
                        shrink-0 w-6 h-6 flex items-center justify-center rounded-full mt-0.5
                        ${isOpen ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'}
                        transition-all duration-300
                    `}>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </motion.div>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="pt-3 text-zinc-400 text-sm leading-relaxed font-light">
                                {faq.answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-black relative overflow-hidden">
            {/* Background Mesh Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-emerald-900/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Sticky Header Side */}
                    <div className="lg:sticky lg:top-32 lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                                Everything you <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">
                                    need to know.
                                </span>
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                                No hidden details. Just clear answers to help you decide.
                            </p>

                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-zinc-900/50 border border-white/10 rounded-full px-4 py-2 hover:bg-zinc-800 transition-colors cursor-pointer group">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Support Online
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-emerald-500" />
                            </div>
                        </motion.div>
                    </div>

                    {/* FAQ Grid Side */}
                    <div className="lg:w-2/3 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {FAQS.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    faq={faq}
                                    index={index}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}   