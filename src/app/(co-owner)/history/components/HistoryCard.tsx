// src/app/(co-owner)/history/components/HistoryCard.tsx
import React from 'react';
import { Car, Calendar, Clock, Gauge, UserCheck } from 'lucide-react';

export default function HistoryCard({ item }: { item: any }) {
  // IN RA CONSOLE ĐỂ BẠN THẤY CHÍNH XÁC DỮ LIỆU LÀ GÌ (rất quan trọng!!!)
  console.log('DỮ LIỆU THẬT item nhận được:', item);

  // Helper siêu an toàn
  const get = (obj: any, ...keys: string[]) => {
    for (const key of keys) {
      if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
    }
    return null;
  };

  const dateStr = (d: any) => {
    if (!d) return '—';
    const s = String(d);
    const match = s.match(/\d{4}-\d{2}-\d{2}/);
    if (!match) return '—';
    const [y, m, day] = match[0].split('-');
    return `${day}/${m}/${y}`;
  };

  const timeStr = (t: any) => {
    if (!t) return '—';
    return String(t).trim().slice(0, 5);
  };

  const num = (n: any) => (n != null && !isNaN(Number(n)) ? Number(n) : 0);

  const text = (t: any) => (t?.trim() ? t.trim() : 'Không có ghi chú');

  const vehicleId = get(item, 'vehicle_id', 'vehicleId', 'car_id', 'plate', 'license_plate') || 'Không xác định';
  const bookingId = get(item, 'booking_id', 'usage_id', 'id', '_id') || '—';
  const recordTime = get(item, 'record_time', 'completed_at', 'end_time', 'updated_at');

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Car className="w-10 h-10" />
            <div>
              <p className="font-bold text-2xl">{vehicleId}</p>
              <p className="text-sm opacity-90">ID chuyến: {bookingId}</p>
            </div>
          </div>
          <div className="text-right">
              <p className="text-sm opacity-90">Hoàn thành</p>
              <p className="font-semibold text-xl">
                {item?.recordTime 
                    ? item.recordTime.split(' ')[0].split('-').reverse().join('/')
                  : '—'
    }
  </p>
</div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái */}
          <div className="space-y-7">
            <div className="flex items-center gap-4">
              <Calendar className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Ngày sử dụng</p>
                <p className="font-bold text-xl">
                  {dateStr(get(item, 'start_date', 'startDate'))} → {dateStr(get(item, 'end_date', 'endDate'))}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Giờ nhận → trả xe</p>
                <p className="font-bold text-xl">
                  {timeStr(get(item, 'check_in_time', 'checkInTime', 'checkin_time'))} →{' '}
                  {timeStr(get(item, 'check_out_time', 'checkOutTime', 'checkout_time'))}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Gauge className="w-7 h-7 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Quãng đường</p>
                <p className="font-bold text-3xl text-teal-600">
                  {num(get(item, 'distance', 'km', 'odometer')).toFixed(1)}
                  <span className="text-lg font-medium text-gray-600 ml-2">km</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <UserCheck className="w-6 h-6 text-gray-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-3">Tình trạng xe khi trả</p>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                {text(get(item, 'vehicleCondition', 'condition', 'note', 'notes', 'comment'))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}