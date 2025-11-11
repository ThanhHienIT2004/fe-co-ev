import React from "react";
import HeroBanner from "@/components/Banner/HeroBanner";
import { Header } from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

// src/app/(guest)/layout.tsx
export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <HeroBanner />
            <main className="grow">{children}</main>
            <Footer />
        </>
    );
}
