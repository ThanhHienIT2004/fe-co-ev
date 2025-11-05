import HeroBanner from "@/components/banner/HeroBanner";
import Footer from "@/components/footer/Footer";
import { Header } from "@/components/Header/Header";
import React from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
}