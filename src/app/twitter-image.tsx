import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundImage: "linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #2563EB 100%)",
        color: "#F8FAFC",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 28,
          fontWeight: 600,
          color: "#8B5CF6",
        }}
      >
        {siteConfig.role}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 800,
          marginTop: 24,
          maxWidth: 950,
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 32,
          marginTop: 24,
          maxWidth: 900,
          color: "#94A3B8",
        }}
      >
        {siteConfig.tagline}
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 56,
        }}
      >
        {["#2563EB", "#06B6D4", "#8B5CF6"].map((c) => (
          <div
            key={c}
            style={{
              width: 64,
              height: 8,
              borderRadius: 999,
              backgroundColor: c,
            }}
          />
        ))}
      </div>
    </div>,
    { ...size }
  );
}
