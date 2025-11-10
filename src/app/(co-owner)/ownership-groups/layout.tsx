import HeroBanner from "@/components/banner/HeroBanner";
import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import React from "react";

export default function OwnerShipGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
}