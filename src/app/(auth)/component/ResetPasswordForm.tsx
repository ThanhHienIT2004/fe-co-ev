// src/component/auth/ResetPasswordForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Check, X, Lock, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasSpecialChar;
  const isConfirmMatch = password === confirmPassword && confirmPassword !== "";

  useEffect(() => {
    if (!token) setError("Liên kết không hợp lệ hoặc đã hết hạn.");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !isPasswordValid || !isConfirmMatch) return;

    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:8080/user/reset-password", {
        token,
        newPassword: password,
      });

      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Liên kết đã hết hạn hoặc không hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <X className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Liên kết không hợp lệ</h1>
          <p className="text-gray-600 mb-8">Vui lòng yêu cầu đặt lại mật khẩu một lần nữa.</p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-4 bg-teal-500 text-white rounded-full font-bold hover:bg-teal-600 transition shadow-lg"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl border border-teal-100 w-full max-w-lg overflow-hidden"
      >
        {/* Header xanh đẹp */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-10 text-center">
          <Lock className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Đặt lại mật khẩu</h1>
          <p className="mt-3 opacity-90">Nhập mật khẩu mới của bạn</p>
        </div>

        <div className="p-8 lg:p-10">
          {success ? (
            <div className="text-center py-16">
              <div className="w-28 h-28 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <Check className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-700 mb-3">Thành công!</h2>
              <p className="text-teal-600 text-lg">Đang chuyển về trang đăng nhập...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Thông báo lỗi */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-center font-medium">
                  {error}
                </div>
              )}

              {/* Mật khẩu mới */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 placeholder:text-gray-400"
                    placeholder="••••••••"
                    required
                  />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 transition"
                    >
                    {showPassword ? <EyeOff size={23} /> : <Eye size={23} />}
                </button>
            </div>

                {/* Điều kiện mật khẩu */}
                <div className="space-y-2 text-sm">
                  <div className={`flex items-center gap-3 ${hasMinLength ? "text-green-600" : "text-gray-500"}`}>
                    {hasMinLength ? <Check size={18} /> : <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />}
                    <span>Ít nhất 8 ký tự</span>
                  </div>
                  <div className={`flex items-center gap-3 ${hasUppercase ? "text-green-600" : "text-gray-500"}`}>
                    {hasUppercase ? <Check size={18} /> : <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />}
                    <span>Có ít nhất 1 chữ hoa</span>
                  </div>
                  <div className={`flex items-center gap-3 ${hasSpecialChar ? "text-green-600" : "text-gray-500"}`}>
                    {hasSpecialChar ? <Check size={18} /> : <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />}
                    <span>Có ít nhất 1 ký tự đặc biệt (!@#$...)</span>
                  </div>
                </div>
              </div>

              {/* Xác nhận mật khẩu */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 placeholder:text-gray-400"
                    placeholder="••••••••"
                    required
                  />
                <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 transition"
                    >
                    {showConfirm ? <EyeOff size={23} /> : <Eye size={23} />}
                </button>
                </div>
                {confirmPassword && !isConfirmMatch && (
                  <p className="text-red-500 text-sm font-medium">Mật khẩu xác nhận không khớp</p>
                )}
              </div>

              {/* Nút submit */}
              <button
                type="submit"
                disabled={loading || !isPasswordValid || !isConfirmMatch}
                className={`w-full py-4.5 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300 transform ${
                  loading || !isPasswordValid || !isConfirmMatch
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                }`}
              >
                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}