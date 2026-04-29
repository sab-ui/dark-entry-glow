import { StepShell } from "./StepShell";
import { RegistrationData } from "@/lib/registration-types";
import { Sparkles } from "lucide-react";

interface Props {
  data: RegistrationData;
  onBack: () => void;
}

export const FinalCTAStep = ({ data, onBack }: Props) => {
  return (
    <StepShell step={7} total={7} title="Welcome to the dark side 🖤" subtitle={`See you on 8 May, ${data.name || "stranger"}.`} onBack={onBack} hideNav>
      <div className="glass rounded-2xl p-6 sm:p-8 border border-primary/30 shadow-neon-pink text-center animate-pulse-glow">
        <Sparkles className="w-10 h-10 mx-auto text-primary text-glow-pink mb-3" />
        <p className="text-xs uppercase tracking-[0.4em] text-accent mb-3">You're In</p>
        <p className="text-foreground text-base sm:text-lg leading-relaxed">
          Your spot is locked. We'll see you under the lights on
          <span className="block mt-2 text-2xl sm:text-3xl font-black text-gradient-neon">8 May · 8 PM</span>
        </p>
        <div className="mt-5 pt-5 border-t border-border/60 text-sm text-muted-foreground italic">
          Versova Vibes Cafe · Andheri West
        </div>
      </div>
    </StepShell>
  );
};
