"use client";
import React from "react";

export const Register = ({ onSwitch }: { onSwitch: (v: "login" | "register" | "forgot") => void }) => (
  <>
    <h2 className="text-xl font-semibold mb-4 text-center">Đăng ký</h2>
    <form className="space-y-4">
      <input type="text" placeholder="Họ và tên" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" />
      <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" />
      <input type="password" placeholder="Mật khẩu" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" />
      <input type="password" placeholder="Xác nhận mật khẩu" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black" />

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
      >
        Tạo tài khoản
      </button>

      <div className="text-center text-sm text-gray-600 mt-2">
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="text-indigo-600 hover:underline"
        >
          Đã có tài khoản? Đăng nhập
        </button>
      </div>
    </form>
  </>
);