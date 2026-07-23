// Shared types for the MAHI.AI local engine.
// The schema is stable so a future OpenAI / RAG backend can consume the same
// JSON knowledge base without reshaping.

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
  | "roles"
  | "interview"
  | "general"
  | "unknown";

export interface IntentMatch {
  intent: Intent;
  confidence: number;
  keywords: string[];
}

export interface Profile {
  fullName: string;
  headline: string;
  currentStatus: string;
  careerObjective: string;
  location: string;
  languages: string[];
  availability: string;
  openToWork: boolean;
  professionalSummary: string;
}

export interface Skill {
  name: string;
  category: string;
  confidence: "verified" | "unverified";
  projectsUsed: string[];
  years: number | null;
  description: string;
}
export interface SkillsData {
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  outcome: string;
  github: string;
  demo: string;
  resumeSummary: string;
  interviewExplanation: string;
}
export interface ProjectsData {
  projects: Project[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}
export interface ExperienceData {
  experience: ExperienceItem[];
}

export interface EducationItem {
  degree: string;
  university: string;
  graduationYear: string;
  grade: string;
}
export interface EducationData {
  education: EducationItem[];
}

export interface Certification {
  name: string;
  organization: string;
  year: string;
  verification: string;
}
export interface CertificationsData {
  certifications: Certification[];
}

export interface Contact {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  resume: string;
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

export interface RoleRecommendation {
  title: string;
  supportedBy: string[];
}
export interface RolesData {
  roles: RoleRecommendation[];
}

export interface InterviewNote {
  projectTitle: string;
  overview: string;
  businessProblem: string;
  technicalSolution: string;
  keyChallenges: string[];
  result: string;
}
export interface InterviewData {
  interviews: InterviewNote[];
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
  roles: RolesData;
  interview: InterviewData;
}

export interface SearchResult {
  intent: Intent;
  data: unknown;
  matchedItems?: unknown[];
  verified: boolean;
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
  verified: boolean;
}

/**
 * ChatEngine is the swappable boundary. A future OpenAI/gateway/RAG engine
 * simply implements `ask` with the same signature.
 */
export interface ChatEngine {
  ask(question: string, history?: ChatMessage[]): Promise<ChatEngineResponse>;
}

export const UNVERIFIED_FALLBACK =
  "I don't have verified information regarding that topic.";
