"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SocialIcon } from "@/components/shared/social-icon";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { siteConfig } from "@/constants/site";
import { socialLinks } from "@/constants/social";

export function Contact() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-muted/30 py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something that ships"
          description="Have a role, a project, or just a question? I usually reply within a couple of days."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="bg-brand-primary/10 text-brand-primary flex size-10 shrink-0 items-center justify-center rounded-full">
                  <Mail className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              {siteConfig.phone && (
                <div className="flex items-start gap-3">
                  <span className="bg-brand-accent/10 text-brand-accent flex size-10 shrink-0 items-center justify-center rounded-full">
                    <Phone className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Phone</p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                      className="text-muted-foreground hover:text-foreground text-sm"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <span className="bg-brand-secondary/10 text-brand-secondary flex size-10 shrink-0 items-center justify-center rounded-full">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Location</p>
                  <p className="text-muted-foreground text-sm">{siteConfig.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target={link.icon === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={link.label}
                    className="border-border text-muted-foreground hover:border-brand-primary hover:text-brand-primary flex size-10 items-center justify-center rounded-full border transition-colors"
                  >
                    <SocialIcon icon={link.icon} className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass-panel space-y-5 rounded-2xl p-6 sm:p-8"
            >
              {/* Honeypot — hidden from real users, visible to bots */}
              <div className="hidden" aria-hidden="true">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("company")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Analytics Engineer role, project, or just a question"
                  aria-invalid={!!errors.subject}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-destructive text-xs">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me a bit about the project or role..."
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-destructive text-xs">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send Message
                  </>
                )}
              </Button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="size-4" />
                    Message sent — thanks for reaching out! I&apos;ll be in touch soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="text-destructive text-sm font-medium"
                  >
                    Something went wrong sending your message. Please try again or email
                    directly at {siteConfig.email}.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
