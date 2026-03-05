import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MessageSquare,
  Bell,
  User,
  Smartphone,
  X,
  Play,
} from "lucide-react";

// Roles to cycle through with unique colors
const ROLES = [
  { text: "Sales Team,", color: "#00d4ff" },
  { text: "Appointment Setter,", color: "#ff6b6b" },
  { text: "Virtual Assistant,", color: "#a855f7" },
  { text: "SDR,", color: "#facc15" },
  { text: "Lead Manager,", color: "#3b82f6" },
  { text: "Chat Support,", color: "#14b8a6" },
  { text: "Follow-up System,", color: "#f472b6" },
];

const Hero = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const velocitiesRef = useRef<{ dx: number; dy: number }[]>([]);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Role cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
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
    let isIntersecting = false;

    // Use IntersectionObserver to pause animation when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          if (!frameId) frameId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { threshold: 0 }
    );

    if (circle) observer.observe(circle);

    const animate = () => {
      if (!isIntersecting) return;

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

    // Initial start if visible (IntersectionObserver will handle subsequent toggles, 
    // but we need to kick it off or let the observer callback handle it logic)
    // Actually, the observer callback runs immediately on observe with initial state.

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-glow-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 relative z-10 mt-6 min-w-0">
          {/* LEFT */}
          <div className="flex flex-col justify-center space-y-8 mt-6 min-w-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full w-fit animate-fade-up">
              <span className="text-sm font-medium text-primary">
                For Coaches and Service Business Owners
              </span>
            </div>

            <div className="animate-fade-up pb-3">
              <h1
                className="text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15]"
                style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}
              >
                <span className="block font-extrabold text-white mb-2">
                  What If Your DMs Worked Like a
                </span>
                <span className="block min-h-[1.2em]">
                  <span
                    className={`inline-block font-black transition-all duration-300 ease-out ${isAnimating
                      ? "opacity-0 translate-y-2"
                      : "opacity-100 translate-y-0"
                      }`}
                    style={{
                      color: ROLES[currentRoleIndex].color,
                    }}
                  >
                    {ROLES[currentRoleIndex].text}
                  </span>
                </span>
                <span className="block font-extrabold text-white mt-2">
                  Not an Inbox?
                </span>
              </h1>
            </div>

            {/* Premium Feature Container */}
            <div
              className="animate-fade-up relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5" />
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm md:text-base text-white/90">Reply 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-sm md:text-base text-white/90">Qualify Every Lead</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm md:text-base text-white/90">Auto Follow-ups</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-sm md:text-base text-white/90">Full Visibility</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground border-t border-white/10 pt-4">
                  Focus on delivery and closing — we handle the rest.
                </p>
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 pt-2 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >

              <Button
                variant="outline"
                className="px-8 py-6 text-lg border-primary/50 hover:bg-white hover:text-cyan-600 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
                onClick={() =>
                  window.open("https://cal.com/lumoscale/30min", "_blank")
                }
              >
                Book Free Strategy Call
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center justify-center min-w-0">
            <div
              ref={circleRef}
              className="relative w-full max-w-[480px] aspect-square rounded-full bg-card border border-primary/30 shadow-[0_0_50px_rgba(0,255,255,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <Smartphone className="w-24 h-24 text-primary opacity-80" />
                <p className="text-lg text-muted-foreground mt-2">
                  Checking messages...
                </p>
              </div>

              {/* Floating cards */}
              <div ref={(el) => (itemsRef.current[0] = el)} className="absolute left-1/2 top-1/2 bg-card border border-primary/40 rounded-xl px-4 py-3 md:w-56 shadow-xl">
                <div className="flex gap-2">
                  <MessageSquare className="text-primary h-5 w-5 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">AI Response</p>
                    <p className="text-sm">Hello, whats your pricing?</p>
                  </div>
                </div>
              </div>

              <div ref={(el) => (itemsRef.current[1] = el)} className="absolute left-1/2 top-1/2 bg-card border border-secondary/40 rounded-xl px-4 py-3 md:w-52 shadow-xl">
                <div className="flex gap-2">
                  <Calendar className="text-secondary h-5 w-5 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">Booking Confirmed</p>
                    <p className="text-sm font-semibold">Thu, 2:00 PM</p>
                  </div>
                </div>
              </div>

              <div ref={(el) => (itemsRef.current[2] = el)} className="absolute left-1/2 top-1/2 bg-card border border-primary/40 rounded-xl px-4 py-3 md:w-60 shadow-xl">
                <div className="flex gap-2">
                  <Bell className="text-primary h-5 w-5 mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">Slack Alert</p>
                    <p className="text-sm">New hot lead booked a call</p>
                  </div>
                </div>
              </div>

              <div ref={(el) => (itemsRef.current[3] = el)} className="absolute left-1/2 top-1/2 bg-primary/20 text-primary px-4 py-2 rounded-full shadow">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">New Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative bg-card rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="relative w-full pt-[56.25%]">
              <video
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                controls
                playsInline
                preload="metadata"
                autoPlay
                muted
              >
                <source src="/Demo1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="p-6 bg-card">
              <h3 className="text-2xl font-bold mb-2">See How It Works</h3>
              <p className="text-muted-foreground mb-4">
                Watch how our system responds to DMs, qualifies leads, and books consultations automatically.
              </p>

              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary text-black hover:scale-105 transition-all"
                onClick={() => {
                  setShowVideoModal(false);
                  window.open("https://cal.com/lumoscale/30min", "_blank");
                }}
              >
                Book Your Strategy Call Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
