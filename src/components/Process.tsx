import React from "react";
import { motion } from "framer-motion";
import { Phone, Target, Bot, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Strategy Call",
    description: "Tell us how your leads come in, what slips through the cracks, and what you need fixed.",
    gradient: "from-blue-500/10 to-cyan-500/5",
    iconColor: "text-blue-400",
    accentColor: "bg-blue-400",
  },
  {
    icon: Target,
    step: "02",
    title: "We Build It For You",
    description: "We custom-build the agent around your exact scripts, services, and booking flow. No templates.",
    gradient: "from-purple-500/10 to-pink-500/5",
    iconColor: "text-purple-400",
    accentColor: "bg-purple-400",
  },
  {
    icon: Bot,
    step: "03",
    title: "Live Testing",
    description: "We run real test calls and DMs until every response is exactly right for your business.",
    gradient: "from-emerald-500/10 to-green-500/5",
    iconColor: "text-emerald-400",
    accentColor: "bg-emerald-400",
  },
  {
    icon: Rocket,
    step: "04",
    title: "You Start Winning",
    description: "Your AI front desk goes live, answering every call and DM 24/7 - while we keep optimizing weekly.",
    gradient: "from-orange-500/10 to-red-500/5",
    iconColor: "text-orange-400",
    accentColor: "bg-orange-400",
  }
];

const Process = () => {
  return (
    <section id="process" className="relative py-12 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="py-2 px-4 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 font-medium">
              From Signup to Revenue
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl font-bold text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-600">
              Up and Running in Under 2 Weeks.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-lg text-zinc-400"
          >
            We handle the entire setup. You just show up for the kickoff call.
          </motion.p>
        </div>

        {/* Horizontal Flowchart */}
        <div className="relative max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative h-full"
                >

                  <div className={`relative bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/50 h-full flex flex-col`}>
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Step Number Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-5xl font-bold text-white/10 group-hover:text-white/15 transition-colors">
                          {step.step}
                        </span>
                        <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all`}>
                          <step.icon className={`w-6 h-6 ${step.iconColor}`} strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors flex-grow">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow Connector (Desktop only, not on last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="hidden lg:flex absolute -right-3 top-20 z-20 items-center justify-center"
                  >
                    <div className={`w-6 h-6 rounded-full ${step.accentColor} flex items-center justify-center shadow-lg`}>
                      <ArrowRight className="w-3 h-3 text-black" strokeWidth={3} />
                    </div>
                  </motion.div>
                )}

                {/* Mobile Arrow (vertical) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className={`w-8 h-8 rounded-full ${step.accentColor} flex items-center justify-center`}>
                      <ArrowRight className="w-4 h-4 text-black rotate-90" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;