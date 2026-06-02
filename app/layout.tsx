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
  title: "Tip a Chef | Tip & Hire a Private Chef Directly",
  description:
    "Tip a Chef connects diners with private chefs, with every tip going straight to the chef who cooked, not a pool. Find a private chef near you, or create your free chef page and get tipped by QR code.",
  keywords: [
    "tip a chef", "tip a private chef", "tip your chef",
    "private chef", "hire a private chef", "private chef near me",
    "personal chef", "do you tip a private chef", "how much to tip a private chef",
    "chef tipping", "make money as a chef",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico",        sizes: "any",      type: "image/x-icon" },
      { url: "/favicon-16x16.png",  sizes: "16x16",    type: "image/png"    },
      { url: "/favicon-32x32.png",  sizes: "32x32",    type: "image/png"    },
      { url: "/favicon-48x48.png",  sizes: "48x48",    type: "image/png"    },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple:    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon.ico",
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  openGraph: {
    title: "Tip a Chef | Tip & Hire a Private Chef Directly",
    description: "Tip and hire a private chef directly. Every tip goes straight to the chef who cooked, not a pool. Find a private chef near you, or create your free chef page and get tipped by QR code.",
    url: "https://tipachef.com",
    siteName: "Tip a Chef",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Tip a Chef — tip and hire a private chef directly" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip a Chef | Tip & Hire a Private Chef Directly",
    description: "Tip and hire a private chef directly. Every tip goes straight to the chef who cooked, not a pool. Find a chef near you, or create your free page and get tipped by QR code.",
    images: ["/og"],
  },
  metadataBase: new URL("https://tipachef.com"),
  alternates: { canonical: "https://tipachef.com" },
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
