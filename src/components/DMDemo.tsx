import { CheckCircle2, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const messages = [
  { sender: "lead", text: "Hey, I am interested in your services", delay: 0 },
  { sender: "ai", text: "Thanks for reaching out. I would love to understand what you are working on. What is your biggest challenge right now", delay: 1500 },
  { sender: "lead", text: "I want to scale my agency but lead quality is terrible", delay: 3000 },
  { sender: "ai", text: "Understood. How urgent is this for you, are you trying to fix it in the next 30 days", delay: 4500 },
  { sender: "lead", text: "Yes this is urgent. I need help ASAP", delay: 6000 },
  { sender: "ai", text: "Perfect. You seem like a good fit. Here is your calendar link to book a quick strategy call", delay: 7500 },
  { sender: "lead", text: "Booked for tomorrow at 2 pm", delay: 9000 },
  { sender: "ai", text: "Confirmed. You will receive reminders and a pre call brief one hour before your meeting", delay: 10500 }
];

const checkpoints = [
  "AI engages instantly",
  "Asks qualification questions",
  "Detects urgency level",
  "Sends booking link",
  "Lead books meeting",
  "Slack alert triggered"
];

const DMDemo = () => {
  const [activeTab, setActiveTab] = useState("dm");
  const [visibleMessages, setVisibleMessages] = useState(0);

  const [bookingState, setBookingState] = useState({ sent: false, booked: false, when: null });
  const [slackFired, setSlackFired] = useState(false);
  const [briefReady, setBriefReady] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    clearTimers();
    setVisibleMessages(0);
    setBookingState({ sent: false, booked: false, when: null });
    setSlackFired(false);
    setBriefReady(false);

    if (activeTab === "dm") playDMSequence();
    if (activeTab === "booking") playBookingSequence();
    if (activeTab === "slack") playSlackSequence();
    if (activeTab === "brief") playBriefSequence();

    return () => clearTimers();
  }, [activeTab]);

  const clearTimers = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const playDMSequence = () => {
    const step = (index = 0) => {
      if (index > messages.length) return;

      setVisibleMessages(index);

      const delay = messages[index]?.delay
        ? messages[index].delay - (messages[index - 1]?.delay || 0)
        : 1000;

      timerRef.current = window.setTimeout(() => {
        if (index + 1 <= messages.length) step(index + 1);
      }, Math.max(300, delay));
    };

    step(1);
  };

  const playBookingSequence = () => {
    timerRef.current = window.setTimeout(() => {
      setBookingState((s) => ({ ...s, sent: true }));

      timerRef.current = window.setTimeout(() => {
        const time = new Date();
        time.setDate(time.getDate() + 1);
        time.setHours(14, 0, 0, 0);
        setBookingState({ sent: true, booked: true, when: time });
      }, 1500);
    }, 800);
  };

  const playSlackSequence = () => {
    timerRef.current = window.setTimeout(() => {
      setSlackFired(true);
    }, 1200);
  };

  const playBriefSequence = () => {
    timerRef.current = window.setTimeout(() => {
      setBriefReady(true);
    }, 900);
  };

  const handleManualBook = () => {
    const time = new Date();
    time.setDate(time.getDate() + 1);
    time.setHours(14, 0, 0, 0);

    setBookingState({ sent: true, booked: true, when: time });

    timerRef.current = window.setTimeout(() => setSlackFired(true), 600);
    timerRef.current = window.setTimeout(() => setBriefReady(true), 1200);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text shimmer mb-4">
              Watch AI in Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Real time lead qualification demo
            </p>
          </div>

          {/* TABS */}
          <div className="flex justify-center gap-3 mb-10">
            {["dm", "booking", "slack", "brief"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-primary to-secondary text-black shadow-[0_6px_30px_rgba(34,225,255,0.12)]"
                    : "bg-muted/5 text-foreground hover:bg-muted/10"
                }`}
              >
                {tab === "dm" && "DM"}
                {tab === "booking" && "Booking"}
                {tab === "slack" && "Slack Alert"}
                {tab === "brief" && "Pre Call Brief"}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* LEFT SIDE */}
            <div className="relative">
              <div className="bg-card border-2 border-primary/30 rounded-3xl p-6 shadow-[0_0_50px_hsl(var(--primary)/0.12)] max-w-md mx-auto">

                <div className="flex items-center gap-3 pb-4 border-b border-primary/20 mb-6">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">Instagram DM</p>
                    <p className="text-sm text-muted-foreground">Lumoscale AI responding</p>
                  </div>
                </div>

                {/* DM VIEW */}
                {activeTab === "dm" && (
                  <div className="space-y-4 h-[420px] overflow-y-auto">
                    {messages.slice(0, visibleMessages).map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.sender === "lead" ? "justify-start" : "justify-end"} animate-fade-up`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${
                            msg.sender === "lead"
                              ? "bg-muted text-foreground"
                              : "bg-gradient-to-r from-primary to-secondary text-black"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    ))}

                    {visibleMessages < messages.length && (
                      <div className="flex justify-end">
                        <div className="bg-primary/20 px-4 py-3 rounded-2xl">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* BOOKING VIEW */}
                {activeTab === "booking" && (
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">Example Booking Message AI Sends</p>

                    <div className="p-4 rounded-xl border bg-muted/5 space-y-3">
                      <p className="text-sm font-medium">AI Message:</p>

                      <div className="bg-primary/10 p-4 rounded-xl">
                        <p className="text-sm">
                          You seem like a great fit. Here is your booking link for a 15 minute strategy call.
                        </p>
                        <p className="mt-2 font-semibold text-primary">https://cal.com/lumoscale/strategy-call</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-1">Client books:</p>
                        {!bookingState.booked ? (
                          <button
                            onClick={handleManualBook}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-medium"
                          >
                            Simulate Booking
                          </button>
                        ) : (
                          <div className="bg-secondary/10 border border-secondary/40 p-4 rounded-xl">
                            <p className="text-sm">Booked for</p>
                            <p className="font-semibold">{bookingState.when?.toLocaleString()}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border bg-muted/5">
                      <p className="text-sm font-medium mb-2">Sample Calendar Event</p>
                      <div className="bg-muted/10 p-3 rounded-lg text-sm space-y-1">
                        <p><strong>Title:</strong> Strategy Call with Mike</p>
                        <p><strong>Duration:</strong> 15 minutes</p>
                        <p><strong>Location:</strong> Zoom</p>
                        <p><strong>Notes:</strong> Automations and scaling requirements</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLACK VIEW */}
                {activeTab === "slack" && (
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">This is the Slack alert you will receive</p>

                    <div className="rounded-xl border bg-muted/5 p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-black font-bold">
                          LS
                        </div>

                        <div>
                          <p className="font-semibold">New Hot Lead Booked</p>
                          <p className="text-sm text-muted-foreground">Mike booked for Thu 3 pm</p>
                        </div>
                      </div>

                      <div className="bg-primary/10 p-3 rounded-lg text-sm">
                        <p><strong>Lead Name:</strong> Mike</p>
                        <p><strong>Service:</strong> Agency automation</p>
                        <p><strong>Status:</strong> Qualified and booked</p>
                      </div>

                      <button
                        onClick={() => setSlackFired(true)}
                        className={`px-3 py-2 rounded-lg ${slackFired ? "bg-secondary/20" : "bg-muted/10"}`}
                      >
                        {slackFired ? "Slack Delivered" : "Simulate Slack"}
                      </button>
                    </div>
                  </div>
                )}

                {/* PRE CALL BRIEF VIEW */}
                {activeTab === "brief" && (
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">This is the pre call brief you receive</p>

                    <div className="p-4 rounded-xl border bg-muted/5 space-y-3">
                      <p className="font-bold text-lg">Pre Call Brief</p>

                      <div className="text-sm space-y-2">
                        <p><strong>Lead Name:</strong> Mike</p>
                        <p><strong>Business:</strong> Digital Marketing Agency</p>
                        <p><strong>Main Pain:</strong> Low lead quality, inconsistent delivery</p>
                        <p><strong>Urgency:</strong> High, losing client</p>
                        <p><strong>Budget Level:</strong> Medium to high</p>
                        <p><strong>Desired Outcomes:</strong> Increase lead quality, automate qualification</p>
                        <p><strong>Objections Found:</strong> Timeline concerns</p>
                        <p><strong>Recommended Approach:</strong> Intro automation flow to fix bottleneck and reduce workload</p>
                      </div>

                      <button
                        onClick={() => setBriefReady(true)}
                        className={`px-4 py-2 rounded-lg ${briefReady ? "bg-secondary/20" : "bg-gradient-to-r from-primary to-secondary text-black"}`}
                      >
                        {briefReady ? "Brief Ready" : "Generate Brief"}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* RIGHT SIDE CHECKLIST */}
            <div className="space-y-6">
              {checkpoints.map((checkpoint, i) => {
                const progressIndex = Math.min(
                  Math.floor((visibleMessages - 1) / (messages.length / checkpoints.length)),
                  checkpoints.length
                );

                const active = activeTab === "dm" ? i < progressIndex : false;

                return (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-500 ${
                      active
                        ? "border-secondary/50 bg-secondary/10 shadow-[0_0_30px_hsl(var(--secondary)/0.3)]"
                        : "border-muted bg-muted/5"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-7 h-7 transition-colors duration-500 ${
                        active ? "text-secondary" : "text-muted-foreground"
                      }`}
                    />
                    <p className="text-lg font-medium text-foreground">{checkpoint}</p>
                  </div>
                );
              })}

              <div className="pt-4">
                <p className="text-2xl font-bold gradient-text">
                  You wake up to meetings already booked
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DMDemo;
