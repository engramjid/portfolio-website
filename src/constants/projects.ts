import projectsContent from "../../content/projects.json";
import type { Project } from "@/types";

export const projects: Project[] = projectsContent.projects as Project[];

export const projectCategoryLabels: Record<string, string> = {
  "business-intelligence": "Business Intelligence",
  "healthcare-it": "Healthcare IT",
  "erp-integration": "ERP Integration",
  analytics: "Analytics",
};
