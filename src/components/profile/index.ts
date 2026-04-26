// ─── Profile Feature – Public API ─────────────────────────────────────────────
// Import everything from a single entry point:
//   import { ProfileModal, HistoryModal, ViewProfileButton, useProfileModal, DEFAULT_USER_INFO } from "@/components/profile";

export { ProfileModal } from "./ProfileModal";
export { HistoryModal } from "./HistoryModal";
export { ViewProfileButton } from "./ViewProfileButton";
export { ConfidenceBar, StatPill } from "./ProfileShared";
export { useProfileModal } from "./useProfileModal";
export { DEFAULT_USER_INFO, HISTORY_ITEMS } from "./data";
export type {
  UserInfo,
  AdditionalDetail,
  ProfileTab,
  HistoryItem,
  MediaType,
  ResultType,
  ResultFilter,
  TypeFilter,
} from "./types";