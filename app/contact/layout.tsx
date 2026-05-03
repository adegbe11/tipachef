import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Tip a Chef",
  description:
    "Get in touch with the Tip a Chef team. Questions about your tips, chef accounts, payouts, or press enquiries — we reply within one business day.",
  keywords: ["contact tip a chef", "tipachef support", "chef account help", "tip a chef email"],
  openGraph: {
    title: "Contact Us — Tip a Chef",
    description: "Reach the Tip a Chef team. We reply within one business day.",
    url: "https://tipachef.com/contact",
    type: "website",
  },
  alternates: { canonical: "https://tipachef.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
