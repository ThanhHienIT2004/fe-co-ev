// pages/groups.tsx (hoặc app/groups/page.tsx)

'use client';

import { useUserGroups } from '@/libs/hooks/useUserGroups';
import Link from 'next/link';
import { format } from 'date-fns';
import { Car, UsersRound, AlertCircle, Loader2 } from 'lucide-react';

export default function GroupsPage() {
  const { groups, loading, error } = useUserGroups();

  // Thêm hàm này – chỉ lưu group + vehicleId vào localStorage
  const handleGroupClick = (group: any) => {
    const selectedGroup = {
      groupId: group.groupId,
      groupName: group.groupName,
      ownerId: group.ownerId,
      vehicleId: group.vehicleId || null, // chính là cái bạn cần
    };

    localStorage.setItem('selectedGroup', JSON.stringify(selectedGroup));

    // Optional: phát sự kiện để các component khác biết (header, form, v.v.)
    window.dispatchEvent(new Event('selectedGroupChanged'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-5 py-12 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Chọn Nhóm Của Bạn
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Bạn đang tham gia{' '}
            <span className="font-bold text-indigo-600 text-2xl">
              {groups.length}
            </span>{' '}
            nhóm sở hữu chung
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-24">
            <Loader2 className="w-14 h-14 animate-spin text-indigo-600" />
            <p className="mt-6 text-lg font-medium text-gray-600">
              Đang tải danh sách nhóm...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-700 font-semibold text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && groups.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UsersRound className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                Chưa có nhóm nào
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Bạn chưa được mời vào nhóm sở hữu chung nào.<br />
                Hãy liên hệ <strong>chủ nhóm</strong> để nhận lời mời tham gia nhé!
              </p>
            </div>
          </div>
        )}

        {/* Groups Grid – chỉ thêm onClick */}
        {!loading && groups.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {groups.map((group) => (
              <Link
                key={group.groupId}
                href={`/group-funds?groupId=${group.groupId}`}
                onClick={() => handleGroupClick(group)} // ← Chỉ thêm dòng này thôi!
                className="group block transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col hover:border-indigo-200 transition-colors">
                  {/* Banner */}
                  <div className="h-40 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute bottom-5 left-6 text-white">
                      <h3 className="text-2xl font-bold drop-shadow-md line-clamp-1">
                        {group.groupName}
                      </h3>
                      <p className="text-sm opacity-90">ID: {group.groupId}</p>
                    </div>
                    <div className="absolute -top-10 -right-10 w-36 h-36 bg-white opacity-10 rounded-full"></div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    {/* Owner */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-11 h-11 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-sm">
                        <span className="text-lg font-bold text-indigo-700">
                          {group.ownerId}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Chủ nhóm</p>
                        <p className="font-semibold text-gray-900">User {group.ownerId}</p>
                      </div>
                    </div>

                    {/* Vehicle */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Car className={`w-9 h-9 ${group.vehicleId ? 'text-emerald-600' : 'text-gray-400'}`} />
                        <div>
                          <p className="text-xs text-gray-500">Xe liên kết</p>
                          <p className={`font-bold ${group.vehicleId ? 'text-gray-900' : 'text-gray-400'}`}>
                            {group.vehicleId ? `Xe #${group.vehicleId}` : 'Chưa có'}
                          </p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                          Right Arrow
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cập nhật lúc: {format(new Date(), "HH:mm, 'ngày' dd/MM/yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
}