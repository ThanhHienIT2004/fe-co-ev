// app/components/Footer.tsx
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-teal-600 hover:opacity-80 transition"
            >
              <div
                className="size-10 rounded-xl grid place-items-center font-black text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
                }}
              >
                EV
              </div>
              <span className="text-xl font-bold tracking-tight">EVSharing</span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Nền tảng tiên phong về đồng sở hữu xe điện – tiết kiệm chi phí, bảo vệ môi trường.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-teal-100 rounded-full text-teal-600 hover:bg-teal-200 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-teal-100 rounded-full text-teal-600 hover:bg-teal-200 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-teal-100 rounded-full text-teal-600 hover:bg-teal-200 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Khám phá</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/vehicles" className="hover:text-teal-600 transition flex items-center gap-1">
                  Danh sách xe
                </Link>
              </li>
              <li>
                <Link href="/group" className="hover:text-teal-600 transition flex items-center gap-1">
                  Nhóm đồng sở hữu
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-teal-600 transition flex items-center gap-1">
                  Đặt lịch hẹn
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-600 transition flex items-center gap-1">
                  Dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Công ty</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-teal-600 transition flex items-center gap-1">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-teal-600 transition flex items-center gap-1">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-teal-600 transition flex items-center gap-1">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-teal-600 transition flex items-center gap-1">
                  Báo chí
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600" />
                <span>1900 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-600" />
                <a href="mailto:contact@evsharing.vn" className="hover:text-teal-600 transition">
                  contact@evsharing.vn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Hà Nội • TP.HCM • Đà Nẵng</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="font-semibold text-teal-600">EVSharing</span>. 
            Tất cả quyền được bảo lưu.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Thiết kế với <span className="text-red-500">tình yêu</span> cho tương lai xanh.
          </p>
        </div>
      </div>
    </footer>
  );
}