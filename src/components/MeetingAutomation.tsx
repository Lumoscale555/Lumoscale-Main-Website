import { Bell, Clock, FileText, TrendingUp } from "lucide-react";

const reminders = [
  { icon: Bell, time: "24 hours before", color: "from-primary/20 to-primary/10" },
  { icon: Clock, time: "6 hours before", color: "from-primary/30 to-primary/20" },
  { icon: Bell, time: "1 hour before", color: "from-primary/40 to-primary/30" }
];

const briefItems = [
  "Pain points identified",
  "Goals & objectives",
  "Urgency level",
  "Potential objections",
  "Tone analysis",
  "Recommended pitch angle"
];

const MeetingAutomation = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text shimmer mb-6">
              Never lose a meeting again
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Reminder Cards */}
            <div className="space-y-6">
              {reminders.map((reminder, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-primary/30 bg-gradient-to-br hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all duration-500 hover:-translate-y-2"
                  style={{ 
                    animation: "slide-in-left 0.6s ease-out forwards",
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reminder.color} flex items-center justify-center group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-500`}>
                      <reminder.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reminder sent</p>
                      <p className="text-xl font-bold text-foreground">{reminder.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pre-Call Brief Card */}
            <div
              className="p-8 rounded-3xl border-2 border-secondary/50 bg-gradient-to-br from-secondary/10 to-primary/10 hover:shadow-[0_0_60px_hsl(var(--secondary)/0.4)] transition-all duration-500"
              style={{ 
                animation: "slide-in-right 0.6s ease-out forwards",
                animationDelay: "0.3s",
                opacity: 0
              }}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 pb-6 border-b border-secondary/30">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Pre-Call Brief</h3>
                    <p className="text-muted-foreground">AI-generated insights</p>
                  </div>
                </div>
                
                {/* Brief Items */}
                <div className="space-y-4">
                  {briefItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3"
                      style={{ 
                        animation: "fade-up 0.4s ease-out forwards",
                        animationDelay: `${0.6 + i * 0.1}s`,
                        opacity: 0
                      }}
                    >
                      <TrendingUp className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-lg text-foreground/90">{item}</p>
                    </div>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="pt-6 border-t border-secondary/30">
                  <p className="text-sm text-muted-foreground italic">
                    Delivered automatically before every call
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetingAutomation;
