"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  Users,
  Car,
  ChevronDown,
  Calendar,
  Home,
  UserCircle,
  SquareMenu,
  HandHelping,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "../../app/(auth)/component/AuthModal";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const { data: session } = useSession();
  const userName = session?.user?.name || null;

  const navItems = [
    { href: "/", label: "Trang chủ", icon: Home },
    { href: "/vehicles", label: "Danh sách xe", icon: Car },
    { href: "/ownership-groups", label: "Nhóm đồng sở hữu", icon: Users },
    { href: "/booking", label: "Đặt lịch hẹn xe", icon: Calendar },
    { href: "/services-task", label: "Dịch vụ xe", icon: HandHelping },
    { href: "/about", label: "Về chúng tôi", icon: SquareMenu },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-teal-50 shadow-md border-b border-gray-100 transition-all duration-300">
      <div
        className="mx-auto max-w-7xl px-4"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex h-14 items-center justify-between">
          {/* Logo + Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-teal-600 hover:opacity-80 transition"
            >
              <div
                className="size-9 rounded-xl grid place-items-center font-black text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
                }}
              >
                EV
              </div>
              <span className="text-xl font-bold tracking-tight">EVSharing</span>
            </Link>

            {/* Navigation */}
            <nav className="ml-8 hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300
                      ${isActive 
                        ? "bg-linear-to-r from-teal-500 to-cyan-500 text-white shadow-md" 
                        : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-teal-600"}`} />
                    <AnimatePresence initial={false}>
                      {(isActive || open) && (
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

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-linear-to-r from-teal-500 to-cyan-500 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User section */}
            {userName ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <UserCircle className="w-5 h-5" />
                  <span>{userName}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 text-teal-600" />
                        Hồ sơ
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 text-teal-600" />
                        Cài đặt
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 transition w-full text-left"
                      >
                        <LogOut className="w-4 h-4 text-teal-600" />
                        Đăng xuất
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <UserCircle className="w-5 h-5" />
                <span>Đăng nhập</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal đăng nhập */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};
