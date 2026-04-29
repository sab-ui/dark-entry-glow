import { RegistrationData, EntryType } from "@/lib/registration-types";
import { StepShell } from "./StepShell";
import { cn } from "@/lib/utils";
import { User, Users, UsersRound, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const types: { name: EntryType; icon: React.ElementType }[] = [
  { name: "Solo", icon: User },
  { name: "Couple", icon: Users },
  { name: "Group", icon: UsersRound },
];

interface Props {
  data: RegistrationData;
  update: (p: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const EntryTypeStep = ({ data, update, onNext, onBack }: Props) => {
  const valid = !!data.entryType && (data.entryType !== "Group" || data.groupSize >= 3);
  return (
    <StepShell
      step={4} total={7}
      title="How are you rolling in?"
      onBack={onBack} onNext={onNext} nextDisabled={!valid}
    >
      <div className="grid grid-cols-3 gap-3 mb-6">
        {types.map(({ name, icon: Icon }) => {
          const active = data.entryType === name;
          return (
            <button
              key={name}
              onClick={() => update({ entryType: name })}
              className={cn(
                "glass rounded-xl p-5 text-center transition-smooth border",
                active
                  ? "border-primary shadow-neon-pink scale-[1.02]"
                  : "border-border hover:border-secondary/60"
              )}
            >
              <Icon className={cn("w-7 h-7 mx-auto mb-2", active ? "text-primary" : "text-secondary")} />
              <div className="font-bold">{name}</div>
            </button>
          );
        })}
      </div>

      {data.entryType === "Group" && (
        <div className="glass rounded-xl p-5 animate-fade-in-up">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Group size</div>
          <div className="flex items-center justify-between">
            <Button
              size="icon" variant="outline"
              onClick={() => update({ groupSize: Math.max(3, data.groupSize - 1) })}
              className="border-border bg-transparent"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="text-5xl font-bold text-glow-pink">{data.groupSize}</div>
            <Button
              size="icon" variant="outline"
              onClick={() => update({ groupSize: Math.min(50, data.groupSize + 1) })}
              className="border-border bg-transparent"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </StepShell>
  );
};
