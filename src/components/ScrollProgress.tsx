import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const [currentPercent, setCurrentPercent] = useState(0);

    // Smooth out the scroll progress
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Update state for percentage text
    useEffect(() => {
        return scaleY.on("change", (v) => setCurrentPercent(Math.round(v * 100)));
    }, [scaleY]);

    return (
        <div className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 h-[40vh] md:h-[50vh] z-50 flex flex-col items-center pointer-events-none">

            {/* Percentage Text (Floats next to the ball) */}
            <motion.div
                style={{ top: useTransform(scaleY, (v) => `${v * 100}%`) }}
                className="absolute -left-12 md:-left-16 -translate-y-1/2 flex items-center justify-end w-12 pr-2"
            >
                <span className="text-[9px] md:text-[10px] font-mono font-bold text-cyan-400 bg-black/40 backdrop-blur-md px-1 py-0.5 rounded border border-white/5 shadow-sm">
                    {currentPercent}%
                </span>
            </motion.div>

            {/* The Track (Glass Tube) */}
            <div className="relative w-1 md:w-1.5 h-full bg-white/5 rounded-full overflow-visible border border-white/5 backdrop-blur-sm shadow-inner group">

                {/* The Fill (Gradient Bar) */}
                <motion.div
                    style={{
                        height: useTransform(scaleY, (v) => `${v * 100}%`),
                    }}
                    className="absolute top-0 left-0 right-0 w-full rounded-full bg-gradient-to-b from-transparent via-cyan-500/50 to-cyan-400"
                >
                    {/* The Glowing Leading Edge (Ball) */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 md:w-4 md:h-4 z-20">
                        {/* Outer Glow */}
                        <div className="absolute inset-0 bg-cyan-400 rounded-full blur-[6px] opacity-80 animate-pulse" />
                        {/* Inner Core */}
                        <div className="absolute inset-1 bg-white rounded-full shadow-[0_0_15px_#22d3ee]" />

                        {/* Ring Effect */}
                        <div className="absolute -inset-1 border border-cyan-500/30 rounded-full animate-ping opacity-50" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollProgress;
