"use client";

import { motion } from "framer-motion";
import { ExternalLink, GraduationCap } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { certifications, educationEntries } from "@/constants/education";

const issuerColor: Record<string, string> = {
  Microsoft: "from-[#00A4EF] to-[#7FBA00]",
  Google: "from-[#4285F4] to-[#34A853]",
  AWS: "from-[#FF9900] to-[#232F3E]",
  Azure: "from-[#0078D4] to-[#50E6FF]",
  IBM: "from-[#0F62FE] to-[#001D6C]",
  Databricks: "from-[#FF3621] to-[#8B5CF6]",
  Snowflake: "from-[#29B5E8] to-[#1C6E9C]",
  "Microsoft / Coursera": "from-[#00A4EF] to-[#0056D2]",
  Udemy: "from-[#A435F0] to-[#5022C3]",
  "Maven Analytics": "from-brand-secondary to-brand-primary",
};

export function Education() {
  return (
    <section id="education" className="bg-muted/30 py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Education & Certifications"
          title="Formal training, kept current"
          description="A graduate foundation in computer engineering, kept sharp with Power BI and platform certifications."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {educationEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="flex gap-4">
                  <span className="bg-brand-primary/10 text-brand-primary flex size-11 shrink-0 items-center justify-center rounded-full">
                    <GraduationCap className="size-5" />
                  </span>
                  <div>
                    <p className="text-brand-primary text-xs font-semibold">
                      {entry.startYear} — {entry.endYear}
                    </p>
                    <h3 className="mt-1 font-semibold">
                      {entry.degree}, {entry.field}
                    </h3>
                    <p className="text-muted-foreground text-sm">{entry.institution}</p>
                    {entry.details && (
                      <p className="text-muted-foreground mt-2 text-sm">
                        {entry.details}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <h3 className="mt-20 mb-8 text-center text-lg font-semibold">
          Professional Certifications
        </h3>
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={staggerItem}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-3">
                  <span
                    className={`inline-flex w-fit items-center rounded-full bg-gradient-to-r px-2.5 py-1 text-[11px] font-semibold text-white ${
                      issuerColor[cert.issuer] ?? "from-brand-primary to-brand-accent"
                    }`}
                  >
                    {cert.issuer}
                  </span>
                  <p className="font-medium">{cert.name}</p>
                  {cert.issueDate && (
                    <p className="text-muted-foreground text-xs">Issued {cert.issueDate}</p>
                  )}
                  {cert.credentialUrl && (
                    <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
                      <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                        View Credential
                        <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
