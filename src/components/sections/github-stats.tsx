"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, ExternalLink, GitFork, Star, Users } from "lucide-react";
import { FiGithub as Github } from "react-icons/fi";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGithubData } from "@/hooks/use-github-data";
import { siteConfig } from "@/constants/site";
import { formatNumber } from "@/lib/utils";

const CHART_COLORS = ["#2563EB", "#06B6D4", "#8B5CF6", "#22C55E", "#F59E0B", "#EC4899"];

export function GithubStats() {
  const { data, loading, error } = useGithubData(siteConfig.githubUsername);

  return (
    <section id="github" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="GitHub"
          title="Live from GitHub"
          description="Pulled directly from the GitHub API — repositories, stars, and language mix, updated automatically."
        />

        {error && (
          <div className="border-border mx-auto mt-12 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed p-8 text-center">
            <AlertTriangle className="size-6 text-amber-500" />
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button asChild variant="outline" size="sm">
              <a
                href={`https://github.com/${siteConfig.githubUsername}`}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="size-4" />
                View GitHub Profile Directly
              </a>
            </Button>
          </div>
        )}

        {!error && (
          <>
            <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Card className="h-full">
                <CardContent className="flex flex-col items-center gap-4 py-6 text-center">
                  {loading || !data ? (
                    <>
                      <Skeleton className="size-20 rounded-full" />
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </>
                  ) : (
                    <>
                      <Image
                        src={data.profile.avatar_url}
                        alt={data.profile.name ?? data.profile.login}
                        width={80}
                        height={80}
                        className="ring-brand-primary/30 rounded-full ring-2"
                        unoptimized
                      />
                      <div>
                        <p className="font-semibold">
                          {data.profile.name ?? data.profile.login}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          @{data.profile.login}
                        </p>
                      </div>
                      {data.profile.bio && (
                        <p className="text-muted-foreground text-sm">
                          {data.profile.bio}
                        </p>
                      )}
                      <Button asChild size="sm" variant="outline">
                        <a href={data.profile.html_url} target="_blank" rel="noreferrer">
                          <Github className="size-4" />
                          Follow on GitHub
                        </a>
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                <StatTile
                  icon={<Github className="size-4" />}
                  label="Public Repos"
                  value={data ? formatNumber(data.profile.public_repos) : undefined}
                  loading={loading}
                />
                <StatTile
                  icon={<Star className="size-4" />}
                  label="Total Stars"
                  value={data ? formatNumber(data.totalStars) : undefined}
                  loading={loading}
                />
                <StatTile
                  icon={<Users className="size-4" />}
                  label="Followers"
                  value={data ? formatNumber(data.profile.followers) : undefined}
                  loading={loading}
                />
                <StatTile
                  icon={<GitFork className="size-4" />}
                  label="Following"
                  value={data ? formatNumber(data.profile.following) : undefined}
                  loading={loading}
                />

                <Card className="col-span-2 sm:col-span-4 lg:col-span-2">
                  <CardContent>
                    <p className="mb-3 text-sm font-semibold">Language Mix</p>
                    {loading || !data ? (
                      <Skeleton className="h-40 w-full" />
                    ) : data.languageBreakdown.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No language data available yet.
                      </p>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="h-36 w-36 shrink-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={data.languageBreakdown}
                                dataKey="count"
                                nameKey="language"
                                innerRadius={32}
                                outerRadius={56}
                                paddingAngle={2}
                              >
                                {data.languageBreakdown.map((entry, i) => (
                                  <Cell
                                    key={entry.language}
                                    fill={CHART_COLORS[i % CHART_COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value, name) => [`${value} repos`, name]}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <ul className="flex-1 space-y-1.5 text-xs">
                          {data.languageBreakdown.map((entry, i) => (
                            <li
                              key={entry.language}
                              className="flex items-center justify-between gap-2"
                            >
                              <span className="text-muted-foreground flex items-center gap-1.5">
                                <span
                                  className="size-2 rounded-full"
                                  style={{
                                    backgroundColor:
                                      CHART_COLORS[i % CHART_COLORS.length],
                                  }}
                                />
                                {entry.language}
                              </span>
                              <span className="font-medium">{entry.percentage}%</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <h3 className="mt-16 mb-6 text-center text-lg font-semibold">
              Pinned &amp; Top Repositories
            </h3>
            {loading || !data ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                ))}
              </div>
            ) : (
              <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.topRepos.map((repo) => (
                  <motion.div key={repo.id} variants={staggerItem}>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block h-full"
                    >
                      <Card className="glass-panel h-full border-none transition-transform hover:-translate-y-1">
                        <CardContent className="flex h-full flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate font-semibold">{repo.name}</p>
                            <ExternalLink className="text-muted-foreground size-3.5 shrink-0" />
                          </div>
                          <p className="text-muted-foreground line-clamp-2 flex-1 text-sm">
                            {repo.description ?? "No description provided."}
                          </p>
                          <div className="text-muted-foreground flex items-center gap-4 pt-1 text-xs">
                            {repo.language && (
                              <span className="flex items-center gap-1">
                                <span className="bg-brand-primary size-2 rounded-full" />
                                {repo.language}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Star className="size-3" />
                              {formatNumber(repo.stargazers_count)}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="size-3" />
                              {formatNumber(repo.forks_count)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </StaggerGroup>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function StatTile({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  loading: boolean;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <span className="text-brand-primary">{icon}</span>
        {loading || value === undefined ? (
          <Skeleton className="h-6 w-12" />
        ) : (
          <p className="text-xl font-bold">{value}</p>
        )}
        <p className="text-muted-foreground text-xs">{label}</p>
      </CardContent>
    </Card>
  );
}
