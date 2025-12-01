import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, ShieldCheck, Globe, Mail, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const [currency, setCurrency] = useState("USD");
  const [plan, setPlan] = useState("monthly");
  const [timeLeft, setTimeLeft] = useState(5 * 60 * 60);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(v => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const format = s => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  const pricing = {
    USD: {
      p1: { old: 349, m: 249, q: 699 },
      p2: { old: 799, m: 499, q: 1399 },
    },
    INR: {
      p1: { old: 29000, m: 19999, q: 54999 },
      p2: { old: 66000, m: 39999, q: 99999 },
    },
  };

  const symbol = currency === "USD" ? "$" : "₹";

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">

        {/* Title */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <h2 className="text-4xl font-bold mb-2">
            Launch <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground">Special pricing for first 5 clients</p>
        </div>

        {/* Countdown */}
        <div className="text-center text-primary font-semibold mb-5">
          Offer ends in {format(timeLeft)}
        </div>

        {/* Currency */}
        <div className="flex justify-center mb-3">
          <div className="flex border rounded-md overflow-hidden">
            <button onClick={() => setCurrency("USD")} className={`px-5 py-2 text-sm ${currency === "USD" ? "bg-primary text-black" : ""}`}>USD</button>
            <button onClick={() => setCurrency("INR")} className={`px-5 py-2 text-sm ${currency === "INR" ? "bg-primary text-black" : ""}`}>INR</button>
          </div>
        </div>

        {/* Duration */}
        <div className="flex justify-center mb-10">
          <div className="flex border rounded-md overflow-hidden">
            <button onClick={() => setPlan("monthly")} className={`px-5 py-2 text-sm ${plan === "monthly" ? "bg-secondary text-black" : ""}`}>1 Month</button>
            <button onClick={() => setPlan("quarter")} className={`px-5 py-2 text-sm ${plan === "quarter" ? "bg-secondary text-black" : ""}`}>3 Months</button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          <PricingCard
            title="NEVER MISS A HOT LEAD"
            desc="Website and email to booked calls automatically"
            prices={pricing[currency].p1}
            symbol={symbol}
            plan={plan}
            features={[
              "Instant replies",
              "Hot lead detection",
              "Auto booking link",
              "Smart reminders",
              "Pre call brief",
              "Basic dashboard",
            ]}
            channels={[
              { icon: <Globe size={14} />, label: "Website" },
              { icon: <Mail size={14} />, label: "Email" },
            ]}
            outcome="More booked calls and zero missed leads."
            primary
            cta="Activate System"
          />

          <PricingCard
            title="FILL YOUR CALENDAR WITH SHOW UPS"
            desc="All DMs to booked calls that show up"
            prices={pricing[currency].p2}
            symbol={symbol}
            plan={plan}
            features={[
              "Instant replies",
              "Hot lead detection",
              "Auto booking link",
              "Multichannel reminders",
              "Pre call brief",
              "Full dashboard",
              "Instagram and Facebook automation",
            ]}
            channels={[
              { icon: <Globe size={14} />, label: "Website" },
              { icon: <Mail size={14} />, label: "Email" },
              { icon: <Instagram size={14} />, label: "Instagram" },
              { icon: <Facebook size={14} />, label: "Facebook" },
            ]}
            outcome="More booked calls and higher show up rates."
            highlight
            cta="Scale My Calendar"
          />

        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-16 max-w-3xl mx-auto text-center border rounded-xl p-6 bg-primary/5"
        >
          <ShieldCheck className="mx-auto mb-3 text-primary" size={36} />
          <p className="font-semibold">30 Day Results Guarantee</p>
          <p className="text-muted-foreground text-sm mt-1">
            If calls do not increase, we work free until they do.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

function PricingCard({ title, desc, prices, symbol, plan, features, channels, outcome, primary, highlight, cta }) {
  const value = plan === "monthly" ? prices.m : prices.q;
  const label = plan === "monthly" ? "per month" : "for 3 months";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`relative flex flex-col rounded-2xl border p-6 transition ${
        highlight ? "border-secondary shadow-md" : "border-primary/30"
      }`}
    >

      {highlight && (
        <div className="absolute -top-3 left-1/2 translate-x-[-50%] text-xs bg-secondary text-black px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{desc}</p>

      <ul className="space-y-2 text-sm mb-4">
        {features.map(f => (
          <li key={f} className="flex gap-2 items-center">
            <CheckCircle className={`${primary ? "text-primary" : "text-secondary"} w-4 h-4`} />
            {f}
          </li>
        ))}
      </ul>

      <div className="mb-4">
        <p className="text-xs font-semibold mb-2">Channels</p>
        <div className="flex flex-wrap gap-2">
          {channels.map(c => (
            <div key={c.label} className="flex items-center gap-2 border rounded-full px-3 py-1 text-xs">
              {c.icon}
              {c.label}
            </div>
          ))}
        </div>
      </div>

      <div className={`p-3 text-xs border rounded-md mb-4 ${primary ? "bg-primary/10 border-primary/30" : "bg-secondary/10 border-secondary/30"}`}>
        <strong>Outcome:</strong> {outcome}
      </div>

      {/* Price */}
      <div className="mt-auto border-t pt-4 text-center">
        <div className="flex justify-center items-center gap-3">
          <span className="line-through text-sm text-muted-foreground">
            {symbol}{prices.old}
          </span>
          <span className="text-xl font-bold">
            {symbol}{value}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>

      <Button className={`mt-4 py-4 text-sm bg-gradient-to-r ${primary ? "from-primary to-secondary" : "from-secondary to-primary"} text-black font-semibold`}>
        {cta} <ArrowRight className="ml-2 w-4 h-4" />
      </Button>

    </motion.div>
  );
}
