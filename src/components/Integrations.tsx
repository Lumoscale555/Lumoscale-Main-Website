import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BrainCircuit, Zap } from "lucide-react";

const INTEGRATIONS = [
  { name: "OpenAI", domain: "openai.com" },
  { name: "ElevenLabs", domain: "elevenlabs.io" },
  { name: "Claude", domain: "anthropic.com" },
  { name: "Retell", domain: "retellai.com" },
  { name: "Cartesia", domain: "cartesia.ai" },
  { name: "Sarvam", domain: "sarvam.ai" },
  { name: "Twilio", domain: "twilio.com" },
  { name: "Exotel", domain: "exotel.com" },
  { name: "Vobiz", domain: "vobiz.ai" },
  { name: "Airtable", domain: "airtable.com" },
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Deepgram", domain: "deepgram.com" },
];

export default function Integrations() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section 
      className="py-32 bg-black relative overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
          >
            <Zap className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Technology Stack</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Powering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI Front Desk</span>
          </motion.h2>
        </div>

        {/* 3D Stage Container */}
        <div className="relative perspective-[1500px] w-full max-w-5xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center">
          <motion.div 
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d" 
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Central Core Card */}
            <motion.div
              style={{ transform: "translateZ(80px)" }}
              className="relative z-30 w-48 h-48 md:w-56 md:h-56 rounded-[32px] p-[1px] bg-gradient-to-b from-blue-400/30 to-transparent shadow-[0_0_50px_rgba(59,130,246,0.2)]"
            >
              <div className="w-full h-full rounded-[31px] bg-[#050505] backdrop-blur-3xl flex flex-col items-center justify-center gap-4 border border-white/5">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
                    <BrainCircuit className="w-16 h-16 text-white relative z-10" />
                </div>
                <div className="text-center">
                    <span className="text-white font-bold text-lg tracking-tight block">Lumoscale</span>
                    <span className="text-blue-400/60 text-[10px] font-bold uppercase tracking-widest">Core Engine</span>
                </div>
              </div>
            </motion.div>

            {/* Orbiting / Floating Integration Cards */}
            {INTEGRATIONS.map((tool, idx) => {
              // Calculate positions in a structured but dynamic grid pattern
              const angle = (idx / INTEGRATIONS.length) * Math.PI * 2;
              const radius = 280; // Distance from center
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const z = (idx % 2 === 0 ? 40 : -40); // Staggered depth

              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.5, duration: 0.8 }}
                  style={{ 
                    x, 
                    y, 
                    z: z + 20,
                    transformStyle: "preserve-3d"
                  }}
                  className="absolute z-20"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: idx * 0.5 
                    }}
                    className="group"
                  >
                    {/* Connection Line (Visual only, simple div) */}
                    <div className="absolute top-1/2 left-1/2 w-[1px] h-[100px] bg-gradient-to-t from-blue-500/20 to-transparent -translate-x-1/2 -translate-y-full origin-bottom rotate-[var(--line-angle)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Glass Card */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-white/0 group-hover:from-blue-500/40 transition-all duration-500 shadow-xl overflow-hidden backdrop-blur-md">
                      <div className="w-full h-full rounded-[15px] bg-white flex items-center justify-center p-4">
                        <img
                          src={`https://img.logo.dev/${tool.domain}?token=pk_D12w2jV1Sy2F7Yx0bFvBPA`}
                          alt={`${tool.name} logo`}
                          className="w-full h-full object-contain filter transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?sz=128&domain=${tool.domain}`;
                          }}
                        />
                      </div>
                    </div>

                    {/* Tool Name Tag */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
                        <span className="text-[10px] font-bold text-white/50 group-hover:text-white uppercase tracking-widest whitespace-nowrap transition-colors duration-300 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5">
                          {tool.name}
                        </span>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Decorative Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              {INTEGRATIONS.map((_, idx) => {
                 const angle = (idx / INTEGRATIONS.length) * Math.PI * 2;
                 const radius = 280;
                 const x2 = 500 + Math.cos(angle) * (radius / 5); // Rough SVG coords
                 const y2 = 300 + Math.sin(angle) * (radius / 5);
                 return (
                   <motion.line 
                    key={idx}
                    x1="50%" y1="50%" x2={`${50 + (Math.cos(angle) * 30)}%`} y2={`${50 + (Math.sin(angle) * 30)}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   />
                 )
              })}
            </svg>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
