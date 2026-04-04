import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopsofly — Sell & Convert Online",
  description: "Nigeria\'s most powerful ecommerce platform. Launch your online store in minutes. Accept Paystack, bank transfer, and cash on delivery. Start your 21-day trial for just ₦2,000.",
  keywords: "ecommerce Nigeria, online store Nigeria, Shopify Nigeria, sell online Nigeria, Paystack store",
  openGraph: {
    title: "Shopsofly — Sell & Convert Online",
    description: "Launch your online store in minutes. Accept Paystack, bank transfer, and cash on delivery.",
    url: "https://www.shopsofly.com",
    siteName: "Shopsofly",
    locale: "en_NG",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
