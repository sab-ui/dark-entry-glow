import { RegistrationData } from "@/lib/registration-types";
import { StepShell } from "./StepShell";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface Props {
  data: RegistrationData;
  update: (p: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GirlsOfferStep = ({ data, update, onNext, onBack }: Props) => (
  <StepShell
    step={5} total={7}
    title="Are you a girl?"
    subtitle="So we know about the unlimited shots offer 🥃"
    onBack={onBack} onNext={onNext} nextDisabled={data.girlsOffer === null}
  >
    <div className="grid grid-cols-2 gap-3 mb-4">
      {[true, false].map((v) => {
        const active = data.girlsOffer === v;
        return (
          <button
            key={String(v)}
            onClick={() => update({ girlsOffer: v })}
            className={cn(
              "glass rounded-xl py-8 text-center font-bold text-xl uppercase tracking-widest transition-smooth border",
              active
                ? "border-primary shadow-neon-pink text-primary scale-[1.02]"
                : "border-border hover:border-secondary/60 text-foreground/80"
            )}
          >
            {v ? "Yes" : "No"}
          </button>
        );
      })}
    </div>

    {data.girlsOffer === true && (
      <div className="glass rounded-xl p-5 border border-accent/40 shadow-neon-yellow animate-fade-in-up flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-accent uppercase tracking-wider text-sm">Unlocked</div>
          <div className="text-sm text-foreground/80 mt-1">
            Unlimited shots — first 2 hours. Just show up.
          </div>
        </div>
      </div>
    )}
  </StepShell>
);
