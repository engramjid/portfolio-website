import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { BlogPostMeta } from "@/types";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="glass-panel hover:border-border flex h-full flex-col overflow-hidden rounded-xl transition-all duration-300 group-hover:-translate-y-1">
        {post.coverImage && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="group-hover:text-brand-primary mt-3 text-lg font-semibold text-balance transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2 flex-1 text-sm">
            {post.excerpt}
          </p>
          <div className="text-muted-foreground mt-4 flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
