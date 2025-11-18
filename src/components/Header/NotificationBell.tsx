"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAlerts } from "@/libs/hooks/useAlert";

export default function NotificationBell() {
  const [userId, setUserId] = useState<number | null>(null);

  // 🔐 Lấy userId từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userId");
    setUserId(stored ? Number(stored) : null);
  }, []);

  // Nếu chưa load userId → không gọi API
  const { data: alerts } = useAlerts(userId ?? 0);

  const latest = alerts && alerts.length > 0 ? alerts[0] : null;
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (dismissed || !latest || userId === null) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        className="relative p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setOpen(!open)}
      >
        <Bell size={24} />

        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border overflow-hidden"
          >
            <div className="p-3 border-b dark:border-gray-700">
              <h3 className="font-semibold">Thông báo</h3>
            </div>

            <div className="p-3">
              <p className="text-sm font-medium">{latest.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(latest.created_at).toLocaleString()}
              </p>

              <button
                onClick={() => setDismissed(true)}
                className="mt-3 text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Xóa thông báo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
