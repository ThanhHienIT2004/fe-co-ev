// components/VehicleDetail.tsx
import Image from 'next/image';
import { MapPin, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Vehicle } from '@/types/vehicles.type';

export default function VehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div>
      {/* ẢNH FULL 100% NGANG – KHÔNG CÒN GÌ CHẶN! */}
      <div className="relative w-full h-96 md:h-screen overflow-hidden">
        <Image
          src={vehicle.image_url || "/images/images-default.jpg"}
          alt={vehicle.vehicle_name}
          fill
          priority
          className="object-cover object-center"
        />

        {/* NÚT QUAY LẠI */}
        <Link
          href="/vehicles"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-teal-600 hover:bg-teal-600 text-white font-bold px-6 py-3 rounded-full shadow-2xl transition hover:scale-110"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </Link>

        {/* TIÊU ĐỀ TRÊN ẢNH – FULL NGANG */}
        <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8 md:p-20">
          <div className="max-w-screen-2xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white drop-shadow-2xl leading-tight">
              {vehicle.vehicle_name}
            </h1>
            <p className="text-xl md:text-3xl text-white/90 mt-4 max-w-5xl font-light">
              {vehicle.description}
            </p>
          </div>
        </div>
      </div>

      {/* NỘI DUNG – VẪN FULL NGANG NHƯNG CÓ KHOẢNG CÁCH ĐẸP */}
      <div className="relative z-20 -mt-32">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16">
            {/* Trạng thái */}
            <div className="flex justify-end mb-12">
              <span className="px-8 py-4 bg-teal-100 text-teal-800 rounded-full text-xl font-bold flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                Đang hoạt động
              </span>
            </div>

            {/* Grid thông tin – FULL NGANG */}
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Cột trái */}
              <div className="space-y-12">
                <h3 className="text-3xl font-bold text-gray-800">Thông tin xe</h3>
                <div className="space-y-10 text-xl">
                  <div className="flex items-center gap-6">
                    <MapPin className="w-10 h-10 text-teal-600" />
                    <div>
                      <p className="font-medium text-gray-600">Biển số</p>
                      <p className="text-4xl font-black text-gray-900 mt-1">{vehicle.license_plate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Calendar className="w-10 h-10 text-teal-600" />
                    <div>
                      <p className="font-medium text-gray-600">Tham gia từ</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {new Date(vehicle.created_at).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột phải – CTA */}
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-8">Chi phí đồng sở hữu</h3>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-12 border-4 border-teal-200">
                  <p className="text-2xl text-gray-700 mb-4">Chỉ với</p>
                  <p className="text-9xl font-black text-teal-600 leading-none">990</p>
                  <p className="text-3xl text-gray-700 font-bold">CHF/ngày</p>
                  <button className="mt-10 w-full bg-teal-500 hover:bg-teal-600 text-white font-black text-2xl py-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                    Tham gia nhóm đồng sở hữu ngay
                  </button>
                  <p className="text-center text-xl text-gray-600 mt-6 font-medium">
                    Tiết kiệm 10% khi đặt từ 7 ngày
                  </p>
                </div>
              </div>
            </div>

            {/* ID xe */}
            <div className="text-center mt-16 pt-12 border-t-2 border-gray-200">
              <p className="text-lg text-gray-500">
                ID xe: <code className="bg-gray-100 px-4 py-2 rounded-xl font-mono text-teal-600 text-xl">{vehicle.vehicle_id}</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}