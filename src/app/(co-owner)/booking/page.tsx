"use client";

import { useState } from "react";

export default function BookNowPage() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    user_id: "",
    pickup: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu gửi đi:", formData);
    alert("Biểu mẫu đặt xe đã được gửi!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Đặt Xe Ngay</h1>
          <p className="text-gray-500 mt-2">
            Đặt xe trực tiếp từ nhà cung cấp đã được xác minh
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Ngày đi / ngày về */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ngày bắt đầu *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ngày kết thúc *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Giờ đi / giờ về */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giờ bắt đầu *
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giờ kết thúc *
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <input
                type="text"
                name="user_id"
                placeholder="Mã người dùng"
                value={formData.user_id}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <input
                type="text"
                name="pickup"
                placeholder="Địa điểm đón khách"
                value={formData.pickup}
                onChange={handleChange}
                className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Nút gửi */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#36b6cf] text-white font-semibold px-16 py-3 rounded-lg hover:bg-[#2ea3ba] transition-all"
            >
              Gửi yêu cầu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
