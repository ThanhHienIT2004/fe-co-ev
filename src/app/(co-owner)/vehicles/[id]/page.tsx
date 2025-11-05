"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function VF6Page() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex justify-center items-start p-8">
      <div className="flex max-w-6xl bg-[#2a2a2a] rounded-xl overflow-hidden shadow-xl">
        {/* Ảnh xe */}
        <div className="flex-1">
          <Image
            src="/vf6.jpg" // 👉 đổi path này thành ảnh của bạn (vd: /images/vf6.jpg)
            alt="VinFast VF 6"
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex-1 p-8 space-y-4">
          <h1 className="text-3xl font-bold text-[#e50914]">VF 6 Plus</h1>

          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <p>
              <span className="font-semibold text-white">Số chỗ:</span> 5 chỗ
            </p>
            <p>
              <span className="font-semibold text-white">Giá:</span>{" "}
              <span className="text-[#e50914] font-bold text-xl">
                749.000.000đ
              </span>{" "}
              <span className="line-through text-gray-400 text-sm ml-2">
                765.000.000đ
              </span>
            </p>
          </div>

          {/* Các nút hành động */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="bg-[#e50914] hover:bg-[#ff1c24] text-white px-4 py-2 rounded-md flex items-center gap-2">
              YÊU CẦU BÁO GIÁ <ArrowRight size={16} />
            </button>
            <button className="bg-[#e50914] hover:bg-[#ff1c24] text-white px-4 py-2 rounded-md flex items-center gap-2">
              ĐĂNG KÝ LÁI THỬ <ArrowRight size={16} />
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
              TƯ VẤN TRẢ GÓP <ArrowRight size={16} />
            </button>
          </div>

          {/* Thông tin mô tả */}
          <div className="mt-6 text-sm leading-relaxed text-gray-300 space-y-2">
            <p>
              - SUV phân khúc B (Honda HR-V, Hyundai Creta, Kia Seltos,
              Peugeot 2008)
            </p>
            <p>- Giá bán kèm pin 749 triệu (bảo hành pin 8 năm)</p>
            <p>- Bảo hành 7 năm hoặc 160.000km</p>
            <p>- Công suất 150kW (201 Hp)</p>
            <p>
              - Hệ thống hỗ trợ lái ADAS tự lái cấp độ 2 và giải trí Smart
              Service
            </p>
            <p>- Sạc từ 10%-70% trong 24 phút</p>
          </div>
        </div>
      </div>
    </div>
  );
}
