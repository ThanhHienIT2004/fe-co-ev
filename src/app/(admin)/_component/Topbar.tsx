"use client";

import { Bell, Search } from "lucide-react";

interface TopbarProps {
  sidebarWidth: number;
}

export default function Topbar({ sidebarWidth }: TopbarProps) {
  return (
    <header
      className="fixed top-0 bg-white shadow-sm h-16 flex items-center justify-between px-6 z-40 transition-all duration-300"
      style={{
        left: `${sidebarWidth}px`,
        right: 0,
      }}
    >
      <div className="flex items-center space-x-3">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="border-none focus:ring-0 outline-none text-sm w-64"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-1 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin"
            className="w-8 h-8 rounded-full ring-2 ring-teal-500"
          />
          <span className="text-sm font-semibold text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}