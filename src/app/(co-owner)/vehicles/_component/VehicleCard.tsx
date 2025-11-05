// components/VehicleCard.tsx
"use client";

import { Vehicle } from "@/types/vehicles.type";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const handleJoinClick = () => {
    console.log("Tham gia xe ID:", vehicle.vehicle_id);
  };

  return (
    <div className="bg-white shadow-md hover:shadow-xl overflow-hidden border border-gray-200 rounded-xl transition-all duration-300">
      {/* Ảnh KHÔNG nhảy */}
      <Image
        src={vehicle.image_url || "/images/images-default.jpg"}
        alt={vehicle.vehicle_name}
        width={400}
        height={208}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-semibold mb-1 text-gray-900">
          {vehicle.vehicle_name}
        </h2>
        <p className="text-gray-500 text-sm mb-3">{vehicle.description}</p>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 text-teal-600" />
          {vehicle.license_plate}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">/per day</p>
            <p className="text-2xl font-bold text-gray-900">990</p>
            <p className="text-xs text-gray-500">CHF • Swiss Francs</p>
          </div>

          {/* CHỈ BỌC NÚT NÀY */}
          <Link href={`/vehicles/${vehicle.vehicle_id}`} className="bg-white ... hover:cursor-pointer">
            <button
              onClick={handleJoinClick}
              className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
            >
              Tham gia nhóm đồng sở hữu
            </button>
          </Link>
        </div>

        <button className="w-full text-xs text-gray-500 border border-dashed border-gray-300 rounded-md py-1.5 hover:bg-gray-50">
          Save 10% from 7 days
        </button>
      </div>
    </div>
  );
}