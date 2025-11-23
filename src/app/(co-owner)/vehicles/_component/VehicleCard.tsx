// components/VehicleCard.tsx
"use client";

import { Vehicle } from "@/types/vehicles.type";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 group">
      {/* Ảnh */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={vehicle.image_url || "/images/images-default.jpg"}
          alt={vehicle.vehicle_name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
          {vehicle.vehicle_name}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2 min-h-10">
          {vehicle.description}
        </p>

        <div className="flex items-center text-gray-600 text-sm mt-3">
          <MapPin className="w-4 h-4 mr-1 text-teal-600" />
          <span className="font-mono">{vehicle.license_plate}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xs text-gray-500">Chi phí / ngày</p>
            <p className="text-2xl font-black text-teal-600">990</p>
            <p className="text-xs text-gray-500">CHF</p>
          </div>

          {/* NÚT CHI TIẾT – ĐÚNG LINK */}
          <Link
            href={`/vehicles/${vehicle.vehicle_id}`}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Xem chi tiết
          </Link>

          {/* NÚT ĐẶT LỊCH – ĐÚNG LINK */}
          <Link
            href={`/vehicles/${vehicle.vehicle_id}`}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Đặt lịch
          </Link>
        </div>
      </div>
    </div>
  );
}