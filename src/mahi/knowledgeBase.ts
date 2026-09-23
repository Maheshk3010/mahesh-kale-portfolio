import profile from "./knowledge/profile.json";
import skills from "./knowledge/skills.json";
import projects from "./knowledge/projects.json";
import experience from "./knowledge/experience.json";
import education from "./knowledge/education.json";
import certifications from "./knowledge/certifications.json";
import contact from "./knowledge/contact.json";
import social from "./knowledge/social.json";
import resume from "./knowledge/resume.json";
import faq from "./knowledge/faq.json";
import roles from "./knowledge/roles.json";
import interview from "./knowledge/interview.json";
import resumeAsset from "@/assets/Mahesh_Kale_Data_Analyst_Master_Resume.pdf.asset.json";
import type {
  KnowledgeBase,
  Profile,
  SkillsData,
  ProjectsData,
  ExperienceData,
  EducationData,
  CertificationsData,
  Contact,
  SocialData,
  Resume,
  FaqData,
  RolesData,
  InterviewData,
} from "./types";

export const knowledgeBase: KnowledgeBase = {
  profile: profile as Profile,
  skills: skills as SkillsData,
  projects: projects as ProjectsData,
  experience: experience as ExperienceData,
  education: education as EducationData,
  certifications: certifications as CertificationsData,
  contact: contact as Contact,
  social: social as SocialData,
  resume: { ...(resume as Resume), url: resumeAsset.url },
  faq: faq as FaqData,
  roles: roles as RolesData,
  interview: interview as InterviewData,
};
