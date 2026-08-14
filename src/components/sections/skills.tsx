"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/scroll-reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { skillCategories } from "@/constants/skills";
import type { SkillLevel } from "@/types";
import { cn } from "@/lib/utils";

const levelTier: Record<SkillLevel, number> = {
  foundational: 1,
  proficient: 2,
  advanced: 3,
  expert: 4,
};

const levelLabel: Record<SkillLevel, string> = {
  foundational: "Foundational",
  proficient: "Proficient",
  advanced: "Advanced",
  expert: "Expert",
};

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit built for the full data lifecycle"
          description="From raw ingestion to a model in production to a chart an executive trusts — hover any skill for a quick read on depth."
        />

        <Tabs defaultValue={skillCategories[0].id} className="mt-14">
          <TabsList className="mx-auto flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
            {skillCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="border-border data-[state=active]:border-primary data-[state=active]:text-primary rounded-md border bg-transparent px-3.5 py-1.5 text-sm transition-colors"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-10">
              <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-center text-sm">
                {category.description}
              </p>
              <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {category.skills.map((skill) => (
                  <motion.div key={skill.name} variants={staggerItem}>
                    <SkillCard name={skill.name} level={skill.level} />
                  </motion.div>
                ))}
              </StaggerGroup>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function SkillCard({ name, level }: { name: string; level: SkillLevel }) {
  const [hovered, setHovered] = React.useState(false);
  const tier = levelTier[level];

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="glass-panel hover:border-border focus-visible:ring-primary/40 relative flex flex-col items-center gap-2.5 rounded-lg px-4 py-5 text-center outline-none transition-colors focus-visible:ring-2"
    >
      <p className="text-sm font-medium">{name}</p>
      <div className="flex items-center gap-1" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 w-3.5 rounded-full transition-colors",
              i < tier ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
        className="text-muted-foreground text-[11px] font-medium"
      >
        {levelLabel[level]}
      </motion.p>
    </motion.div>
  );
}
