export type EventName =
  | "AI Hackathon"
  | "Web Development Challenge"
  | "UI/UX Design"
  | "Paper Presentation"
  | "Project Expo"
  | "Tech Quiz";

export interface EventInfo {
  id: string;
  name: EventName;
  tagline: string;
  description: string;
  teamSize: string;
  prize: string;
  icon: string;
}

export interface RegistrationPayload {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  event: EventName;
  uid: string | null;
}

export interface RegistrationRecord extends RegistrationPayload {
  id: string;
  createdAt: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  location: string;
  day: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
}
