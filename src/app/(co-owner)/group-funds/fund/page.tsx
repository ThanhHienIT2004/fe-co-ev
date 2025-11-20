'use client';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import Link from 'next/link';
import FundCard from './components/FundCard';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';

export default function FundListPage() {
  const params = useParams<{ groupId: string | string[] }>();
  
  // Chuyển đổi groupId từ string → number một cách an toàn
  const groupIdRaw = Array.isArray(params.groupId) ? params.groupId[0] : params.groupId;
  const groupId = groupIdRaw ? Number(groupIdRaw) : null;

  // Nếu groupId không hợp lệ → xử lý lỗi hoặc redirect
  if (groupId === null || isNaN(groupId)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Nhóm không hợp lệ</h1>
          <p className="text-gray-600 mt-2">ID nhóm phải là một số.</p>
        </div>
      </div>
    );
  }

  const { funds, loading, fetchAll, deleteFund } = useGroupFund(groupId); // ← truyền number

  const handleDelete = async (id: number) => {
    const fund = funds.find(f => f.fundId === id);
    if (!fund) return alert('Quỹ không tồn tại!');

    const balance = Number(fund.balance);
    const msg = balance > 0
      ? `Quỹ còn ${balance.toLocaleString('vi-VN')}đ. Xóa sẽ mất toàn bộ dữ liệu. Bạn chắc chắn?`
      : 'Xóa quỹ này? Dữ liệu sẽ mất vĩnh viễn!';

    if (!confirm(msg)) return;

    try {
      await deleteFund(id);
      alert('Xóa thành công!');
      fetchAll();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Xóa thất bại!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Danh Sách Quỹ Chung</h1>
            <p className="text-gray-600 mt-1">Nhóm: <strong>{groupId}</strong></p>
          </div>
          <Link
            href={`/group-funds/fund/create?groupId=${groupId}`}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            Tạo quỹ mới
          </Link>
        </div>

        {/* Phần còn lại giữ nguyên, chỉ thay GROUP_ID bằng groupId */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Tổng số quỹ</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{funds.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Tổng số dư</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {funds.reduce((s, f) => s + Number(f.balance), 0).toLocaleString('vi-VN')}đ
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Cập nhật</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {format(new Date(), 'HH:mm')}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600 mt-4">Đang tải quỹ...</p>
          </div>
        ) : funds.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-16 text-center border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có quỹ nào</h3>
            <p className="text-gray-600 mb-6">Tạo quỹ đầu tiên ngay bây giờ!</p>
            <Link href={`/group-funds/fund/create?groupId=${groupId}`} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700">
              Tạo quỹ mới
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {funds.map(fund => (
              <FundCard key={fund.fundId} fund={fund} onDelete={handleDelete} groupId={groupId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}