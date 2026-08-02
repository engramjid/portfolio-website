import type { Metadata } from "next";

import { BlogCard } from "@/components/shared/blog-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getAllPostsMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical write-ups on data science, machine learning, and analytics engineering from real projects.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="section-container py-32">
      <SectionHeading
        eyebrow="Blog"
        title="Notes on data, ML, and shipping"
        description="Practical write-ups from real projects — not tutorials, lessons."
      />

      {posts.length === 0 ? (
        <p className="text-muted-foreground mt-16 text-center">
          No articles published yet — check back soon.
        </p>
      ) : (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
