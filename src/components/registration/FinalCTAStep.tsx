import { StepShell } from "./StepShell";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, PHONE_DISPLAY, RegistrationData } from "@/lib/registration-types";

interface Props {
  data: RegistrationData;
  onBack: () => void;
}

export const FinalCTAStep = ({ data, onBack }: Props) => {
  const msg = encodeURIComponent(
    `Hey! I just registered for The Afterdark Affair 1.0 🖤\n\nName: ${data.name}\nVibe: ${data.vibe}\nEntry: ${data.entryType}${data.entryType === "Group" ? ` (${data.groupSize})` : ""}`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

  return (
    <StepShell step={7} total={7} title="Welcome to the dark side 🖤" subtitle={`See you on 8 May, ${data.name || "stranger"}.`} onBack={onBack} hideNav>
      <div className="glass rounded-xl p-6 border border-primary/30 shadow-neon-pink mb-6">
        <p className="text-sm text-muted-foreground italic mb-1">Your entry isn't complete yet…</p>
        <p className="text-foreground">Drop us a message to confirm your spot.</p>
      </div>

      <div className="space-y-3">
        <a href={waUrl} target="_blank" rel="noreferrer">
          <Button size="lg" className="w-full bg-gradient-neon text-primary-foreground border-0 shadow-neon-pink h-14 text-base">
            <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
          </Button>
        </a>
        <a href={`tel:${WHATSAPP_NUMBER}`}>
          <Button size="lg" variant="outline" className="w-full border-secondary/60 bg-transparent hover:bg-secondary/10 h-14 text-base">
            <Phone className="w-5 h-5 mr-2 text-secondary" /> Call {PHONE_DISPLAY}
          </Button>
        </a>
      </div>

    </StepShell>
  );
};
