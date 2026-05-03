import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  title: "Tip a Chef — Tip Your Favourite Chef in Seconds",
  description:
    "Great food deserves more than applause. Tip a Chef lets your fans tip you in seconds, leave a note, and support the chef behind every dish they love.",
  keywords: ["tip a chef", "chef tipping", "restaurant kitchen tips", "Tip a Chef", "direct chef tips"],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Tip a Chef — The chef who made your meal deserves to know.",
    description: "Send a direct tip to the chef behind your favourite meal. No app needed. Free to join.",
    url: "https://tipachef.com",
    siteName: "Tip a Chef",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Tip a Chef — Honour the craft" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip a Chef — The chef who made your meal deserves to know.",
    description: "Send a direct tip to the chef behind your favourite meal. No app needed. Free to join.",
    images: ["/og"],
  },
  metadataBase: new URL("https://tipachef.com"),
  verification: {
    google: "K6c5ygCR2Dr55gf0sLPgPm6oiSwCj1213-TCuNbCfm4",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
