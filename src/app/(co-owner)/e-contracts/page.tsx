// app/(user)/my-contracts/page.tsx  ← dành cho user
"use client";

import { useUserContracts } from "@/libs/hooks/useEContracts";
import { format } from "date-fns";
import { FileText, Download, CheckCircle, XCircle, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { toast } from "react-hot-toast";

export default function MyContractsPage() {

    const currentUserId = typeof window !== "undefined"
  ? localStorage.getItem("userId")
  : null;

  const { contracts, isLoading } = useUserContracts(currentUserId as string);

    console.log('id', currentUserId)
    
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "signed":
        return <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold flex items-center gap-2 w-fit"><CheckCircle className="w-5 h-5" /> Đã ký</span>;
      case "rejected":
        return <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-bold flex items-center gap-2 w-fit"><XCircle className="w-5 h-5" /> Đã từ chối</span>;
      case "expired":
        return <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-bold flex items-center gap-2 w-fit"><AlertCircle className="w-5 h-5" /> Hết hạn</span>;
      default:
        return <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold flex items-center gap-2 w-fit"><Clock className="w-5 h-5" /> Chờ ký</span>;
    }
  };



  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            Hợp đồng của tôi
          </h1>
        </div>

        {contracts.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-28 h-28 text-gray-300 mx-auto mb-6" />
            <p className="text-2xl text-gray-600 font-medium">Bạn chưa có hợp đồng nào</p>
            <p className="text-gray-500 mt-2">Khi có hợp đồng mới, sẽ hiển thị tại đây</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {contracts.map((contract) => (
              <div
                key={contract.contract_id}
                className="bg-white rounded-3xl shadow-xl p-8 border border-teal-100 hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-lg truncate">
                        Hợp đồng #{contract.contract_id}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 wrap-break-word">
                        <span className="font-medium">Nhóm:</span>{' '}
                        {contract.ownership_group?.group_name || "Không rõ"}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4">
                    {getStatusBadge(contract.signature_status)}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Ngày tạo:</span>
                    <span className="font-medium text-gray-800">
                      {format(new Date(contract.created_at), "dd/MM/yyyy HH:mm")}
                    </span>
                  </div>
                  {contract.signed_at && (
                    <div className="flex justify-between">
                      <span>Ngày ký:</span>
                      <span className="font-medium text-green-600">
                        {format(new Date(contract.signed_at), "dd/MM/yyyy HH:mm")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
                  <a
                    href={contract.contract_url}
                    target="_blank"
                    download={`Hop-dong-${contract.contract_id}.pdf`}
                    rel="noopener noreferrer"
                    className="flex-1 bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Tải PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}