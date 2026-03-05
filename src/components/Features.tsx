import { Bot, Calendar, MessageSquare, Bell, FileText, BarChart3, Sparkles, Zap } from "lucide-react";

const leftFeatures = [
  { icon: MessageSquare, title: "Multi-channel automation", desc: "Instagram, WhatsApp, email" },
  { icon: Bot, title: "AI trained on your tone", desc: "Sounds exactly like you" },
  { icon: Sparkles, title: "Smart qualification", desc: "Asks the right questions" },
  { icon: Calendar, title: "Booking links for hot leads", desc: "Only qualified prospects" },
  { icon: Bell, title: "Three reminder sequence", desc: "24h, 6h, 1h before call" },
  { icon: FileText, title: "Pre-call brief", desc: "Know everything before you talk" },
  { icon: Zap, title: "Slack alerts", desc: "Instant notifications" },
  { icon: BarChart3, title: "Live dashboard", desc: "Track every conversation" }
];

const rightOutcomes = [
  { title: "20+ hours saved", desc: "Per week on DM management" },
  { title: "Lower no-shows", desc: "Automated reminder system" },
  { title: "Higher intent calls", desc: "Only talk to buyers" },
  { title: "2-3x more conversions", desc: "Better qualified pipeline" }
];

const Features = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text shimmer mb-6">
              Everything You Need
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Features */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground mb-8">Features</h3>
              {leftFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-500 hover:-translate-x-2"
                  style={{ 
                    animation: "slide-in-left 0.5s ease-out forwards",
                    animationDelay: `${i * 0.08}s`,
                    opacity: 0
                  }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right: Outcomes */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground mb-8">Outcomes</h3>
              {rightOutcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-primary/10 hover:shadow-[0_0_40px_hsl(var(--secondary)/0.3)] transition-all duration-500 hover:translate-x-2"
                  style={{ 
                    animation: "slide-in-right 0.5s ease-out forwards",
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0
                  }}
                >
                  <h4 className="text-3xl font-bold gradient-text mb-2">{outcome.title}</h4>
                  <p className="text-lg text-muted-foreground">{outcome.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
