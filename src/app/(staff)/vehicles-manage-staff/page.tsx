"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus, Edit, Trash2, Car, AlertTriangle } from "lucide-react";
import { useDeleteVehicle, useVehicles } from "@/libs/hooks/useVehicles";
import { Vehicle } from "@/types/vehicles.type";

export default function VehiclesPage() {
  const { data: vehicles, isLoading, error } = useVehicles();
  const { mutate: deleteVehicle } = useDeleteVehicle();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  const openDeleteModal = (id: string) => setVehicleToDelete(id);
  const closeDeleteModal = () => setVehicleToDelete(null);

  const confirmDelete = () => {
    if (vehicleToDelete) {
      setDeletingId(vehicleToDelete);
      deleteVehicle(vehicleToDelete, {
        onSuccess: () => {
          closeDeleteModal();
          setDeletingId(null);
        },
        onError: () => setDeletingId(null),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-teal-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-32">
        <AlertTriangle className="w-20 h-20 mx-auto mb-6 text-red-500" />
        <p className="text-2xl font-bold text-gray-800">Lỗi tải dữ liệu xe</p>
        <p className="text-gray-600 mt-2">Vui lòng thử lại sau</p>
      </div>
    );
  }

  return (
    <>
      {/* Modal xác nhận xóa */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Xóa xe này?</h3>
              <p className="text-gray-600 mb-6">
                Hành động này <span className="font-bold text-red-600">không thể hoàn tác</span>.
              </p>

              {vehicles && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6 text-left">
                  <p className="font-bold text-lg text-gray-800">
                    {vehicles.find((v) => v.vehicle_id === vehicleToDelete)?.vehicle_name}
                  </p>
                  <p className="text-teal-600 font-mono text-sm mt-1">
                    {vehicles.find((v) => v.vehicle_id === vehicleToDelete)?.license_plate}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 font-mono">
                    ID: {vehicleToDelete}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={closeDeleteModal}
                disabled={!!deletingId}
                className="px-7 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition disabled:opacity-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="px-7 py-3.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-70"
              >
                {deletingId ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Xóa vĩnh viễn
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header đẹp kiểu AdminProfilesHeader */}
      <div className="bg-teal-50/90 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-1 py-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Quản lý xe
              </h1>
              <p className="text-teal-700 mt-2 text-lg">Theo dõi và quản lý toàn bộ phương tiện trong hệ thống</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-600 font-medium">Tổng số xe</p>
                <p className="text-4xl font-black text-teal-600">{vehicles?.length || 0}</p>
              </div>
              <Car className="w-14 h-14 text-teal-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-2 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Nút thêm xe */}
          <div className="flex justify-end mb-10">
            <Link
              href="/vehicles-manage-staff/create"
              className="group inline-flex items-center gap-3 bg-teal-600 text-white px-7 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-teal-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              Thêm xe mới
            </Link>
          </div>

          {/* Danh sách xe */}
          {vehicles?.length === 0 ? (
            <div className="text-center py-32 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-dashed border-teal-200">
              <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Car className="w-16 h-16 text-teal-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">Chưa có xe nào</p>
              <p className="text-gray-600 mt-4 text-lg">Hãy thêm chiếc xe đầu tiên để bắt đầu!</p>
            </div>
          ) : (
  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {vehicles?.map((v: Vehicle) => (
                <div
                  key={v.vehicle_id}
                  className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200"
                >
                  {/* Ảnh xe */}
                  <div className="relative h-44 bg-gradient-to-b from-gray-100 to-gray-200">
                    {v.image_url ? (
                      <Image
                        src={v.image_url}
                        alt={v.vehicle_name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Car className="w-24 h-24 text-gray-400" />
                      </div>
                    )}
                    {/* Badge trạng thái */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                      v.is_active 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {v.is_active ? "Hoạt động" : "Tạm dừng"}
                    </div>
                  </div>

                  {/* Nội dung */}
                  <div className="p-2 space-y-0.5">
                    <div>
                      <h3 className="font-black text-xl text-gray-800 line-clamp-1">
                        {v.vehicle_name}
                      </h3>
                      <p className="text-teal-600 font-mono text-lg font-bold mt-1">
                        {v.license_plate}
                      </p>
                      <p className="text-xs text-gray-500 font-mono mt-2">
                        ID: {v.vehicle_id}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {v.description || "Chưa có mô tả"}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400">
                        Cập nhật: {new Date(v.updated_at).toLocaleDateString("vi-VN")}
                      </span>

                      <div className="flex gap-3">
                        <Link
                          href={`/vehicles-manage-staff/${v.vehicle_id}/edit`}
                          className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition shadow-md hover:shadow-lg"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>

                        <button
                          onClick={() => openDeleteModal(v.vehicle_id)}
                          disabled={deletingId === v.vehicle_id}
                          className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition shadow-md hover:shadow-lg disabled:opacity-50"
                          title="Xóa xe"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}