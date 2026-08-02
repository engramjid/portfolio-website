import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        backgroundImage: "linear-gradient(135deg, #2563EB, #06B6D4, #8B5CF6)",
        color: "#F8FAFC",
        fontSize: 18,
        fontWeight: 800,
        fontFamily: "sans-serif",
      }}
    >
      A
    </div>,
    { ...size }
  );
}
