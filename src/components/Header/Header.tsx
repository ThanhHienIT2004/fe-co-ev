// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
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
  HandHelping,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Search,
  Moon,
  Sun,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "../../app/(auth)/component/AuthModal";
import NotificationBell from "./NotificationBell";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const pathname = usePathname();

  // === USER STATE ===
  const [user, setUser] = useState<{
    email: string | null;
    name: string | null;
    avatar: string | null;
  }>({ email: null, name: null, avatar: null });

  // === THEO DÕI localStorage THAY ĐỔI ===
  useEffect(() => {
    const updateUser = () => {
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("fullName") || (email ? email.split("@")[0] : null);
      const avatar = localStorage.getItem("avatar") || null;
      setUser({ email, name, avatar });
    };

    // Lần đầu
    updateUser();

    // Lắng nghe storage event (tab khác)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "email" || e.key === null) updateUser();
    };

    // Lắng nghe custom event (cùng tab)
    const handleCustom = () => updateUser();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("localStorageUpdated", handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("localStorageUpdated", handleCustom);
    };
  }, []);

  // === CẬP NHẬT THỜI GIAN MỖI GIÂY ===
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).replace("SA", "AM").replace("CH", "PM");
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // === DARK MODE ===
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // === ĐĂNG XUẤT ===
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("localStorageUpdated"));
    setUserMenuOpen(false);
    window.location.href = "/";
  };

  const navItems = [
    { href: "/", label: "Trang chủ", icon: Home },
    { href: "/vehicles", label: "Danh sách xe", icon: Car },
    { href: "/ownership-groups", label: "Nhóm đồng sở hữu", icon: Users },
    { href: "/booking", label: "Đặt lịch hẹn xe", icon: Calendar },
    { href: "/services-task", label: "Dịch vụ xe", icon: HandHelping },
    { href: "/about", label: "Về chúng tôi", icon: SquareMenu },
  ];

  return (
    <>
      {/* === HEADER === */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* LEFT: LOGO + NAV */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <Link href="/" className="flex items-center gap-2">
                <div
                  className="size-10 rounded-xl grid place-items-center font-black text-white shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
                  }}
                >
                  EV
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  EVSharing
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-1 ml-8">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all
                        ${isActive
                          ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <AnimatePresence>
                        {(isActive || open) && (
                          <motion.span
                            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                            animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                            className="overflow-hidden whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* RIGHT: SEARCH + NOTI + USER */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5 w-64">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Tìm xe, nhóm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-2 bg-transparent outline-none text-sm flex-1"
                />
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setNotiOpen(!notiOpen)}
                  className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                <NotificationBell user_id={user?.user_id} />
              </div>

              {/* === USER === */}
              {user.email ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="hidden md:block font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* === DROPDOWN VỚI USER INFO === */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 overflow-hidden"
                      >
                        <div className="p-4 border-b dark:border-gray-700 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
                          <div className="flex items-center gap-3 mb-2">
                            {user.avatar ? (
                              <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name?.[0]?.toUpperCase() || "U"}
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
                            </div>
                          </div>

                          <div className="mt-3 space-y-1 text-xs text-gray-700 dark:text-gray-300">
                            <div className="flex justify-between">
                              <span>Current time:</span>
                              <span className="font-medium">{currentTime} +07</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Country:</span>
                              <span className="font-medium">VN</span>
                            </div>
                          </div>
                        </div>

                        <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                          <User className="w-4 h-4" />
                          Hồ sơ
                        </Link>
                        <Link href="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Settings className="w-4 h-4" />
                          Cài đặt
                        </Link>
                        <div className="border-t dark:border-gray-700" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <LogOut className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Đăng nhập</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl z-50 md:hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};