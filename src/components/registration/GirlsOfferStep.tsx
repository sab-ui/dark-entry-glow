import { RegistrationData } from "@/lib/registration-types";
import { StepShell } from "./StepShell";
import { cn } from "@/lib/utils";

interface Props {
  data: RegistrationData; update: (p: Partial<RegistrationData>) => void;
  onNext: () => void; onBack: () => void;
}

export const GirlsOfferStep = ({ data, update, onNext, onBack }: Props) => (
  <StepShell step={5} total={7} title="Are you a girl?" subtitle="Unlimited shots — first 2 hours. 🥃" onBack={onBack} onNext={onNext} nextDisabled={data.girlsOffer === null}>
    <div className="flex flex-col gap-3">

      {/* YES */}
      <button onClick={() => update({ girlsOffer: true })}
        className="group relative flex items-center gap-6 px-6 py-7 sm:py-9 border border-white/8 bg-white/[0.02] hover:border-primary/30 transition-all duration-400 overflow-hidden text-left"
        style={data.girlsOffer === true ? {
          borderColor: "hsl(335 100% 50% / 0.7)",
          background: "hsl(335 100% 50% / 0.08)",
          boxShadow: "0 0 50px hsl(335 100% 50% / 0.25), inset 0 0 50px hsl(335 100% 50% / 0.05)"
        } : {}}>
        {data.girlsOffer === true && <div className="absolute inset-y-0 left-0 w-[3px] bg-primary" style={{ boxShadow: "0 0 10px hsl(335 100% 50%)" }} />}
        <span className="text-5xl sm:text-6xl shrink-0">{data.girlsOffer === true ? "🥂" : "🥂"}</span>
        <div>
          <div className="font-black transition-all duration-300"
            style={{ fontSize: "clamp(2.5rem, 10vw, 4rem)", lineHeight: 1, color: data.girlsOffer === true ? "hsl(335 100% 50%)" : "white", textShadow: data.girlsOffer === true ? "0 0 30px hsl(335 100% 50%)" : "none" }}>
            Yes
          </div>
          {data.girlsOffer === true && (
            <div className="mt-1.5 text-[10px] uppercase tracking-[0.4em] text-primary/70 animate-slide-up">
              ✦ Unlimited shots unlocked
            </div>
          )}
        </div>
        {data.girlsOffer === true && <div className="absolute inset-x-0 bottom-0 h-px bg-primary/60" />}
      </button>

      {/* NO */}
      <button onClick={() => update({ girlsOffer: false })}
        className="group relative flex items-center gap-6 px-6 py-7 sm:py-9 border border-white/8 bg-white/[0.02] hover:border-secondary/30 transition-all duration-400 overflow-hidden text-left"
        style={data.girlsOffer === false ? {
          borderColor: "hsl(272 100% 55% / 0.6)",
          background: "hsl(272 100% 55% / 0.07)",
          boxShadow: "0 0 40px hsl(272 100% 55% / 0.2)"
        } : {}}>
        {data.girlsOffer === false && <div className="absolute inset-y-0 left-0 w-[3px] bg-secondary" style={{ boxShadow: "0 0 10px hsl(272 100% 55%)" }} />}
        <span className="text-5xl sm:text-6xl shrink-0">🤙</span>
        <div className="font-black transition-all duration-300"
          style={{ fontSize: "clamp(2.5rem, 10vw, 4rem)", lineHeight: 1, color: data.girlsOffer === false ? "hsl(272 100% 55%)" : "white", textShadow: data.girlsOffer === false ? "0 0 30px hsl(272 100% 55%)" : "none" }}>
          No
        </div>
        {data.girlsOffer === false && <div className="absolute inset-x-0 bottom-0 h-px bg-secondary/50" />}
      </button>
    </div>
  </StepShell>
);
