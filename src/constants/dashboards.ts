import dashboardsContent from "../../content/dashboards.json";
import type { DashboardEmbed } from "@/types";

export const dashboardEmbeds: DashboardEmbed[] = dashboardsContent.embeds as DashboardEmbed[];

export const dashboardPlatformLabels: Record<string, string> = {
  "power-bi": "Power BI",
  tableau: "Tableau",
  "looker-studio": "Looker Studio",
  kaggle: "Kaggle",
};
