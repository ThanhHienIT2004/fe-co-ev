import React from "react";
import HeroBanner from "@/components/Banner/HeroBanner";
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

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

