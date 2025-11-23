// components/EVCoOwnershipHero.tsx
import { Users, ShieldCheck, Car, Settings, BarChart3, Zap, Wallet, Calendar, Smartphone, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function EVCoOwnershipHero() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-br from-teal-600 via-cyan-500 to-blue-600 dark:from-teal-900 dark:via-cyan-800 dark:to-blue-900 pt-32 pb-48">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-grid-white/10 bg-grid"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">Nền tảng đồng sở hữu xe điện đầu tiên tại Việt Nam</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Sở Hữu Xe Điện
            <br />
            <span className="text-yellow-300">Chỉ Từ 20% Giá Trị</span>
          </h1>

          <p className="text-xl md:text-2xl text-teal-50 max-w-4xl mx-auto mb-12 leading-relaxed">
            Cùng bạn bè, gia đình hoặc đồng nghiệp sở hữu một chiếc xe điện cao cấp với chi phí chỉ bằng 1/5. 
            Hệ thống tự động chia chi phí, đặt lịch, quản lý quyền sở hữu – minh bạch tuyệt đối.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-white text-teal-600 px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-105 flex items-center gap-3">
              Bắt Đầu Đồng Sở Hữu Ngay
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/10 transition-all">
              Xem Demo Hệ Thống
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-12 text-white/80">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-yellow-300" />
              <span>Hợp đồng thông minh tự động</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-yellow-300" />
              <span>Đã phục vụ 200+ nhóm đồng sở hữu</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-yellow-300" />
              <span>Tiết kiệm trung bình 68% chi phí</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FEATURES - LARGE CARDS */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Đồng Sở Hữu Xe Điện Đã Thay Đổi Như Thế Nào?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Không cần mua cả chiếc xe trị giá hàng tỷ đồng. Giờ đây bạn có thể sở hữu 25%, 33% hay 50% – 
              và chỉ trả đúng phần đó, mọi thứ còn lại đều được tự động hóa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="group relative bg-linear-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 rounded-3xl p-10 border border-teal-200 dark:border-teal-800 overflow-hidden hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-teal-700 dark:text-cyan-400 mb-4">Đồng Sở Hữu Linh Hoạt</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Mua chung từ 2–6 người. Tự do chọn tỷ lệ sở hữu: 20%, 25%, 33%, 50%... 
                  Hợp đồng được ký điện tử và lưu trữ trên blockchain.
                </p>
                <ul className="space-y-3">
                  {["Tự do chuyển nhượng phần sở hữu", "Thêm/bớt thành viên dễ dàng", "Bảo hiểm theo tên từng người"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-3xl p-10 border border-blue-200 dark:border-blue-800 overflow-hidden hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-700 dark:text-indigo-400 mb-4">Lịch Sử Dụng Thông Minh</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Đặt lịch tự động, tránh trùng lặp. Hệ thống gợi ý lịch công bằng dựa trên tỷ lệ sở hữu.
                </p>
                <ul className="space-y-3">
                  {["Đặt lịch qua app 1 giây", "Nhắc nhở tự động", "Ưu tiên theo tỷ lệ sở hữu"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-3xl p-10 border border-purple-200 dark:border-purple-800 overflow-hidden hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Wallet className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-700 dark:text-pink-400 mb-4">Chia Chi Phí Tự Động</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Mọi chi phí (sạc, bảo dưỡng, bảo hiểm, đăng kiểm) được tự động chia theo % sở hữu hoặc km sử dụng.
                </p>
                <ul className="space-y-3">
                  {["Thống kê chi tiết theo thời gian thực", "Thanh toán tự động qua ví điện tử", "Báo cáo cuối tháng chi tiết"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Chỉ 4 Bước Để Sở Hữu Xe Điện Chung</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Tạo nhóm đồng sở hữu", desc: "Mời bạn bè, gia đình tham gia qua link riêng", icon: Users },
              { step: "02", title: "Chọn xe & ký hợp đồng", desc: "Chọn mẫu xe điện yêu thích, ký hợp đồng điện tử", icon: Car },
              { step: "03", title: "Thanh toán phần sở hữu", desc: "Chỉ trả đúng phần % bạn sở hữu", icon: Wallet },
              { step: "04", title: "Nhận xe & sử dụng ngay", desc: "Xe được giao tận nhà, bắt đầu đặt lịch sử dụng", icon: Zap },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-4xl font-bold text-teal-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <item.icon className="w-12 h-12 mx-auto mb-4 text-teal-600 dark:text-cyan-400" />
                <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Lợi Ích Khi Đồng Sở Hữu Qua Nền Tảng</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: ShieldCheck, title: "An toàn & minh bạch tuyệt đối", desc: "Hợp đồng thông minh, không thể sửa đổi, lưu trữ vĩnh viễn" },
              { icon: Smartphone, title: "Quản lý hoàn toàn trên điện thoại", desc: "Đặt lịch, xem chi phí, chat nhóm – tất cả trong 1 app" },
              { icon: BarChart3, title: "Tiết kiệm lên đến 70%", desc: "Chỉ trả 1/4–1/3 giá xe nhưng vẫn sở hữu & sử dụng đầy đủ" },
              { icon: Settings, title: "Tự động hóa 100%", desc: "Không cần họp, không cần nhắc nợ, hệ thống lo hết" },
              { icon: Car, title: "Hỗ trợ mọi dòng xe điện", desc: "VinFast, Tesla, BYD, Hyundai, Kia..." },
              { icon: Users, title: "Cộng đồng đồng sở hữu lớn nhất VN", desc: "Kết nối với hàng ngàn người cùng sở hữu xe điện" },
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-5 p-6 rounded-2xl hover:bg-teal-50 dark:hover:bg-teal-950/50 transition-all">
                <benefit.icon className="w-12 h-12 text-teal-600 dark:text-cyan-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-xl mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-linear-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Sẵn Sàng Sở Hữu Xe Điện Chung?
          </h2>
          <p className="text-xl text-teal-50 mb-12">
            Hàng trăm nhóm đã tiết kiệm hàng tỷ đồng nhờ đồng sở hữu xe điện thông minh.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-teal-600 px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl transition-all hover:scale-105">
              Tạo Nhóm Đồng Sở Hữu Miễn Phí
            </button>
            <button className="bg-transparent border-3 border-white text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-white/10 transition-all">
              Liên hệ tư vấn 1-1
            </button>
          </div>
        </div>
      </section>
    </>
  );
}