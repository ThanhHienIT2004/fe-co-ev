
"use client";
import React from "react";

export const Login = ({ onSwitch }: { onSwitch: (v: "login" | "register" | "forgot") => void }) => (
  <>
    <h2 className="text-xl font-semibold mb-4 text-center">Đăng nhập</h2>
    <form className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
      >
        Đăng nhập
      </button>

      <div className="text-center text-sm text-gray-600 mt-2">
        <button
          type="button"
          onClick={() => onSwitch("forgot")}
          className="text-indigo-600 hover:underline"
        >
          Quên mật khẩu?
        </button>{" "}
        |{" "}
        <button
          type="button"
          onClick={() => onSwitch("register")}
          className="text-indigo-600 hover:underline"
        >
          Đăng ký
        </button>
      </div>
    </form>
  </>
);