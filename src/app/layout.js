import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Snaggle - Penny Auction Platform",
  description:
    "Snaggle is a penny auction platform where you can bid on items and win them at a fraction of the price.",
  openGraph: {
    title: "Snaggle - Penny Auction Platform",
    description:
      "Snaggle is a penny auction platform where you can bid on items and win them at a fraction of the price.",
    url: "https://snaggle.fun",
    siteName: "Snaggle",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-16 px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
