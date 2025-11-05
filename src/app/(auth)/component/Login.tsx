"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

export const Login = ({
  onSwitch,
  onClose,
}: {
  onSwitch: (v: "login" | "register" | "forgot") => void;
  onClose: () => void;
}) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false, 
        email: email,
        password: password,
      });

      if (result?.ok) {
        alert("Đăng nhập thành công!");
        onClose();
        router.refresh(); 
      } 
      
      else {
        setError(result?.error || "Email hoặc mật khẩu không đúng");
      }
    } 

      catch (err) {
      setError("Không thể kết nối đến máy chủ.");
    }  

      finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">Đăng nhập</h2>
      {}
      <form className="space-y-4" onSubmit={handleSubmit}>
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

        {}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <div className="text-center text-sm text-gray-600 mt-2">
          <button
            type="button"
            onClick={() => onSwitch("forgot")}
            className="text-indigo-600 hover:underline"
            disabled={isLoading}
          >
            Quên mật khẩu?
          </button>{" "}
          |{" "}
          <button
            type="button"
            onClick={() => onSwitch("register")}
            className="text-indigo-600 hover:underline"
            disabled={isLoading}
          >
            Đăng ký
          </button>
        </div>
      </form>
    </>
  );
};