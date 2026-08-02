"use client";

import * as React from "react";

import type { GithubProfile, GithubRepo } from "@/types";

interface GithubData {
  profile: GithubProfile;
  repos: GithubRepo[];
  totalStars: number;
  languageBreakdown: { language: string; count: number; percentage: number }[];
  topRepos: GithubRepo[];
}

interface UseGithubDataResult {
  data: GithubData | null;
  loading: boolean;
  error: string | null;
}

export function useGithubData(username: string): UseGithubDataResult {
  const [data, setData] = React.useState<GithubData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!username) return;

    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            {
              signal: controller.signal,
              headers: { Accept: "application/vnd.github+json" },
            }
          ),
        ]);

        if (!profileRes.ok) {
          throw new Error(
            profileRes.status === 404
              ? `GitHub user "${username}" not found.`
              : `GitHub API responded with ${profileRes.status}. You may have hit the unauthenticated rate limit — try again shortly.`
          );
        }
        if (!reposRes.ok) {
          throw new Error(
            `GitHub API responded with ${reposRes.status} while loading repositories.`
          );
        }

        const profile: GithubProfile = await profileRes.json();
        const repos: GithubRepo[] = await reposRes.json();

        const nonForkRepos = repos.filter((repo) => !repo.fork);
        const totalStars = nonForkRepos.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        );

        const languageCounts = new Map<string, number>();
        for (const repo of nonForkRepos) {
          if (!repo.language) continue;
          languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
        }
        const totalLanguageRepos = Array.from(languageCounts.values()).reduce(
          (a, b) => a + b,
          0
        );
        const languageBreakdown = Array.from(languageCounts.entries())
          .map(([language, count]) => ({
            language,
            count,
            percentage: totalLanguageRepos
              ? Math.round((count / totalLanguageRepos) * 100)
              : 0,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        const topRepos = [...nonForkRepos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);

        setData({ profile, repos, totalStars, languageBreakdown, topRepos });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load GitHub data.");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [username]);

  return { data, loading, error };
}
