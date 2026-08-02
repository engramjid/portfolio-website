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
  "Building governed KPI frameworks that leadership actually trusts and adopts.",
  "Deepening live SAP/ERP and Oracle HIMS integrations so dashboards reflect reality, not a weekly export.",
  "Applying neuroscience-informed methods (EEG-based engagement analysis) to analytics work.",
];

const achievements = [
  "Architected a PKR 5.73B PMO capital portfolio dashboard used directly by university leadership.",
  "Cut monthly KPI reporting effort by 70% through automated Power BI ETL pipelines.",
  "Trained 500+ end users across a 14+ department EMR rollout to full adoption.",
  "Published research on EEG-based visual engagement measurement in neuromarketing (Dec 2024).",
  "Performance Excellence Award, IIMCT – Riphah International University (Dec 2025).",
];

function extractSortYear(dateStr: string): number {
  if (/present/i.test(dateStr)) return Infinity;
  const match = dateStr.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

const timeline = [
  ...experienceEntries.map((e) => ({
    id: e.id,
    year: `${e.startDate} — ${e.endDate}`,
    sortYear: extractSortYear(e.endDate),
    title: e.role,
    subtitle: e.company,
    icon: "work" as const,
  })),
  ...educationEntries.map((e) => ({
    id: e.id,
    year: `${e.startYear} — ${e.endYear}`,
    sortYear: extractSortYear(e.endYear),
    title: `${e.degree} ${e.field}`,
    subtitle: e.institution,
    icon: "education" as const,
  })),
].sort((a, b) => b.sortYear - a.sortYear);

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="About"
          title="Analytics engineer, systems thinker."
          description="I care less about a dashboard looking impressive and more about whether leadership actually trusts the numbers on it and uses them to decide something."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal direction="left">
            <div className="text-muted-foreground space-y-5 text-base leading-relaxed">
              <p>
                I&apos;m an Analytics Engineer with 8+ years delivering enterprise BI
                across healthcare, PMO, and multi-sector operations. I&apos;m Power BI
                PL-300 certified, and my work centers on star-schema data modeling,
                Oracle SQL/PL-SQL, and wiring dashboards directly into live SAP ERP and
                Oracle HIMS systems rather than exports and manual refreshes.
              </p>
              <p>
                I started in HIMS implementation and network administration, and the
                throughline since then has been the same: get the dashboard as close to
                the source system as possible, build a KPI framework stakeholders agree
                on before writing a single DAX measure, and automate the reporting effort
                out of the process entirely.
              </p>
              <p>
                Outside of BI work, I&apos;ve published research applying EEG-based
                methods to measure visual engagement in neuromarketing &mdash; a
                different lens on the same underlying question of turning raw signal
                into a decision someone can act on.
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
