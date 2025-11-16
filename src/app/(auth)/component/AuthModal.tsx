"use client";

import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
};

export const AuthModal = ({ open, onClose, onLoginSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-3xl font-light z-10"
        >
          ×
        </button>

        {/* Nội dung duy nhất */}
        <div className="p-8 pt-12">
          {mode === "login" ? (
            <Login
              onClose={onClose}
              onLoginSuccess={onLoginSuccess}
              onGoToRegister={() => setMode("register")}   // ← Chuyển sang Đăng ký
            />
          ) : (
            <Register
              onClose={onClose}
              onGoToLogin={() => setMode("login")}         // ← Quay lại Đăng nhập
            />
          )}
        </div>
      </div>
    </div>
  );
};