// app/(auth)/component/Register.tsx
"use client";

import { useState } from "react";

type RegisterProps = {
  onClose: () => void;
  onGoToLogin: () => void;
};

export const Register = ({ onClose, onGoToLogin }: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate
    if (!email || !password) return setError("Vui lòng nhập đầy đủ thông tin");
    if (password !== confirmPassword) return setError("Mật khẩu xác nhận không khớp!");
    if (password.length < 6) return setError("Mật khẩu phải từ 6 ký tự trở lên");

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Quan trọng: backend nhận JSON
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          role_id: "3", // cố định role_id = 3 như Postman
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          onGoToLogin(); // tự động chuyển về form Đăng nhập
        }, 2000);
      } else {
        setError(data.message || data.desc || "Đăng ký thất bại. Email có thể đã tồn tại.");
      }
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối đến server. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-2 text-teal-600">
        {success ? "Đăng Ký Thành Công!" : "Tạo Tài Khoản Mới"}
      </h2>
      <p className="text-center text-gray-600 mb-8 text-sm">
        {success ? "Chào mừng bạn đến với EVSharing!" : "Chỉ mất 10 giây để tham gia"}
      </p>

      {success ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-green-700">Hoàn tất!</p>
          <p className="text-gray-600 mt-2">Tài khoản đã được tạo thành công</p>
          <p className="text-sm text-teal-600 mt-6">Đang chuyển sang đăng nhập...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
          />

          <input
            type="password"
            placeholder="Mật khẩu (tối thiểu 6 ký tự)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
          />

          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3.5 rounded-lg font-semibold text-lg hover:shadow-xl transition disabled:opacity-70"
          >
            {loading ? "Đang tạo tài khoản..." : "Đăng Ký Ngay"}
          </button>
        </form>
      )}

      {!success && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Đã có tài khoản?{" "}
            <button
              type="button"
              onClick={onGoToLogin}
              className="text-teal-600 font-semibold hover:underline"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      )}
    </>
  );
};