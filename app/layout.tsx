import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3001"),
  title: "Kap Ossen Family | 2026–2035 Development Plan",
  description: "A shared family vision for unity, education, prosperity and opportunity across generations.",
  openGraph: {
    title: "Kap Ossen Family | 2026–2035 Development Plan",
    description: "United in Heritage. Empowered by Knowledge. Building the Future Together.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "Kap Ossen Family Development Plan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kap Ossen Family | 2026–2035 Development Plan",
    description: "United in Heritage. Empowered by Knowledge. Building the Future Together.",
    images: ["/og.png"],
  },
};

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
