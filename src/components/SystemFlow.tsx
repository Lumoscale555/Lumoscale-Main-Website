import { CheckCircle2 } from "lucide-react";

const SystemFlow = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text shimmer mb-6">
              How It Works
            </h2>
          </div>
          
          {/* Flow Diagram */}
          <div className="relative mb-20">
            {/* Mobile: Vertical Flow */}
            <div className="md:hidden space-y-6">
              {[
                "Lead contacts",
                "AI responds instantly",
                "AI qualifies with smart questions",
                "AI identifies urgency",
                "Hot lead? → Booking link sent",
                "Lead books meeting",
                "Slack alert sent",
                "Pre-call brief delivered"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-primary/30 bg-primary/5">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <p className="text-lg text-foreground">{step}</p>
                </div>
              ))}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-muted bg-muted/20">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <p className="text-lg text-muted-foreground">Not qualified? → AI ends politely</p>
              </div>
            </div>
            
            {/* Desktop: Horizontal Flow */}
            <div className="hidden md:block">
              <svg className="w-full h-64" viewBox="0 0 1200 250">
                {/* Main Flow Line */}
                <path
                  d="M 50 125 L 1150 125"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-[draw-line_2s_ease-out_forwards]"
                  style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                />
                
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                
                {/* Flow Points */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <circle
                    key={i}
                    cx={50 + i * 157}
                    cy="125"
                    r="8"
                    fill="hsl(var(--primary))"
                    className="animate-glow-pulse"
                    style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary)))" }}
                  />
                ))}
              </svg>
              
              {/* Labels */}
              <div className="grid grid-cols-8 gap-4 text-center text-sm mt-8">
                {[
                  "Lead contacts",
                  "AI responds",
                  "Qualifies",
                  "Detects urgency",
                  "Booking sent",
                  "Meeting booked",
                  "Slack alert",
                  "Brief sent"
                ].map((label, i) => (
                  <p key={i} className="text-foreground/80 font-medium">{label}</p>
                ))}
              </div>
            </div>
          </div>
          
          {/* Three Steps */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: "01", title: "Capture", desc: "Every lead is engaged instantly" },
              { num: "02", title: "Qualify", desc: "AI asks the right questions" },
              { num: "03", title: "Book", desc: "Hot leads get your calendar" }
            ].map((step, i) => (
              <div
                key={i}
                className="text-center space-y-4 p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-500"
                style={{ 
                  animation: "fade-up 0.6s ease-out forwards",
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0
                }}
              >
                <div className="text-6xl font-bold gradient-text">{step.num}</div>
                <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="text-lg text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemFlow;
