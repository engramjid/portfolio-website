import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <span className="border-brand-primary/20 bg-brand-primary/5 text-brand-primary inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 text-base text-balance">{description}</p>
      )}
    </ScrollReveal>
  );
}
