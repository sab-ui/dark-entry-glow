export type Vibe = "Wild" | "Mysterious" | "Dramatic" | "Unpredictable";
export type FaceArt = "Yes" | "Maybe" | "No";
export type EntryType = "Solo" | "Couple" | "Group";

export interface RegistrationData {
  name: string;
  phone: string;
  instagram: string;
  vibe: Vibe | "";
  faceArt: FaceArt | "";
  entryType: EntryType | "";
  groupSize: number;
  girlsOffer: boolean | null;
  paymentScreenshot: string;
}

export const initialData: RegistrationData = {
  name: "",
  phone: "",
  instagram: "",
  vibe: "",
  faceArt: "",
  entryType: "",
  groupSize: 3,
  girlsOffer: null,
  paymentScreenshot: "",
};

export function getEntryFee(data: RegistrationData): { amount: number; label: string; free: boolean } {
  if (data.entryType === "Solo" && data.girlsOffer === true) return { amount: 0, label: "FREE", free: true };
  if (data.entryType === "Couple") return { amount: 299, label: "₹299", free: false };
  if (data.entryType === "Group") return { amount: 399 * data.groupSize, label: `₹${399 * data.groupSize}`, free: false };
  return { amount: 399, label: "₹399", free: false };
}

export function getEntryLabel(data: RegistrationData): string {
  if (data.entryType === "Solo") return data.girlsOffer === true ? "Single Female" : "Single Male";
  if (data.entryType === "Couple") return "Couple";
  if (data.entryType === "Group") return `Group of ${data.groupSize}`;
  return data.entryType;
}

export const WHATSAPP_NUMBER = "919612180626";
export const PHONE_DISPLAY = "+91 96121 80626";
export const INSTAGRAM_HANDLE = "versovavibescafe";
