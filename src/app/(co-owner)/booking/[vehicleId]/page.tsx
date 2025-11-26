"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { bookingApi } from "@/libs/apis/booking";
import { CreateBookingDto } from "@/types/booking.type";

export default function BookNowPage() {
  const params = useParams();
  const vehicleIdParam = params?.vehicleId;
  const vehicleId = Array.isArray(vehicleIdParam)
    ? Number(vehicleIdParam[0])
    : Number(vehicleIdParam || 0);

  // --- UserId từ localStorage ---
  const [userId, setUserId] = useState<number | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) {
      const id = Number(stored);
      setUserId(isNaN(id) ? null : id);
    }
    setLoadingUser(false);
  }, []);

  // --- Available / Used days ---
  const [availableDays, setAvailableDays] = useState<number | null>(null);
  const [usedDays, setUsedDays] = useState<number | null>(null);
  const [loadingDays, setLoadingDays] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!userId || !vehicleId) return;

    const fetchDays = async () => {
      try {
        setLoadingDays(true);

        // Lấy available days
        const res1 = await fetch(
          `http://localhost:8085/admin/group-members/${vehicleId}/${userId}/available-days`
        );
        const data1 = await res1.json();
        setAvailableDays(data1?.available_days ?? 0);

        // Lấy used days tháng hiện tại
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;

        const res2 = await fetch(
          `http://localhost:8085/booking/usage/user/${userId}/month?vehicle_id=${vehicleId}&year=${year}&month=${month}`
        );
        const data2 = await res2.json();
        setUsedDays(data2?.total_used_days ?? 0);
      } catch (err) {
        console.error("❌ Lỗi load days:", err);
      } finally {
        setLoadingDays(false);
      }
    };

    fetchDays();
  }, [userId, vehicleId]);

  // --- Form state ---
  const [formData, setFormData] = useState<CreateBookingDto & { pickup?: string }>({
    user_id: 0,
    vehicle_id: vehicleId,
    start_date: "",
    end_date: "",
    check_in_time: "",
    check_out_time: "",
    pickup: "",
  });

  // Đồng bộ userId
  useEffect(() => {
    if (userId !== null) {
      setFormData((prev) => ({
        ...prev,
        user_id: userId,
        vehicle_id: vehicleId,
      }));
    }
  }, [userId, vehicleId]);

  // --- AI Recommendation ---
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const handleGetAiSuggestion = async () => {
    if (!userId) return;

    setAiLoading(true);
    setAiSuggestion(""); // reset trước khi fetch

    try {
      const res = await fetch("http://localhost:8085/past/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          daysrange: 10,
        }),
      });

      if (!res.ok) {
        throw new Error("Không thể lấy gợi ý từ AI. Vui lòng thử lại.");
      }

      const data = await res.json();
      // Giả sử API trả về { suggestion: "..." }
      setAiSuggestion(data.suggestion || "AI chưa trả về gợi ý.");
    } catch (err: any) {
      console.error("❌ Lỗi fetch AI:", err);
      setAiSuggestion(err.message || "Đã có lỗi xảy ra khi lấy gợi ý AI.");
    } finally {
      setAiLoading(false);
    }
  };
  
  // --- Submit booking ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!userId) {
      setError("Bạn chưa đăng nhập.");
      setLoading(false);
      return;
    }

    if (availableDays !== null && usedDays !== null && usedDays >= availableDays) {
      setError("Bạn đã không còn lượt sử dụng trong tháng này.");
      setLoading(false);
      return;
    }

    const start = new Date(`${formData.start_date}T${formData.check_in_time}`);
    const end = new Date(`${formData.end_date}T${formData.check_out_time}`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Vui lòng nhập đầy đủ ngày và giờ hợp lệ.");
      setLoading(false);
      return;
    }

    if (end <= start) {
      setError("Ngày kết thúc phải sau ngày bắt đầu.");
      setLoading(false);
      return;
    }

    try {
      const payload: CreateBookingDto = {
        user_id: formData.user_id,
        vehicle_id: formData.vehicle_id,
        start_date: formData.start_date,
        end_date: formData.end_date,
        check_in_time: formData.check_in_time,
        check_out_time: formData.check_out_time,
      };

      await bookingApi.create(payload);
      alert("Đặt xe thành công!");

      setFormData((prev) => ({
        ...prev,
        start_date: "",
        end_date: "",
        check_in_time: "",
        check_out_time: "",
      }));
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  // --- Loading user ---
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang kiểm tra đăng nhập...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Đặt Xe Ngay</h1>
          <p className="text-gray-500 mt-2">Đặt xe trực tiếp từ nhà cung cấp đã được xác minh</p>
        </div>

        {/* Available / Used Days */}
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          {loadingDays ? (
            <p className="text-blue-700">Đang tải số ngày khả dụng...</p>
          ) : (
            <div className="space-y-1 text-blue-900">
              <p><strong>Ngày được phép sử dụng:</strong> {availableDays ?? 0}</p>
              <p><strong>Ngày đã sử dụng tháng này:</strong> {usedDays ?? 0}</p>

              {availableDays !== null && usedDays !== null && usedDays >= availableDays && (
                <p className="text-red-600 font-semibold mt-1">
                  Bạn đã không còn lượt sử dụng trong tháng này.
                </p>
              )}
            </div>
          )}
        </div>

        {/* AI Recommendation */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-8">
          <h2 className="text-xl font-semibold text-purple-800 mb-3">
            Gợi Ý Sử Dụng Xe (AI Recommendation)
          </h2>

          <button
            onClick={handleGetAiSuggestion}
            disabled={aiLoading}
            className={`px-5 py-2 rounded-lg text-white font-semibold transition-all ${
              aiLoading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {aiLoading ? "Đang tạo gợi ý..." : "Lấy gợi ý từ AI"}
          </button>

          <div className="bg-white border border-purple-300 rounded-lg p-4 mt-4 min-h-[100px] text-gray-700">
            {aiSuggestion ? (
              aiSuggestion
            ) : (
              <span className="italic text-gray-500">(AI sẽ hiển thị đề xuất lịch tại đây...)</span>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Ngày đi / về */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold mb-2">Ngày bắt đầu *</label>
              <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required min={today} className="w-full border rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Ngày kết thúc *</label>
              <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required min={formData.start_date || today} className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          {/* Giờ check in / check out */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold mb-2">Giờ Check In *</label>
              <input type="time" name="check_in_time" value={formData.check_in_time} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Giờ Check Out *</label>
              <input type="time" name="check_out_time" value={formData.check_out_time} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={
                loading ||
                userId === null ||
                (availableDays !== null && usedDays !== null && usedDays >= availableDays)
              }
              className={`font-semibold px-16 py-3 rounded-lg text-white transition-all ${
                loading ||
                (availableDays !== null && usedDays !== null && usedDays >= availableDays)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#36b6cf] hover:bg-[#2ea3ba]"
              }`}
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
