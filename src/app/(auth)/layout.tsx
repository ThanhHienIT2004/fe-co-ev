import "./globals.css";
import Providers from "../../../providers";
import React from "react";

export const metadata = {
  title: "Auth Service",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning={true}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

