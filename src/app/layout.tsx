import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { PageShell } from "@/components/layout/page-shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Partner Portal | CoreBiz + B5",
  description:
    "Premium static partner portal for strategy, delivery engineering, AI, security, and growth services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
