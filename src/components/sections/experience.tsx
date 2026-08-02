"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { experienceEntries } from "@/constants/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've put this into practice"
          description="Seven years across analytics, data engineering, and applied ML — each role building on the last."
        />

        <div className="before:bg-border relative mt-16 space-y-10 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px sm:before:left-1/2">
          {experienceEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={`relative flex flex-col gap-6 sm:flex-row ${
                index % 2 === 1 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="bg-brand-primary shadow-brand-primary/30 absolute top-1 left-0 z-10 flex size-10 items-center justify-center rounded-full text-white shadow-md sm:left-1/2 sm:-translate-x-1/2">
                <Briefcase className="size-4" />
              </div>

              <div className="w-full pl-14 sm:w-1/2 sm:pl-0" />

              <div className="w-full pl-14 sm:w-1/2 sm:pl-0">
                <Card className={index % 2 === 1 ? "sm:mr-10" : "sm:ml-10"}>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-brand-primary text-xs font-semibold">
                        {entry.startDate} — {entry.endDate}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">{entry.role}</h3>
                      <p className="text-muted-foreground text-sm">
                        {entry.company} &middot; {entry.location}
                      </p>
                    </div>

                    <ul className="text-muted-foreground space-y-1.5 text-sm">
                      {entry.responsibilities.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="bg-muted-foreground/60 mt-1.5 size-1 shrink-0 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div>
                      <p className="text-brand-accent mb-1.5 text-xs font-semibold">
                        Key Achievements
                      </p>
                      <ul className="space-y-1.5 text-sm">
                        {entry.achievements.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="bg-brand-accent mt-1.5 size-1 shrink-0 rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {entry.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
