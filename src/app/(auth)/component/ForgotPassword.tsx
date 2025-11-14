"use client";
import React, { useState, useEffect } from "react";

export const ForgotPassword = ({
  onSwitch,
}: {
  onSwitch: (v: "login" | "register" | "forgot") => void;
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    if (isCooldown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsCooldown(false);
    }
  }, [countdown, isCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gửi thất bại.");
      } else {
        setMessage(data.message || "Liên kết đã được gửi đến email của bạn.");
        setIsCooldown(true);
        setCountdown(60);
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-700">Khôi phục mật khẩu</h2>
        <p className="text-sm text-gray-600 mt-1">
          Nhập email để nhận liên kết đặt lại mật khẩu
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email khôi phục"
          className="w-full px-4 py-3 rounded-xl border border-teal-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || isCooldown}
          required
        />

        {message && (
          <p className="text-green-600 text-sm text-center font-medium">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || isCooldown}
          className="w-full py-3 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading
            ? "Đang gửi..."
            : isCooldown
            ? `Gửi lại sau ${countdown}s`
            : "Gửi liên kết"}
        </button>
      </form>

      <div className="text-center text-sm">
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="text-teal-600 hover:underline font-medium"
          disabled={isLoading}
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
};