"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Search, Sparkles } from "lucide-react";
import { FiGithub as Github } from "react-icons/fi";

import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { projectCategoryLabels, projects } from "@/constants/projects";
import type { Project, ProjectCategory } from "@/types";

const categories = Object.keys(projectCategoryLabels) as ProjectCategory[];

export function Projects() {
  const [activeCategory, setActiveCategory] = React.useState<ProjectCategory | "all">(
    "all"
  );
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.categories.includes(activeCategory);
      const matchesQuery =
        q.length === 0 ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work that shipped"
          description="Each project below moved a real metric — not just a proof of concept left on a branch."
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            >
              All
            </FilterChip>
            {categories.map((category) => (
              <FilterChip
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {projectCategoryLabels[category]}
              </FilterChip>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech..."
              aria-label="Search projects"
              className="pl-9"
            />
          </div>
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground mt-16 text-center text-sm">
            No projects match &ldquo;{query}&rdquo;. Try another search or category.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
          : "border-border text-muted-foreground hover:border-brand-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="glass-panel group hover:border-border flex flex-col overflow-hidden rounded-xl transition-colors"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {project.featured && (
          <span className="border-border/60 bg-background/80 text-foreground absolute top-3 right-3 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium backdrop-blur-sm">
            <Sparkles className="text-primary size-3" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="secondary" className="font-normal">
              +{project.techStack.length - 4}
            </Badge>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
              <DialogHeader>
                <DialogTitle className="text-xl">{project.title}</DialogTitle>
              </DialogHeader>
              {project.video ? (
                <video
                  src={project.video}
                  poster={project.image}
                  controls
                  loop
                  playsInline
                  className="aspect-video w-full rounded-lg object-cover"
                />
              ) : (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 640px) 576px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {project.screenshots.map((src, i) => (
                    <a
                      key={src}
                      href={src}
                      target="_blank"
                      rel="noreferrer"
                      className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md border border-border"
                    >
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 2}`}
                        fill
                        sizes="128px"
                        className="object-cover transition-opacity hover:opacity-80"
                      />
                    </a>
                  ))}
                </div>
              )}
              <div className="space-y-4 text-sm">
                <DetailBlock label="Problem" text={project.problem} />
                <DetailBlock label="Solution" text={project.solution} />
                <DetailBlock label="Business Impact" text={project.impact} />
                <div>
                  <p className="mb-1.5 font-semibold">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                {project.githubUrl && (
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github className="size-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button asChild size="sm" className="flex-1">
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="size-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {project.githubUrl && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              aria-label={`${project.title} on GitHub`}
            >
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Github className="size-4" />
              </a>
            </Button>
          )}
          {project.demoUrl && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              aria-label={`${project.title} live demo`}
            >
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="mb-1 font-semibold">{label}</p>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
