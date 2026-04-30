import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { initialData, RegistrationData, getEntryFee } from "@/lib/registration-types";
import { EntryScreen } from "@/components/registration/EntryScreen";
import { IdentityStep } from "@/components/registration/IdentityStep";
import { VibeStep } from "@/components/registration/VibeStep";
import { FaceArtStep } from "@/components/registration/FaceArtStep";
import { EntryTypeStep } from "@/components/registration/EntryTypeStep";
import { GirlsOfferStep } from "@/components/registration/GirlsOfferStep";
import { EventDetailsStep } from "@/components/registration/EventDetailsStep";
import { PaymentStep } from "@/components/registration/PaymentStep";
import { FinalCTAStep } from "@/components/registration/FinalCTAStep";

const Index = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RegistrationData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>("");

  const update = (p: Partial<RegistrationData>) => setData((d) => ({ ...d, ...p }));

  const submit = async () => {
    setSubmitting(true);
    const id = crypto.randomUUID();
    const fee = getEntryFee(data);
    const { error } = await supabase.from("registrations").insert({
      id,
      name: data.name.trim(),
      phone: data.phone.trim(),
      instagram: data.instagram.trim() || null,
      vibe: data.vibe as string,
      face_art: data.faceArt as string,
      entry_type: data.entryType as string,
      group_size: data.entryType === "Group" ? data.groupSize : null,
      girls_offer: data.girlsOffer === true,
      payment_screenshot_url: data.paymentScreenshot || null,
      payment_status: fee.free ? "free" : "pending",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Try again?");
      return;
    }
    setRegistrationId(id);
    toast.success("Welcome to the dark side 🖤");
    setStep(8);
  };

  return (
    <main className="relative bg-background overflow-x-hidden">
      {step === 0 && <EntryScreen onEnter={() => setStep(1)} />}
      {step === 1 && <IdentityStep data={data} update={update} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
      {step === 2 && <VibeStep data={data} update={update} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <FaceArtStep data={data} update={update} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
      {step === 4 && <EntryTypeStep data={data} update={update} onBack={() => setStep(3)} onNext={() => setStep(5)} />}
      {step === 5 && <GirlsOfferStep data={data} update={update} onBack={() => setStep(4)} onNext={() => setStep(6)} />}
      {step === 6 && <EventDetailsStep onBack={() => setStep(5)} onNext={() => setStep(7)} />}
      {step === 7 && <PaymentStep data={data} update={update} onBack={() => setStep(6)} onNext={submit} />}
      {step === 8 && <FinalCTAStep data={data} registrationId={registrationId} onBack={() => setStep(7)} />}

      {submitting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm grid place-items-center z-50">
          <div className="text-primary text-glow-pink text-xl animate-flicker uppercase tracking-widest">
            Sealing your fate…
          </div>
        </div>
      )}
    </main>
  );
};

export default Index;
