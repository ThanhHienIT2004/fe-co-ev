"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginProps = {
  onClose: () => void;
  onLoginSuccess?: () => void;
  onGoToRegister: () => void;
  onGoToForgot: () => void;
};

export const Login = ({
  onClose,
  onLoginSuccess,
  onGoToRegister,
  onGoToForgot, 
}: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("email", email.trim());
      formData.append("password", password);

      const res = await fetch("http://localhost:8080/user/login/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.data?.token) {
        // Lưu token & thông tin
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.userId?.toString() || "");
        localStorage.setItem("email", data.data.email || email);

        // Thành công → gọi callback + đóng modal
        onLoginSuccess?.();

        // Cách tốt nhất: refresh nhẹ + đóng modal mượt
        router.refresh(); // Cập nhật layout/header ngay lập tức
        setTimeout(() => onClose(), 300); // Đợi animation đẹp
      } else {
        setError(data.desc || data.message || "Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-600 mt-2">Đăng nhập để tiếp tục</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition text-gray-900 placeholder-gray-500"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition text-gray-900 placeholder-gray-500"
        />

        {error && (
          <div className="bg-red-50 text-red-600 text-sm text-center py-3 rounded-lg font-medium border border-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-teal-500/25 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>

      {/* Quên mật khẩu + Đăng ký */}
      <div className="text-center space-y-4 text-sm">
        <button
          type="button"
          onClick={onGoToForgot}
          className="text-teal-600 hover:text-teal-700 font-medium hover:underline transition"
          disabled={loading}
        >
          Quên mật khẩu?
        </button>

        <div className="text-gray-600">
          Chưa có tài khoản?{" "}
          <button
            type="button"
            onClick={onGoToRegister}
            className="font-bold text-teal-600 hover:underline transition"
            disabled={loading}
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};