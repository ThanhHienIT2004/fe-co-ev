"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Car } from "lucide-react";

interface VehicleTimelineDay {
  date: string;
  status: "available" | "used";
}

interface VehicleTimeline {
  vehicle_id: number;
  vehicle_name: string;
  timeline: VehicleTimelineDay[];
}

/* =============================
   🟢 Format ngày LOCAL (không UTC)
   ============================= */
function formatLocalDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/* =======================================
   🟢 Lấy thứ Hai của tuần hiện tại (timezone chuẩn)
   ======================================= */
function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay(); // 0 = CN, 1 = Thứ 2
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export default function VehiclesSchedulePage() {
  const [vehicles, setVehicles] = useState<VehicleTimeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =============================
     🟢 currentWeekStart luôn đúng timezone
     ============================= */
  const [currentWeekStart, setCurrentWeekStart] = useState(() => getMonday(new Date()));

  /* =============================
     🟢 Tính 7 ngày của tuần hiện tại (không lệch)
     ============================= */
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + i);

    return {
      date: formatLocalDate(d),
      label: d.toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      full: d.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  });

  /* =============================
     🟢 Fetch API theo local date (KHÔNG UTC)
     ============================= */
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError("");

      try {
        const startDate = formatLocalDate(currentWeekStart);

        const res = await fetch(
          `http://localhost:8085/booking/vehicles/timeline?startDate=${startDate}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Không thể tải dữ liệu xe");

        const data = await res.json();
        setVehicles(data.vehicles || []);
      } catch {
        setError("Lỗi kết nối server. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [currentWeekStart]);

  /* =============================
     🟢 Chuyển tuần
     ============================= */
  const prevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(getMonday(prev));
  };

  const nextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(getMonday(next));
  };

  /* =============================
     🟢 Kết hợp dữ liệu xe + ngày trong tuần
     ============================= */
  const schedule = weekDays.map((day) => ({
    ...day,
    vehicles: vehicles.map((v) => {
      const status = v.timeline.find((t) => t.date === day.date)?.status || "available";
      return { name: v.vehicle_name, status };
    }),
  }));

  /* =============================
     🟢 UI Render
     ============================= */
  return (
    <div className="min-h-screen bg-teal-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-teal-700 tracking-tight mb-3">
            Lịch Xe Điện Trong Tuần
          </h1>
          <p className="text-teal-600 text-lg">Theo dõi tình trạng xe theo từng ngày</p>
        </motion.div>

        {/* Week Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <button
            onClick={prevWeek}
            className="group flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-teal-100"
          >
            <ChevronLeft className="w-5 h-5 text-teal-600 group-hover:-translate-x-1 transition" />
            <span className="font-semibold text-teal-700">Tuần trước</span>
          </button>

          <div className="text-center">
            <p className="text-xl font-bold text-teal-700">
              {weekDays[0].label} → {weekDays[6].label}
            </p>
            <p className="text-sm text-gray-600">
              {weekDays[0].full.split(", ")[1]} - {weekDays[6].full.split(", ")[1]}
            </p>
          </div>

          <button
            onClick={nextWeek}
            className="group flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-teal-100"
          >
            <span className="font-semibold text-teal-700">Tuần sau</span>
            <ChevronRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
            <p className="mt-4 text-lg text-teal-600 font-medium">Đang tải lịch xe...</p>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-200">
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && vehicles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
            <Car className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">Chưa có xe nào được đăng ký</p>
          </div>
        )}

        {/* Schedule Grid */}
        {!loading && !error && vehicles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 lg:gap-6">
            {schedule.map((day, dayIdx) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIdx * 0.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Day Header */}
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 text-center">
                  <p className="text-xs font-light opacity-90">
                    {dayIdx + 2 === 8 ? "CN" : `Thứ ${dayIdx + 2}`}
                  </p>
                  <p className="text-2xl font-bold">{day.date.slice(8)}</p>
                  <p className="text-xs font-medium mt-1">{day.label.split(" ")[0]}</p>
                </div>

                {/* Vehicles List */}
                <div className="p-3 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {day.vehicles.map((v, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: dayIdx * 0.05 + idx * 0.02 }}
                        className={`p-3 rounded-xl text-center font-semibold text-sm transition-all ${
                          v.status === "used"
                            ? "bg-red-100 text-red-700 border border-red-200 shadow-sm"
                            : "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Car className="w-4 h-4" />
                          <span>{v.name}</span>
                        </div>
                        <p className="text-xs font-medium mt-1 opacity-90">
                          {v.status === "used" ? "Đã đặt" : "Còn trống"}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
