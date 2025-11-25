import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Providers from "../../providers"; 

export const metadata: Metadata = { 
  title: "EVSharing",
  description: "Co-ownership and cost-sharing of electric vehicles",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning> 
      <body>
        <Providers>
          <main>{children}</main> 
        </Providers>
      </body>
    </html>
  );
}