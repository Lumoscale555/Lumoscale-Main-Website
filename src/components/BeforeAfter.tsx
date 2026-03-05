import { X, Check } from "lucide-react";

const before = [
  "20+ hours weekly on DMs",
  "Missing hot leads",
  "Talking to tire-kickers",
  "High no-show rate",
  "Going into calls blind"
];

const after = [
  "AI handles all DMs 24/7",
  "Instant lead engagement",
  "Only qualified calls",
  "Automated reminders",
  "Full pre-call briefs"
];

const BeforeAfter = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text shimmer mb-6">
              The Transformation
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Before */}
            <div
              className="p-10 rounded-3xl border-2 border-destructive/40 bg-destructive/5 relative overflow-hidden"
              style={{ 
                animation: "slide-in-left 0.6s ease-out forwards",
                opacity: 0
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                    <X className="w-7 h-7 text-destructive" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Before</h3>
                </div>
                
                <div className="space-y-4">
                  {before.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10"
                      style={{ 
                        animation: "fade-up 0.5s ease-out forwards",
                        animationDelay: `${0.3 + i * 0.1}s`,
                        opacity: 0
                      }}
                    >
                      <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <p className="text-lg text-foreground/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* After */}
            <div
              className="p-10 rounded-3xl border-2 border-secondary/40 bg-secondary/5 relative overflow-hidden"
              style={{ 
                animation: "slide-in-right 0.6s ease-out forwards",
                opacity: 0
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Check className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">After</h3>
                </div>
                
                <div className="space-y-4">
                  {after.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-secondary/10"
                      style={{ 
                        animation: "fade-up 0.5s ease-out forwards",
                        animationDelay: `${0.3 + i * 0.1}s`,
                        opacity: 0
                      }}
                    >
                      <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-lg text-foreground/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="mt-20 text-center space-y-4">
            <div className="inline-block p-10 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 shadow-[0_0_60px_hsl(var(--primary)/0.3)]">
              <p className="text-6xl md:text-7xl font-bold gradient-text mb-4">20+ hours</p>
              <p className="text-2xl text-muted-foreground">saved every week</p>
            </div>
            <div className="inline-block p-10 rounded-3xl border-2 border-secondary/30 bg-gradient-to-br from-secondary/10 to-primary/10 shadow-[0_0_60px_hsl(var(--secondary)/0.3)] ml-0 md:ml-8">
              <p className="text-6xl md:text-7xl font-bold gradient-text mb-4">2-5x</p>
              <p className="text-2xl text-muted-foreground">more qualified calls</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
