import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopsofly — Sell & Convert Online",
  description: "Nigeria's most powerful ecommerce platform. Launch your online store in minutes. Accept Paystack, bank transfer, and cash on delivery. Start your 21-day trial for just ₦2,000.",
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
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
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
      <body>{children}</body>
    </html>
  );
}
