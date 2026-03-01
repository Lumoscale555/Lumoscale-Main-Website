import React from "react";
import { motion } from "framer-motion";
import { PhoneIncoming, PhoneOutgoing, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";



// Custom WhatsApp Icon
const WhatsAppIcon = ({ className, strokeWidth }: { className?: string, strokeWidth?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth || 2} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const services = [
  {
    icon: PhoneIncoming,
    title: "AI Receptionist",
    description: "Never miss a call. Answers 24/7, books appointments, and qualifies leads.",
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "group-hover:border-blue-500/30",
    text: "group-hover:text-blue-400",
    iconColor: "text-blue-400",
    link: "/ai-receptionist",
    featureCount: "12 Features",
    highlights: ["24/7 Answering", "Voice Cloning", "CRM Integration"]
  },
  {
    icon: PhoneOutgoing,
    title: "AI Voice SDR",
    description: "Calls leads within minutes. Qualifies prospects and transfers hot leads instantly.",
    gradient: "from-purple-500/20 to-purple-600/5",
    border: "group-hover:border-purple-500/30",
    text: "group-hover:text-purple-400",
    iconColor: "text-purple-400",
    link: "/ai-voice-sdr",
    featureCount: "12 Features",
    highlights: ["5min Follow-up", "Auto Sequences", "Live Transfer"]
  },
  {
    icon: MessageSquare,
    title: "AI DM Agents",
    description: "Instant responses across Instagram, Facebook, and WhatsApp.",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "group-hover:border-emerald-500/30",
    text: "group-hover:text-emerald-400",
    iconColor: "text-emerald-400",
    link: "/ai-text-agents",
    featureCount: "12 Features",
    highlights: ["Instagram", "Facebook", "WhatsApp"]
  }
];

const Services = () => {
  return (
    <section id="services" className="relative py-12 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="py-2 px-4 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-zinc-400 font-medium tracking-wide">
              What We Build For You
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">
              Three Systems. Zero Missed Opportunities.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl text-zinc-400 leading-relaxed"
          >
            Every channel covered. Every lead captured. Every appointment booked - automatically.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div id="service-cards" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="block h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative h-full bg-[#0A0A0A] rounded-3xl p-8 border border-white/5 ${service.border} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 overflow-hidden`}
              >
                {/* Subtle Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-black/20 group-hover:border-white/20 transition-all duration-500`}>
                      <service.icon className={`w-8 h-8 ${service.iconColor}`} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-lg mb-auto flex-grow group-hover:text-zinc-300 transition-colors">
                    {service.description}
                  </p>

                  {/* Premium CTA Button */}
                  <div className="mt-8 pt-8 border-t border-white/5 group-hover:border-white/10 transition-colors">
                    <div className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${service.gradient} border border-white/10 group-hover:border-white/20 transition-all duration-300 overflow-hidden`}>
                      <span className={`relative z-10 text-sm font-semibold text-white ${service.text} transition-colors`}>
                        Explore Features
                      </span>
                      <ArrowRight className={`relative z-10 w-4 h-4 text-white ${service.text} transition-all duration-300 group-hover:translate-x-1`} />
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
