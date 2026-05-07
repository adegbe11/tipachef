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
  title: "Tip a Chef | Make money doing what you cook",
  description:
    "Tip a Chef lets chefs earn direct tips from the people who love their food. Create your free page, share your link, and get paid instantly for every dish you serve.",
  keywords: ["tip a chef", "chef tipping", "make money as a chef", "restaurant kitchen tips", "direct chef tips", "earn tips cooking"],
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
    title: "Tip a Chef | Make money doing what you cook",
    description: "Create your free chef page and start earning direct tips from the people who love your food. No app. No middleman. Paid instantly.",
    url: "https://tipachef.com",
    siteName: "Tip a Chef",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Tip a Chef — Make money doing what you cook" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip a Chef | Make money doing what you cook",
    description: "Create your free chef page and start earning direct tips from the people who love your food. No app. No middleman. Paid instantly.",
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
