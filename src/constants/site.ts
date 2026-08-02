import siteContent from "../../content/site.json";
import type { StatItem } from "@/types";

export const siteConfig = {
  name: siteContent.name,
  title: siteContent.title,
  role: siteContent.role,
  tagline: siteContent.tagline,
  description: siteContent.description,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? siteContent.url,
  ogImage: "/images/og-image.png",
  email: siteContent.email,
  location: siteContent.location,
  keywords: siteContent.keywords,
  githubUsername: siteContent.githubUsername,
  resumePdf: "/resume.pdf",
  typingWords: siteContent.typingWords,
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Dashboards", href: "#dashboards" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "GitHub", href: "#github" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const statItems: StatItem[] = siteContent.stats;
