import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  hideNav?: boolean;
}

export const StepShell = ({
  step, total, title, subtitle, children, onBack, onNext,
  nextLabel = "Continue", nextDisabled, hideNav,
}: Props) => {
  const pct = (step / total) * 100;
  return (
    <div className="w-full max-w-xl animate-fade-in-up">
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
          <span>Step {step} / {total}</span>
          <span className="text-primary">The Afterdark Affair</span>
        </div>
        <div className="h-[2px] w-full bg-muted overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-neon shadow-neon-pink transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-glow-pink mb-2">{title}</h2>
      {subtitle && <p className="text-muted-foreground mb-8 italic">{subtitle}</p>}
      {!subtitle && <div className="mb-8" />}

      <div className="mb-10">{children}</div>

      {!hideNav && (
        <div className="flex gap-3">
          {onBack && (
            <Button variant="outline" size="lg" onClick={onBack} className="border-border bg-transparent hover:bg-muted">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          )}
          {onNext && (
            <Button
              size="lg"
              onClick={onNext}
              disabled={nextDisabled}
              className="flex-1 bg-gradient-neon text-primary-foreground border-0 shadow-neon-pink hover:shadow-neon-purple transition-smooth disabled:opacity-40 disabled:shadow-none"
            >
              {nextLabel} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
