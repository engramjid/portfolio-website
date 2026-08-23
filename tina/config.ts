import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const singleton = (overrides: { create?: boolean; delete?: boolean } = {}) => ({
  global: true as const,
  allowedActions: {
    create: overrides.create ?? false,
    delete: overrides.delete ?? false,
  },
});

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images/uploads",
    },
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Site Settings",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: { ...singleton() },
        fields: [
          { type: "string", name: "name", label: "Full Name", required: true },
          { type: "string", name: "title", label: "Browser Tab Title / SEO Title" },
          { type: "string", name: "role", label: "Role / Job Title" },
          { type: "string", name: "tagline", label: "Hero Tagline" },
          { type: "string", name: "description", label: "SEO Description", ui: { component: "textarea" } },
          { type: "string", name: "url", label: "Production Site URL" },
          { type: "string", name: "email", label: "Contact Email" },
          { type: "string", name: "phone", label: "Contact Phone" },
          { type: "string", name: "location", label: "Location" },
          { type: "string", name: "keywords", label: "SEO Keywords", list: true },
          { type: "string", name: "githubUsername", label: "GitHub Username" },
          {
            type: "string",
            name: "typingWords",
            label: "Hero Typing Effect Words",
            list: true,
          },
          {
            type: "object",
            name: "stats",
            label: "About — Stat Cards",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "number", name: "value", label: "Value", required: true },
              { type: "string", name: "suffix", label: "Suffix (e.g. +, TB+)" },
            ],
          },
        ],
      },
      {
        name: "skills",
        label: "Skills",
        path: "content",
        format: "json",
        match: { include: "skills" },
        ui: { ...singleton() },
        fields: [
          {
            type: "object",
            name: "categories",
            label: "Skill Categories",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Category" }),
            },
            fields: [
              { type: "string", name: "id", label: "ID (slug, no spaces)", required: true },
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "description", label: "Description" },
              {
                type: "object",
                name: "skills",
                label: "Skills",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.name || "Skill" }),
                },
                fields: [
                  { type: "string", name: "name", label: "Skill Name", required: true },
                  {
                    type: "string",
                    name: "level",
                    label: "Proficiency Level",
                    options: ["foundational", "proficient", "advanced", "expert"],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        path: "content",
        format: "json",
        match: { include: "projects" },
        ui: { ...singleton() },
        fields: [
          {
            type: "object",
            name: "projects",
            label: "Projects",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Project" }),
              defaultItem: { categories: [], techStack: [], featured: false },
            },
            fields: [
              { type: "string", name: "slug", label: "Slug (unique, URL-safe)", required: true },
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" } },
              { type: "string", name: "problem", label: "Problem", ui: { component: "textarea" } },
              { type: "string", name: "solution", label: "Solution", ui: { component: "textarea" } },
              { type: "string", name: "impact", label: "Business Impact", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Cover Image" },
              {
                type: "string",
                name: "video",
                label: "Demo Video/GIF (path or URL, e.g. /images/projects/demo.mp4)",
              },
              {
                type: "image",
                name: "screenshots",
                label: "Additional Screenshots",
                list: true,
              },
              {
                type: "string",
                name: "categories",
                label: "Categories",
                list: true,
                options: [
                  "business-intelligence",
                  "healthcare-it",
                  "erp-integration",
                  "analytics",
                ],
              },
              { type: "string", name: "techStack", label: "Tech Stack", list: true },
              { type: "string", name: "githubUrl", label: "GitHub URL" },
              { type: "string", name: "demoUrl", label: "Live Demo URL" },
              { type: "boolean", name: "featured", label: "Featured" },
            ],
          },
        ],
      },
      {
        name: "experience",
        label: "Experience",
        path: "content",
        format: "json",
        match: { include: "experience" },
        ui: { ...singleton() },
        fields: [
          {
            type: "object",
            name: "entries",
            label: "Experience Entries",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.role ? `${item.role} — ${item.company}` : "Experience",
              }),
            },
            fields: [
              { type: "string", name: "id", label: "ID (unique, no spaces)", required: true },
              { type: "string", name: "role", label: "Role / Title", required: true },
              { type: "string", name: "company", label: "Company", required: true },
              { type: "string", name: "companyUrl", label: "Company URL" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "startDate", label: "Start Date (e.g. 2023)" },
              { type: "string", name: "endDate", label: "End Date (e.g. Present)" },
              { type: "string", name: "responsibilities", label: "Responsibilities", list: true },
              { type: "string", name: "achievements", label: "Key Achievements", list: true },
              { type: "string", name: "technologies", label: "Technologies", list: true },
            ],
          },
        ],
      },
      {
        name: "education",
        label: "Education & Certifications",
        path: "content",
        format: "json",
        match: { include: "education" },
        ui: { ...singleton() },
        fields: [
          {
            type: "object",
            name: "entries",
            label: "Education",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.institution || "Education" }),
            },
            fields: [
              { type: "string", name: "id", label: "ID (unique, no spaces)", required: true },
              { type: "string", name: "institution", label: "Institution", required: true },
              { type: "string", name: "degree", label: "Degree (e.g. M.S., B.S.)" },
              { type: "string", name: "field", label: "Field of Study" },
              { type: "string", name: "startYear", label: "Start Year" },
              { type: "string", name: "endYear", label: "End Year" },
              { type: "string", name: "details", label: "Details", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "certifications",
            label: "Certifications",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Certification" }),
            },
            fields: [
              { type: "string", name: "id", label: "ID (unique, no spaces)", required: true },
              { type: "string", name: "name", label: "Certification Name", required: true },
              {
                type: "string",
                name: "issuer",
                label: "Issuer (free text, e.g. Microsoft, Udemy, Coursera)",
              },
              { type: "string", name: "issueDate", label: "Issue Date (e.g. 2024)" },
              { type: "string", name: "credentialUrl", label: "Credential URL" },
            ],
          },
        ],
      },
      {
        name: "dashboards",
        label: "Dashboard Showcase",
        path: "content",
        format: "json",
        match: { include: "dashboards" },
        ui: { ...singleton() },
        fields: [
          {
            type: "object",
            name: "embeds",
            label: "Dashboard Embeds",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Dashboard" }),
            },
            fields: [
              { type: "string", name: "id", label: "ID (unique, no spaces)", required: true },
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "string",
                name: "platform",
                label: "Platform",
                options: ["power-bi", "tableau", "looker-studio", "kaggle"],
              },
              { type: "string", name: "embedUrl", label: "Embed URL" },
              {
                type: "string",
                name: "aspectRatio",
                label: "Aspect Ratio",
                options: ["16/9", "4/3", "1/1"],
              },
            ],
          },
        ],
      },
      {
        name: "social",
        label: "Social Links",
        path: "content",
        format: "json",
        match: { include: "social" },
        ui: { ...singleton() },
        fields: [
          {
            type: "object",
            name: "links",
            label: "Links",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || "Link" }),
            },
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "url", label: "URL", required: true },
              {
                type: "string",
                name: "icon",
                label: "Icon",
                options: ["github", "linkedin", "email", "kaggle", "medium", "twitter", "website"],
              },
            ],
          },
        ],
      },
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        ui: {
          allowedActions: { create: true, delete: true },
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" }, required: true },
          { type: "datetime", name: "date", label: "Publish Date", required: true },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "image", name: "coverImage", label: "Cover Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});
