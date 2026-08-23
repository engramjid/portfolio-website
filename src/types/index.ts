export type SkillLevel = "foundational" | "proficient" | "advanced" | "expert";

export interface Skill {
  name: string;
  level: SkillLevel;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export type ProjectCategory =
  | "business-intelligence"
  | "healthcare-it"
  | "erp-integration"
  | "data-engineering"
  | "analytics";

export interface Project {
  slug: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  image: string;
  video?: string;
  screenshots?: string[];
  categories: ProjectCategory[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export type DashboardPlatform = "power-bi" | "tableau" | "looker-studio" | "kaggle";

export interface DashboardEmbed {
  id: string;
  title: string;
  description: string;
  platform: DashboardPlatform;
  embedUrl: string;
  aspectRatio?: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  details?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
  coverImage?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "email" | "kaggle" | "medium" | "twitter" | "website";
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

export interface GithubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}
