"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAlerts } from "@/libs/hooks/useAlert";
import { useConflictOwner } from "@/libs/hooks/useConflictOwner";

export default function NotificationBell() {
  const [userId, setUserId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<number[]>([]);
  const [viewingId, setViewingId] = useState<number | null>(null); // ID đang xem chi tiết

  // Lấy userId từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userId");
    setUserId(stored ? Number(stored) : null);
  }, []);

  const { data: alerts } = useAlerts(userId ?? 0);
  const { conflicts } = useConflictOwner(userId ?? 0);
  const conflictList = conflicts || [];

  // Gộp notifications
  const notifications = [
    ...(alerts || []).map(a => ({
      type: "alert" as const,
      id: a.alert_id,
      message: a.message,
      created_at: a.created_at,
    })),
    ...(conflictList).map(c => ({
      type: "conflict" as const,
      id: c.conflict_id,
      message: c.description || "Có xung đột mới",
      created_at: c.created_at,
    })),
  ].filter(n => !dismissedIds.includes(n.id));

  const ref = useRef<HTMLDivElement>(null);

  // Click outside để đóng dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDismiss = (id: number) => {
    setDismissedIds(prev => [...prev, id]);
    if (viewingId === id) setViewingId(null);
  };

  const handleView = (id: number) => {
    setViewingId(prev => (prev === id ? null : id));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="relative p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setOpen(!open)}
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {open && notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border overflow-hidden"
          >
            <div className="p-3 border-b dark:border-gray-700">
              <h3 className="font-semibold">Thông báo</h3>
            </div>

            <div className="p-3 space-y-3 max-h-96 overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} className="border-b last:border-b-0">
                  <div className="flex justify-between items-start p-2">
                    <div>
                      <p className="text-sm font-medium">{n.message}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {n.type === "alert" ? "Alert" : "Conflict"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(n.id)}
                        className="text-xs px-2 py-1 bg-blue-200 hover:bg-blue-300 rounded"
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => handleDismiss(n.id)}
                        className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>

                  {/* Form chi tiết */}
                  {viewingId === n.id && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-b-md text-sm text-gray-700 dark:text-gray-200 space-y-1">
                      <p><span className="font-semibold">ID:</span> {n.id}</p>
                      <p><span className="font-semibold">Message:</span> {n.message}</p>
                      {n.created_at && <p><span className="font-semibold">Ngày tạo:</span> {new Date(n.created_at).toLocaleString()}</p>}
                      <p><span className="font-semibold">Loại:</span> {n.type}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
