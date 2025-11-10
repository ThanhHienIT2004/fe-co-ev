import React from "react";
import HeroBanner from "@/components/banner/HeroBanner";
import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";

// src/app/(guest)/layout.tsx
export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <HeroBanner />
            <main className="flex-grow">{children}</main>
            <Footer />
        </>
    );
}
