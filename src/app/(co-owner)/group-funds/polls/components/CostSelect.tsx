// components/CostSelect.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Loader2, Search, AlertCircle, Check, Car } from 'lucide-react';

interface VehicleCost {
  costId: number;
  costName: string;
  amount?: number;
  createdAt?: string;
}

interface CostSelectProps {
  groupId: string | number;
  value: number | null;
  onChange: (costId: number | null) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export default function CostSelect({
  groupId,
  value,
  onChange,
  disabled = false,
  className = '',
  placeholder = 'Chọn loại chi phí',
}: CostSelectProps) {
  const [costs, setCosts] = useState<VehicleCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Gọi API mới: /costs?groupId=
  useEffect(() => {
    if (!groupId) {
      setCosts([]);
      setLoading(false);
      return;
    }

    const fetchCosts = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(`http://localhost:8085/payment/costs`, {
          params: { groupId },
        });
        setCosts(res.data || []);
      } catch (err: any) {
        console.error('Lỗi tải chi phí nhóm:', err);
        setError('Không tải được danh sách chi phí');
        setCosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCosts();
  }, [groupId]);

  const filteredCosts = useMemo(() => {
    if (!searchTerm.trim()) return costs;
    return costs.filter((cost) =>
      cost.costName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [costs, searchTerm]);

  const selectedCost = costs.find((c) => c.costId === value);

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Loại chi phí trong nhóm <span className="text-red-500">*</span>
      </label>

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled || loading || !groupId}
        className={`
          w-full px-4 py-3.5 bg-white border rounded-xl text-left flex items-center justify-between
          transition-all shadow-sm
          ${disabled || !groupId ? 'opacity-60 cursor-not-allowed bg-gray-50' : 'hover:border-emerald-400 cursor-pointer'}
          ${error ? 'border-red-300' : 'border-gray-300'}
        `}
      >
        <span className={selectedCost ? 'text-gray-900' : 'text-gray-500'}>
          {loading
            ? 'Đang tải chi phí...'
            : selectedCost
            ? selectedCost.costName
            : !groupId
            ? 'Chưa có nhóm'
            : placeholder}
        </span>

        <div className="flex items-center gap-2">
          {selectedCost && <Check className ="w-4 h-4 text-emerald-600" />}
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
          ) : (
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && !loading && costs.length > 0 && (
        <>
          <div className="absolute z-50 top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden w-full">
            {/* Search */}
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm chi phí..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  autoFocus
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredCosts.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">
                  Không tìm thấy chi phí nào
                </div>
              ) : (
                filteredCosts.map((cost) => (
                  <button
                    key={cost.costId}
                    onClick={() => {
                      onChange(cost.costId);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`
                      w-full px-4 py-3 text-left flex items-center justify-between hover:bg-emerald-50 transition
                      ${value === cost.costId ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-700'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span>{cost.costName}</span>
                    </div>
                    {value === cost.costId && <Check className="w-5 h-5 text-emerald-600" />}
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t">
              Tìm thấy: {filteredCosts.length} chi phí
            </div>
          </div>

          {/* Overlay */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
        </>
      )}

      {/* Empty state khi chưa có chi phí */}
      {isOpen && !loading && costs.length === 0 && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl p-8 text-center">
          <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Chưa có loại chi phí nào trong nhóm</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}