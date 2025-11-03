"use client";
import React, { useState } from "react";

export const Register = ({
  onSwitch,
}: {
  onSwitch: (v: "login" | "register" | "forgot") => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Đăng ký thất bại.");
      } 
      
      else {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        onSwitch("login");
      }
    } 

      catch (err) {
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
    } 

      finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">Đăng ký</h2>
      {}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ và tên"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          required
        />

        {}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Tạo tài khoản"}
        </button>

        <div className="text-center text-sm text-gray-600 mt-2">
          <button
            type="button"
            onClick={() => onSwitch("login")}
            className="text-indigo-600 hover:underline"
            disabled={isLoading}
          >
            Đã có tài khoản? Đăng nhập
          </button>
        </div>
      </form>
    </>
  );
};