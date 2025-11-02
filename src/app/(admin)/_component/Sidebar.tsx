"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Users,
  BarChart,
  Settings,
  Car,
  User,
  Calendar,
  ReceiptText,
  Flame,
  CreditCard,
  CircleDollarSign,
  HandHelping,
  Vote,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  // Khi open thay đổi, delay hiển thị text một chút cho mượt
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setShowText(true), 200); // chờ sidebar mở xong
      return () => clearTimeout(timer);
    } else {
      setShowText(false); // ẩn ngay khi thu gọn
    }
  }, [open]);

  const menuItems = [
    { href: "/admin-dashboard", label: "Dashboard", icon: Home },
    { href: "/users", label: "Người dùng", icon: User },
    { href: "/vehicles", label: "Xe điện", icon: Car },
    { href: "/groups", label: "Nhóm đồng sở hữu", icon: Users },
    { href: "/appointments", label: "Đặt lịch hẹn", icon: Calendar },
    { href: "/services", label: "Dịch vụ", icon: HandHelping },
    { href: "/contracts", label: "Hợp đồng", icon: ReceiptText },
    { href: "/conflicts", label: "Xung đột", icon: Flame },
    { href: "/fees", label: "Chi phí dịch vụ", icon: CircleDollarSign },
    { href: "/payments", label: "Thanh toán", icon: CreditCard },
    { href: "/votes", label: "Bỏ phiếu", icon: Vote },
    { href: "/reports", label: "Báo cáo", icon: BarChart },
    { href: "/settings", label: "Cài đặt", icon: Settings },
  ];

  return (
    <motion.aside
      animate={{ width: open ? 200 : 60 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-white border-r shadow-sm flex flex-col"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Header */} 
      <div className="p-4 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">
          {open ? "EVSharing ADMIN" : "EV"}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {showText && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}
