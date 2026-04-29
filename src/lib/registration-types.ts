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
};

export const WHATSAPP_NUMBER = "919612180626";
export const PHONE_DISPLAY = "+91 96121 80626";
export const INSTAGRAM_HANDLE = "versovavibescafe";
