// components/Login.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setMessage("");

    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const res = await fetch("http://localhost:8080/user/login/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await res.json();

      if (data.success && data.data?.token) {
        // Lưu vào localStorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("email", data.data.email);

        setSuccess(true);
        setMessage("Đăng nhập thành công! Đang chuyển về trang chủ...");

        // CHUYỂN NGAY LẬP TỨC về localhost:3000
        router.push("/");
        router.refresh(); // Đảm bảo session được cập nhật
      } else {
        setMessage(data.desc || "Sai email hoặc mật khẩu");
      }
    } catch (err) {
      setMessage("Không thể kết nối tới server. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-20">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Đăng Nhập
      </h2>

      {/* Form chỉ hiện khi chưa thành công */}
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            placeholder="Nhập email của bạn"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />

          <input
            type="password"
            value={password}
            placeholder="Nhập mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
                       hover:bg-blue-700 disabled:bg-blue-400 transition duration-200"
          >
            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>
        </form>
      ) : (
        /* Màn hình thành công – chỉ hiện 1 giây trước khi chuyển */
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-700 mb-2">
            Đăng nhập thành công!
          </h3>
          <p className="text-gray-600 mb-1">
            Chào <span className="font-medium">{email.split("@")[0]}</span>!
          </p>
          <p className="text-sm text-green-600 font-medium">{message}</p>
        </div>
      )}

      {/* Thông báo lỗi */}
      {message && !success && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm">
          {message}
        </div>
      )}

      {/* Gợi ý email */}
      {!email && !loading && !success && (
        <p className="mt-6 text-xs text-center text-gray-500">
          Gợi ý:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded text-blue-600">
            phamgiakhoi04@gmail.com
          </code>
        </p>
      )}
    </div>
  );
}