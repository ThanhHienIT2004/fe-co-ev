// components/Topbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, Search, ChevronDown, User, Settings, File, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationBell from "@/components/Header/NotificationBell";

interface TopbarProps {
  sidebarWidth: number;
}

export default function Topbar({ sidebarWidth }: TopbarProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lấy email từ localStorage khi mount
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) setUserEmail(email);
  }, []);

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    setUserEmail(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 bg-white dark:bg-gray-900 shadow-sm h-16 flex items-center justify-between px-6 z-40 transition-all duration-300 border-b border-gray-100 dark:border-gray-800"
      style={{
        left: `${sidebarWidth}px`,
        right: 0,
      }}
    >
      {/* Thanh tìm kiếm */}
      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-full px-4 py-2.5 w-80 border border-gray-200 dark:border-gray-700">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Tìm kiếm nhóm, xe, hợp đồng..."
          className="bg-transparent border-none focus:ring-0 outline-none text-sm flex-1"
        />
      </div>

      {/* Bên phải: Thông báo + Avatar + Dropdown */}
      <div className="flex items-center gap-4">
        {/* Thông báo */}
        <NotificationBell />

        {/* User Dropdown */}
        {userEmail ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              {/* Avatar chữ cái đầu */}
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {userEmail[0].toUpperCase()}
              </div>

              {/* Email */}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-40 truncate">
                {userEmail}
              </span>

              {/* Mũi tên */}
              <ChevronDown
                className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Đã đăng nhập với</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{userEmail}</p>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/50 transition"
                    >
                      <User className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
                      <span className="font-medium">Trang cá nhân</span>
                    </Link>

                    <Link
                      href="/e-contracts"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/50 transition"
                    >
                      <File className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
                      <span className="font-medium">Hợp đồng điện tử</span>
                    </Link>

                    <Link
                      href="/profile/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/50 transition"
                    >
                      <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium">Cài đặt tài khoản</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium"
                    >
                      <LogOut className="w-5 h-5" />
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Trường hợp chưa đăng nhập (hiếm khi xảy ra trong dashboard) */
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Chưa đăng nhập</span>
          </div>
        )}
      </div>
    </header>
  );
}