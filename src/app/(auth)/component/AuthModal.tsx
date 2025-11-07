"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Login } from "./Login";
import { Register } from "./Register"; 
import { ForgotPassword } from "./ForgotPassword"; 

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"login" | "register" | "forgot">("login");

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={modalRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} 
        >
          <motion.div
            className="bg-white text-gray-900 rounded-2xl p-6 w-[400px] shadow-2xl border border-gray-300"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            {view === "login" && <Login onSwitch={setView} onClose={onClose} />}
            {view === "register" && <Register onSwitch={setView} />}
            {view === "forgot" && <ForgotPassword onSwitch={setView} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};