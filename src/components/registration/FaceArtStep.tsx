import { RegistrationData, FaceArt } from "@/lib/registration-types";
import { StepShell } from "./StepShell";
import { cn } from "@/lib/utils";

const opts: FaceArt[] = ["Yes", "Maybe", "No"];

interface Props {
  data: RegistrationData;
  update: (p: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FaceArtStep = ({ data, update, onNext, onBack }: Props) => (
  <StepShell
    step={3} total={7}
    title="Face Art?"
    subtitle="Step into your alter ego — paint, masks, the works."
    onBack={onBack} onNext={onNext} nextDisabled={!data.faceArt}
  >
    <div className="grid grid-cols-3 gap-3">
      {opts.map((o) => {
        const active = data.faceArt === o;
        return (
          <button
            key={o}
            onClick={() => update({ faceArt: o })}
            className={cn(
              "glass rounded-xl py-8 text-center font-bold text-lg uppercase tracking-widest transition-smooth border",
              active
                ? "border-primary shadow-neon-pink text-primary scale-[1.04]"
                : "border-border hover:border-secondary/60 text-foreground/80"
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  </StepShell>
);
