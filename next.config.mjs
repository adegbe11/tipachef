/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
    ],
  },
  compress: true,
  // www -> non-www redirect is handled in Vercel dashboard (Domains settings).
  // Do NOT add it here — Vercel already redirects tipachef.com traffic and a
  // code-level redirect on top creates a redirect loop (307 <-> 308).
};

export default nextConfig;
