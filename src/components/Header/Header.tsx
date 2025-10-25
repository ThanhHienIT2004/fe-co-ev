"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Users,
  Car,
  ChevronDown,
  Calendar,
  Home,
  UserCircle,
  SquareMenu,
  HandHelping
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Trang chủ", icon: Home },
    { href: "/vehicles", label: "Danh sách xe", icon: Car },
    { href: "/group", label: "Nhóm đồng sở hữu", icon: Users },
    { href: "/booking", label: "Đặt lịch hẹn xe", icon: Calendar },
    { href: "/services", label: "Dịch vụ xe", icon: HandHelping },
    { href: "/about", label: "Về chúng tôi", icon: SquareMenu },

  ];

  return (
    <div className="sticky top-0 z-20 w-full bg-gradient-to-tr from-black via-gray-600 to-gray-900 transition-all duration-140 text-white">
      <div
        className="mx-auto max-w-7xl px-4"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/90 hover:opacity-80 transition"
            >
              <div
                className="size-8 rounded-xl grid place-items-center font-bold"
                style={{
                  background:
                    "linear-gradient(to right, #B8C2FF 0%, #6183FF 100%)",
                }}
              >
                EV
              </div>
              <span className="text-lg font-semibold">EVSharing</span>
            </Link>

            {/* Navigation */}
            <nav className="ml-6 hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative inline-flex items-center rounded-full px-3 py-1 text-sm transition 
                      ${isActive ? "text-white" : "text-white/90 hover:bg-indigo-500/20"}`}
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(to right, #B8C2FF 0%, #6183FF 100%)",
                          }
                        : {}
                    }
                  >
                    <item.icon className="size-5 shrink-0" />
                    <AnimatePresence initial={false}>
                      {(isActive || open) && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden ml-2 whitespace-nowrap"
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
            {/* Notifications */}
            <button className="rounded-full bg-white/10 p-2 hover:bg-white/15">
              <Bell className="size-5" />
            </button>

            {/* User section (tĩnh) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-md text-sm font-medium text-white hover:bg-white/20 transition cursor-pointer">
              <UserCircle className="w-5 h-5 text-white/90" />
              Đăng nhập

              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
