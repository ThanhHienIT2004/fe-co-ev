// src/app/admin/users/page.tsx
"use client";
import { useState } from 'react';
import { useUsers } from '@/libs/hooks/useUser';
import UserTable from '../_component/UserTable';
import { Plus, Users } from 'lucide-react';
import CreateUserModal from '../_component/CreateUserModal';

export default function UsersPage() {
  const { users, loading, error, refetch } = useUsers();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleUserCreated = () => {
    setIsCreateModalOpen(false);
    refetch();
  };

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Quản lý Người dùng
              </h1>
              <p className="text-gray-600 mt-1 text-sm">Thêm, xóa và quản lý tài khoản người dùng</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              Thêm người dùng
            </button>
          </div>

          {users.length === 0 ? (
            <EmptyState onAdd={() => setIsCreateModalOpen(true)} />
          ) : (
            <UserTable users={users} refetch={refetch} />
          )}
        </div>
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleUserCreated}
      />
    </>
  );
}

// === UI COMPONENTS ===
function Skeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-xl w-96 mb-8 animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-white/80 backdrop-blur-sm rounded-xl animate-pulse shadow-sm"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 p-6 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full border border-rose-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Lỗi tải dữ liệu</h3>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="text-center py-20 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full mb-6">
        <Users className="w-12 h-12 text-teal-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có người dùng nào</h3>
      <p className="text-gray-500 mb-6">Bắt đầu bằng cách thêm người dùng đầu tiên</p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition"
      >
        <Plus className="w-5 h-5" />
        Thêm người dùng đầu tiên
      </button>
    </div>
  );
}