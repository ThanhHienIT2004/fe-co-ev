import Topbar from "@/app/(admin)/_component/Topbar";
import Footer from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import React from "react";

export default function eContractsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header/>
            <main>{children}</main>
            {/* <ToastContainer position="top-right" autoClose={3000} theme="colored" /> */}
            <Footer/>
        </div>
    );
}
