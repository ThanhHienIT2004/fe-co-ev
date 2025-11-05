import React from "react";
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import HeroBanner from "@/components/banner/HeroBanner";

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
