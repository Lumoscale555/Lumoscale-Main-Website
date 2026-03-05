import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle, ShieldCheck, Zap, Users, Clock, ToggleRight, Layers, EyeOff, TrendingUp, CreditCard } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const FAQS = [
    {
        question: "Will this sound robotic or is it actually human-like?",
        answer: "This isn't a basic chatbot or DIY tool—it's an end-to-end done-for-you system. We train the AI on YOUR successful conversations (your tone, language, style), so it sounds exactly like you, not a generic bot.",
        icon: MessageCircle
    },
    {
        question: "Is Instagram DM automation safe? Will my account get banned?",
        answer: "100% safe. We use Meta's official Instagram Graph API, fully compliant with Instagram's terms. We only access Instagram messages—nothing else from your account.",
        icon: ShieldCheck
    },
    {
        question: "How much setup time do I need to invest?",
        answer: "Zero. This is a totally done-for-you service—one 30-minute kickoff call to understand your offer, and we handle everything else. You're live in 3 days.",
        icon: Clock
    },
    {
        question: "What happens to my existing leads/customers during the transition?",
        answer: "Nothing changes for them—they still message you normally on Instagram. We just handle the replies behind the scenes, so conversations feel seamless and uninterrupted.",
        icon: Users
    },
    {
        question: "How is this different from hiring a VA?",
        answer: "VAs work limited hours and need constant management. With our system, you get 24/7 availability with zero management, plus pre-call intelligence that shows you exactly who's serious before you even say hello—VAs can't provide that level of insight.",
        icon: Zap
    },
    {
        question: "How do you qualify leads? What stops unqualified people from booking?",
        answer: "The system automatically sorts every lead into three categories: qualified (ready to buy), unqualified (not a fit), or freebie-seekers. You only see qualified prospects on your calendar—the rest get nurtured or exited appropriately.",
        icon: HelpCircle
    },
    {
        question: "What if I want to handle a DM myself or talk to someone personally?",
        answer: "You have full control. Switch between \"handle by system\" and \"handle manually\" anytime with one click. Once you're done with manual handling, click back to system mode—complete flexibility.",
        icon: ToggleRight
    },
    {
        question: "How is this different from ManyChat, chatbots, or other DM automation tools?",
        answer: "Tools like ManyChat and chatbots require you to build, manage, and fix everything yourself (10-15 hours monthly). We're a complete done-for-you service—trained on YOUR conversations, fully managed, continuously optimized—you do zero work.",
        icon: Layers
    },
    {
        question: "Do I need to manage or monitor the system daily?",
        answer: "No. This is completely hands-off—we handle replies, qualification, follow-ups, and optimization. You just review the dashboard when convenient and take qualified calls. Zero daily management required.",
        icon: EyeOff
    },

    {
        question: "What if I get 500 DMs one month and 50 the next? Do I pay more?",
        answer: "No. Same fixed price regardless of volume fluctuations—unlike other service agencies that charge per contact or per message. You pay one flat rate whether you get 10 or 500 DMs.",
        icon: CreditCard
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const isMobile = useIsMobile();

    return (
        <section id="faq" className="relative py-10 bg-[#050505] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-medium text-white/50 uppercase tracking-widest">Common Questions</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Everything You Need to Know
                    </motion.h2>
                </div>

                {/* FAQ List - Clean Minimal Design */}
                <div className="space-y-1">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <FAQItem
                                key={index}
                                faq={faq}
                                isOpen={isOpen}
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                index={index}
                            />
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

// Clean Row Component
const FAQItem = ({ faq, isOpen, onClick, index }: { faq: any, isOpen: boolean, onClick: () => void, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className={`
                group border-b border-white/10 transition-colors duration-300
                ${isOpen ? "border-white/20 bg-white/[0.02]" : "hover:bg-white/[0.01]"}
            `}
        >
            <div
                onClick={onClick}
                className="py-6 px-4 md:px-6 cursor-pointer"
            >
                <div className="flex items-start gap-5">

                    {/* Minimal Icon */}
                    <div className={`mt-1 hidden md:flex items-center justify-center transition-colors duration-300 ${isOpen ? "text-primary/80" : "text-white/20 group-hover:text-white/40"}`}>
                        <faq.icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-center gap-4">
                            <h3 className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                                {faq.question}
                            </h3>
                            <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                                <Plus className={`w-4 h-4 transition-colors ${isOpen ? "text-primary" : "text-white/30"}`} />
                            </div>
                        </div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="pt-4 text-white/50 leading-relaxed text-sm md:text-base">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FAQ;
