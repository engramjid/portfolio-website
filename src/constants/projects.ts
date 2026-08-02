import projectsContent from "../../content/projects.json";
import type { Project } from "@/types";

export const projects: Project[] = projectsContent.projects as Project[];

export const projectCategoryLabels: Record<string, string> = {
  "machine-learning": "Machine Learning",
  "data-engineering": "Data Engineering",
  analytics: "Analytics",
  visualization: "Visualization",
  nlp: "NLP",
};
