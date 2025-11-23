import HeroBanner from "@/components/Banner/HeroBanner";
import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
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