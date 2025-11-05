"use client";

import React, { useState } from "react";
import { Search, Trash2, Edit } from "lucide-react";

type Booking = {
  booking_id: string;
  user_name: string;
  vehicle_name: string;
  booking_status: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  cancel_reason?: string;
};

// Dữ liệu mẫu
const mockBookings: Booking[] = [
  {
    booking_id: "BK001",
    user_name: "Nguyễn Văn A",
    vehicle_name: "Toyota Camry 2.5Q",
    booking_status: "Đang xử lý",
    booking_date: "2025-10-28",
    start_time: "08:00",
    end_time: "17:00",
    created_at: "2025-10-20",
    updated_at: "2025-10-21",
  },
  {
    booking_id: "BK002",
    user_name: "Trần Thị B",
    vehicle_name: "Honda CR-V 1.5 Turbo",
    booking_status: "Đã xác nhận",
    booking_date: "2025-11-01",
    start_time: "09:00",
    end_time: "18:00",
    created_at: "2025-10-25",
    updated_at: "2025-10-29",
  },
  {
    booking_id: "BK003",
    user_name: "Lê Văn C",
    vehicle_name: "Ford Ranger Wildtrak",
    booking_status: "Đã hủy",
    booking_date: "2025-11-03",
    start_time: "07:30",
    end_time: "16:00",
    created_at: "2025-10-26",
    updated_at: "2025-10-30",
    cancel_reason: "Khách hàng đổi kế hoạch",
  },
];

export default function BookingListPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = mockBookings.filter(
    (b) =>
      b.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vehicle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.booking_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Quản lý Booking
        </h1>

        <div className="relative w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm booking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Booking ID</th>
              <th className="px-6 py-3">Khách hàng</th>
              <th className="px-6 py-3">Phương tiện</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Ngày thuê</th>
              <th className="px-6 py-3">Bắt đầu</th>
              <th className="px-6 py-3">Kết thúc</th>
              <th className="px-6 py-3">Ngày tạo</th>
              <th className="px-6 py-3">Cập nhật</th>
              <th className="px-6 py-3">Lý do hủy</th>
              <th className="px-6 py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr
                key={b.booking_id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-900">
                  #{b.booking_id}
                </td>
                <td className="px-6 py-3">{b.user_name}</td>
                <td className="px-6 py-3">{b.vehicle_name}</td>
                <td
                  className={`px-6 py-3 font-medium ${
                    b.booking_status === "Đã hủy"
                      ? "text-red-500"
                      : b.booking_status === "Đã xác nhận"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  {b.booking_status}
                </td>
                <td className="px-6 py-3">{b.booking_date}</td>
                <td className="px-6 py-3">{b.start_time}</td>
                <td className="px-6 py-3">{b.end_time}</td>
                <td className="px-6 py-3">{b.created_at}</td>
                <td className="px-6 py-3">{b.updated_at}</td>
                <td className="px-6 py-3 text-gray-500">
                  {b.cancel_reason || "-"}
                </td>
                <td className="px-6 py-3 flex items-center gap-2 justify-center">
                  <button className="p-1.5 rounded hover:bg-gray-100 text-blue-500">
                    <Edit size={18} />
                  </button>
                  <button className="p-1.5 rounded hover:bg-gray-100 text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  className="text-center py-8 text-gray-400 italic"
                >
                  Không tìm thấy kết quả phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
