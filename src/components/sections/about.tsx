"use client";

import { Award, GraduationCap, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import {
  ScrollReveal,
  StaggerGroup,
  staggerItem,
} from "@/components/shared/scroll-reveal";
import { StatCard } from "@/components/shared/stat-card";
import { statItems } from "@/constants/site";
import { experienceEntries } from "@/constants/experience";
import { educationEntries } from "@/constants/education";

const currentFocus = [
  "Building reliable ML systems that survive contact with production traffic.",
  "Designing semantic data layers (dbt) that make analytics trustworthy by default.",
  "Applying LLMs to internal tooling where cost and hallucination risk are well understood.",
];

const achievements = [
  "Reduced customer churn 23% via a production ML scoring engine.",
  "Cut data latency from 24h to under 3 minutes on a real-time pipeline.",
  "Saved an estimated $1.2M annually through improved demand forecasting.",
  "Mentored 2 analysts into full data scientist roles.",
];

const timeline = [
  ...experienceEntries.map((e) => ({
    id: e.id,
    year: `${e.startDate} — ${e.endDate}`,
    title: e.role,
    subtitle: e.company,
    icon: "work" as const,
  })),
  ...educationEntries.map((e) => ({
    id: e.id,
    year: `${e.startYear} — ${e.endYear}`,
    title: `${e.degree} ${e.field}`,
    subtitle: e.institution,
    icon: "education" as const,
  })),
].sort((a, b) => b.year.localeCompare(a.year));

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="About"
          title="Data professional, systems thinker."
          description="I care less about the fanciest model and more about whether the thing actually runs reliably in production and changes a decision someone makes."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal direction="left">
            <div className="text-muted-foreground space-y-5 text-base leading-relaxed">
              <p>
                I&apos;m a Senior Data Scientist and Analytics Engineer with 7+ years of
                experience taking data products from a rough hypothesis to something that
                runs unattended in production. My background spans classical ML,
                forecasting, NLP, and the data engineering that makes all of it possible.
              </p>
              <p>
                I started as a data analyst writing SQL for weekly reports, and the
                throughline since then has been the same: get closer to the decision the
                data is supposed to inform, and build the smallest reliable system that
                gets you there.
              </p>
              <p>
                Outside of client and product work, I write about the practical side of
                data science &mdash; the parts that don&apos;t make it into textbooks,
                like stakeholder trust, uncertainty communication, and when *not* to reach
                for a new tool.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Target className="text-brand-primary size-4" />
                  Current Focus
                </div>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {currentFocus.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="bg-brand-secondary mt-1.5 size-1 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Award className="text-brand-accent size-4" />
                  Achievements
                </div>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {achievements.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="bg-brand-accent mt-1.5 size-1 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="border-border relative space-y-6 border-l pl-8">
              {timeline.map((item) => (
                <div key={item.id} className="relative">
                  <span
                    className={`absolute top-1 -left-[2.35rem] flex size-6 items-center justify-center rounded-full ${
                      item.icon === "work"
                        ? "bg-brand-primary/15 text-brand-primary"
                        : "bg-brand-accent/15 text-brand-accent"
                    }`}
                  >
                    {item.icon === "work" ? (
                      <Sparkles className="size-3.5" />
                    ) : (
                      <GraduationCap className="size-3.5" />
                    )}
                  </span>
                  <p className="text-brand-primary text-xs font-medium">{item.year}</p>
                  <p className="mt-1 font-semibold">{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <StaggerGroup className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {statItems.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
