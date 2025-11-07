"use client";

import React, { useState } from "react";
import Topbar from "./_component/Topbar";
import Sidebar from "./_component/Sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = sidebarOpen ? 200 : 60;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Area */}
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {/* Topbar - nhận width từ sidebar */}
        <Topbar sidebarWidth={sidebarWidth} />

        {/* Content - bắt đầu từ dưới Topbar */}
        <main className="flex-1 overflow-y-auto pt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}