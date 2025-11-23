import HeroBanner from "@/components/Banner/HeroBanner";
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import React from "react";

export default function HistoryPage({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
}