import type { Metadata } from "next";
import { Car, Zap, Users, Shield, Phone, Mail, MapPin, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import EVCoOwnershipSection from "@/components/Sections/EVCoOwnershipSection";

export const metadata: Metadata = {
  title: "EVSharing - Đồng Sở Hữu Xe Điện Thông Minh",
  description: "Đồng sở hữu xe điện VinFast chỉ từ 3 triệu/tháng. Đặt lịch lái thử miễn phí ngay hôm nay!",
};

export default function HomePage() {

  const benefits = [
    { icon: Zap, title: "Tiết kiệm đến 70%", desc: "Chỉ trả phí theo thời gian sử dụng thực tế" },
    { icon: Shield, title: "Bảo hành toàn diện", desc: "Miễn phí bảo dưỡng, sửa chữa, thay pin" },
    { icon: Car, title: "Luôn xe mới", desc: "Đổi xe mới sau mỗi 24-36 tháng" },
    { icon: Users, title: "Linh hoạt 24/7", desc: "Đặt xe qua app, nhận xe trong 30 phút" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-teal-600 via-cyan-600 to-cyan-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-8 text-yellow-300 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Đồng Sở Hữu Xe Điện
            <br />
            <span className="text-yellow-300">Thông Minh & Tiết Kiệm</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-95">
            Sở hữu xe VinFast cao cấp mà không cần mua đứt – Chỉ từ <span className="text-yellow-300 font-bold text-3xl">3 triệu/tháng</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Nút chính – gradient giống hệt header */}
            <button className="group bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-lg px-12 py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
              <Car className="w-6 h-6" />
              Đặt Lịch Lái Thử Miễn Phí
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>

            <button className="border-4 border-white/30 hover:bg-white hover:text-cyan-600 font-bold text-lg px-12 py-5 rounded-full transition-all backdrop-blur-sm">
              Xem Bảng Giá Chi Tiết
            </button>
          </div>
        </div>
        <ChevronRight className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 rotate-90 animate-bounce text-white/70" />
      </section>

      {/* Benefits */}
      <section className="py-24 bg-teal-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Tại Sao Chọn EVSharing?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all text-center border border-teal-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-teal-600 dark:text-cyan-400">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EVCoOwnershipSection />

      {/* Contact */}
      <section className="py-24 bg-linear-to-r from-teal-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-teal-100">
            <h2 className="text-4xl font-bold mb-8 text-teal-600 dark:text-cyan-400 flex items-center justify-center gap-4">
              <Phone className="w-12 h-12" /> Liên Hệ Ngay
            </h2>
            <div className="space-y-8 text-lg">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center"><Phone className="w-7 h-7 text-teal-600" /></div>
                <div><p className="font-semibold text-gray-600">Hotline 24/7</p><p className="text-3xl font-bold text-teal-600">1900 2025</p></div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center"><Mail className="w-7 h-7 text-cyan-600" /></div>
                <div><p className="font-semibold text-gray-600">Email</p><p className="text-xl font-bold text-cyan-600">hello@evsharing.vn</p></div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center"><MapPin className="w-7 h-7 text-yellow-600" /></div>
                <div><p className="font-semibold text-gray-600">Địa chỉ</p><p>123 Điện Biên Phủ, Q. Bình Thạnh, TP.HCM</p></div>
              </div>
            </div>

            {/* Nút gradient giống header */}
            <button className="mt-10 w-full bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-xl py-6 rounded-2xl shadow-xl transition-all transform hover:scale-105">
              Gửi Yêu Cầu Tư Vấn Miễn Phí
            </button>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-full min-h-96 border-8 border-white">
            <iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="100%" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-linear-to-r from-teal-600 to-cyan-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Bắt Đầu Hành Trình Xanh!</h2>
          <p className="text-xl md:text-2xl mb-12">Nhận ngay <span className="text-yellow-300 font-bold text-4xl">ưu đãi 5 triệu</span> cho 100 thành viên đầu tiên</p>

          {/* Nút vàng giữ nguyên làm điểm nhấn */}
          <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-2xl px-16 py-7 rounded-full shadow-2xl transform hover:scale-110 transition-all">
            Đăng Ký Ngay – Miễn Phí
          </button>
        </div>
      </section>
    </>
  );
}