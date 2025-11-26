"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Notification = {
  type: "alert" | "conflict" | "usage";
  id: number;
  message: string;
  created_at: string;
};

export default function NotificationBell() {
  const [userId, setUserId] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<number[]>([]);
  const [viewingId, setViewingId] = useState<number | null>(null);

  // --- Lấy userId từ localStorage ---
  useEffect(() => {
    const stored = localStorage.getItem("userId");
    setUserId(stored ? Number(stored) : null);
  }, []);

  // --- Fetch notifications 1 lần ---
 useEffect(() => {
    if (userId === null) return;

    let cancelled = false;

    async function fetchNotifications() {
      try {
        const [alertsRes, conflictsRes, usageRes] = await Promise.all([
          fetch(`http://localhost:8085/booking/alerts/user/${userId}`),
          fetch(`http://localhost:8085/booking/conflict-log/user_id/${userId}`),
          fetch(`http://localhost:8085/booking/usage/get-all?user_id=${userId}`)
        ]);

        const alertsData = await alertsRes.json();
        const conflictsData = await conflictsRes.json();
        const conflictsArray = Array.isArray(conflictsData) ? conflictsData : conflictsData.data || [];

        const usageData = await usageRes.json();
        const usageArray = Array.isArray(usageData) ? usageData : [];

        // 👉 Lấy 1 usage mới nhất (nếu có)
        let latestUsage = null;
        if (usageArray.length > 0) {
          latestUsage = usageArray.reduce((prev, current) =>
            new Date(prev.record_time) > new Date(current.record_time) ? prev : current
          );
        }

        if (!cancelled) {
          let merged: Notification[] = [
            ...alertsData.map((a: any) => ({
              type: "alert",
              id: a.alert_id,
              message: a.message,
              created_at: a.created_at
            })),
            ...conflictsArray.map((c: any) => ({
              type: "conflict",
              id: c.conflict_id,
              message: c.description || "Có xung đột mới",
              created_at: c.created_at
            }))
          ];

          // 👉 Thêm thông báo usage nếu có dữ liệu
          if (latestUsage) {
            merged.push({
              type: "usage",
              id: latestUsage.usage_id,
              message: `Phiên sử dụng xe của bạn đã được tạo từ ${latestUsage.start_date} đến ${latestUsage.end_date}`,
              created_at: latestUsage.record_time
            });
          }

          setNotifications(merged);
        }

      } catch (err) {
        console.error(err);
      }
    }

    fetchNotifications();
    return () => { cancelled = true };
  }, [userId]);

  // --- Lọc notifications chưa dismissed ---
  const activeNotifications = notifications.filter(n => !dismissedIds.includes(n.id));

  // --- Lấy notification mới nhất ---
  const latestNotification = activeNotifications.length
    ? [activeNotifications.reduce((prev, current) =>
        new Date(prev.created_at) > new Date(current.created_at) ? prev : current
      )]
    : [];

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
        {latestNotification.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {open && latestNotification.length > 0 && (
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
              {latestNotification.map(n => {
              const baseStyle =
                "p-2 rounded-lg border mb-2 transition-colors";

              const typeStyle =
                n.type === "alert"
                  ? "bg-yellow-50 border-yellow-200"
                  : n.type === "conflict"
                  ? "bg-red-50 border-red-200"
                  : "bg-gradient-to-r from-teal-500 to-cyan-500 border-none text-white shadow-md"; // usage highlight

              const buttonStyle =
                n.type === "usage"
                  ? "bg-white/20 hover:bg-white/30 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700";

              return (
                <div key={n.id} className={`${baseStyle} ${typeStyle}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold">{n.message}</p>
                      <p className={`text-xs mt-0.5 ${
                        n.type === "usage" ? "text-white/80" : "text-gray-500"
                      }`}>
                        {n.type === "alert"
                          ? "Alert"
                          : n.type === "conflict"
                          ? "Conflict"
                          : "Usage"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(n.id)}
                        className={`text-xs px-2 py-1 rounded ${buttonStyle}`}
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => handleDismiss(n.id)}
                        className={`text-xs px-2 py-1 rounded ${
                          n.type === "usage"
                            ? "bg-white/20 hover:bg-white/30 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>

                  {viewingId === n.id && (
                    <div
                      className={`mt-2 p-3 rounded-lg text-sm ${
                        n.type === "usage"
                          ? "bg-white/10 text-white"
                          : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <p><span className="font-semibold">ID:</span> {n.id}</p>
                      <p><span className="font-semibold">Message:</span> {n.message}</p>
                      {n.created_at && (
                        <p>
                          <span className="font-semibold">Ngày tạo:</span>{" "}
                          {new Date(n.created_at).toLocaleString()}
                        </p>
                      )}
                      <p><span className="font-semibold">Loại:</span> {n.type}</p>
                    </div>
                  )}
                </div>
              );
            })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
