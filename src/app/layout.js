import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CRITICAL_IMAGE_ASSETS } from "@/utils/assets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tangga Berani",
  description: "Game Digital Melatih Kepercayaan Diri",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {CRITICAL_IMAGE_ASSETS.map((src) => (
          <link key={src} rel="preload" as="image" href={src} />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
