"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, FolderGit2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TypingEffect } from "@/components/shared/typing-effect";
import { siteConfig } from "@/constants/site";

const AnimatedBackground = dynamic(
  () =>
    import("@/components/shared/animated-background").then((m) => m.AnimatedBackground),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 -z-10">
        <div className="from-brand-primary/5 dark:from-brand-primary/10 absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
        <AnimatedBackground className="h-full w-full opacity-70" />
      </div>

      <div className="section-container grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Hi, I&apos;m {siteConfig.name.split(" ")[0]}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            I build{" "}
            <span className="gradient-text">
              <TypingEffect words={siteConfig.typingWords} />
            </span>
            <br />
            that leadership trusts.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mt-6 max-w-xl text-lg text-balance"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="h-11 px-6">
              <Link href="#projects">
                View Projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-6">
              <Link href="/resume">
                <Download className="size-4" />
                Resume
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-11 px-6">
              <Link href="#contact">
                <Mail className="size-4" />
                Contact
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground mt-10 flex items-center gap-2 text-sm"
          >
            <FolderGit2 className="text-muted-foreground size-4" />
            <span>{siteConfig.location} &middot; Open to full-time roles</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="gradient-border relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src="/images/ProfilePicShorter.png"
              alt={`Portrait of ${siteConfig.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="object-cover"
            />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute -bottom-6 -left-6 rounded-2xl px-4 py-3"
          >
            <p className="text-primary font-mono text-2xl font-semibold">8+ yrs</p>
            <p className="text-muted-foreground text-xs">Enterprise BI experience</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
