import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/shared/blog-card";
import { getAllPostsMeta } from "@/lib/blog";

export function BlogPreview() {
  const posts = getAllPostsMeta().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Blog"
          title="Notes on data, ML, and shipping"
          description="Practical write-ups from real projects — not tutorials, lessons."
        />

        <ScrollReveal
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          delay={0.1}
        >
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </ScrollReveal>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
