"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Users,
  Calendar,
  Home,
  UserCircle,
  History,
  HandHelping,
  Settings,
  LogOut,
  User,
  CircleDollarSign,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "@/app/(auth)/component/AuthModal";
import NotificationBell from "./NotificationBell";

export const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // 🔐 Lấy email từ localStorage
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) setUserEmail(email);
  }, []);

  // Khi login thành công
  const handleLoginSuccess = () => {
    const email = localStorage.getItem("email");
    setUserEmail(email);
    setAuthOpen(false);
  };

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    setUserEmail(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  // Click outside để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { href: "/", label: "Trang chủ", icon: Home },
    { href: "/ownership-groups", label: "Nhóm đồng sở hữu", icon: Users },
    { href: "/booking", label: "Đặt lịch hẹn xe", icon: Calendar },
    { href: "/group-funds", label: "Chi phí", icon: CircleDollarSign },
    { href: "/services", label: "Dịch vụ xe", icon: HandHelping },
    { href: "/history", label: "Lịch sử", icon: History },
    { href: "/about", label: "Về chúng tôi", icon: Home },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-teal-50 shadow-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="flex h-14 items-center justify-between">
          {/* Logo + Nav */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-teal-600 hover:opacity-80 transition">
              <div
                className="size-9 rounded-xl grid place-items-center font-black text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)" }}
              >
                EV
              </div>
              <span className="text-xl font-bold tracking-tight">EVSharing</span>
            </Link>

            <nav className="ml-8 hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const isHoveredOrActive = hoveredItem === item.href || isActive;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`group relative flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-teal-100 hover:text-teal-600"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-teal-600"}`} />

                    <AnimatePresence>
                      {isHoveredOrActive && (
                        <motion.span
                          initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                          animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                          exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Nếu user đã login */}
            {/* 🔔 Notification Bell REAL */}
                  <NotificationBell />
            {userEmail ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {userEmail[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-40 truncate">
                    {userEmail}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 transition"
                        >
                          <User className="w-5 h-5 text-teal-600" />
                          <span className="font-medium">Trang cá nhân</span>
                        </Link>

                        <Link
                          href="/profile/settings"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 transition"
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span>Cài đặt</span>
                        </Link>

                        <hr className="my-2 border-gray-100" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Đăng xuất</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Chưa đăng nhập
              <button
                onClick={() => setAuthOpen(true)}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <UserCircle className="w-5 h-5" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};