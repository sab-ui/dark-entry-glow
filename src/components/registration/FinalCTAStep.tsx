import { useRef } from "react";
import { StepShell } from "./StepShell";
import { RegistrationData } from "@/lib/registration-types";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  data: RegistrationData;
  registrationId: string;
  onBack: () => void;
}

export const FinalCTAStep = ({ data, registrationId, onBack }: Props) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const download = async () => {
    if (!ticketRef.current) return;
    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = `afterdark-ticket-${data.name.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const qrValue = `afterdark:${registrationId}`;
  const entryLabel = data.entryType === "Group" ? `Group · ${data.groupSize}` : data.entryType;

  return (
    <StepShell step={7} total={7} title="Welcome to the dark side 🖤" subtitle={`See you on 8 May, ${data.name || "stranger"}.`} onBack={onBack} hideNav>
      <div className="flex flex-col items-center gap-6">

        {/* Ticket */}
        <div
          ref={ticketRef}
          className="w-full max-w-sm rounded-2xl overflow-hidden border border-primary/40 shadow-neon-pink"
          style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #1a0028 100%)" }}
        >
          {/* Top strip */}
          <div className="px-6 pt-6 pb-4 border-b border-primary/20">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-1">The Afterdark Affair</p>
            <h2 className="text-2xl font-black text-white leading-tight">{data.name || "Guest"}</h2>
            {data.instagram && (
              <p className="text-xs text-primary/70 mt-0.5">@{data.instagram}</p>
            )}
            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="text-[10px] uppercase tracking-widest bg-primary/15 text-primary border border-primary/30 rounded px-2 py-0.5">{entryLabel}</span>
              <span className="text-[10px] uppercase tracking-widest bg-secondary/15 text-secondary border border-secondary/30 rounded px-2 py-0.5">{data.vibe}</span>
              {data.girlsOffer && (
                <span className="text-[10px] uppercase tracking-widest bg-accent/15 text-accent border border-accent/30 rounded px-2 py-0.5">Girls Offer</span>
              )}
            </div>
          </div>

          {/* Middle: date + venue */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-primary/20">
            <div>
              <p className="text-xl font-black text-white">8 May · 8 PM</p>
              <p className="text-xs text-muted-foreground mt-0.5 italic">Versova Vibes Cafe · Andheri West</p>
            </div>
          </div>

          {/* Perforated divider */}
          <div className="flex items-center px-4 py-2">
            <div className="w-4 h-4 rounded-full bg-background -ml-6 flex-shrink-0" />
            <div className="flex-1 border-t border-dashed border-primary/20 mx-2" />
            <div className="w-4 h-4 rounded-full bg-background -mr-6 flex-shrink-0" />
          </div>

          {/* QR Code */}
          <div className="px-6 pb-6 flex flex-col items-center gap-2">
            <div className="bg-white rounded-xl p-3">
              <QRCodeSVG
                value={qrValue}
                size={120}
                bgColor="#ffffff"
                fgColor="#0d0d0d"
                level="M"
              />
            </div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Show this at entry</p>
            <p className="text-[8px] text-muted-foreground/40 font-mono">{registrationId.slice(0, 8).toUpperCase()}</p>
          </div>
        </div>

        {/* Download button */}
        <Button onClick={download} className="bg-gradient-neon text-primary-foreground border-0 shadow-neon-pink w-full max-w-sm h-11">
          <Download className="w-4 h-4 mr-2" /> Save Ticket
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Screenshot or save — you'll need this to get in.
        </p>
      </div>
    </StepShell>
  );
};
