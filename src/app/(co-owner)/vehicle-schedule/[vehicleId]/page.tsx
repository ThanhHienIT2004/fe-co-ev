"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Car, CalendarPlus } from "lucide-react";
import Link from "next/link";

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
   🟢 Format ngày LOCAL
   ============================= */
function formatLocalDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/* =============================
   🟢 Lấy thứ Hai của tuần
   ============================= */
function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export default function VehicleSchedulePage() {
  const params = useParams();
  const vehicleId = Number(params.vehicleId);

  const [vehicle, setVehicle] = useState<VehicleTimeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getMonday(new Date())
  );

  /* =============================
     🟢 Tính 7 ngày của tuần hiện tại
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
    };
  });

  /* =============================
     🟢 Fetch timeline 1 xe
     ============================= */
  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      setError("");

      try {
        const startDate = formatLocalDate(currentWeekStart);

        const res = await fetch(
          `http://localhost:8085/booking/vehicles/${vehicleId}/timeline?startDate=${startDate}`
        );

        if (!res.ok) throw new Error("Không thể tải dữ liệu timeline");

        setVehicle(await res.json());
      } catch {
        setError("Lỗi kết nối server. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [currentWeekStart, vehicleId]);

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

  return (
    <div className="min-h-screen bg-teal-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* ==========================
            ⭐ HEADER + NÚT ĐẶT LỊCH
           ========================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-teal-700">
            Lịch Xe Điện
          </h1>

          {vehicle && (
            <p className="text-teal-600 text-xl mt-2 font-semibold flex items-center gap-3">
              🚗 Xe: {vehicle.vehicle_name}
            </p>
          )}

          {/* NÚT ĐẶT LỊCH */}
          {vehicle && (
            <Link
              href={`/booking/${vehicle.vehicle_id}`}
              className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-xl font-bold 
                         shadow-lg hover:bg-teal-700 hover:shadow-xl transition 
                         flex items-center gap-2 text-lg"
            >
              <CalendarPlus className="w-5 h-5" />
              Đặt lịch ngay
            </Link>
          )}
        </motion.div>

        {/* ==========================
            ⭐ Điều hướng tuần
           ========================== */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={prevWeek}
            className="flex items-center gap-2 px-5 py-3 
                       bg-white rounded-xl shadow-md hover:shadow-lg 
                       transition border border-teal-100"
          >
            <ChevronLeft className="w-5 h-5 text-teal-600" />
            <span className="font-semibold text-teal-700">Tuần trước</span>
          </button>

          <p className="text-xl font-bold text-teal-700">
            {weekDays[0].label} → {weekDays[6].label}
          </p>

          <button
            onClick={nextWeek}
            className="flex items-center gap-2 px-5 py-3 
                       bg-white rounded-xl shadow-md hover:shadow-lg 
                       transition border border-teal-100"
          >
            <span className="font-semibold text-teal-700">Tuần sau</span>
            <ChevronRight className="w-5 h-5 text-teal-600" />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-lg text-teal-600">Đang tải...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 bg-red-50 rounded-xl border border-red-200">
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          </div>
        )}

        {/* ==========================
            ⭐ TIMELINE
           ========================== */}
        {!loading && !error && vehicle && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
            {weekDays.map((day, i) => {
              const status =
                vehicle.timeline.find((t) => t.date === day.date)?.status ??
                "available";

              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  {/* Day Header */}
                  <div className="bg-teal-600 text-white p-4 text-center">
                    <p className="text-sm font-semibold opacity-90">
                      {i + 2 === 8 ? "CN" : `Thứ ${i + 2}`}
                    </p>
                    <p className="text-3xl font-extrabold">{day.date.slice(8)}</p>
                  </div>

                  {/* Status */}
                  <div className="p-5 text-center">
                    <div
                      className={`p-4 rounded-xl font-semibold text-lg flex flex-col items-center 
                                 ${
                                   status === "used"
                                     ? "bg-red-100 text-red-700"
                                     : "bg-emerald-100 text-emerald-700"
                                 }`}
                    >
                      <Car className="w-6 h-6 mb-2" />
                      {status === "used" ? "Đã đặt" : "Còn trống"}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
