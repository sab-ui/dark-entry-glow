import { StepShell } from "./StepShell";

const details = [
  { icon: "📅", label: "Date", value: "8 May", sub: "Thursday", color: "hsl(335 100% 50%)", big: true },
  { icon: "🕗", label: "Time", value: "8:00 PM", sub: "Onwards — don't be late.", color: "hsl(272 100% 55%)", big: false },
  { icon: "📍", label: "Venue", value: "Versova Vibes Cafe", sub: "Andheri West, Mumbai", color: "hsl(48 100% 52%)", big: false },
];

export const EventDetailsStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => (
  <StepShell step={6} total={8} title="Lock it in." subtitle="Memorise this. No excuses." onBack={onBack} onNext={onNext} nextLabel="Proceed to Payment">
    <div className="flex flex-col gap-2.5">
      {details.map(({ icon, label, value, sub, color, big }, i) => (
        <div key={label}
          className="relative group flex items-center gap-5 px-5 py-5 border border-white/8 bg-white/[0.02] overflow-hidden animate-slide-up"
          style={{ animationDelay: `${i * 80}ms`, borderLeft: `3px solid ${color}` }}>

          {/* bg number watermark */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-[4rem] sm:text-[5rem] select-none pointer-events-none"
            style={{ color: color + "0a", lineHeight: 1 }}>
            {icon}
          </div>

          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-2xl shrink-0 border border-white/8"
            style={{ background: color + "15" }}>
            {icon}
          </div>
          <div className="relative">
            <div className="text-[9px] uppercase tracking-[0.5em] mb-0.5" style={{ color: color + "80" }}>{label}</div>
            <div className="font-black leading-tight text-white"
              style={{ fontSize: big ? "clamp(2rem, 8vw, 3.5rem)" : "clamp(1.4rem, 5vw, 2rem)", textShadow: `0 0 20px ${color + "40"}` }}>
              {value}
            </div>
            <div className="text-[10px] mt-0.5 text-white/35">{sub}</div>
          </div>
        </div>
      ))}

      <div className="mt-2 flex items-center gap-3 border border-white/5 bg-white/[0.02] px-4 py-3">
        <span className="text-base">⚠️</span>
        <p className="text-[10px] sm:text-xs text-white/30 leading-relaxed">
          Strictly by reservation. Show your ticket at the door.
        </p>
      </div>
    </div>
  </StepShell>
);
