import educationContent from "../../content/education.json";
import type { Certification, EducationEntry } from "@/types";

export const educationEntries: EducationEntry[] = educationContent.entries as EducationEntry[];
export const certifications: Certification[] =
  educationContent.certifications as Certification[];
