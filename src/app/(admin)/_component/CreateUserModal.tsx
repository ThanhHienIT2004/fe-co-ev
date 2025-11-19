// src/app/admin/_component/CreateUserModal.tsx
"use client";
import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateUserModal({ isOpen, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({ email: '', password: '', role_id: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const text = await res.text();

      if (!res.ok) {
        let errorMsg = 'Tạo người dùng thất bại!';
        try {
          const json = JSON.parse(text);
          if (json.desc?.includes('Email already exists') || json.data?.includes('Email already exists')) {
            errorMsg = 'Email này đã được sử dụng!';
          } else if (json.message) {
            errorMsg = json.message;
          } else {
            errorMsg = text || errorMsg;
          }
        } catch {
          errorMsg = text || errorMsg;
        }
        throw new Error(errorMsg);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Thêm người dùng</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 bg-white border-2 border-teal-600 rounded-2xl focus:ring-4 focus:ring-teal-500/30 focus:border-teal-700 focus:outline-none transition-all font-semibold text-gray-900 placeholder:text-gray-500 shadow-sm hover:shadow-md"
                placeholder="user@example.com"
              />
            </div>

          {/* Mật khẩu */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Mật khẩu</label>
              <input
                type="text"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-5 py-4 bg-white border-2 border-teal-600 rounded-2xl focus:ring-4 focus:ring-teal-500/30 focus:border-teal-700 focus:outline-none transition-all font-semibold text-gray-900 placeholder:text-gray-500 shadow-sm hover:shadow-md"
                placeholder="Ít nhất 6 ký tự"
              />
            </div>

          {/* Vai trò */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Vai trò</label>
              <select
                value={form.role_id}
                onChange={(e) => setForm({ ...form, role_id: Number(e.target.value) })}
                className="w-full px-5 py-4 bg-white border-2 border-teal-600 rounded-2xl focus:ring-4 focus:ring-teal-500/30 focus:border-teal-700 focus:outline-none transition-all font-semibold text-gray-900 shadow-sm hover:shadow-md cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em' }}
              >
                <option value={1}>User</option>
                <option value={2}>Admin</option>
              </select>
            </div>

          {/* CẢNH BÁO */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Nút */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                'Tạo người dùng'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}