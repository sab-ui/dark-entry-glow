import { Button } from "@/components/ui/button";

export const EntryScreen = ({ onEnter }: { onEnter: () => void }) => (
  <div className="text-center animate-fade-in-up px-4">
    <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground mb-6 animate-flicker">
      Eventora × Versova Vibes Cafe presents
    </p>
    <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-none">
      <span className="block text-foreground">The</span>
      <span className="block text-gradient-neon animate-glitch">AFTERDARK</span>
      <span className="block text-foreground/90">AFFAIR</span>
      <span className="block text-2xl md:text-3xl text-primary mt-2">— 1.0 —</span>
    </h1>
    <p className="text-lg md:text-xl text-muted-foreground italic mb-12 max-w-md mx-auto">
      Where the <span className="text-primary font-semibold">strange</span> meets the <span className="text-secondary font-semibold">wild</span> 🖤
    </p>
    <Button
      size="lg"
      onClick={onEnter}
      className="bg-gradient-neon text-primary-foreground border-0 shadow-neon-pink animate-pulse-glow text-lg px-10 py-7 uppercase tracking-widest font-bold"
    >
      Enter if you dare
    </Button>
    <p className="mt-12 text-xs text-muted-foreground tracking-widest">
      8 MAY · 8 PM · VERSOVA VIBES CAFE, ANDHERI WEST
    </p>
  </div>
);
