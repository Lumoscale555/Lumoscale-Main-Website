import { AlertCircle, Clock, DollarSign, MessageSquare } from "lucide-react";

const painPoints = [
  { icon: Clock, text: "Leads get lost when you're busy or offline - messages during calls, nights, weekends get missed." },
  { icon: MessageSquare, text: "Too much time on repetitive replies = 2-4 hours daily answering 'what's your price?' questions." },
  { icon: AlertCircle, text: "No structured flow = qualified leads drop off while unqualified ones book calls and waste your time." },
  { icon: DollarSign, text: "Zero visibility on what converts = you don't know which messages work or why people stop replying." }
];

const PainPoints = () => {
  return (
    <section id="painpoints" className="py-8 relative overflow-hidden bg-background">
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

            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2]"
              style={{ fontFamily: "'Outfit', sans-serif", paddingBottom: '0.15em' }}
            >
              Where You're <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Losing Money Right Now
              </span>
            </h2>

            {/* MOVED: Sound familiar line */}
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Every founder faces this. <span className="text-primary font-semibold">The difference?</span> Some fix it, others keep bleeding revenue.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="group relative flex items-start gap-4 p-4 rounded-xl border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--destructive)/0.3)] hover:-translate-y-1 cursor-default"
                style={{
                  animation: "fade-up 0.6s ease-out forwards",
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0
                }}
              >
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full group-hover:bg-destructive/40 transition-all" />
                  <point.icon className="w-6 h-6 text-destructive relative z-10" />
                </div>

                <div className="space-y-1">
                  <p className="text-base md:text-lg text-foreground font-semibold leading-snug">{point.text}</p>
                  <p className="text-xs text-muted-foreground opacity-70 group-hover:opacity-100 transform translate-y-0 group-hover:translate-y-0 transition-all duration-300 mt-2">
                    {index === 0 && "- 69% expect replies within 24 hours. Late replies = competitors steal your revenue."}
                    {index === 1 && "- Time is money. 80 hours/mo wasted = huge opportunity cost on low-leverage work."}
                    {index === 2 && "- No filtering system = wasted energy on basics instead of closing deals."}
                    {index === 3 && "- No visibility = no optimization. Flying blind means leaving money on the table."}
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
