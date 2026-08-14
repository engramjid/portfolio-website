import Link from "next/link";

import { navLinks, siteConfig } from "@/constants/site";
import { socialLinks } from "@/constants/social";
import { SocialIcon } from "@/components/shared/social-icon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 border-t">
      <div className="section-container flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="gradient-text text-lg font-bold tracking-tight">
            {siteConfig.name}
          </Link>
          <p className="text-muted-foreground mt-2 text-sm">{siteConfig.tagline}</p>
          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.icon === "email" ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={link.label}
                className="border-border text-muted-foreground hover:border-brand-primary hover:text-brand-primary flex size-9 items-center justify-center rounded-full border transition-colors"
              >
                <SocialIcon icon={link.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-6 gap-y-2 sm:max-w-[220px] sm:justify-end"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-border/60 border-t">
        <div className="section-container text-muted-foreground flex items-center justify-center gap-2 py-5 text-xs">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
