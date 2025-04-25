import type { Metadata } from "next";
import { Roboto_Mono } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Astrological Planetary Positions | Calculate Planetary Positions",
  description: "Calculate and display planetary positions for astrological purposes. Get accurate planetary positions based on birth date, time, and location.",
  keywords: "astrology, planetary positions, birth chart, horoscope, zodiac, planets, astrological calculations",
  authors: [{ name: "Tithi Astrology" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Astrological Planetary Positions",
    description: "Calculate and display planetary positions for astrological purposes",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
