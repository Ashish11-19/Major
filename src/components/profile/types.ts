// ─── Profile Types ───────────────────────────────────────────────────────────

export interface AdditionalDetail {
  label: string;
  value: string;
}

export interface UserInfo {
  name: string;
  handle: string;
  location: string;
  followers: number;
  following: number;
  bio: string;
  website: string;
  email: string;
  profileImage: string;
  additionalDetails: AdditionalDetail[];
}

export type ProfileTab = "overview" | "details";

// ─── History Types ────────────────────────────────────────────────────────────

export type MediaType = "video" | "image" | "audio";
export type ResultType = "fake" | "real";
export type ResultFilter = "all" | "fake" | "real";
export type TypeFilter = "all" | "video" | "image" | "audio";

export interface HistoryItem {
  id: number;
  type: MediaType;
  label: string;
  file: string;
  result: ResultType;
  confidence: number;
  date: string;
  time: string;
  size: string;
}