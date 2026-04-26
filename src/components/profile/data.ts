import { HistoryItem, UserInfo } from "./types";

// ─── Default User Info ────────────────────────────────────────────────────────

export const DEFAULT_USER_INFO: UserInfo = {
  name: "Emma Smith",
  handle: "@emmasmith",
  location: "Los Angeles, California",
  followers: 1240,
  following: 189,
  bio: "Passionate product designer focusing on user-centered interfaces and micro-interactions.",
  website: "https://example.com",
  email: "emma@example.com",
  profileImage: "/mnt/data/Screenshot 2025-11-20 203001.png",
  additionalDetails: [
    { label: "Member since", value: "Jan 2024" },
    { label: "Last active", value: "Nov 20, 2025" },
    { label: "Role", value: "Lead Product Designer" },
  ],
};

// ─── History Items ────────────────────────────────────────────────────────────

export const HISTORY_ITEMS: HistoryItem[] = [
  {
    id: 1,
    type: "video",
    label: "Video Analysis",
    file: "press_conference_nov2025.mp4",
    result: "fake",
    confidence: 94,
    date: "Nov 20, 2025",
    time: "10:42 AM",
    size: "84.2 MB",
  },
  {
    id: 2,
    type: "image",
    label: "Image Scan",
    file: "politician_photo.jpg",
    result: "real",
    confidence: 87,
    date: "Oct 22, 2025",
    time: "3:15 PM",
    size: "3.1 MB",
  },
  {
    id: 3,
    type: "audio",
    label: "Voice Analysis",
    file: "ceo_interview_clip.mp3",
    result: "fake",
    confidence: 91,
    date: "Sep 11, 2025",
    time: "9:00 AM",
    size: "12.7 MB",
  },
  {
    id: 4,
    type: "video",
    label: "Video Analysis",
    file: "viral_clip_oct.mp4",
    result: "real",
    confidence: 78,
    date: "Oct 05, 2025",
    time: "6:30 PM",
    size: "201 MB",
  },
  {
    id: 5,
    type: "image",
    label: "Image Scan",
    file: "celebrity_event.png",
    result: "fake",
    confidence: 99,
    date: "Aug 30, 2025",
    time: "11:20 AM",
    size: "5.8 MB",
  },
];