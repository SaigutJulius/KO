import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3001"),
  title: "Kap Ossen Family Embassy | Heritage to Legacy",
  description: "The Kap Ossen family vision: heritage, global knowledge, the SCOF 2029 mission and a proposed 30-acre legacy destination.",
  openGraph: {
    title: "Kap Ossen Family Embassy | Heritage to Legacy",
    description: "From ARROR to the world—and back home to build the future together.",
    images: [{ url: "/og-family-embassy.png", width: 1659, height: 948, alt: "Kap Ossen Family Embassy — From Heritage to Legacy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kap Ossen Family Embassy | Heritage to Legacy",
    description: "From ARROR to the world—and back home to build the future together.",
    images: ["/og-family-embassy.png"],
  },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
