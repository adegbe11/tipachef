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
  title: "TipAChef — Tip Your Favourite Chef in Seconds",
  description:
    "Great food deserves more than applause. TipAChef lets your fans tip you in seconds, leave a note, and support the chef behind every dish they love.",
  keywords: ["tip a chef", "chef tipping", "restaurant kitchen tips", "Tip a Chef", "direct chef tips"],
  openGraph: {
    title: "Tip a Chef · Honour the craft",
    description: "Send tips directly to the chefs and kitchen teams behind every great meal.",
    url: "https://tipachef.com",
    siteName: "Tip a Chef",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip a Chef",
    description: "Send gratitude directly to the chefs who craft your meals.",
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
