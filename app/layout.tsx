import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { MainLayout } from "@/components/layout/main-layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "BuruujTech | Educational Institution",
  description: "Empowering the next generation with world-class education and technology.",
  icons: {
    icon: "/logo_buruuj-removebg-preview.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
