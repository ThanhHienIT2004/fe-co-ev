"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Login } from "./Login";
import { Register } from "./Register";
import { ForgotPassword } from "./ForgotPassword";

type AuthMode = "login" | "register" | "forgot";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
};

export const AuthModal = ({ open, onClose, onLoginSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>("login");

  // Hàm chuyển đổi mode – dùng chung cho tất cả các component con
  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
          />

          {/* Modal chính */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

              {/* Nút đóng X */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all hover:scale-110"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Tiêu đề động theo mode */}
              <div className="px-8 pt-16 pb-6 text-center">
                <motion.h1
                  key={mode}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
                >
                  {mode === "login" && "Chào mừng trở lại!"}
                  {mode === "register" && "Tạo tài khoản mới"}
                  {mode === "forgot" && "Khôi phục mật khẩu"}
                </motion.h1>
              </div>

              {/* Nội dung */}
              <div className="px-8 pb-10 pt-4">
                <AnimatePresence mode="wait">
                  {mode === "login" && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Login
                        onClose={onClose}
                        onLoginSuccess={onLoginSuccess}
                        onGoToRegister={() => switchMode("register")}
                        onGoToForgot={() => switchMode("forgot")}
                      />
                    </motion.div>
                  )}

                  {mode === "register" && (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Register
                        onClose={onClose}
                        onGoToLogin={() => switchMode("login")}
                      />
                    </motion.div>
                  )}

                  {mode === "forgot" && (
                    <motion.div
                      key="forgot"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ForgotPassword onSwitch={switchMode} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};