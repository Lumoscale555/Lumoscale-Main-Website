import { X, Check, Zap, ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const before = [
  "20+ hours wasted weekly on DMs",
  "Missing hot leads in spam folders",
  "Talking to unqualified tire-kickers",
  "High no-show rate on calls",
  "Going into sales calls blind"
];

const after = [
  "AI handles conversations 24/7",
  "Instant engagement (Speed to Lead)",
  "Only qualified bookings appear",
  "Automated multi-channel reminders",
  "Full pre-call intelligence briefs"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

const BeforeAfter = () => {
  return (
    <section id="beforeafter" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Ambient Background Lights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Heading */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              <span>The Shift</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              The Transformation
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              Stop grinding manually. Start scaling automatically.
            </motion.p>
          </div>
          
          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
            
            {/* CENTRAL CONNECTOR ARROW (Desktop & Mobile) */}
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center justify-center"
            >
                <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center shadow-2xl">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
            </motion.div>

             {/* MOBILE CONNECTOR ARROW */}
             <motion.div 
                className="lg:hidden flex justify-center py-4"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                <ArrowDown className="w-8 h-8 text-muted-foreground opacity-50" />
            </motion.div>

            {/* ---------------- BEFORE CARD ---------------- */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group h-full"
            >
              {/* Card Decoration */}
              <div className="absolute inset-0 bg-destructive/5 rounded-[2.5rem] transform rotate-[-2deg] group-hover:rotate-[-1deg] transition-transform duration-500 ease-out" />
              
              <div className="h-full p-8 md:p-10 rounded-[2.5rem] border border-destructive/20 bg-card/80 backdrop-blur-sm relative shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center border border-destructive/20">
                    <X className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">The Old Way</h3>
                    <p className="text-muted-foreground text-sm">Manual & Exhausting</p>
                  </div>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {before.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="flex items-start gap-4 p-4 rounded-xl bg-destructive/5 border border-transparent transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-destructive" />
                      </div>
                      <p className="text-base text-muted-foreground/90 font-medium leading-tight">{item}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
            
            {/* ---------------- AFTER CARD ---------------- */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group h-full"
            >
              {/* Glowing Pulse Background */}
              <div className="absolute inset-0 bg-green-500/10 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-green-500/5 rounded-[2.5rem] transform rotate-[2deg] group-hover:rotate-[1deg] transition-transform duration-500 ease-out" />

              <div className="h-full p-8 md:p-10 rounded-[2.5rem] border border-green-500/30 bg-[#0a0a0a] relative shadow-2xl shadow-green-500/5 overflow-hidden">
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">The AI System</h3>
                    <p className="text-green-400/80 text-sm font-medium">Automated & Scalable</p>
                  </div>
                </div>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4 relative z-10"
                >
                  {after.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 transition-all duration-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <Check className="w-3 h-3 text-black font-bold" />
                      </div>
                      <p className="text-base text-white/90 font-medium leading-tight">{item}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;