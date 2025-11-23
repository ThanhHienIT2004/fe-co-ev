import { motion } from "framer-motion";

export const ProfileHeader = () => (
  <div className="bg-linear-to-r from-teal-600 to-cyan-600 py-5">
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center text-white"
    >
      <h1 className="text-5xl md:text-6xl font-black mb-4">
        Hồ sơ cá nhân
      </h1>
      <p className="text-xl md:text-2xl text-teal-50">
        Quản lý thông tin và giấy tờ của bạn
      </p>
    </motion.div>
  </div>
);