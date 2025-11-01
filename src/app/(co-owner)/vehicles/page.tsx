"use client";

import { MapPin } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

type Vehicle = {
  vehicle_id: string;
  vehicle_name: string;
  license_plate: string;
  description: string;
  image_url: string;
  spec_image_urls: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// Mock data
const vehicles: Vehicle[] = [
  {
    vehicle_id: "V001",
    vehicle_name: "Toyota Camry 2.5Q",
    license_plate: "51A-12345",
    description: "Sedan hạng D, động cơ 2.5L, màu đen sang trọng.",
    image_url: "https://wuling-ev.vn/SEO/xe%20%C3%B4%20t%C3%B4%20%C4%91i%E1%BB%87n/1958/image-thumb__1958___auto_6b0b5a4d6b28d2af9c1f7759e17fdae6/xe-o-to-dien%20%286%29.0ed5f518.jpg",
    spec_image_urls: [
      "https://example.com/specs/camry-engine.jpg",
      "https://example.com/specs/camry-interior.jpg",
    ],
    is_active: true,
    created_at: "2025-09-01T08:00:00Z",
    updated_at: "2025-10-01T12:30:00Z",
  },
  {
    vehicle_id: "V002",
    vehicle_name: "Honda CR-V 1.5 Turbo",
    license_plate: "60B-67890",
    description: "SUV 7 chỗ, tiết kiệm nhiên liệu, phù hợp gia đình.",
    image_url: "https://wuling-ev.vn/SEO/xe%20%C3%B4%20t%C3%B4%20%C4%91i%E1%BB%87n/1958/image-thumb__1958___auto_6b0b5a4d6b28d2af9c1f7759e17fdae6/xe-o-to-dien%20%286%29.0ed5f518.jpg",
    spec_image_urls: [
      "https://example.com/specs/crv-engine.jpg",
      "https://example.com/specs/crv-dashboard.jpg",
    ],
    is_active: true,
    created_at: "2025-09-15T09:00:00Z",
    updated_at: "2025-10-05T14:10:00Z",
  },
  {
    vehicle_id: "V003",
    vehicle_name: "Ford Ranger Wildtrak",
    license_plate: "72C-24680",
    description: "Bán tải mạnh mẽ, off-road tốt, động cơ 2.0L Bi-Turbo.",
    image_url: "https://wuling-ev.vn/SEO/xe%20%C3%B4%20t%C3%B4%20%C4%91i%E1%BB%87n/1958/image-thumb__1958___auto_6b0b5a4d6b28d2af9c1f7759e17fdae6/xe-o-to-dien%20%286%29.0ed5f518.jpg",
    spec_image_urls: [
      "https://example.com/specs/ranger-exterior.jpg",
      "https://example.com/specs/ranger-interior.jpg",
    ],
    is_active: false,
    created_at: "2025-08-20T10:00:00Z",
    updated_at: "2025-09-25T15:45:00Z",
  },
    {
    vehicle_id: "V0011",
    vehicle_name: "Toyota Camry 2.5Q",
    license_plate: "51A-12345",
    description: "Sedan hạng D, động cơ 2.5L, màu đen sang trọng.",
    image_url: "https://wuling-ev.vn/SEO/xe%20%C3%B4%20t%C3%B4%20%C4%91i%E1%BB%87n/1958/image-thumb__1958___auto_6b0b5a4d6b28d2af9c1f7759e17fdae6/xe-o-to-dien%20%286%29.0ed5f518.jpg",
    spec_image_urls: [
      "https://example.com/specs/camry-engine.jpg",
      "https://example.com/specs/camry-interior.jpg",
    ],
    is_active: true,
    created_at: "2025-09-01T08:00:00Z",
    updated_at: "2025-10-01T12:30:00Z",
  },
    {
    vehicle_id: "V0031",
    vehicle_name: "Toyota Camry 2.5Q",
    license_plate: "51A-12345",
    description: "Sedan hạng D, động cơ 2.5L, màu đen sang trọng.",
    image_url: "https://wuling-ev.vn/SEO/xe%20%C3%B4%20t%C3%B4%20%C4%91i%E1%BB%87n/1958/image-thumb__1958___auto_6b0b5a4d6b28d2af9c1f7759e17fdae6/xe-o-to-dien%20%286%29.0ed5f518.jpg",
    spec_image_urls: [
      "https://example.com/specs/camry-engine.jpg",
      "https://example.com/specs/camry-interior.jpg",
    ],
    is_active: true,
    created_at: "2025-09-01T08:00:00Z",
    updated_at: "2025-10-01T12:30:00Z",
  },
    {
    vehicle_id: "V0201",
    vehicle_name: "Toyota Camry 2.5Q",
    license_plate: "51A-12345",
    description: "Sedan hạng D, động cơ 2.5L, màu đen sang trọng.",
    image_url: "https://wuling-ev.vn/SEO/xe%20%C3%B4%20t%C3%B4%20%C4%91i%E1%BB%87n/1958/image-thumb__1958___auto_6b0b5a4d6b28d2af9c1f7759e17fdae6/xe-o-to-dien%20%286%29.0ed5f518.jpg",
    spec_image_urls: [
      "https://example.com/specs/camry-engine.jpg",
      "https://example.com/specs/camry-interior.jpg",
    ],
    is_active: true,
    created_at: "2025-09-01T08:00:00Z",
    updated_at: "2025-10-01T12:30:00Z",
  },
];

export default function VehiclesPage() {
  const router = useRouter(); // 👈 Hook điều hướng

  const handleBookNow = (vehicleId: string) => {
    // Có thể truyền id qua query nếu cần (ví dụ ?vehicle=V001)
    router.push(`/booking?vehicle=${vehicleId}`);
  };
  return (
    <main className="mx-auto mt-[64px] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {vehicles.map((v) => (
          <div
            key={v.vehicle_id}
            className="bg-whiteshadow-md hover:shadow-xl overflow-hidden border border-gray-200 transition-all duration-300"
          >
            {/* Ảnh xe */}
            <img
              src={v.image_url}
              alt={v.vehicle_name}
              className="w-full h-52 object-cover"
            />

            {/* Nội dung */}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-1 text-gray-900">
                Rent {v.vehicle_name}
              </h2>
              <p className="text-gray-500 text-sm mb-3">
                {v.description}
              </p>

              <div className="flex items-center text-gray-600 text-sm mb-3">
                <MapPin className="w-4 h-4 mr-1 text-teal-600" />
                St. Moritz, Switzerland
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500">/per day</p>
                  <p className="text-2xl font-bold text-gray-900">990</p>
                  <p className="text-xs text-gray-500">CHF • Swiss Francs</p>
                </div>
                <button onClick={() => handleBookNow(v.vehicle_id)} // 👈 Gọi điều hướng 
                className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow">
                  Thuê ngay
                </button>
              </div>

              <button className="w-full text-xs text-gray-500 border border-dashed border-gray-300 rounded-md py-1.5 hover:bg-gray-50">
                💸 Save 10% from 7 days
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
