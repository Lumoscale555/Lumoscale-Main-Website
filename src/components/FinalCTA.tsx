import { Button } from "@/components/ui/button";
import { Calendar, Settings, Rocket } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Book a demo",
    desc: "15-minute strategy call"
  },
  {
    icon: Settings,
    title: "We set it up",
    desc: "In 7 days or less"
  },
  {
    icon: Rocket,
    title: "You go live",
    desc: "Start qualifying leads"
  }
];

const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          {/* Heading */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text shimmer">
              Ready to automate your lead qualification?
            </h2>
          </div>
          
          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative group"
                style={{ 
                  animation: "fade-up 0.6s ease-out forwards",
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0
                }}
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-black font-bold text-xl shadow-[0_0_30px_hsl(var(--primary)/0.6)]">
                  {i + 1}
                </div>
                
                {/* Card */}
                <div className="pt-10 p-8 rounded-3xl border border-primary/30 bg-card hover:border-primary/50 hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-500">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-lg text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <div
            className="space-y-6"
            style={{ 
              animation: "scale-in 0.6s ease-out forwards",
              animationDelay: "0.8s",
              opacity: 0
            }}
          >
            <Button 
              size="lg" 
              className="text-2xl px-16 py-10 bg-gradient-to-r from-primary to-secondary text-black font-bold hover:shadow-[0_0_80px_hsl(var(--primary)/0.8)] transition-all duration-500 hover:scale-110"
            >
              Book Your Demo Now
            </Button>
            
            <p className="text-lg text-destructive font-bold">
              ⚡ 7 beta spots available
            </p>
          </div>
          
          {/* Footer */}
          <div className="pt-16 border-t border-primary/20 space-y-4">
            <p className="text-muted-foreground">Get in touch</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="mailto:hello@lumoscale.ai" className="text-lg text-foreground hover:text-primary transition-colors">
                hello@lumoscale.ai
              </a>
              <span className="hidden sm:block text-muted-foreground">•</span>
              <a href="https://wa.me/1234567890" className="text-lg text-foreground hover:text-secondary transition-colors">
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default FinalCTA;
