import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";



const roboto = localFont({
  src: './fonts/RobotoRegular.woff',
  variable: "--font-roboto-mono",
  weight: '400 700',
  style: 'normal',
})

export const metadata: Metadata = {
  title: "Soller Project",
  description: "Get the Sun Power Your Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={`${roboto.variable} antialiased`}
      >
      {children}
     </body>
    </html>
  );
}
