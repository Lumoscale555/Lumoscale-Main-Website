import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import logo from "@/assets/lumoscale-logo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">

          {/* BRAND */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Lumoscale" className="h-10 w-auto" />
              <span className="text-xl font-semibold">Lumoscale</span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Lumoscale designs AI automation systems that turn inbound
              conversations into qualified bookings.
            </p>
          </motion.div>

          {/* EXPLORE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="mb-5 text-sm font-semibold tracking-wide">
              EXPLORE
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#solution" className="hover:text-white">Solution</a></li>
              <li><a href="#demo" className="hover:text-white">Demo</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#beforeafter" className="hover:text-white">Results</a></li>
              <li><a href="#case-study" className="hover:text-white">Case Studies</a></li>
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="mb-5 text-sm font-semibold tracking-wide">
              CONTACT
            </p>

            <div className="space-y-4 text-sm text-slate-400">
              <div>
                <p className="text-white">Email</p>
                <a href="mailto:contact@lumoscale.com" className="hover:text-white">
                  contact@lumoscale.com
                </a>
              </div>

              <div>
                <p className="text-white">Phone</p>
                <p>+91 89190 53970</p>
                <p>+91 80743 28526</p>
              </div>

              <div>
                <p className="text-white">Location</p>
                <p>Bengaluru, Karnataka, India</p>
              </div>

              {/* SOCIAL ICONS */}
              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/company/lumoscale/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 rounded hover:bg-white hover:text-black transition"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="https://www.instagram.com/lumoscale.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 rounded hover:bg-white hover:text-black transition"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/p/Lumoscale-61562068393631/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 rounded hover:bg-white hover:text-black transition"
                >
                  <FaFacebookF size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* FROM LINKEDIN */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="mb-5 text-sm font-semibold tracking-wide">
              FROM LINKEDIN
            </p>

            <div className="rounded-lg overflow-hidden border border-white/10">
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7407429716019896320"
                height="380"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title="Lumoscale LinkedIn Post"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-3">
          <span>© {new Date().getFullYear()} Lumoscale. All rights reserved.</span>
          <span>Built with a systems first mindset.</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
