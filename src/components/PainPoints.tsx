import { AlertCircle, Clock, DollarSign, MessageSquare } from "lucide-react";

const painPoints = [
  {
    icon: MessageSquare,
    text: "Spending 20+ hours weekly responding to unqualified DMs"
  },
  {
    icon: Clock,
    text: "Missing hot leads because you're stuck answering tire-kickers"
  },
  {
    icon: AlertCircle,
    text: "Losing deals to competitors who respond faster"
  },
  {
    icon: DollarSign,
    text: "Wasting money on no-shows and low-intent calls"
  }
];

const PainPoints = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Heading */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text shimmer">
              Your Current Reality
            </h2>
          </div>
          
          {/* Right: Pain Points */}
          <div className="space-y-8">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="flex items-start gap-6 p-6 rounded-2xl border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--destructive)/0.3)] hover:-translate-y-1"
                style={{ 
                  animation: "fade-up 0.6s ease-out forwards",
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0
                }}
              >
                <div className="flex-shrink-0">
                  <point.icon className="w-8 h-8 text-destructive" />
                </div>
                <p className="text-lg md:text-xl text-foreground/90 font-medium">
                  {point.text}
                </p>
              </div>
            ))}
            
            <div className="pt-8 border-t border-destructive/30">
              <p className="text-xl md:text-2xl text-destructive font-bold">
                This kills your time and lowers your revenue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
