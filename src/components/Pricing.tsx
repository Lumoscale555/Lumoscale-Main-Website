import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle, ShieldCheck, Globe, Mail, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const cardEnter: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

const channelPulse: Variants = {
  rest: { scale: 1, opacity: 0.9 },
  hover: { scale: 1.06, opacity: 1 },
};

export default function Pricing() {
  const [plan, setPlan] = useState<"monthly" | "quarter">("monthly");

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">

      {/* Animated background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-10"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.4), transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-10">
          <h2 className="text-4xl font-bold mb-2">
            Simple <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground">
            Two powerful systems, choose the coverage that fits your business.
          </p>
        </div>

        {/* Duration toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setPlan("monthly")}
              className={`px-6 py-2 text-sm ${plan === "monthly" ? "bg-primary text-black" : ""}`}
            >
              1 Month
            </button>
            <button
              onClick={() => setPlan("quarter")}
              className={`px-6 py-2 text-sm ${plan === "quarter" ? "bg-primary text-black" : ""}`}
            >
              3 Months
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* Package 1 */}
          <PricingCard
            title="NEVER MISS A HOT LEAD"
            desc="Instant replies on your website and email that convert interest into booked calls."
            priceOld={plan === "monthly" ? 349 : 1047}
            priceNew={plan === "monthly" ? 249 : 699}
            label={plan === "monthly" ? "per month" : "for 3 months"}
            features={[
              "Instant replies",
              "Hot lead detection",
              "Auto booking link",
              "Smart reminders",
              "Pre call brief",
              "Basic dashboard"
            ]}
            channels={[
              { icon: <Globe size={14} />, label: "Website" },
              { icon: <Mail size={14} />, label: "Email" }
            ]}
            outcome="More booked calls and zero missed leads."
            primary
          />

          {/* Package 2 */}
          <PricingCard
            title="FILL YOUR CALENDAR WITH SHOW UPS"
            desc="Capture, qualify, and book leads from every channel with full visibility."
            priceOld={plan === "monthly" ? 799 : 2397}
            priceNew={plan === "monthly" ? 499 : 1399}
            label={plan === "monthly" ? "per month" : "for 3 months"}
            features={[
              "Instant replies",
              "Hot lead detection",
              "Auto booking link",
              "Multi channel reminders",
              "Pre call brief",
              "Full dashboard",
              "Instagram and Facebook automation"
            ]}
            channels={[
              { icon: <Globe size={14} />, label: "Website" },
              { icon: <Mail size={14} />, label: "Email" },
              { icon: <Mail size={14} />, label: "Smart Reply Detection" },
              { icon: <Instagram size={14} />, label: "Instagram" },
              { icon: <Facebook size={14} />, label: "Facebook" }
            ]}
            outcome="More booked calls and higher show up rates."
            highlight
          />

        </div>

        {/* Animated guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-20 max-w-3xl mx-auto rounded-2xl p-[2px] bg-animate-gradient"
        >
          <div className="rounded-2xl bg-background p-8 text-center">
            <motion.div
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <ShieldCheck className="mx-auto mb-4 text-primary" size={42} />
            </motion.div>
            <p className="text-lg font-semibold">30 Day Results Guarantee</p>
            <p className="text-muted-foreground text-sm mt-2">
              If booked calls do not grow, we continue free until they do.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function PricingCard({
  title,
  desc,
  priceOld,
  priceNew,
  label,
  features,
  channels,
  outcome,
  primary = false,
  highlight = false,
}: {
  title: string;
  desc: string;
  priceOld: number;
  priceNew: number;
  label: string;
  features: string[];
  channels: { icon: JSX.Element; label: string }[];
  outcome: string;
  primary?: boolean;
  highlight?: boolean;
}) {
  return (
    <motion.div
      variants={cardEnter}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{
        scale: 1.04,
        boxShadow: primary
          ? "0 0 40px rgba(0, 217, 255, 0.35)"
          : "0 0 40px rgba(255, 0, 200, 0.35)",
      }}
      className={`relative flex flex-col rounded-2xl border p-6 transition ${
        highlight ? "border-secondary shadow-md" : "border-primary/30"
      }`}
    >

      {highlight && (
        <div className="absolute -top-3 left-1/2 translate-x-[-50%] text-xs bg-secondary text-black px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      {/* Head */}
      <div className="mb-3">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{desc}</p>
      </div>

      {/* Features */}
      <ul className="space-y-2 text-sm mb-4">
        {features.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="flex gap-2 items-center"
          >
            <CheckCircle className={`${primary ? "text-primary" : "text-secondary"} w-4 h-4`} />
            {f}
          </motion.li>
        ))}
      </ul>

      {/* Channels */}
      <div className="mb-4">
        <p className="text-xs font-semibold mb-2">Channels</p>
        <div className="flex flex-wrap gap-2">
          {channels.map(c => (
            <motion.div
              key={c.label}
              variants={channelPulse}
              initial="rest"
              whileHover="hover"
              className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${
                primary ? "border-primary/30 bg-primary/5" : "border-secondary/30 bg-secondary/5"
              }`}
            >
              {c.icon}
              {c.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-3 rounded-md text-xs border mb-4 ${
          primary ? "bg-primary/10 border-primary/30" : "bg-secondary/10 border-secondary/30"
        }`}
      >
        <strong>Outcome:</strong> {outcome}
      </motion.div>

      {/* Price */}
      <div className="mt-auto border-t pt-4 text-center">
        <div className="flex justify-center items-center gap-3">
          <span className="line-through text-sm text-muted-foreground">
            ${priceOld}
          </span>
          <motion.span
            key={priceNew}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-bold"
          >
            ${priceNew}
          </motion.span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>

      <Button className={`mt-4 py-4 text-sm bg-gradient-to-r ${
        primary ? "from-primary to-secondary" : "from-secondary to-primary"
      } text-black font-semibold`}>
        Activate Growth System
      </Button>

    </motion.div>
  );
}
