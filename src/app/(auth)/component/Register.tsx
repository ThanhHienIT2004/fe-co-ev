"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

type RegisterProps = {
  onClose: () => void;
  onGoToLogin: () => void;
};

export const Register = ({ onClose, onGoToLogin }: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Chỉ hiện cảnh báo khi đã từng gõ (touched)
  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // Validate
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(email.trim());

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasSpecialChar;
  const isConfirmMatch = password === confirmPassword && confirmPassword !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail) return setError("Email không hợp lệ");
    if (!isPasswordValid) return setError("Mật khẩu chưa đủ mạnh");
    if (!isConfirmMatch) return setError("Mật khẩu xác nhận không khớp");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8085/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, role_id: "3" }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => onGoToLogin(), 2200);
      } else {
        setError(data.message || data.desc || "Email đã tồn tại");
      }
    } catch {
      setError("Không kết nối được server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-teal-600">
          {success ? "Đăng Ký Thành Công!" : "Tạo Tài Khoản Mới"}
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          {success ? "Chào mừng bạn đến với EVSharing!" : "Chỉ mất 10 giây thôi"}
        </p>
      </div>

      {success ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <p className="text-lg font-semibold text-green-700">Hoàn tất!</p>
          <p className="text-sm text-teal-600 mt-6">Đang chuyển sang đăng nhập...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <input
              type="text"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailTouched(true)}
              onBlur={() => setEmailTouched(true)}
              className={`w-full px-5 py-4 rounded-xl border-2 transition-all outline-none ${
                !emailTouched
                  ? "border-gray-300 focus:border-teal-500"
                  : isValidEmail
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            />
            {emailTouched && email && !isValidEmail && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Email không hợp lệ
              </p>
            )}
          </div>

          {/* MẬT KHẨU - CHỈ HIỆN HỘP KHI ĐỦ 8 KÝ TỰ */}
          <div className="relative">
            <input
              type="password"
              placeholder="Mật khẩu (tối thiểu 8 ký tự)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl border-2 transition-all outline-none ${
                password === ""
                  ? "border-gray-300 focus:border-teal-500"
                  : isPasswordValid
                  ? "border-green-500"
                  : hasMinLength
                  ? "border-orange-500"   // Đủ 8 ký tự → cảnh báo cần thêm
                  : "border-red-500"
              }`}
            />

            {/* Chỉ hiện hộp gợi ý khi đã gõ đủ 8 ký tự */}
            {hasMinLength && !isPasswordValid && (
              <div className="mt-3 p-4 bg-orange-50 border border-orange-300 rounded-xl text-sm animate-in fade-in slide-in-from-top-2">
                <p className="font-semibold text-orange-800 mb-2">
                  Mật khẩu cần thêm:
                </p>
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 ${hasUppercase ? "text-green-600" : "text-orange-700"}`}>
                    {hasUppercase ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    Có ít nhất 1 chữ hoa (A–Z)
                  </div>
                  <div className={`flex items-center gap-2 ${hasSpecialChar ? "text-green-600" : "text-orange-700"}`}>
                    {hasSpecialChar ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    Có ít nhất 1 ký tự đặc biệt (!@#$%^&*)
                  </div>
                </div>
              </div>
            )}

            {/* Khi đủ hết → hiện thông báo thành công */}
            {isPasswordValid && (
              <p className="mt-3 text-sm text-green-600 flex items-center gap-2">
                <Check className="w-5 h-5" /> 
              </p>
            )}
          </div>

          {/* XÁC NHẬN MẬT KHẨU */}
          <div>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmTouched(true)}
              onBlur={() => setConfirmTouched(true)}
              className={`w-full px-5 py-4 rounded-xl border-2 transition-all outline-none ${
                !confirmTouched
                  ? "border-gray-300 focus:border-teal-500"
                  : isConfirmMatch
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            />
            {confirmTouched && confirmPassword && !isConfirmMatch && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Mật khẩu không khớp
              </p>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-300 rounded-xl text-red-700 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isValidEmail || !isPasswordValid || !isConfirmMatch}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang tạo tài khoản..." : "Đăng Ký Ngay"}
          </button>
        </form>
      )}

      {!success && (
        <div className="text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <button type="button" onClick={onGoToLogin} className="font-bold text-teal-600 hover:underline">
            Đăng nhập ngay
          </button>
        </div>
      )}
    </div>
  );
};