import HeroBanner from "@/components/Banner/HeroBanner";
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import React from "react";

export default function AboutUsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />  
      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
}
