"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/scroll-reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { skillCategories } from "@/constants/skills";
import type { SkillLevel } from "@/types";
import { cn } from "@/lib/utils";

const levelWidth: Record<SkillLevel, string> = {
  foundational: "w-1/4",
  proficient: "w-2/4",
  advanced: "w-3/4",
  expert: "w-full",
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
                className="border-border data-[state=active]:border-brand-primary data-[state=active]:bg-brand-primary/10 data-[state=active]:text-brand-primary rounded-full border bg-transparent px-4 py-2 text-sm"
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

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="glass-panel group focus-visible:ring-brand-primary/50 relative overflow-hidden rounded-xl px-4 py-5 text-center outline-none focus-visible:ring-2"
    >
      <div
        className={cn(
          "from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300",
          hovered && "opacity-100"
        )}
      />
      <p className="text-sm font-semibold">{name}</p>
      <div className="bg-muted mx-auto mt-3 h-1.5 w-full overflow-hidden rounded-full">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className={cn(
            "from-brand-primary via-brand-secondary to-brand-accent h-full rounded-full bg-gradient-to-r",
            levelWidth[level]
          )}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
        className="text-muted-foreground mt-2 text-[11px] font-medium"
      >
        {levelLabel[level]}
      </motion.p>
    </motion.div>
  );
}
