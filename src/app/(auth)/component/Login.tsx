"use client";
<<<<<<< HEAD
import React, { useState } from "react";
import { signIn } from "next-auth/react";
=======

import { useState } from "react";
>>>>>>> main
import { useRouter } from "next/navigation";

type LoginProps = {
  onClose: () => void;
<<<<<<< HEAD
}) => {
  const router = useRouter();
=======
  onLoginSuccess?: () => void;
  onGoToRegister: () => void;   // ← Mới thêm
};

export const Login = ({ onClose, onLoginSuccess, onGoToRegister }: LoginProps) => {
>>>>>>> main
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
<<<<<<< HEAD
=======
  const router = useRouter();
>>>>>>> main

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
<<<<<<< HEAD
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
=======
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
>>>>>>> main
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <>
      <h2 className="text-2xl font-bold text-center mb-2 text-teal-600">Chào mừng trở lại!</h2>
      <p className="text-center text-gray-600 mb-8 text-sm">Đăng nhập để tiếp tục</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
>>>>>>> main
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
<<<<<<< HEAD
          className="w-full px-4 py-3 rounded-xl border border-teal-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
=======
>>>>>>> main
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
        />

<<<<<<< HEAD
        {error && (
          <p className="text-red-500 text-sm text-center font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
=======
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-70"
>>>>>>> main
        >
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>
      </form>

<<<<<<< HEAD
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
=======
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
>>>>>>> main
  );
};