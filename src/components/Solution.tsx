import { Bot, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Qualification Agent",
    description: "Automatically captures and qualifies every incoming lead with intelligent conversation"
  },
  {
    icon: Sparkles,
    title: "Smart Booking System",
    description: "Sends calendar links only to hot leads, filtering out tire-kickers automatically"
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Get Slack alerts with pre-call briefs so you're always prepared"
  }
];

const Solution = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text shimmer">
              What if AI handled everything for you?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Lumoscale captures, qualifies, and sends booking links to hot leads so you only talk to buyers
            </p>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-card border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)]"
                style={{ 
                  animation: "scale-in 0.6s ease-out forwards",
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0
                }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-500">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
