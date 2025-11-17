"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginProps = {
  onClose: () => void;
  onLoginSuccess?: () => void;
  onGoToRegister: () => void;
};

export const Login = ({ onClose, onLoginSuccess, onGoToRegister }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.userId || "");
        localStorage.setItem("email", data.data.email || email);

        onLoginSuccess?.();
        router.refresh(); // Quan trọng: cập nhật header mà không reload trang
        setTimeout(() => onClose(), 400); // Đợi animation đóng modal
      } else {
        setError(data.desc || "Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      setError("Không thể kết nối server. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-teal-600">Chào mừng trở lại!</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none transition"
        />

        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 py-3 rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-4 rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={onGoToRegister}
          className="font-bold text-teal-600 hover:underline"
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};