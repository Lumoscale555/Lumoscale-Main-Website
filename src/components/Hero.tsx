import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Bell, User, Smartphone, X, Play } from "lucide-react";

const Hero = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const velocitiesRef = useRef<{ dx: number; dy: number }[]>([]);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showBetaPopup, setShowBetaPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBetaPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const radius = circle.offsetWidth / 2;
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

    positionsRef.current = items.map(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (radius * 0.5);
      return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
    });

    velocitiesRef.current = items.map(() => ({
      dx: (Math.random() - 0.5) * 1.8,
      dy: (Math.random() - 0.5) * 1.8,
    }));

    items.forEach((item, index) => {
      const pos = positionsRef.current[index];
      item.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`;
    });

    let frameId: number;
    const animate = () => {
      items.forEach((item, index) => {
        const pos = positionsRef.current[index];
        const vel = velocitiesRef.current[index];

        pos.x += vel.dx;
        pos.y += vel.dy;

        const dist = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        const maxDist = Math.max(40, radius - 90);

        if (dist > maxDist) {
          const nx = pos.x / dist;
          const ny = pos.y / dist;

          const dot = vel.dx * nx + vel.dy * ny;
          vel.dx -= 2 * dot * nx;
          vel.dy -= 2 * dot * ny;

          pos.x = nx * maxDist;
          pos.y = ny * maxDist;
        }

        item.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-glow-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 relative z-10 mt-6 min-w-0">
          <div className="flex flex-col justify-center space-y-8 mt-6 min-w-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full w-fit animate-fade-up">
              <span className="text-sm font-medium text-primary">
                FOR B2B and B2C Business Owners
              </span>
            </div>

            <h1 className="hero-h1 text-5xl md:text-7xl font-black tracking-tight leading-tight gradient-text shimmer animate-fade-up pb-3">
              Turn your DMs Into Booked Consultations While You Sleep
            </h1>

            <p
              className="text-xl md:text-2xl text-muted-foreground animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              AI responds in 60 seconds, qualifies every lead, and books consultations automatically, so you never lose a client to slow replies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button
                onClick={() => setShowVideoModal(true)}
                className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-secondary text-black hover:scale-105 transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                See How It Works (Free Demo)
              </Button>

              <Button
                variant="outline"
                className="px-8 py-6 text-lg border-primary/50 hover:bg-primary/10"
                onClick={() => window.open("https://cal.com/vamsivk/30min", "_blank")}
              >
                Book Free Strategy Call
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center min-w-0">
            <div
              ref={circleRef}
              className="relative w-full max-w-[480px] aspect-square rounded-full bg-card border border-primary/30 shadow-[0_0_50px_rgba(0,255,255,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <Smartphone className="w-24 h-24 text-primary opacity-80" />
                <p className="text-lg text-muted-foreground mt-2">Checking messages...</p>
              </div>

              <div ref={(el) => (itemsRef.current[0] = el)} className="absolute left-1/2 top-1/2 bg-card border border-primary/40 rounded-xl px-4 py-3 max-w-[85%] md:w-56 shadow-xl" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-start gap-2">
                  <MessageSquare className="text-primary h-5 w-5 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">AI Response</p>
                    <p className="text-sm">Hey Mike, what type of agency do you run</p>
                  </div>
                </div>
              </div>

              <div ref={(el) => (itemsRef.current[1] = el)} className="absolute left-1/2 top-1/2 bg-card border border-secondary/40 rounded-xl px-4 py-3 max-w-[80%] md:w-52 shadow-xl" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-start gap-2">
                  <Calendar className="text-secondary h-5 w-5 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">Booking Confirmed</p>
                    <p className="text-sm font-semibold">Thu, 2:00 PM</p>
                  </div>
                </div>
              </div>

              <div ref={(el) => (itemsRef.current[2] = el)} className="absolute left-1/2 top-1/2 bg-card border border-primary/40 rounded-xl px-4 py-3 max-w-[90%] md:w-60 shadow-xl" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-start gap-2">
                  <Bell className="text-primary h-5 w-5 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">Slack Alert</p>
                    <p className="text-sm">New hot lead booked a call</p>
                  </div>
                </div>
              </div>

              <div ref={(el) => (itemsRef.current[3] = el)} className="absolute left-1/2 top-1/2 bg-primary/20 text-primary px-4 py-2 rounded-full shadow" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Mike Johnson</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowVideoModal(false)}>
          <div className="relative bg-card rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVideoModal(false)} className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="relative w-full pt-[56.25%]">
              <video className="absolute inset-0 w-full h-full object-cover rounded-2xl" src="/Demo.mp4" controls autoPlay muted />
            </div>

            <div className="p-6 bg-card">
              <h3 className="text-2xl font-bold mb-2">See How It Works</h3>
              <p className="text-muted-foreground mb-4">
                Watch how our AI responds to Instagram DMs, qualifies leads, and books consultations automatically, all in under 60 seconds.
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-black hover:scale-105 transition-all" onClick={() => { setShowVideoModal(false); window.open("https://cal.com/vamsivk/30min", "_blank"); }}>
                Book Your Strategy Call Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* BETA POPUP */}
      {showBetaPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative bg-gradient-to-br from-card to-card/80 border border-primary/30 rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <button onClick={() => setShowBetaPopup(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-6">
              <div className="text-6xl animate-pulse">🔥</div>

              <h2 className="text-3xl font-bold gradient-text">First 5 Founding Clients</h2>

              <p className="text-muted-foreground text-lg">
                We are onboarding only <strong className="text-foreground">5 founding clients</strong> with exclusive early access benefits.
              </p>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2 text-left">
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>No setup fee, <span className="line-through opacity-60">$799</span> <span className="font-semibold">$497</span> per month</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Priority support for the first 3 months</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  <span>Lifetime grandfathered pricing</span>
                </p>
              </div>

              <p className="text-sm text-primary font-semibold">Limited founding client availability</p>

              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-black text-lg py-6 hover:scale-105 transition-all" onClick={() => { setShowBetaPopup(false); window.open("https://cal.com/vamsivk/30min", "_blank"); }}>
                Book Strategy Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
