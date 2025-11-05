// components/VehicleDetail.tsx
import Image from 'next/image';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Vehicle } from '@/types/vehicles.type';

export default function VehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  return (
    <>
      {/* Ảnh lớn */}
      <div className="relative h-96 bg-gray-100">
        <Image
          src={
            vehicle.image_url ||
            "/images/images-default.jpg"
          }
          alt={vehicle.vehicle_name}
          fill
          className="object-cover"
        />
        <Link
          href="/vehicles"
          className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-lg shadow hover:bg-white"
        >
          ← Quay lại danh sách
        </Link>
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {vehicle.vehicle_name}
            </h1>
            <p className="text-xl text-gray-600 mt-2">{vehicle.description}</p>
          </div>
          <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
            <CheckCircle className="inline w-4 h-4 mr-1" />
            Đang hoạt động
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông tin xe</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-3 text-teal-600" />
                <span className="font-medium">Biển số:</span>
                <span className="ml-2 text-lg">{vehicle.license_plate}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-3 text-teal-600" />
                <span className="font-medium">Tham gia từ:</span>
                <span className="ml-2">
                  {new Date(vehicle.created_at).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Chi phí đồng sở hữu</h3>
            <div className="bg-teal-50 rounded-xl p-6">
              <p className="text-sm text-gray-600">Chỉ với</p>
              <p className="text-5xl font-bold text-teal-600">990 CHF</p>
              <p className="text-sm text-gray-600 mt-1">/ngày • Swiss Francs</p>
              <button className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-lg shadow-lg transform hover:scale-105 transition">
                Tham gia nhóm đồng sở hữu ngay
              </button>
              <p className="text-xs text-center text-gray-500 mt-3">
                💸 Tiết kiệm 10% khi đặt từ 7 ngày
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-500">
            ID xe: <code className="bg-gray-100 px-2 py-1 rounded">{vehicle.vehicle_id}</code>
          </p>
        </div>
      </div>
    </>
  );
}