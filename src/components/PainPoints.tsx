import { AlertCircle, Clock, DollarSign, MessageSquare } from "lucide-react";

const painPoints = [
  { icon: Clock, text: "You respond 3 hours later. They've already booked with someone else." },
  { icon: MessageSquare, text: "You get 50 DMs/week. Only 3 turn into bookings (6% conversion)." },
  { icon: AlertCircle, text: "You spend 15 hours/week on DMs. Still lose 80% of leads." },
  { icon: DollarSign, text: "40% of bookings don't show up. No reminder system." }
];

const PainPoints = () => {
  return (
    <section id="painpoints" className="py-16 relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-destructive/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-full w-fit">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-semibold text-destructive uppercase tracking-wide">
                The Real Problem
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text shimmer leading-tight">
              Why You're Losing 80% of Your Instagram Leads
            </h2>

            {/* MOVED: Sound familiar line */}
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Sound familiar? <span className="text-primary font-semibold">You're not alone.</span> This is the #1 reason service businesses fail to scale—and it's 100% fixable.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="group relative flex items-start gap-6 p-6 rounded-2xl border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--destructive)/0.3)] hover:-translate-y-1 cursor-default"
                style={{
                  animation: "fade-up 0.6s ease-out forwards",
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0
                }}
              >
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full group-hover:bg-destructive/40 transition-all" />
                  <point.icon className="w-8 h-8 text-destructive relative z-10" />
                </div>

                <div className="space-y-2">
                  <p className="text-lg md:text-xl text-foreground font-semibold leading-relaxed">{point.text}</p>
                  <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    {index === 0 && "Speed wins. Every hour you wait = 20% lower conversion rate."}
                    {index === 1 && "Low conversion = you're not qualifying leads properly."}
                    {index === 2 && "Time is money. 15 hours = $1,500+ in opportunity cost."}
                    {index === 3 && "No-shows = wasted calendar slots = lost revenue."}
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

export default PainPoints;
