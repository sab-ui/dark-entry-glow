import { RegistrationData, EntryType } from "@/lib/registration-types";
import { StepShell } from "./StepShell";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

const types: { name: EntryType; emoji: string; sub: string; color: string }[] = [
  { name: "Solo",   emoji: "🕶",   sub: "Just me.",            color: "hsl(335 100% 50%)" },
  { name: "Couple", emoji: "🖤🤍", sub: "Two vibes, one night.", color: "hsl(272 100% 55%)" },
  { name: "Group",  emoji: "👥",   sub: "The whole crew.",      color: "hsl(48 100% 52%)" },
];

interface Props {
  data: RegistrationData; update: (p: Partial<RegistrationData>) => void;
  onNext: () => void; onBack: () => void;
}

export const EntryTypeStep = ({ data, update, onNext, onBack }: Props) => {
  const valid = !!data.entryType && (data.entryType !== "Group" || data.groupSize >= 3);
  return (
    <StepShell step={4} total={8} title="How you rolling?" onBack={onBack} onNext={onNext} nextDisabled={!valid}>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {types.map(({ name, emoji, sub, color }) => {
          const active = data.entryType === name;
          return (
            <button key={name} onClick={() => update({ entryType: name })}
              className="relative flex flex-col items-center justify-center py-7 sm:py-9 border border-white/8 bg-white/[0.02] hover:border-white/20 transition-all duration-300 overflow-hidden"
              style={active ? {
                borderColor: color.replace(")", " / 0.7)"),
                background: color.replace(")", " / 0.1)"),
                boxShadow: `0 0 30px ${color.replace(")", " / 0.35)")}`,
                transform: "scale(1.03)"
              } : {}}>
              {active && <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />}
              <span className="text-3xl mb-2">{emoji}</span>
              <div className="font-black text-base sm:text-lg transition-all duration-300"
                style={{ color: active ? color : "white", textShadow: active ? `0 0 15px ${color}` : "none" }}>
                {name}
              </div>
              <div className="text-[9px] text-white/30 mt-0.5 text-center px-1 leading-tight hidden sm:block">{sub}</div>
              {active && <div className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: color }} />}
            </button>
          );
        })}
      </div>

      {data.entryType === "Group" && (
        <div className="animate-slide-up border border-secondary/30 bg-secondary/5 p-5 sm:p-7"
          style={{ boxShadow: "0 0 30px hsl(272 100% 55% / 0.15)" }}>
          <div className="text-[9px] uppercase tracking-[0.6em] text-secondary/50 text-center mb-5">How many heads?</div>
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => update({ groupSize: Math.max(3, data.groupSize - 1) })}
              className="w-12 h-12 sm:w-14 sm:h-14 border border-white/10 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/30 transition-all duration-200 flex items-center justify-center">
              <Minus className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="font-black text-gradient-neon"
                style={{ fontSize: "clamp(4rem, 16vw, 7rem)", lineHeight: 1, filter: "drop-shadow(0 0 20px hsl(335 100% 50% / 0.5))" }}>
                {data.groupSize}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-white/25 mt-1">people</div>
            </div>
            <button onClick={() => update({ groupSize: Math.min(50, data.groupSize + 1) })}
              className="w-12 h-12 sm:w-14 sm:h-14 border border-white/10 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/30 transition-all duration-200 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </StepShell>
  );
};
