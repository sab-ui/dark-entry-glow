import { RegistrationData, Vibe } from "@/lib/registration-types";
import { StepShell } from "./StepShell";
import { cn } from "@/lib/utils";
import { Flame, Eye, Drama, Zap } from "lucide-react";

const vibes: { name: Vibe; icon: React.ElementType; tag: string }[] = [
  { name: "Wild", icon: Flame, tag: "Unleash chaos" },
  { name: "Mysterious", icon: Eye, tag: "Behind the mask" },
  { name: "Dramatic", icon: Drama, tag: "Steal the spotlight" },
  { name: "Unpredictable", icon: Zap, tag: "Anything goes" },
];

interface Props {
  data: RegistrationData;
  update: (p: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const VibeStep = ({ data, update, onNext, onBack }: Props) => (
  <StepShell
    step={2} total={7}
    title="Pick your vibe"
    subtitle="Set the tone for the night."
    onBack={onBack} onNext={onNext} nextDisabled={!data.vibe}
  >
    <div className="grid grid-cols-2 gap-3">
      {vibes.map(({ name, icon: Icon, tag }) => {
        const active = data.vibe === name;
        return (
          <button
            key={name}
            onClick={() => update({ vibe: name })}
            className={cn(
              "glass rounded-xl p-5 text-left transition-smooth border",
              active
                ? "border-primary shadow-neon-pink scale-[1.02]"
                : "border-border hover:border-secondary/60 hover:shadow-neon-purple"
            )}
          >
            <Icon className={cn("w-7 h-7 mb-3", active ? "text-primary" : "text-secondary")} />
            <div className="font-bold text-lg">{name}</div>
            <div className="text-xs text-muted-foreground mt-1">{tag}</div>
          </button>
        );
      })}
    </div>
  </StepShell>
);
