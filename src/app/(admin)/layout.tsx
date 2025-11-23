"use client";

import React, { useState } from "react";
import Topbar from "./_component/Topbar";
import Sidebar from "./_component/Sidebar";
import ProtectedLayout from "./protectedLayout";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = sidebarOpen ? 200 : 60;

  return (
    <ProtectedLayout>
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Topbar sidebarWidth={sidebarWidth} />
        <main className="flex-1 overflow-y-auto pt-16 p-6">
          {children}
        </main>
      </div>
    </div>
    </ProtectedLayout>
  );
}