import { RegistrationData } from "@/lib/registration-types";
import { StepShell } from "./StepShell";

interface Props {
  data: RegistrationData; update: (p: Partial<RegistrationData>) => void;
  onNext: () => void; onBack: () => void;
}

export const IdentityStep = ({ data, update, onNext, onBack }: Props) => {
  const valid = data.name.trim().length >= 2 && data.phone.trim().length >= 7;
  return (
    <StepShell step={1} total={8} title="Who's slipping in?" subtitle="Your name. Or your alter ego." onBack={onBack} onNext={onNext} nextDisabled={!valid}>
      <div className="space-y-3">
        {[
          { key: "name", label: "Name / Alter Ego", placeholder: "Your shadow self", type: "text", mode: undefined as any, max: 80, val: data.name },
          { key: "phone", label: "Phone Number", placeholder: "+91 ...", type: "tel", mode: "tel" as any, max: 20, val: data.phone },
          { key: "instagram", label: "Instagram", placeholder: "@yourhandle", type: "text", mode: undefined as any, max: 50, val: data.instagram },
        ].map(({ key, label, placeholder, type, mode, max, val }) => (
          <div key={key} className="group relative border border-white/8 bg-white/[0.02] hover:border-primary/30 focus-within:border-primary/60 transition-all duration-300"
            style={{ boxShadow: "inset 0 0 0 0 transparent" }}>
            <div className="px-4 pt-3 pb-0">
              <label className="text-[9px] uppercase tracking-[0.5em] text-white/30 group-focus-within:text-primary/70 transition-colors duration-300">
                {label}
              </label>
            </div>
            <input
              value={val}
              onChange={e => {
                const v = e.target.value;
                update({ [key]: key === "instagram" ? v.replace(/^@/, "") : v } as any);
              }}
              type={type} inputMode={mode} maxLength={max} placeholder={placeholder}
              className="w-full bg-transparent text-white text-base sm:text-lg font-semibold placeholder:text-white/15 outline-none px-4 py-3"
            />
            {/* bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/0 group-focus-within:bg-primary transition-all duration-300"
              style={{ boxShadow: "0 0 8px hsl(335 100% 50% / 0)" }} />
          </div>
        ))}
      </div>
    </StepShell>
  );
};
