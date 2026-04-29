import { RegistrationData, Vibe } from "@/lib/registration-types";
import { StepShell } from "./StepShell";
import { cn } from "@/lib/utils";

const vibes: { name: Vibe; emoji: string; tag: string; color: string; activeStyle: React.CSSProperties }[] = [
  { name: "Wild",          emoji: "🔥", tag: "Unleash chaos",       color: "hsl(20 100% 50%)",   activeStyle: { boxShadow: "0 0 40px hsl(20 100% 50% / 0.6), inset 0 0 40px hsl(20 100% 50% / 0.08)", borderColor: "hsl(20 100% 50% / 0.8)", background: "hsl(20 100% 50% / 0.1)" } },
  { name: "Mysterious",   emoji: "🖤", tag: "Behind the mask",     color: "hsl(272 100% 55%)", activeStyle: { boxShadow: "0 0 40px hsl(272 100% 55% / 0.6), inset 0 0 40px hsl(272 100% 55% / 0.08)", borderColor: "hsl(272 100% 55% / 0.8)", background: "hsl(272 100% 55% / 0.1)" } },
  { name: "Dramatic",     emoji: "🎭", tag: "Steal the room",      color: "hsl(335 100% 50%)", activeStyle: { boxShadow: "0 0 40px hsl(335 100% 50% / 0.6), inset 0 0 40px hsl(335 100% 50% / 0.08)", borderColor: "hsl(335 100% 50% / 0.8)", background: "hsl(335 100% 50% / 0.1)" } },
  { name: "Unpredictable",emoji: "⚡", tag: "Anything goes",       color: "hsl(48 100% 52%)",  activeStyle: { boxShadow: "0 0 40px hsl(48 100% 52% / 0.5), inset 0 0 40px hsl(48 100% 52% / 0.06)",  borderColor: "hsl(48 100% 52% / 0.8)",  background: "hsl(48 100% 52% / 0.08)" } },
];

interface Props {
  data: RegistrationData; update: (p: Partial<RegistrationData>) => void;
  onNext: () => void; onBack: () => void;
}

export const VibeStep = ({ data, update, onNext, onBack }: Props) => (
  <StepShell step={2} total={7} title="Set the vibe." subtitle="Pick the energy you're walking in with." onBack={onBack} onNext={onNext} nextDisabled={!data.vibe}>
    <div className="grid grid-cols-2 gap-2.5">
      {vibes.map(({ name, emoji, tag, color, activeStyle }) => {
        const active = data.vibe === name;
        return (
          <button key={name} onClick={() => update({ vibe: name })}
            className="relative group flex flex-col items-start justify-end p-4 sm:p-5 border border-white/8 bg-white/[0.02] hover:border-white/20 transition-all duration-400 overflow-hidden"
            style={{ minHeight: 160, ...(active ? activeStyle : {}) }}>

            {/* active corner tag */}
            {active && (
              <div className="absolute top-0 right-0 text-[8px] font-black uppercase tracking-widest px-2 py-1"
                style={{ background: color, color: "black" }}>✓ chosen</div>
            )}

            <span className="text-4xl sm:text-5xl mb-3 leading-none">{emoji}</span>
            <div className="font-black leading-none mb-1 transition-all duration-300"
              style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)", color: active ? color : "white", textShadow: active ? `0 0 20px ${color}` : "none" }}>
              {name}
            </div>
            <div className="text-[10px] uppercase tracking-widest" style={{ color: active ? color + "99" : "hsl(0 0% 40%)" }}>{tag}</div>

            {/* bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
              style={{ background: active ? color : "transparent", boxShadow: active ? `0 0 10px ${color}` : "none" }} />
          </button>
        );
      })}
    </div>
  </StepShell>
);
