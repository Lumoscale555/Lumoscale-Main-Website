import React from "react";
import { motion } from "framer-motion";
import logo from "@/assets/lumoscale-logo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-black border-t border-white/10">

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative container mx-auto px-6 py-20">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.03 }}
            >
              <motion.img
                src={logo}
                alt="Lumoscale"
                className="h-10 w-auto"
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="text-xl font-bold text-white">
                Lumoscale
              </span>
            </motion.div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Lumoscale builds AI systems that reply instantly, qualify leads,
              and turn conversations into booked consultations automatically.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 font-semibold text-white">Explore</p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Solution", href: "#solution" },
                { label: "Demo", href: "#demo" },
                { label: "Pricing", href: "#pricing" },
                { label: "Results", href: "#beforeafter" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Case Study", href: "#case-study" },
              ].map((item) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    className="text-slate-400 inline-block"
                    whileHover={{ x: 6, color: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 font-semibold text-white">Contact</p>
            <ul className="space-y-3 text-sm">
              <motion.li whileHover={{ x: 6 }}>
                <a
                  href="mailto:contact@lumoscale.com"
                  className="text-slate-400 hover:text-white transition"
                >
                  contact@lumoscale.com
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 6 }}>
                <a
                  href="tel:+918919053970"
                  className="text-slate-400 hover:text-white transition"
                >
                  +91 89190 53970
                </a>
              </motion.li>
            </ul>
          </motion.div>

        </div>

        {/* Animated Divider */}
        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Bottom */}
        <motion.div
          className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <span>© {new Date().getFullYear()} Lumoscale. All rights reserved.</span>
          <span>Built for founders who value speed, systems, and leverage.</span>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
