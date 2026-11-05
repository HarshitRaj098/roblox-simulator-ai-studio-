import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roblox Simulator AI Studio",
  description: "Plan, build, test, and ship Roblox simulator games with a coordinated AI agent team.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
