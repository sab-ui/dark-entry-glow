import { StepShell } from "./StepShell";
import { Calendar, Clock, MapPin } from "lucide-react";

export const EventDetailsStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => (
  <StepShell
    step={6} total={7}
    title="The Details"
    subtitle="Lock these in your head."
    onBack={onBack} onNext={onNext} nextLabel="Confirm Entry"
  >
    <div className="space-y-3">
      <Detail icon={Calendar} label="Date" value="8 May" />
      <Detail icon={Clock} label="Time" value="8:00 PM onwards" />
      <Detail icon={MapPin} label="Venue" value="Versova Vibes Cafe, Andheri West" />
    </div>
  </StepShell>
);

const Detail = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="glass rounded-xl p-4 flex items-center gap-4 border border-border">
    <div className="w-11 h-11 rounded-lg bg-gradient-neon flex items-center justify-center shrink-0 shadow-neon-pink">
      <Icon className="w-5 h-5 text-primary-foreground" />
    </div>
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="font-semibold text-lg">{value}</div>
    </div>
  </div>
);
