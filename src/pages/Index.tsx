import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { initialData, RegistrationData } from "@/lib/registration-types";
import { EntryScreen } from "@/components/registration/EntryScreen";
import { IdentityStep } from "@/components/registration/IdentityStep";
import { VibeStep } from "@/components/registration/VibeStep";
import { FaceArtStep } from "@/components/registration/FaceArtStep";
import { EntryTypeStep } from "@/components/registration/EntryTypeStep";
import { GirlsOfferStep } from "@/components/registration/GirlsOfferStep";
import { EventDetailsStep } from "@/components/registration/EventDetailsStep";
import { FinalCTAStep } from "@/components/registration/FinalCTAStep";

const Index = () => {
  const [step, setStep] = useState(0); // 0 = entry; 1-7 = steps
  const [data, setData] = useState<RegistrationData>(initialData);
  const [submitting, setSubmitting] = useState(false);

  const update = (p: Partial<RegistrationData>) => setData((d) => ({ ...d, ...p }));

  const submit = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("registrations").insert({
      name: data.name.trim(),
      phone: data.phone.trim(),
      instagram: data.instagram.trim() || null,
      vibe: data.vibe as string,
      face_art: data.faceArt as string,
      entry_type: data.entryType as string,
      group_size: data.entryType === "Group" ? data.groupSize : null,
      girls_offer: data.girlsOffer === true,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Try again?");
      return;
    }
    toast.success("Welcome to the dark side 🖤");
    setStep(7);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10 scanlines overflow-hidden">
      {step === 0 && <EntryScreen onEnter={() => setStep(1)} />}
      {step === 1 && (
        <IdentityStep data={data} update={update} onBack={() => setStep(0)} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <VibeStep data={data} update={update} onBack={() => setStep(1)} onNext={() => setStep(3)} />
      )}
      {step === 3 && (
        <FaceArtStep data={data} update={update} onBack={() => setStep(2)} onNext={() => setStep(4)} />
      )}
      {step === 4 && (
        <EntryTypeStep data={data} update={update} onBack={() => setStep(3)} onNext={() => setStep(5)} />
      )}
      {step === 5 && (
        <GirlsOfferStep data={data} update={update} onBack={() => setStep(4)} onNext={() => setStep(6)} />
      )}
      {step === 6 && (
        <EventDetailsStep onBack={() => setStep(5)} onNext={submit} />
      )}
      {step === 7 && <FinalCTAStep data={data} onBack={() => setStep(6)} />}

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
