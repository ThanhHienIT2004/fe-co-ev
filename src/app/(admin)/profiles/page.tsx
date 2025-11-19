// src/app/admin/profiles/page.tsx
"use client";

import { useProfiles } from '@/libs/hooks/useProfile';
import ProfileTable from '../_component/ProfileTable';
import EmptyStateProfile from '../_component/EmptyStateProfile';

export default function ProfilesPage() {
  const { profiles, loading, error, refetch } = useProfiles();

  // Loading state
  if (loading) {
    return <Skeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 p-6 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full border border-rose-200 text-center">
          <h3 className="text-xl font-semibold text-rose-600 mb-3">Lỗi tải dữ liệu</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Quản lý Hồ sơ
          </h1>
        </div>

        {/* Nội dung chính */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {profiles.length === 0 ? (
            <EmptyStateProfile />
          ) : (
            <ProfileTable profiles={profiles} refetch={refetch} />
          )}
        </div>
      </div>
    </div>
  );
}

// Skeleton Loading
function Skeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-xl w-96 mb-10 animate-pulse"></div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-6 items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-48"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}