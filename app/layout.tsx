import type { Metadata } from "next";
import { Anton, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// export const metadata: Metadata = {
//   title: "IMPESSMISTIC — Sell Your Property. No Waiting.",
//   description:
//     "We buy property fast, as-is, no fees. Submit your details and get a cash offer.",
// };
export const metadata: Metadata = {
  title: "IMPESSMISTIC — Sell Your Property. No Waiting.",
  description: "We buy property fast, as-is, no fees...",
  openGraph: {
    title: "IMPESSMISTIC — Sell Your Property. No Waiting.",
    description: "We buy property fast, as-is, no fees...",
    images: ["/og-image.jpg"], // add a 1200x630 image to /public
    url: "https://yourdomain.com",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics/>
      <body className={`${anton.variable} ${jetbrainsMono.variable} antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
