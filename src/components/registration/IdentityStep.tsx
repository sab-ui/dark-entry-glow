import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegistrationData } from "@/lib/registration-types";
import { StepShell } from "./StepShell";

interface Props {
  data: RegistrationData;
  update: (p: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const IdentityStep = ({ data, update, onNext, onBack }: Props) => {
  const valid = data.name.trim().length >= 2 && data.phone.trim().length >= 7;
  return (
    <StepShell
      step={1} total={7}
      title="Who's coming?"
      subtitle="Or your alter ego… we won't judge."
      onBack={onBack} onNext={onNext} nextDisabled={!valid}
    >
      <div className="space-y-5">
        <Field label="Name / Alter Ego">
          <Input
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            maxLength={80}
            placeholder="Your shadow self"
            className="bg-input border-border h-12 text-base focus-visible:ring-primary"
          />
        </Field>
        <Field label="Phone Number">
          <Input
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            maxLength={20}
            placeholder="+91 ..."
            inputMode="tel"
            className="bg-input border-border h-12 text-base focus-visible:ring-primary"
          />
        </Field>
        <Field label="Instagram (optional)">
          <Input
            value={data.instagram}
            onChange={(e) => update({ instagram: e.target.value.replace(/^@/, "") })}
            maxLength={50}
            placeholder="@yourhandle"
            className="bg-input border-border h-12 text-base focus-visible:ring-primary"
          />
        </Field>
      </div>
    </StepShell>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">{label}</Label>
    {children}
  </div>
);
