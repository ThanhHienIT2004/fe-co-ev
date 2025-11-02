import { Header } from "@/components/Header/Header";
import React from "react";
import Topbar from "./_component/Topbar";
import Sidebar from "./_component/Sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
    <Topbar />
      <Sidebar />
        <main>{children}</main>
            {/* <ToastContainer position="top-right" autoClose={3000} theme="colored" /> */}
        </div>
    );
}
