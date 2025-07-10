import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const roboto = localFont({
  src: './fonts/RobotoRegular.woff',
  variable: "--font-roboto-mono",
  weight: '400 700',
  style: 'normal',
})

const robotoBold = localFont({
  src: "./fonts/RobotoBold.woff",
  variable: "--font-roboto-bold",
  weight: "700",
});

const robotoMedium = localFont({
  src: "./fonts/RobotoMedium.woff",
  variable: "--font-roboto-medium",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Soller - Enterprise Solar Solutions",
  description: "Production-Ready Solar Energy Platform with interactive calculator, dark mode, and enterprise features",
  keywords: ["solar", "energy", "calculator", "enterprise", "dark mode"],
  authors: [{ name: "Soller Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoBold.variable} ${robotoMedium.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
