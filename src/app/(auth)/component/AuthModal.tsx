"use client";
<<<<<<< HEAD
import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Login } from "./Login";
import { Register } from "./Register";
import { ForgotPassword } from "./ForgotPassword";
=======

import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
>>>>>>> main

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
};

<<<<<<< HEAD
export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [view, setView] = React.useState<"login" | "register" | "forgot">("login");
=======
export const AuthModal = ({ open, onClose, onLoginSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
>>>>>>> main

  if (!open) return null;

  return (
<<<<<<< HEAD
    <AnimatePresence>
      {open && (
        <motion.div
          ref={modalRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-teal-100"
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {view === "login" && <Login onSwitch={setView} onClose={onClose} />}
            {view === "register" && <Register onSwitch={setView} />}
            {view === "forgot" && <ForgotPassword onSwitch={setView} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
=======
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
>>>>>>> main
  );
};