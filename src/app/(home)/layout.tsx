import React from "react";
import HeroBanner from "@/components/banner/HeroBanner";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

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

