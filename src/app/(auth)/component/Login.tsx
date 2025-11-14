"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Login = ({
  onSwitch,
  onClose,
}: {
  onSwitch: (v: "login" | "register" | "forgot") => void;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        onClose();
        router.refresh();
      } else {
        setError("Email hoặc mật khẩu không đúng");
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
        <h2 className="text-2xl font-bold text-teal-700">Đăng nhập</h2>
        <p className="text-sm text-gray-600 mt-1">Chào mừng trở lại với EVSharing</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-xl border border-teal-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full px-4 py-3 rounded-xl border border-teal-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <div className="text-center text-sm space-x-3">
        <button
          type="button"
          onClick={() => onSwitch("forgot")}
          className="text-teal-600 hover:underline font-medium"
          disabled={isLoading}
        >
          Quên mật khẩu?
        </button>
        <span className="text-gray-400">|</span>
        <button
          type="button"
          onClick={() => onSwitch("register")}
          className="text-teal-600 hover:underline font-medium"
          disabled={isLoading}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};