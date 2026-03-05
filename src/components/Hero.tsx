import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Bell, User, Smartphone } from "lucide-react";

const Hero = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const velocitiesRef = useRef<{ dx: number; dy: number }[]>([]);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const radius = circle.offsetWidth / 2;
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

    positionsRef.current = items.map(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (radius * 0.5);
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      };
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
        const maxDist = radius - 90;

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">

      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-glow-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 relative z-10 mt-6">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center space-y-8 mt-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-normal gradient-text shimmer animate-fade-up pb-3">
            Never Lose A
            <br />
            Hot Lead Again
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Let AI respond, qualify, and send booking links while you focus on closing deals
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-secondary text-black hover:scale-105 transition-all">
              Book Your Demo
            </Button>

            <Button
              variant="outline"
              className="px-8 py-6 text-lg border-primary/50 hover:bg-primary/10"
            >
              Watch Live Demo
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center justify-center">
          <div
            ref={circleRef}
            className="relative w-[480px] h-[480px] rounded-full bg-card border border-primary/30 shadow-[0_0_50px_rgba(0,255,255,0.2)] overflow-hidden"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <Smartphone className="w-24 h-24 text-primary opacity-80" />
              <p className="text-lg text-muted-foreground mt-2">Checking messages...</p>
            </div>

            {/* DM */}
            <div
              ref={(el) => (itemsRef.current[0] = el)}
              className="absolute left-1/2 top-1/2 bg-card border border-primary/40 rounded-xl px-4 py-3 w-56 shadow-xl"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="text-primary h-5 w-5 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">AI Response</p>
                  <p className="text-sm">Hey Mike, what type of agency do you run</p>
                </div>
              </div>
            </div>

            {/* Booking */}
            <div
              ref={(el) => (itemsRef.current[1] = el)}
              className="absolute left-1/2 top-1/2 bg-card border border-secondary/40 rounded-xl px-4 py-3 w-52 shadow-xl"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div className="flex items-start gap-2">
                <Calendar className="text-secondary h-5 w-5 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">Booking Confirmed</p>
                  <p className="text-sm font-semibold">Thu, 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Slack */}
            <div
              ref={(el) => (itemsRef.current[2] = el)}
              className="absolute left-1/2 top-1/2 bg-card border border-primary/40 rounded-xl px-4 py-3 w-60 shadow-xl"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div className="flex items-start gap-2">
                <Bell className="text-primary h-5 w-5 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">Slack Alert</p>
                  <p className="text-sm">New hot lead booked a call</p>
                </div>
              </div>
            </div>

            {/* User Tag */}
            <div
              ref={(el) => (itemsRef.current[3] = el)}
              className="absolute left-1/2 top-1/2 bg-primary/20 text-primary px-4 py-2 rounded-full shadow"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">Mike Johnson</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
