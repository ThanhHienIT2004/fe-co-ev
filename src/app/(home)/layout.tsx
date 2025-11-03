import React from "react";
import HeroBanner from "@/components/Banner/HeroBanner";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeroBanner />
            <main className="flex-grow">{children}</main>
        </>
    );
}