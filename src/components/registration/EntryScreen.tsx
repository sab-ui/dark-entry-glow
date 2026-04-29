import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const EntryScreen = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-10 md:py-16">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full bg-secondary/25 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px]" />

      {/* Top marquee */}
      <div className="relative overflow-hidden border-y border-primary/30 py-3 mb-12 bg-background/40 backdrop-blur-sm">
        <div className="flex gap-12 whitespace-nowrap animate-[scroll_30s_linear_infinite] text-xs uppercase tracking-[0.4em]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-primary text-glow-pink">★ Afterdark Affair 1.0</span>
              <span className="text-muted-foreground">8 May · 8 PM</span>
              <span className="text-secondary text-glow-purple">★ Versova Vibes Cafe</span>
              <span className="text-muted-foreground">Andheri West</span>
              <span className="text-accent">★ Unlimited Shots</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative grid md:grid-cols-12 gap-8 px-4 md:px-8 items-center">
        {/* Left meta column */}
        <div className="md:col-span-3 md:pr-4 space-y-8 order-2 md:order-1">
          <div className="hidden md:block">
            <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-2">Vol. 01</div>
            <div className="h-px w-12 bg-primary mb-2" />
            <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">No. 0085</div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary text-glow-pink">Featuring</div>
            <ul className="space-y-1 text-sm font-bold uppercase tracking-wider">
              <li className="text-foreground">DJ Night</li>
              <li className="text-secondary">Face Art</li>
              <li className="text-foreground">Alter Egos</li>
              <li className="text-accent">Dark Vibes</li>
            </ul>
          </div>

          <div className="hidden md:block glass border border-accent/40 rounded-lg p-4 shadow-neon-yellow">
            <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-1">Girls</div>
            <div className="text-sm font-bold leading-tight">Unlimited shots — first 2 hours.</div>
          </div>
        </div>

        {/* Center monumental title */}
        <div className="md:col-span-6 text-center order-1 md:order-2">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-muted-foreground mb-6 animate-flicker">
            Eventora × Versova Vibes
          </div>

          <div className="relative leading-[0.85]">
            <div className="text-2xl md:text-3xl italic font-light text-muted-foreground -mb-2 md:-mb-3">— the —</div>

            {/* Massive layered title */}
            <div className="relative inline-block">
              <h1
                aria-hidden
                className="absolute inset-0 text-[18vw] md:text-[9rem] font-black tracking-tighter text-secondary/40 select-none translate-x-[6px] translate-y-[3px] blur-[1px]"
              >
                AFTERDARK
              </h1>
              <h1
                aria-hidden
                className="absolute inset-0 text-[18vw] md:text-[9rem] font-black tracking-tighter text-primary/60 select-none -translate-x-[6px] -translate-y-[3px]"
              >
                AFTERDARK
              </h1>
              <h1 className="relative text-[18vw] md:text-[9rem] font-black tracking-tighter text-foreground animate-glitch">
                AFTERDARK
              </h1>
            </div>

            <div className="relative -mt-2 md:-mt-4">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
              <h2 className="relative inline-block px-6 bg-background text-5xl md:text-7xl font-black tracking-[0.05em] text-gradient-neon italic">
                Affair
              </h2>
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="h-px w-10 bg-primary" />
              <span className="text-sm font-bold tracking-[0.4em] text-primary text-glow-pink">VOL · 1.0</span>
              <span className="h-px w-10 bg-primary" />
            </div>
          </div>

          <p className="text-base md:text-lg italic text-muted-foreground mt-8 max-w-md mx-auto">
            Where the <span className="text-primary font-bold not-italic text-glow-pink">strange</span> meets the <span className="text-secondary font-bold not-italic text-glow-purple">wild</span> 🖤
          </p>

          {/* CTA */}
          <div className="mt-10 inline-flex flex-col items-center gap-3">
            <Button
              size="lg"
              onClick={onEnter}
              className="group relative bg-gradient-neon text-primary-foreground border-0 shadow-neon-pink animate-pulse-glow text-base md:text-lg px-10 py-7 uppercase tracking-[0.3em] font-bold rounded-none clip-ticket"
            >
              <span className="relative z-10 flex items-center">
                Enter if you dare
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70">
              Strictly by reservation
            </div>
          </div>
        </div>

        {/* Right ticket column */}
        <div className="md:col-span-3 md:pl-4 order-3 space-y-4">
          <div className="glass border border-primary/30 rounded-lg p-5 shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 text-[80px] font-black text-primary/10 leading-none -mt-3 -mr-2 select-none">08</div>
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-1">When</div>
              <div className="font-black text-2xl">8 May</div>
              <div className="text-sm text-muted-foreground mt-1">Thursday · 8:00 PM</div>
            </div>
          </div>

          <div className="glass border border-secondary/30 rounded-lg p-5 shadow-card">
            <div className="text-[10px] uppercase tracking-[0.4em] text-secondary mb-1">Where</div>
            <div className="font-black text-lg leading-tight">Versova Vibes Cafe</div>
            <div className="text-sm text-muted-foreground mt-1">Andheri West, Mumbai</div>
          </div>

          <div className="hidden md:flex justify-between items-center pt-2 px-1">
            <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Pass</div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">001/∞</div>
          </div>
        </div>
      </div>

      {/* Bottom triple-ribbon */}
      <div className="relative mt-16 grid grid-cols-3 gap-px bg-border">
        {[
          { label: "Masks On", color: "text-primary" },
          { label: "Vibes Loud", color: "text-secondary" },
          { label: "Egos Off", color: "text-accent" },
        ].map((x) => (
          <div key={x.label} className="bg-background py-4 text-center">
            <span className={`text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold ${x.color}`}>
              {x.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
