// components/AboutUs.tsx

import { Users, Leaf, Zap, HeartHandshake, Target, Rocket, ShieldCheck, Globe } from "lucide-react";

export default function AboutUs() {
  return (
    <>
      {/* HERO ABOUT */}
      <section className="relative py-32 bg-linear-to-br from-teal-600 via-cyan-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-grid-white/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Chúng Tôi Là Ai?
          </h1>
          <p className="text-2xl md:text-3xl text-teal-50 max-w-5xl mx-auto leading-relaxed">
            Chúng tôi tin rằng tương lai của giao thông không phải là <span className="font-bold text-yellow-300">mỗi người một chiếc xe</span>,<br />
            mà là <span className="font-bold text-yellow-300">mỗi nhóm bạn cùng sở hữu một chiếc xe điện tuyệt vời</span>.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-12 h-12 text-teal-600" />
                <h2 className="text-4xl font-bold">Sứ Mệnh Của Chúng Tôi</h2>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Giúp <strong>hàng triệu người Việt</strong> tiếp cận xe điện cao cấp chỉ với chi phí nhỏ hơn rất nhiều,
                đồng thời giảm thiểu số lượng xe cá nhân, giảm tắc đường và bảo vệ môi trường sống cho thế hệ sau.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <Rocket className="w-12 h-12 text-cyan-600" />
                <h2 className="text-4xl font-bold">Tầm Nhìn Đến 2030</h2>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Trở thành nền tảng đồng sở hữu phương tiện xanh <strong>lớn nhất Đông Nam Á</strong>,
                với hơn <strong>1 triệu người dùng</strong> và <strong>200.000 chiếc xe điện</strong> được đồng sở hữu trên hệ thống.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY & ORIGIN */}
      <section className="py-24 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Câu Chuyện Bắt Đầu Từ...</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Năm 2022, 4 người bạn tại Sài Gòn cùng muốn sở hữu một chiếc <strong>VinFast VF e34</strong> để đi làm và đi chơi cuối tuần.
                </p>
                <p>
                  Nhưng giá xe quá cao so với thu nhập của mỗi người. Họ thử mua chung – và nhận ra: 
                  <strong>không có nền tảng nào hỗ trợ việc này một cách minh bạch và tự động</strong>.
                </p>
                <p className="font-semibold text-teal-600 dark:text-cyan-400 text-xl">
                  Thế là chúng tôi tự xây dựng một hệ thống để giải quyết chính vấn đề của mình — 
                  và quyết định chia sẻ nó cho tất cả mọi người.
                </p>
                <p>
                  Từ một nhóm 4 người bạn, đến nay chúng tôi đã giúp hơn <strong>2.800 người</strong> tại 63 tỉnh thành 
                  cùng nhau sở hữu hơn <strong>680 chiếc xe điện</strong>.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-linear-to-br from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 rounded-3xl p-8 shadow-2xl">
                <img 
                  src="/images/about-team-photo.jpg" 
                  alt="Đội ngũ sáng lập" 
                  className="rounded-2xl shadow-xl w-full object-cover h-96"
                />
                <p className="text-center mt-6 text-gray-700 dark:text-gray-300 font-medium">
                  4 người bạn sáng lập – Tháng 6/2022, quán cà phê quận 7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Giá Trị Cốt Lõi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: HeartHandshake, color: "teal", title: "Tin tưởng & minh bạch", desc: "Mọi giao dịch đều công khai, hợp đồng không thể sửa đổi" },
              { icon: Leaf, color: "emerald", title: "Bền vững với môi trường", desc: "Giảm 1 xe cá nhân = giảm 4,6 tấn CO₂ mỗi năm" },
              { icon: Zap, color: "yellow", title: "Công nghệ vì cộng đồng", desc: "Dùng công nghệ để làm điều tốt đẹp trở nên dễ dàng" },
              { icon: Users, color: "blue", title: "Cùng nhau tốt hơn", desc: "Chúng ta mạnh hơn khi chia sẻ và hợp tác" },
            ].map((value) => (
              <div key={value.title} className="text-center group">
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-${value.color}-100 dark:bg-${value.color}-900 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-12 h-12 text-${value.color}-600 dark:text-${value.color}-400`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section className="py-24 bg-linear-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Đội Ngũ Sáng Lập</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Những người đang thay đổi cách Việt Nam sở hữu xe</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { name: "Nguyễn Minh Quân", role: "CEO & Đồng sáng lập", desc: "8 năm kinh nghiệm fintech, cựu ZaloPay", img: "/public/images/images-default.jpg" },
              { name: "Trần Anh Tuấn", role: "CTO & Đồng sáng lập", desc: "Chuyên gia blockchain, từng làm tại Axie Infinity", img: "/team/tuan.jpg" },
              { name: "Lê Thị Mai Anh", role: "COO & Đồng sáng lập", desc: "Quản lý vận hành 10 năm, cựu Shopee", img: "/team/maianh.jpg" },
              { name: "Phạm Hoàng Nam", role: "CPO & Đồng sáng lập", desc: "Thiết kế sản phẩm, từng dẫn dắt MoMo redesign", img: "/team/nam.jpg" },
            ].map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-3xl w-full h-80" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <p className="text-white font-semibold">{member.role}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-teal-600 dark:text-cyan-400 font-medium">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-linear-to-r from-teal-600 to-cyan-600">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Bạn Muốn Tham Gia Hành Trình Này?
          </h2>
          <p className="text-xl text-teal-50 mb-12">
            Chúng tôi đang tìm kiếm những người cùng chí hướng để cùng xây dựng tương lai giao thông xanh Việt Nam.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/career" className="bg-white text-teal-600 px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl transition-all hover:scale-105">
              Xem Cơ Hội Việc Làm
            </a>
            <a href="/contact" className="bg-transparent border-3 border-white text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-white/10 transition-all">
              Liên Hệ Với Chúng Tôi
            </a>
          </div>
        </div>
      </section>
    </>
  );
}