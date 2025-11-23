"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Login } from "./Login";
import { Register } from "./Register";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
};

export const AuthModal = ({ open, onClose, onLoginSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");

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

              {/* Nút đóng X – đẹp, mượt, animate chung với modal */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all hover:scale-110"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Nội dung */}
              <div className="p-8 pt-16 pb-10">
                {mode === "login" ? (
                  <Login
                    onClose={onClose}
                    onLoginSuccess={onLoginSuccess}
                    onGoToRegister={() => setMode("register")}
                  />
                ) : (
                  <Register
                    onClose={onClose}
                    onGoToLogin={() => setMode("login")}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};