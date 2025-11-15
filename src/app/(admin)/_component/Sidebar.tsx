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
  FileText, 
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [showText, setShowText] = useState(false);


  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setShowText(true), 150);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [open]);

  const menuItems = [
    { href: "/admin-dashboard", label: "Dashboard", icon: Home },
    { href: "/users", label: "Người dùng", icon: User },
    { href: "/profiles", label: "Hồ sơ", icon: FileText }, 
    { href: "/vehicles-manage", label: "Xe điện", icon: Car },
    { href: "/ownership-groups-manage", label: "Nhóm đồng sở hữu", icon: Users },
    { href: "/appointments", label: "Đặt lịch hẹn", icon: Calendar },
    { href: "/service-tasks-manage", label: "Dịch vụ", icon: HandHelping },
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
      initial={{ width: 60 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-white border-r shadow-lg flex flex-col z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b">
        <div className="text-xl font-black text-teal-600 tracking-tight">
          {open ? "EVSharing" : "EV"}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center p-2 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-teal-100 text-teal-700 font-semibold shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-teal-600"
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
                    className="ml-3 whitespace-nowrap text-sm font-medium"
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