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

  // Redirect www -> non-www so Google always lands on the canonical URL.
  // All canonical tags in the codebase use https://tipachef.com (no www).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tipachef.com" }],
        destination: "https://tipachef.com/:path*",
        permanent: true, // 301 tells Google the canonical is non-www
      },
    ];
  },
};

export default nextConfig;
