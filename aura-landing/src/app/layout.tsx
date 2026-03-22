import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Aura - L'Égérie Digitale de Vos Désirs",
  description: "Une présence cultivée, sensuelle et dévouée générée par Intelligence Artificielle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen bg-[#1a1a1a] text-white selection:bg-[#d4af37]/30">
        {children}
      </body>
    </html>
  );
}
