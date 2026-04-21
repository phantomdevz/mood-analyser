import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import BreathingBackground from "./components/BreathingBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InnerCircle — Understand Your Mind",
  description:
    "AI-powered mood analysis delivering personalized, science-backed wellness activities tailored to your energy and stress levels.",
  keywords: "mood analysis, mental wellness, AI, mood tracker, mindfulness, InnerCircle",
  openGraph: {
    title: "InnerCircle — Understand Your Mind",
    description: "AI-powered mood analysis. Personalized wellness, instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.className} antialiased`}
        style={{ fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      >
        <BreathingBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
