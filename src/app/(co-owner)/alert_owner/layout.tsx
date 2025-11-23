import HeroBanner from "@/components/Banner/HeroBanner";
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import React from "react";

export default function AlertOwnerPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeroBanner />

      <main className="grow max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
