import HeroBanner from "@/components/banner/HeroBanner";
import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import React from "react";

export default function BookNowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeroBanner />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
