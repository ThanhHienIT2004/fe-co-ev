// components/admin-profiles/PaginationControls.tsx

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  setCurrentPage,
}: any) {
  return (
    <div className="px-8 py-5 bg-teal-50/50 flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Hiển thị {(currentPage - 1) * itemsPerPage + 1} -
        {" " + Math.min(currentPage * itemsPerPage, totalItems)} trong{" "}
        {totalItems} thành viên
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-3 rounded-xl bg-white shadow hover:bg-teal-100 disabled:opacity-50 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="px-5 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-3 rounded-xl bg-white shadow hover:bg-teal-100 disabled:opacity-50 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
