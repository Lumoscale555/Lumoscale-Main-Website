import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const FAQS = [
    {
        question: "Will this sound robotic or is it actually human-like?",
        answer: "We clone your voice and train the AI on your actual conversations—tone, style, language. Most people can't tell it's AI.",
        category: "Quality"
    },
    {
        question: "Is this safe? Will my accounts or phone lines get flagged?",
        answer: "Completely safe. We follow all platform and telephony compliance guidelines. Thousands of conversations run daily without any issues.",
        category: "Security"
    },
    {
        question: "How much setup time do I need to invest?",
        answer: "Zero. We handle everything—setup, training, integrations, voice cloning. You're live in 5-7 days with under 2 hours of your time.",
        category: "Onboarding"
    },
    {
        question: "What happens to my existing leads during the transition?",
        answer: "Nothing changes for them—they just get faster responses. We import your data so the AI continues seamlessly where you left off.",
        category: "Transition"
    },
    {
        question: "How is this different from hiring a VA or receptionist?",
        answer: "A VA costs $3K-5K/month, works 40 hours, handles one conversation at a time. Our AI works 24/7, handles unlimited conversations simultaneously, and costs a fraction.",
        category: "Comparison"
    },
    {
        question: "How do you qualify leads? What stops unqualified people from booking?",
        answer: "The AI asks YOUR qualifying questions (budget, timeline, needs) and uses intent detection. Only serious, pre-qualified prospects get booked into your calendar.",
        category: "Process"
    },
    {
        question: "What if I want to handle a conversation myself?",
        answer: "The AI transfers calls to you instantly or flags messages for your review. You stay in control and only handle what truly needs your attention.",
        category: "Control"
    },
    {
        question: "How is this different from ManyChat, chatbots, or call center software?",
        answer: "Those are DIY tools you manage. We're a done-for-you service—we build, train, optimize, and monitor everything. You get a growth partner, not just software.",
        category: "Service"
    },
    {
        question: "Do I need to manage or monitor the system daily?",
        answer: "Nope. It runs on autopilot. Check your custom dashboard whenever you want, but we handle all monitoring, updates, and optimization in the background.",
        category: "Management"
    },
    {
        question: "How do I know if this is right for my business?",
        answer: "Book a 15-minute strategy call. We'll review your current process, show you a live demo tailored to your business, and you'll know immediately if this is your growth unlock.",
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