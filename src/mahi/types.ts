// Shared types for the MAHI.AI local engine.
// Designed so an OpenAI-backed engine can replace the local one behind the
// same ChatEngine interface without touching the UI.

export type Intent =
  | "profile"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "certifications"
  | "resume"
  | "contact"
  | "github"
  | "linkedin"
  | "general"
  | "unknown";

export interface IntentMatch {
  intent: Intent;
  confidence: number; // 0..1
  keywords: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  level: string;
  openToWork: boolean;
  summary: string;
  highlights: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}
export interface SkillsData {
  categories: SkillCategory[];
}

export interface Project {
  id: string;
  name: string;
  tags: string[];
  description: string;
  highlights: string[];
  url?: string;
}
export interface ProjectsData {
  projects: Project[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}
export interface ExperienceData {
  experience: ExperienceItem[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  start: string;
  end: string;
}
export interface EducationData {
  education: EducationItem[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}
export interface CertificationsData {
  certifications: Certification[];
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  availability: string;
  preferredChannels: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}
export interface SocialData {
  links: SocialLink[];
}

export interface Resume {
  url: string;
  filename: string;
  updated: string;
  summary: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
export interface FaqData {
  faqs: FaqItem[];
}

export interface KnowledgeBase {
  profile: Profile;
  skills: SkillsData;
  projects: ProjectsData;
  experience: ExperienceData;
  education: EducationData;
  certifications: CertificationsData;
  contact: Contact;
  social: SocialData;
  resume: Resume;
  faq: FaqData;
}

export interface SearchResult {
  intent: Intent;
  data: unknown;
  matchedItems?: unknown[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  intent?: Intent;
}

export interface ChatEngineResponse {
  reply: string;
  intent: Intent;
  suggestions?: string[];
}

/**
 * ChatEngine is the swappable boundary. A future OpenAI-backed engine simply
 * implements `ask` with the same signature.
 */
export interface ChatEngine {
  ask(question: string, history?: ChatMessage[]): Promise<ChatEngineResponse>;
}
