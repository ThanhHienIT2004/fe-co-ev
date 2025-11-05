import HeroBanner from "@/components/banner/HeroBanner";
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import React from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header/>
            <HeroBanner />
            <main>{children}</main>
            <Footer/>
        </div>
    );
}