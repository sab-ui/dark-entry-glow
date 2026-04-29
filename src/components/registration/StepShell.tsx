import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  step: number; total: number; title: string; subtitle?: string;
  children: ReactNode; onBack?: () => void; onNext?: () => void;
  nextLabel?: string; nextDisabled?: boolean; hideNav?: boolean;
}

export const StepShell = ({ step, total, title, subtitle, children, onBack, onNext, nextLabel = "Continue", nextDisabled, hideNav }: Props) => {
  const pct = (step / total) * 100;
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-black overflow-hidden">

      {/* layered bg */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,hsl(272_100%_20%/0.5),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_100%,hsl(335_100%_20%/0.4),transparent)]" />
      </div>
      <div className="grain pointer-events-none fixed inset-0" />

      {/* ── top bar ── */}
      <div className="fixed top-0 inset-x-0 z-50">
        {/* progress line */}
        <div className="h-[2px] bg-white/5 relative">
          <div className="h-full transition-all duration-700 ease-out"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg, hsl(335 100% 50%), hsl(272 100% 55%))", boxShadow: "0 0 10px hsl(335 100% 50% / 0.8)" }} />
        </div>

        {/* nav row */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3 bg-black/90 backdrop-blur border-b border-white/[0.04]">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-mono">{String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className="h-[3px] rounded-full transition-all duration-500"
                style={{ width: i < step ? 20 : 6, background: i < step ? "hsl(335 100% 50%)" : "hsl(0 0% 20%)" }} />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-primary/50 animate-flicker font-teko">Afterdark</span>
        </div>
      </div>

      {/* ── content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 pt-24 pb-32">
        <div className="w-full max-w-lg mx-auto animate-slide-up">

          {/* step tag */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-px h-5 bg-primary" style={{ boxShadow: "0 0 8px hsl(335 100% 50%)" }} />
            <span className="text-[9px] uppercase tracking-[0.6em] text-primary/70">Step {step}</span>
          </div>

          {/* title */}
          <h2 className="font-black leading-[0.88] text-white mb-3 break-words"
            style={{
              fontSize: "clamp(2.8rem, 11vw, 6rem)",
              textShadow: "0 0 60px hsl(335 100% 50% / 0.15)"
            }}>
            {title}
          </h2>

          {subtitle && (
            <p className="font-marker text-sm sm:text-base text-white/40 mb-8 leading-relaxed">{subtitle}</p>
          )}
          {!subtitle && <div className="mb-8" />}

          {children}
        </div>
      </div>

      {/* ── bottom nav ── */}
      {!hideNav && (
        <div className="fixed bottom-0 inset-x-0 z-50 px-5 sm:px-8 py-4 bg-black/95 backdrop-blur border-t border-white/[0.05]">
          <div className="w-full max-w-lg mx-auto flex gap-3">
            {onBack && (
              <button onClick={onBack}
                className="flex items-center gap-2 px-5 py-4 border border-white/10 text-white/40 hover:text-white hover:border-white/25 transition-all duration-300 text-[10px] uppercase tracking-[0.3em] font-bold">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}
            {onNext && (
              <button onClick={onNext} disabled={nextDisabled}
                className="group flex-1 relative overflow-hidden flex items-center justify-center gap-2 py-4 text-white font-black text-[10px] uppercase tracking-[0.35em] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
                style={!nextDisabled ? {
                  background: "linear-gradient(135deg, hsl(335 100% 50%), hsl(272 100% 55%))",
                  boxShadow: "0 0 30px hsl(335 100% 50% / 0.5)"
                } : { background: "hsl(0 0% 15%)" }}>
                <span className="relative z-10 flex items-center gap-2">
                  {nextLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
