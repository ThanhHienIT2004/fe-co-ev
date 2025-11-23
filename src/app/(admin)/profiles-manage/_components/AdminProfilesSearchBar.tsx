// components/admin-profiles/AdminProfilesSearchBar.tsx

"use client";

import { Search, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminProfilesSearchBar({
  searchTerm,
  setSearchTerm,
  loading,
  refetch,
}: {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  loading: boolean;
  refetch: () => void;
}) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
    >
      <div className="relative w-full sm:max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email, số điện thoại, GPLX..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-teal-200 bg-white/90 backdrop-blur-sm focus:ring-4 focus:ring-teal-300 focus:border-teal-500 outline-none transition-all text-gray-800 placeholder-gray-500 font-medium"
        />
      </div>

      <button
        onClick={refetch}
        disabled={loading}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-70"
      >
        <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
        Làm mới
      </button>
    </motion.div>
  );
}
