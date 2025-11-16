"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginProps = {
  onClose: () => void;
  onLoginSuccess?: () => void;
  onGoToRegister: () => void;   // ← Mới thêm
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
        body: formData.toString(),
      });

      const data = await res.json();

      if (data.success && data.data?.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.userId || "");
        localStorage.setItem("email", data.data.email || email);

        onLoginSuccess?.();
        onClose();
        router.push("/");
      } else {
        setError(data.desc || "Sai email hoặc mật khẩu");
      }
    } catch (err) {
      setError("Không thể kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-2 text-teal-600">Chào mừng trở lại!</h2>
      <p className="text-center text-gray-600 mb-8 text-sm">Đăng nhập để tiếp tục</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-70"
        >
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Chưa có tài khoản?{" "}
          <button
            onClick={onGoToRegister}
            className="text-teal-600 font-semibold hover:underline"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </>
  );
};