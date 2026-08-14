import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundImage: "linear-gradient(135deg, #0A0B0D 0%, #121417 60%, #16223d 100%)",
        color: "#F2F4F7",
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
          color: "#5B8CFF",
        }}
      >
        {siteConfig.role}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
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
          color: "#99A1AC",
        }}
      >
        {siteConfig.tagline}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 56,
        }}
      >
        <div
          style={{
            width: 64,
            height: 6,
            borderRadius: 999,
            backgroundColor: "#5B8CFF",
          }}
        />
      </div>
    </div>,
    { ...size }
  );
}
