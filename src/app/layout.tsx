import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "../../providers";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans', 
});
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono', 
});

export const metadata: Metadata = {
  title: "ECarSharing",
  description: "Hệ thống đồng sở hữu và chia sẻ chi phí xe điện",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (

    <html lang="vi" suppressHydrationWarning={true} className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
        
          <Header />
          
          {children} 
          
          <Footer />

        </Providers>
      </body>
    </html>
  );
}