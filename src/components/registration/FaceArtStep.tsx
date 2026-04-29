import { RegistrationData, FaceArt } from "@/lib/registration-types";
import { StepShell } from "./StepShell";
import { cn } from "@/lib/utils";

const opts: { value: FaceArt; emoji: string; label: string; sub: string; color: string }[] = [
  { value: "Yes",   emoji: "💀", label: "Hell Yes",  sub: "Full face. Full commit.",   color: "hsl(335 100% 50%)" },
  { value: "Maybe", emoji: "👁",  label: "Maybe",     sub: "Depends on the vibe.",     color: "hsl(272 100% 55%)" },
  { value: "No",    emoji: "🫥", label: "Nah",       sub: "Keeping it clean tonight.", color: "hsl(0 0% 50%)" },
];

interface Props {
  data: RegistrationData; update: (p: Partial<RegistrationData>) => void;
  onNext: () => void; onBack: () => void;
}

export const FaceArtStep = ({ data, update, onNext, onBack }: Props) => (
  <StepShell step={3} total={7} title="Face art?" subtitle="Step into your alter ego." onBack={onBack} onNext={onNext} nextDisabled={!data.faceArt}>
    <div className="flex flex-col gap-2.5">
      {opts.map(({ value, emoji, label, sub, color }) => {
        const active = data.faceArt === value;
        return (
          <button key={value} onClick={() => update({ faceArt: value })}
            className="relative group flex items-center gap-5 px-5 py-5 border border-white/8 bg-white/[0.02] hover:border-white/20 transition-all duration-300 overflow-hidden text-left"
            style={active ? {
              borderColor: color.replace(")", " / 0.7)").replace("hsl(", "hsl("),
              background: color.replace(")", " / 0.08)").replace("hsl(", "hsl("),
              boxShadow: `0 0 30px ${color.replace(")", " / 0.3)").replace("hsl(", "hsl(")}`
            } : {}}>

            {/* active left bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300"
              style={{ background: active ? color : "transparent" }} />

            <span className="text-4xl shrink-0 transition-transform duration-300 group-hover:scale-110">{emoji}</span>

            <div className="flex-1 min-w-0">
              <div className="font-black leading-none transition-all duration-300"
                style={{ fontSize: "clamp(1.8rem, 7vw, 2.5rem)", color: active ? color : "white", textShadow: active ? `0 0 20px ${color}` : "none" }}>
                {label}
              </div>
              <div className="text-xs mt-1" style={{ color: active ? color + "80" : "hsl(0 0% 40%)" }}>{sub}</div>
            </div>

            {active && (
              <div className="w-5 h-5 shrink-0 flex items-center justify-center border-2 rounded-full"
                style={{ borderColor: color }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
              </div>
            )}

            {/* bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
              style={{ background: active ? color : "transparent" }} />
          </button>
        );
      })}
    </div>
  </StepShell>
);
