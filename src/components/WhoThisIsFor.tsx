import { motion } from "framer-motion";
import { Users, User, MessageSquare } from "lucide-react";

const segments = [
    {
        icon: Users,
        title: "Coaches and Consultants",
        subtitle: "Selling high-value services",
        points: [
            "High-value or premium offers",
            "Sales begin inside Instagram DMs",
            "Missed replies mean lost revenue"
        ]
    },
    {
        icon: User,
        title: "Solo Founders or Small Teams",
        subtitle: "Replies depend on availability",
        points: [
            "Inconsistent responses",
            "No system ownership",
            "Conversations die when people are busy"
        ]
    },
    {
        icon: MessageSquare,
        title: "Instagram-Dependent Businesses",
        subtitle: "DMs drive your sales",
        points: [
            "DMs are your primary enquiry channel",
            "No scalable system in place",
            "Growth creates chaos"
        ]
    }
];

const WhoThisIsFor = () => {
    return (
        <section id="who" className="py-24 lg:py-32 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="stat-pill mb-4">
                        Ideal Customer Profile
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-4 tracking-tight">
                        Built for businesses where{" "}
                        <span className="text-gradient">DMs drive revenue</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {segments.map((segment, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="card-premium p-6"
                        >
                            <div className="icon-glow mb-5">
                                <segment.icon className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                                {segment.title}
                            </h3>
                            <p className="text-sm text-purple-400 mb-5">{segment.subtitle}</p>
                            <ul className="space-y-3">
                                {segment.points.map((point, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoThisIsFor;
