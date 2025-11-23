'use client';

import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';
import { Car, DollarSign, Clock, CheckCircle2, Plus, Edit3, Trash2, AlertCircle } from 'lucide-react';

export default function AdminCostManagement() {
  const { costs, loading, fetchAll, deleteCost, updateStatus } = useVehicleCost('all');

  const total = costs.reduce((s, c) => s + Number(c.amount || 0), 0);
  const pending = costs.filter(c => c.status === 'pending').length;
  const paid = costs.filter(c => c.status === 'paid').length;
  const cancelled = costs.filter(c => c.status === 'cancelled').length;

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa vĩnh viễn chi phí này? Dữ liệu sẽ mất hoàn toàn!')) return;
    try {
      await deleteCost(id);
      alert('Xóa thành công!');
      fetchAll();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Xóa thất bại');
    }
  };

  const handleStatusChange = async (id: number, newStatus: 'paid' | 'pending' | 'cancelled') => {
    if (!confirm(`Chuyển trạng thái thành "${newStatus === 'paid' ? 'Đã trả' : newStatus === 'pending' ? 'Chờ' : 'Hủy'}"?`)) return;
    try {
      await updateStatus(id, newStatus);
      alert('Cập nhật thành công!');
      fetchAll();
    } catch {
      alert('Cập nhật thất bại');
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Quản Lý Chi Phí Xe</h1>
            <p className="text-gray-600 mt-2">Admin • Theo dõi và quản lý toàn bộ chi phí hệ thống</p>
          </div>
          <Link 
            href="/cost/create" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-3"
          >
            <Plus className="w-5 h-5" />
            Thêm Chi Phí Mới
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Chi Phí</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {total.toLocaleString('vi-VN')}đ
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-red-200" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chờ Thanh Toán</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-200" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã Thanh Toán</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{paid}</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Số Khoản</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{costs.length}</p>
                {cancelled > 0 && <p className="text-xs text-red-500 mt-1">{cancelled} đã hủy</p>}
              </div>
              <Car className="w-12 h-12 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">Danh Sách Chi Phí</h2>
          </div>

          {loading ? (
            <div className="p-20 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Đang tải danh sách chi phí...</p>
            </div>
          ) : costs.length === 0 ? (
            <div className="p-20 text-center">
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700">Chưa có chi phí nào</h3>
              <p className="text-gray-500 mt-2">Bắt đầu bằng cách thêm chi phí mới</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Chi Phí</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhóm</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Tiền</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Tạo</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {costs.map((cost) => (
                    <tr key={cost.costId} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#{cost.costId}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{cost.costName}</p>
                          {cost.vehicleId && <p className="text-xs text-gray-500">Xe: {cost.vehicleId}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cost.groupId}</td>
                      <td className="px-6 py-4 text-sm font-bold text-red-600">
                        {Number(cost.amount).toLocaleString('vi-VN')}đ
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {format(new Date(cost.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={cost.status}
                          onChange={(e) => handleStatusChange(cost.costId!, e.target.value as any)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border-0 cursor-pointer transition ${
                            cost.status === 'paid'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : cost.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          <option value="pending">Chờ</option>
                          <option value="paid">Đã trả</option>
                          <option value="cancelled">Hủy</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <Link href={`/cost/${cost.costId}`} className="text-blue-600 hover:text-blue-800 transition">
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => cost.costId && handleDelete(cost.costId)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-500">
          © 2025 Hệ thống Quản lý Đồng sở hữu Xe Điện • Admin Panel
        </div>
      </div>
    </div>
  );
}