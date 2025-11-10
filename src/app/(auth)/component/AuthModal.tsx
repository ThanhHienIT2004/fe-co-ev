"use client";
import React, { useRef } from "react";
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
  const [view, setView] = React.useState<"login" | "register" | "forgot">("login");

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
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
  );
};