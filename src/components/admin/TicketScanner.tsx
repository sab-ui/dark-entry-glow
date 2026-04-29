import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { X, ScanLine, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ScanResult =
  | { status: "found"; name: string; entry_type: string; group_size: number | null; vibe: string; girls_offer: boolean; confirmed: boolean; id: string }
  | { status: "not_found" }
  | { status: "invalid" };

interface Props {
  onClose: () => void;
}

export const TicketScanner = ({ onClose }: Props) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 240, height: 240 } },
      onScan,
      () => {}
    ).catch(() => {
      // fallback to any camera
      scanner.start(
        { facingMode: "user" },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        onScan,
        () => {}
      ).catch(() => {});
    });

    return () => {
      scanner.isScanning && scanner.stop().catch(() => {});
    };
  }, []);

  const onScan = async (text: string) => {
    if (!text.startsWith("afterdark:")) {
      setResult({ status: "invalid" });
      setScanning(false);
      scannerRef.current?.stop().catch(() => {});
      return;
    }
    const id = text.replace("afterdark:", "");
    scannerRef.current?.stop().catch(() => {});
    setScanning(false);

    const { data, error } = await supabase
      .from("registrations")
      .select("id, name, entry_type, group_size, vibe, girls_offer, confirmed")
      .eq("id", id)
      .single();

    if (error || !data) {
      setResult({ status: "not_found" });
    } else {
      setResult({ status: "found", ...data });
    }
  };

  const markConfirmed = async () => {
    if (result?.status !== "found") return;
    setConfirming(true);
    await supabase.from("registrations").update({ confirmed: true }).eq("id", result.id);
    setResult({ ...result, confirmed: true });
    setConfirming(false);
  };

  const reset = () => {
    setResult(null);
    setScanning(true);
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;
    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 240, height: 240 } },
      onScan,
      () => {}
    ).catch(() => {
      scanner.start({ facingMode: "user" }, { fps: 10, qrbox: { width: 240, height: 240 } }, onScan, () => {}).catch(() => {});
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur flex flex-col items-center justify-center px-4">
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-smooth">
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="text-center">
          <ScanLine className="w-8 h-8 text-primary mx-auto mb-2 text-glow-pink" />
          <h2 className="text-2xl font-bold text-glow-pink">Scan Ticket</h2>
          <p className="text-sm text-muted-foreground">Point camera at the guest's QR code</p>
        </div>

        {/* Camera viewport — always mounted so html5-qrcode can attach */}
        <div
          id="qr-reader"
          className={`w-full rounded-2xl overflow-hidden border border-border ${result ? "hidden" : "block"}`}
          style={{ minHeight: 280 }}
        />

        {/* Result card */}
        {result && (
          <div className="w-full glass rounded-2xl border p-6 text-center animate-in fade-in duration-300"
            style={{ borderColor: result.status === "found" ? "rgb(var(--primary) / 0.4)" : "rgb(var(--destructive) / 0.4)" }}>

            {result.status === "found" && (
              <>
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-accent" />
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-1">Registered</p>
                <h3 className="text-3xl font-black text-foreground mb-1">{result.name}</h3>
                <div className="flex justify-center gap-2 flex-wrap mb-4">
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {result.entry_type}{result.group_size ? ` · ${result.group_size}` : ""}
                  </Badge>
                  <Badge variant="outline" className="border-secondary/40 text-secondary">{result.vibe}</Badge>
                  {result.girls_offer && (
                    <Badge variant="outline" className="border-accent/40 text-accent">
                      <Sparkles className="w-3 h-3 mr-1" />Girls Offer
                    </Badge>
                  )}
                </div>
                {result.confirmed ? (
                  <div className="text-sm text-accent font-semibold">✓ Already checked in</div>
                ) : (
                  <Button
                    onClick={markConfirmed}
                    disabled={confirming}
                    className="w-full bg-gradient-neon text-primary-foreground border-0 shadow-neon-pink h-11"
                  >
                    {confirming ? "Checking in…" : "Check In Guest"}
                  </Button>
                )}
              </>
            )}

            {result.status === "not_found" && (
              <>
                <XCircle className="w-12 h-12 mx-auto mb-3 text-destructive" />
                <p className="text-xs uppercase tracking-[0.3em] text-destructive mb-2">Not Found</p>
                <p className="text-sm text-muted-foreground">This ticket doesn't match any registration.</p>
              </>
            )}

            {result.status === "invalid" && (
              <>
                <XCircle className="w-12 h-12 mx-auto mb-3 text-destructive" />
                <p className="text-xs uppercase tracking-[0.3em] text-destructive mb-2">Invalid QR</p>
                <p className="text-sm text-muted-foreground">This doesn't look like an Afterdark ticket.</p>
              </>
            )}

            <button onClick={reset} className="text-xs text-muted-foreground hover:text-primary mt-4 transition-smooth underline underline-offset-2">
              Scan another ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
