import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const included = [
  "Multi-channel AI automation",
  "Unlimited lead qualification",
  "Smart booking system",
  "24/6/1 hour reminder sequence",
  "Pre-call brief generation",
  "Slack integration & alerts",
  "Live conversation dashboard",
  "Tone training on your brand",
  "Priority support"
];

const Pricing = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text shimmer mb-6">
              Beta Launch Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Lock in exclusive early access rates
            </p>
          </div>
          
          {/* Pricing Card */}
          <div
            className="relative p-12 rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-[0_0_80px_hsl(var(--primary)/0.4)]"
            style={{ 
              animation: "scale-in 0.6s ease-out forwards",
              animationDelay: "0.2s",
              opacity: 0
            }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative z-10 space-y-8">
              {/* Beta Badge */}
              <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-bold text-sm">
                BETA OFFER
              </div>
              
              {/* Pricing */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl md:text-7xl font-bold gradient-text">$497</span>
                  <span className="text-2xl text-muted-foreground">setup</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-6xl font-bold gradient-text">$197</span>
                  <span className="text-2xl text-muted-foreground">/month</span>
                  <span className="text-lg text-secondary font-semibold">(locked forever)</span>
                </div>
              </div>
              
              {/* Included Features */}
              <div className="space-y-4 pt-8 border-t border-primary/20">
                <h4 className="text-xl font-bold text-foreground mb-6">Everything included:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {included.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3"
                      style={{ 
                        animation: "fade-up 0.4s ease-out forwards",
                        animationDelay: `${0.4 + i * 0.05}s`,
                        opacity: 0
                      }}
                    >
                      <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-foreground/90">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* ROI Calculator */}
              <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/30">
                <h4 className="text-lg font-bold text-foreground mb-4">Your ROI:</h4>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <p className="text-4xl font-bold gradient-text">20+</p>
                    <p className="text-sm text-muted-foreground mt-2">Hours saved weekly</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold gradient-text">2-5x</p>
                    <p className="text-sm text-muted-foreground mt-2">More qualified calls</p>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <Button 
                size="lg" 
                className="w-full text-xl py-8 bg-gradient-to-r from-primary to-secondary text-black font-bold hover:shadow-[0_0_60px_hsl(var(--primary)/0.8)] transition-all duration-500 hover:scale-105"
              >
                Claim Your Beta Spot
              </Button>
              
              {/* Urgency */}
              <p className="text-center text-sm text-destructive font-semibold">
                ⚡ Only 7 beta spots remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
