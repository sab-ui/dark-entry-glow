import { useRef, useState } from "react";
import { RegistrationData, getEntryFee } from "@/lib/registration-types";
import { StepShell } from "./StepShell";
import { QRCodeSVG } from "qrcode.react";
import { Upload, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  data: RegistrationData;
  update: (p: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PaymentStep = ({ data, update, onNext, onBack }: Props) => {
  const fee = getEntryFee(data);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upiUrl = `upi://pay?pa=9612180626@hdfc&pn=UNMOY%20ROY&am=${fee.amount}&cu=INR`;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setPreview(URL.createObjectURL(file));

    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${file.name.split(".").pop()}`;
    const { data: up, error } = await supabase.storage.from("payment-screenshots").upload(path, file, { contentType: file.type });

    if (!error && up) {
      const { data: pub } = supabase.storage.from("payment-screenshots").getPublicUrl(up.path);
      update({ paymentScreenshot: pub.publicUrl });
    } else {
      // fallback: store as base64 so admin can view it
      const reader = new FileReader();
      reader.onload = () => update({ paymentScreenshot: reader.result as string });
      reader.readAsDataURL(file);
    }
    setUploading(false);
  };

  const uploaded = !!data.paymentScreenshot;

  return (
    <StepShell
      step={7} total={8}
      title={fee.free ? "You're in. 🥂" : "Pay to enter."}
      subtitle={fee.free ? "Girls night — no charge." : "Complete payment & upload proof."}
      onBack={onBack} onNext={onNext}
      nextDisabled={!fee.free && !uploaded}
      nextLabel="Confirm Entry"
    >
      {fee.free ? (
        <div className="flex flex-col items-center gap-6 py-8">
          <span className="text-8xl">🥂</span>
          <div className="text-center">
            <div className="font-black text-primary" style={{ fontSize: "clamp(3rem,14vw,5rem)", textShadow: "0 0 30px hsl(335 100% 50% / 0.7)", lineHeight: 1 }}>
              FREE ENTRY
            </div>
            <p className="text-white/35 text-[10px] uppercase tracking-[0.5em] mt-3">Unlimited shots · first 2 hours</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">

          {/* Amount */}
          <div className="border border-primary/40 bg-primary/5 py-6 text-center"
            style={{ boxShadow: "0 0 40px hsl(335 100% 50% / 0.12)" }}>
            <div className="text-[9px] uppercase tracking-[0.6em] text-white/35 mb-2">Entry Fee</div>
            <div className="font-black text-primary leading-none"
              style={{ fontSize: "clamp(3.5rem,14vw,6rem)", textShadow: "0 0 30px hsl(335 100% 50% / 0.7)" }}>
              {fee.label}
            </div>
            <div className="text-[9px] text-white/25 uppercase tracking-widest mt-2">
              {data.entryType === "Couple" ? "Per couple" : data.entryType === "Group" ? `₹399 × ${data.groupSize} people` : "Per person"}
            </div>
          </div>

          {/* QR + UPI */}
          <div className="flex flex-col items-center gap-3 border border-white/8 bg-white/[0.02] py-6">
            <div className="text-[9px] uppercase tracking-[0.5em] text-white/35">Scan & Pay via UPI</div>
            <div className="bg-white p-3 rounded-sm">
              <QRCodeSVG value={upiUrl} size={150} bgColor="#fff" fgColor="#0a0a0a" level="M" />
            </div>
            <div className="text-center">
              <div className="text-white/70 text-xs font-mono tracking-wider">9612180626@hdfc</div>
              <div className="text-white/30 text-[9px] uppercase tracking-widest mt-0.5">UNMOY ROY</div>
            </div>
          </div>

          {/* Upload screenshot */}
          <div className={`border transition-all duration-300 ${uploaded ? "border-green-500/50 bg-green-500/5" : "border-white/8 bg-white/[0.02]"}`}>
            <button onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center gap-3 py-6 px-4">
              {uploading ? (
                <div className="text-white/40 text-xs uppercase tracking-widest animate-pulse">Uploading…</div>
              ) : uploaded ? (
                <>
                  {preview && <img src={preview} alt="Payment proof" className="h-28 object-contain rounded" />}
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-widest font-black">Screenshot Uploaded</span>
                  </div>
                  <span className="text-[9px] text-white/25 uppercase tracking-widest">Tap to change</span>
                </>
              ) : (
                <>
                  <Upload className="w-7 h-7 text-white/25" />
                  <div className="text-white/60 text-sm font-black uppercase tracking-widest">Upload Payment Screenshot</div>
                  <div className="text-white/25 text-[9px] uppercase tracking-widest">Tap to upload · required</div>
                </>
              )}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>
        </div>
      )}
    </StepShell>
  );
};
