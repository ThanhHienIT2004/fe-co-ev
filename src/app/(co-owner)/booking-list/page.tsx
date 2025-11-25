"use client";

import React, { useEffect, useState } from "react";
import { useBookings } from "@/libs/hooks/useBooking";
import { BookingStatus } from "@/types/booking.type";
import { Loader2 } from "lucide-react";

export default function BookingOwnerPage() {
  const [userId, setUserId] = useState<number | null>(null);

  // 🔐 Lấy user_id từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userId");
    setUserId(stored ? Number(stored) : null);
  }, []);

  // ❗ Chỉ gọi hook nếu userId đã có
  const { bookings, isLoading, error } = useBookings(userId ?? 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Booking của bạn</h1>

      {/* Loading nếu chưa load userId */}
      {userId === null && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" size={24} />
        </div>
      )}

      {/* Loading khi fetch booking */}
      {userId !== null && isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" size={24} />
        </div>
      )}

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <p className="text-red-500 text-center py-6">
          Lỗi tải dữ liệu: {(error as unknown as Error).message}
        </p>
      )}

      {/* Không có booking */}
      {userId !== null && !isLoading && !error && bookings.length === 0 && (
        <p className="text-gray-500 text-center py-6">Bạn chưa có booking nào</p>
      )}

      {/* Hiển thị bảng booking */}
      {userId !== null && !isLoading && !error && bookings.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl p-4">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">ID Booking</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Vehicle</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Ngày bắt đầu</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Ngày kết thúc</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.booking_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{booking.booking_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{booking.vehicle_id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {booking.booking_status === BookingStatus.APPROVED ? (
                        <span className="text-green-600 font-medium">Approved</span>
                    ) : booking.booking_status === BookingStatus.PENDING ? (
                        <span className="text-yellow-500 font-medium">Pending</span>
                    ) : (
                        <span className="text-red-500 font-medium">{booking.booking_status}</span>
                    )}
                    </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(booking.start_date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(booking.end_date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
