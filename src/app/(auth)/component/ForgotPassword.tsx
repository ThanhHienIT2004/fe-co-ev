"use client";
import React from "react";

export const ForgotPassword = ({
  onSwitch,
}: {
  onSwitch: (v: "login" | "register" | "forgot") => void;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Quên mật khẩu</h2>
      <p className="text-sm text-center text-gray-600">
        Nhập email của bạn, chúng tôi sẽ gửi một liên kết để đặt lại mật khẩu.
      </p>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Nhập email khôi phục"
          // Style đồng bộ với input của Login
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        />
        <button
          type="submit"
          // Style đồng bộ với nút của Login
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
        >
          Gửi liên kết khôi phục
        </button>
      </form>

      <div className="text-center text-sm text-gray-600 mt-2">
        <button
          type="button"
          onClick={() => onSwitch("login")}
          // Style đồng bộ với link của Login
          className="text-indigo-600 hover:underline"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
};