import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/KO" : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Kap Ossen currently ships pre-sized local brand assets. Vinext's local
  // Cloudflare preview does not expose the ASSETS/IMAGES bindings used by its
  // runtime optimizer, so keep these files on their stable public URLs.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
