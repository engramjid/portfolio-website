# Amjid Hussain — Data Portfolio

A premium, production-ready portfolio website for a data professional (Data
Scientist / ML Engineer / Analytics Engineer), built with Next.js 16 (App
Router), TypeScript, Tailwind CSS v4, Framer Motion, and shadcn/ui.

Live sections: animated hero, about/timeline, interactive skills grid,
filterable/searchable project cards, embeddable BI dashboards (Power BI /
Tableau / Looker Studio / Kaggle), an animated experience timeline,
education & certifications, **live GitHub stats pulled from the GitHub API**,
a Markdown-powered blog, an embedded resume viewer, and a validated contact
form — plus dark/light theming, glassmorphism, gradient accents, scroll
reveal animations, and full SEO metadata (Open Graph images, JSON-LD,
sitemap, robots.txt).

**Includes a real admin panel** ([TinaCMS](https://tina.io)) at `/admin` for
editing every section — projects, skills, experience, blog posts, and more —
through browser forms instead of code. See
[Content Admin Panel](#content-admin-panel-tinacms) below.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`), `tw-animate-css`
- **UI Components:** shadcn/ui (Radix primitives)
- **Animation:** Framer Motion, a lightweight Three.js particle background
- **Icons:** lucide-react, react-icons (brand icons)
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts (GitHub language-mix chart)
- **Markdown:** gray-matter, react-markdown, remark-gfm
- **Theming:** next-themes
- **Lint/Format:** ESLint, Prettier (+ `prettier-plugin-tailwindcss`)

## Getting Started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

> **Windows / Google Drive users:** if this project lives inside a
> Google Drive–synced folder, `npm install` can fail with `EBADF`/`ENOTEMPTY`
> errors because `node_modules` contains tens of thousands of small files
> that conflict with the Drive sync client. Develop from a local (non-synced)
> drive or folder instead.

## Environment Variables

Copy `.env.example` to `.env.local`. Every variable is optional — the app
runs with sane defaults out of the box:

| Variable                     | Purpose                                                                             |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Canonical domain used for metadata, sitemap, robots.txt, and OG tags                 |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Only needed to enable the admin panel on your *deployed* site — see below             |
| `TINA_TOKEN`                 | Same as above                                                                         |

See `.env.example` for details, including notes on wiring up a real email
provider for the contact form and how the GitHub API integration handles
rate limits.

## Project Structure

```
content/                 All editable content, as JSON + Markdown (see Content Admin Panel below)
  site.json               Name, tagline, bio, contact info, hero typing words, stat cards
  skills.json              Skill categories and proficiency levels
  projects.json            Project cards (problem/solution/impact, tech stack, links)
  experience.json          Work history timeline
  education.json           Degrees and certifications
  dashboards.json           BI dashboard embed config
  social.json              Social links
  blog/*.md                Blog posts (frontmatter: title, excerpt, date, tags, coverImage)
public/images/           Avatar, project, and blog placeholder graphics (SVG)
public/resume.pdf         Placeholder resume — replace with your real PDF
tina/config.ts           TinaCMS schema — defines the admin panel's forms/fields
src/
  app/                    Routes (App Router): home, /blog, /blog/[slug], /resume, /admin, API
                          routes, sitemap.ts, robots.ts, opengraph-image.tsx, icon.tsx
  components/
    layout/               Navbar, Footer, BackToTop, ThemeProvider/Toggle
    sections/             One component per homepage section (Hero, About, Skills, Projects, …)
    shared/                Reusable primitives (ScrollReveal, SectionHeading, StatCard, …)
    ui/                     shadcn/ui components
  constants/              Thin typed wrappers around content/*.json (import here, not the JSON
                          directly, to keep everything type-safe)
  hooks/                  useGithubData (live GitHub API fetch)
  lib/                    cn() helper, blog utilities, Zod validation schemas
  types/                  Shared TypeScript types
```

## Content Admin Panel (TinaCMS)

Every section of the site — Site Settings, Skills, Projects, Experience,
Education & Certifications, Dashboard Showcase, Social Links, and Blog Posts
— is editable through a real admin UI at **`/admin`**, powered by
[TinaCMS](https://tina.io). No database: edits are saved straight back to the
`content/*.json` and `content/blog/*.md` files you see in the repo.

### Local editing (works immediately, no signup)

```bash
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) → **Enter
Edit Mode**. Pick a collection from the sidebar, edit the form, hit **Save**.
The change writes to the matching file under `content/` immediately, and the
live site hot-reloads to reflect it. Commit and push those file changes like
any other code change to publish them.

This local mode requires the project to be a git repository (already set up
for you) but nothing else — no account, no API keys.

### Editing the deployed site itself (optional)

Local mode only works on your machine. To get a working `/admin` on your
*deployed* site — with real login — connect a free
[Tina Cloud](https://app.tina.io) account:

1. Push this repo to GitHub.
2. Sign up at [app.tina.io](https://app.tina.io) (free) and connect the repo.
3. Copy the generated **Client ID** and create a **read-only token**.
4. Add them as environment variables on your hosting platform:
   `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN`.
5. Change your hosting platform's build command from `npm run build` to
   `npm run build:cloud` (defined in `package.json` as
   `tinacms build && next build`) — the default `build` script uses
   `--local --skip-cloud-checks` so it never hard-fails for people who
   haven't connected Tina Cloud yet.
6. Redeploy. Tina Cloud commits edits back to GitHub on your behalf, which
   triggers a normal redeploy on Vercel/Cloudflare Pages.

This step is entirely optional — skip it if editing locally and pushing via
git is enough for you.

## Customization

All editorial content lives in `content/*.json` and `content/blog/*.md` —
edit it directly, or through the [admin panel](#content-admin-panel-tinacms)
above. `src/constants/*.ts` are thin typed wrappers around that JSON; you
shouldn't normally need to touch them.

Things to replace before shipping:

1. **`content/site.json`** → set `githubUsername` to your real GitHub handle
   (defaults to `octocat` as a working demo), plus your name/email/etc.
2. **`public/resume.pdf`** → swap in your real resume (the placeholder is a
   minimal generated PDF).
3. **`public/images/avatar-placeholder.svg`** → replace with a real photo
   (any raster/SVG works; update the `src` in `src/components/sections/hero.tsx`).
4. **`content/dashboards.json`** → replace the placeholder `embedUrl`s with
   your real Power BI / Tableau / Looker Studio / Kaggle embed links.
5. **`content/blog/*.md`** → replace with your own posts (same frontmatter
   shape), or write new ones straight from `/admin`.
6. **`src/app/api/contact/route.ts`** → currently validates and logs
   submissions server-side only. Wire in a provider (e.g. [Resend](https://resend.com))
   to actually send email.

## Deployment

All three targets below are free and require no credit card. Set
`NEXT_PUBLIC_SITE_URL` in each platform's environment settings to your real
domain before going live.

### Vercel (recommended)

Full feature support (API routes, dynamically-rendered image routes, ISR)
with zero config.

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add `NEXT_PUBLIC_SITE_URL` under Project Settings → Environment Variables
   (optionally also `NEXT_PUBLIC_TINA_CLIENT_ID`/`TINA_TOKEN` — see
   [Content Admin Panel](#content-admin-panel-tinacms)).
4. Deploy.

```bash
# or from the CLI
npm i -g vercel
vercel
```

### Cloudflare Pages

Also supports the full app (API routes included) via the Next.js adapter.

1. `npm install -D @cloudflare/next-on-pages`
2. Push to GitHub and connect the repo in the Cloudflare Pages dashboard, or
   deploy directly:
   ```bash
   npx @cloudflare/next-on-pages
   npx wrangler pages deploy .vercel/output/static
   ```
3. Build command: `npx @cloudflare/next-on-pages`. Output directory:
   `.vercel/output/static`.
4. Add `NEXT_PUBLIC_SITE_URL` as a Cloudflare Pages environment variable.

### GitHub Pages (static export)

GitHub Pages only serves static files — it cannot run the `/api/contact`
route. To deploy there:

1. Remove (or move out of `src/app`) the `api/` directory, since Next.js
   disallows API routes when statically exporting:
   ```bash
   rm -rf src/app/api
   ```
   Point the contact form at a third-party form endpoint instead (e.g.
   [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com),
   both free) by changing the `fetch("/api/contact", ...)` call in
   `src/components/sections/contact.tsx`.
2. Add static export output to `next.config.ts`:
   ```ts
   const nextConfig: NextConfig = {
     output: "export",
     images: { unoptimized: true },
     // Only if deploying to https://<user>.github.io/<repo>/ (a project page,
     // not a user/org root page):
     // basePath: "/<repo>",
   };
   ```
3. Build and deploy the `out/` directory:
   ```bash
   npm run build
   ```
   Then push the contents of `out/` to a `gh-pages` branch (e.g. via the
   [`gh-pages`](https://www.npmjs.com/package/gh-pages) package or the
   official `actions/deploy-pages` GitHub Action), or configure GitHub
   Pages to serve from `/out` via a workflow.

## Performance & Accessibility

- Route-level code splitting via the App Router; heavy client-only pieces
  (the Three.js background, the Recharts pie chart) are dynamically
  imported / used only in client components.
- All animations respect `prefers-reduced-motion`.
- Semantic landmarks, skip-to-content link, keyboard-navigable nav and
  dialogs (via Radix), labeled form fields, and AA-contrast color tokens.
- Images use `next/image` with explicit `sizes` for responsive loading.

## License

MIT — use this as a starting point for your own portfolio.
