import { Calendar, Settings, Rocket } from "lucide-react";
import { useRef, useState } from "react";

const steps = [
  { icon: Calendar, title: "Book a demo", desc: "15-minute strategy call" },
  { icon: Settings, title: "We set it up", desc: "In 7 days or less" },
  { icon: Rocket, title: "You go live", desc: "Start qualifying leads" }
];

const FinalCTA = () => {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  return (
    <section id="finalcta" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-20">

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text">
            Book your strategy call
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="pt-10 p-8 rounded-3xl border border-primary/30 bg-card"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Calendar Card */}
          <div
            ref={calendarRef}
            className="relative max-w-4xl mx-auto rounded-3xl border border-primary/30 bg-card shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-primary/20">
              <h3 className="text-2xl font-bold">
                Pick a time that works for you
              </h3>
              <p className="text-muted-foreground">
                Your booking is confirmed instantly
              </p>
            </div>

            {/* Loader */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
            )}

            <iframe
              src="https://cal.com/vamsivk/30min?embed=1&theme=dark"
              className="w-full h-[740px] rounded-b-3xl"
              onLoad={() => setLoading(false)}
            />
          </div>



        </div>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 blur-3xl rounded-full" />
    </section>
  );
};

export default FinalCTA;