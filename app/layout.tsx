import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { withBasePath } from "./sitePaths";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const display = Bodoni_Moda({ variable: "--font-display", subsets: ["latin"], weight: "variable", display: "swap" });
const heritage = Fraunces({ variable: "--font-heritage", subsets: ["latin"], weight: "variable", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: "Kap Ossen Family Embassy | From Heritage to Legacy",
  description: "The Kap Ossen family vision: heritage, global knowledge, SCOF's 2029 target and a proposed 30-acre legacy destination.",
  applicationName: "Kap Ossen Family Embassy",
  icons: {
    icon: [
      { url: withBasePath("/brand/kap-ossen/ko-monogram-32.png"), sizes: "32x32", type: "image/png" },
      { url: withBasePath("/brand/kap-ossen/ko-monogram-64.png"), sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: withBasePath("/brand/kap-ossen/ko-app-icon-512.png"), sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: "Kap Ossen Family Embassy | From Heritage to Legacy",
    description: "From ARROR to the world - and back home to build the future together.",
    type: "website",
    images: [{ url: withBasePath("/og-family-embassy.png"), width: 1659, height: 948, alt: "Kap Ossen Family Embassy - From Heritage to Legacy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kap Ossen Family Embassy | From Heritage to Legacy",
    description: "From ARROR to the world - and back home to build the future together.",
    images: [withBasePath("/og-family-embassy.png")],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1d0828",
  colorScheme: "light",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} ${display.variable} ${heritage.variable}`}
        style={{ "--ko-crest-image": `url(${withBasePath("/brand/kap-ossen/ko-crest-primary-transparent-1024.png")})` } as React.CSSProperties}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
