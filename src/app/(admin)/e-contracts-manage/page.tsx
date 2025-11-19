// app/admin/e-contracts/page.tsx
"use client";

import { downloadFile, useEContracts, useUpdateEContractStatus } from "@/libs/hooks/useEContracts";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { FileText, Download, CheckCircle, XCircle, Clock, AlertCircle, ExternalLink } from "lucide-react";

export default function EContractsPage() {
  const { contracts, isLoading } = useEContracts();
  const { updateStatus } = useUpdateEContractStatus();

  const handleStatusChange = async (id: number, status: any) => {
    try {
      await updateStatus(id, status);
      toast.success("Cập nhật trạng thái thành công!");
    } catch {
      toast.error("Cập nhật thất bại");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "signed":
        return <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Đã ký</span>;
      case "rejected":
        return <span className="px-3 py-1.5 bg-red-100 text-red-800 rounded-full text-xs font-bold flex items-center gap-1"><XCircle className="w-4 h-4" /> Từ chối</span>;
      case "expired":
        return <span className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-xs font-bold flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Hết hạn</span>;
      default:
        return <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold flex items-center gap-1"><Clock className="w-4 h-4" /> Chờ ký</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-800 mb-4">Quản lý Hợp đồng Điện tử</h1>
          <p className="text-xl text-teal-600 font-semibold">Tổng: {contracts.length} hợp đồng</p>
        </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contracts.map((contract) => (
            <div
              key={contract.contract_id}
              className="bg-white rounded-3xl shadow-xl p-8 border border-teal-100 hover:shadow-2xl transition-all"
            >
            <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 rounded-xl bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shrink-0">
                <FileText className="w-9 h-9 text-white" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-lg truncate">
                Hợp đồng <span className="text-teal-600">#{contract.contract_id}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1 wrap-break-word">
                <span className="font-medium">Nhóm:</span>{' '}
                <span className="inline-block px-2 py-0.5 bg-teal-100 text-teal-700 rounded-md text-xs font-bold">
                    ID {contract.ownership_group_id}
                </span>
                {' • '}
                <span className="inline break-all">
                    {contract.ownership_group?.group_name || "Chưa đặt tên"}
                </span>
                </p>
            </div>
            </div>
            {getStatusBadge(contract.signature_status)}
            </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Người ký:</span>
                  <span className="font-medium">{contract.user?.name || contract.user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày tạo:</span>
                  <span className="font-medium">
                    {format(new Date(contract.created_at), "dd/MM/yyyy HH:mm")}
                  </span>
                </div>
                {contract.signed_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày ký:</span>
                    <span className="font-medium text-green-600">
                      {format(new Date(contract.signed_at), "dd/MM/yyyy HH:mm")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                <button
                onClick={() =>
                    downloadFile(
                    contract.contract_url,
                    `Hop-dong-${contract.contract_id}.pdf`
                    )
                }
                className="flex-1 bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 transition"
                >
                <Download className="w-5 h-5" />
                Tải PDF
                </button>
                {contract.signature_status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(contract.contract_id, "signed")}
                      className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl font-bold transition"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(contract.contract_id, "rejected")}
                      className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-bold transition"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {contracts.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600">Chưa có hợp đồng điện tử nào</p>
          </div>
        )}
      </div>
    </div>
  );
}