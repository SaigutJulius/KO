import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Kap Ossen currently ships pre-sized local brand assets. Vinext's local
  // Cloudflare preview does not expose the ASSETS/IMAGES bindings used by its
  // runtime optimizer, so keep these files on their stable public URLs.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
