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
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } 
    else if (countdown === 0) {
      setIsCooldown(false); 
    }
  }, [countdown, isCooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError("");
    setMessage("");

    if (email.trim() === "") {
      setError("Vui lòng nhập email của bạn.");
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
        setError(data.message || "Đã xảy ra lỗi.");
      } else {
        setMessage(data.message);
        

        setIsCooldown(true);
        setCountdown(60);
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Quên mật khẩu</h2>
      <p className="text-sm text-center text-gray-600">
        Nhập email của bạn, chúng tôi sẽ gửi một liên kết để đặt lại mật khẩu.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Nhập email khôi phục"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || isCooldown} 
          required
        />

        {message && <p className="text-green-600 text-sm text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className={`w-full text-white py-2 rounded-md transition ${
            (isLoading || isCooldown)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={isLoading || isCooldown} 
                  >
          {}
          {isLoading
            ? "Đang gửi..."
            : isCooldown
              ? `Gửi lại sau (${countdown}s)`
              : "Gửi liên kết khôi phục"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600 mt-2">
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="text-indigo-600 hover:underline"
          disabled={isLoading}
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
};
