import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Product Details | Dessert Shop',
  description: 'Explore our delicious desserts. Choose your favorite!',
  openGraph: {
    title: 'Product Details | Dessert Shop',
    description: 'Explore our delicious desserts. Choose your favorite!',
    images: [
      {
        url: '/default-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Desserts',
      },
    ],
  },
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
