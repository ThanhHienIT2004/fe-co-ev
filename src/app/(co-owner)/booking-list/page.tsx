"use client";

import React, { useEffect, useState } from "react";
import { useBookings } from "@/libs/hooks/useBooking";
import { BookingStatus } from "@/types/booking.type";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Calendar, Car, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

export default function BookingOwnerPage() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    setUserId(stored ? Number(stored) : null);
  }, []);

  const { bookings, isLoading, error } = useBookings(userId ?? 0);

  const getStatusConfig = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.APPROVED:
        return { label: "Đã duyệt", color: "emerald", icon: CheckCircle2 };
      case BookingStatus.PENDING:
        return { label: "Chờ duyệt", color: "amber", icon: AlertCircle };
      case BookingStatus.REJECTED:
        return { label: "Bị từ chối", color: "red", icon: XCircle };
      case BookingStatus.CANCELLED:
        return { label: "Đã hủy", color: "gray", icon: XCircle };
      default:
        return { label: status, color: "slate", icon: AlertCircle };
    }
  };

  return (
    <div className="min-h-screen bg-teal-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-teal-700 tracking-tight mb-3">
            Lịch Sử Đặt Xe Của Bạn
          </h1>
          <p className="text-teal-600 text-lg">Quản lý và theo dõi tất cả booking</p>
        </motion.div>

        {/* Chưa có userId */}
        {userId === null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-teal-500" />
            <p className="mt-4 text-lg text-gray-600">Đang xác thực tài khoản...</p>
          </motion.div>
        )}

        {/* Loading */}
        {userId !== null && isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-teal-500" />
            <p className="mt-4 text-lg text-teal-600 font-medium">Đang tải booking của bạn...</p>
          </motion.div>
        )}

        {/* Lỗi */}
        {error && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
          >
            <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <p className="text-red-600 text-xl font-semibold">
              Không thể tải dữ liệu booking
            </p>
            <p className="text-red-500 mt-2">Vui lòng thử lại sau</p>
          </motion.div>
        )}

        {/* Không có booking */}
        {userId !== null && !isLoading && !error && bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center"
          >
            <Car className="mx-auto h-20 w-20 text-gray-300 mb-6" />
            <p className="text-xl font-semibold text-gray-600">
              Bạn chưa đặt xe lần nào
            </p>
            <p className="text-gray-500 mt-2">
              Khám phá danh sách xe và đặt ngay hôm nay!
            </p>
          </motion.div>
        )}

        {/* Danh sách booking - dạng Card đẹp */}
        {userId !== null && !isLoading && !error && bookings.length > 0 && (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking, idx) => {
              const status = getStatusConfig(booking.booking_status);
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={booking.booking_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  {/* Header với màu trạng thái */}
                  <div className={`h-2 bg-gradient-to-r from-${status.color}-500 to-${status.color}-600`} />

                  <div className="p-6">
                    {/* ID + Trạng thái */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Booking ID</p>
                        <p className="text-lg font-bold text-teal-700 font-mono">
                          #{booking.booking_id}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-${status.color}-100 text-${status.color}-700`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-bold">{status.label}</span>
                      </div>
                    </div>

                    {/* Xe */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                      <div className="p-3 bg-teal-100 rounded-xl">
                        <Car className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Xe đã đặt</p>
                        <p className="font-bold text-gray-800">Xe ID: {booking.vehicle_id}</p>
                      </div>
                    </div>

                    {/* Thời gian */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-teal-600" />
                        <div>
                          <p className="text-xs text-gray-500">Bắt đầu</p>
                          <p className="font-semibold text-gray-800">
                            {new Date(booking.start_date).toLocaleString("vi-VN", {
                              weekday: "short",
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-cyan-600" />
                        <div>
                          <p className="text-xs text-gray-500">Kết thúc</p>
                          <p className="font-semibold text-gray-800">
                            {new Date(booking.end_date).toLocaleString("vi-VN", {
                              weekday: "short",
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
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