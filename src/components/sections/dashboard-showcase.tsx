"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardEmbeds, dashboardPlatformLabels } from "@/constants/dashboards";

export function DashboardShowcase() {
  return (
    <section id="dashboards" className="bg-muted/30 py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Dashboard Showcase"
          title="Live reports, not screenshots"
          description="Interactive BI dashboards embedded directly from Power BI, Tableau, Looker Studio, and Kaggle."
        />

        <Tabs defaultValue={dashboardEmbeds[0].id} className="mt-14">
          <TabsList className="mx-auto flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
            {dashboardEmbeds.map((embed) => (
              <TabsTrigger
                key={embed.id}
                value={embed.id}
                className="border-border data-[state=active]:border-brand-primary data-[state=active]:bg-brand-primary/10 data-[state=active]:text-brand-primary rounded-full border bg-transparent px-4 py-2 text-sm"
              >
                {dashboardPlatformLabels[embed.platform]}
              </TabsTrigger>
            ))}
          </TabsList>

          {dashboardEmbeds.map((embed) => (
            <TabsContent key={embed.id} value={embed.id} className="mt-8">
              <ScrollReveal>
                <div className="glass-panel overflow-hidden rounded-2xl">
                  <div className="border-border/60 flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <Badge variant="secondary">
                          {dashboardPlatformLabels[embed.platform]}
                        </Badge>
                      </div>
                      <h3 className="font-semibold">{embed.title}</h3>
                      <p className="text-muted-foreground text-sm">{embed.description}</p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="shrink-0">
                      <a href={embed.embedUrl} target="_blank" rel="noreferrer">
                        Open Full Report
                        <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  </div>

                  <div
                    className="bg-background relative w-full"
                    style={{ aspectRatio: embed.aspectRatio ?? "16/9" }}
                  >
                    <iframe
                      src={embed.embedUrl}
                      title={embed.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full border-0"
                      allowFullScreen
                    />
                  </div>
                </div>
              </ScrollReveal>
            </TabsContent>
          ))}
        </Tabs>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          Embeds use placeholder URLs &mdash; swap in your real report links in{" "}
          <code className="bg-muted rounded px-1.5 py-0.5">
            src/constants/dashboards.ts
          </code>
          .
        </p>
      </div>
    </section>
  );
}
