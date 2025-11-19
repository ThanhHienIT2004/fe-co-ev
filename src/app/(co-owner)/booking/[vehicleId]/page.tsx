// "use client";


// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { bookingApi } from "@/libs/apis/booking";
// import { CreateBookingDto } from "@/types/booking.type";

// export default function BookNowPage() {
//   const params = useParams();
//   const vehicleIdParam = params?.vehicleId;
//   const vehicleId = Array.isArray(vehicleIdParam)
//     ? Number(vehicleIdParam[0])
//     : Number(vehicleIdParam || 0);
//   const vehicleId = Array.isArray(vehicleIdParam)
//     ? Number(vehicleIdParam[0])
//     : Number(vehicleIdParam || 0);

//   const isClient = typeof window !== "undefined";

//   // Lấy user_id từ localStorage
//   const storedUserId = isClient ? localStorage.getItem("user_id") : null;
//   const userId = storedUserId ? Number(storedUserId) : 0;

//   const [formData, setFormData] = useState<CreateBookingDto & { pickup?: string }>({
//     user_id: userId,
//     vehicle_id: vehicleId,
//     start_date: "",
//     end_date: "",
//     check_in_time: "",
//     check_out_time: "",
//     pickup: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Sync formData khi vehicleId hoặc userId thay đổi
//   useEffect(() => {
//     if (!isClient) return;
//     setFormData(prev => ({
//       ...prev,
//       user_id: userId ?? 0, // nếu userId null thì dùng 0
//       vehicle_id: vehicleId,
//     }));
//   }, [userId, vehicleId, isClient]);
//   }, [userId, vehicleId, isClient]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // Validate ngày giờ
//     // Validate ngày giờ
//     const start = new Date(`${formData.start_date}T${formData.check_in_time}`);
//     const end = new Date(`${formData.end_date}T${formData.check_out_time}`);

//     if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//       setError("Vui lòng nhập đầy đủ ngày và giờ hợp lệ.");
//       setLoading(false);
//       return;
//     }

//     if (end <= start) {
//       setError("Ngày kết thúc và giờ check-out phải sau ngày bắt đầu và giờ check-in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload: CreateBookingDto = {
//         user_id: formData.user_id,
//         vehicle_id: formData.vehicle_id,
//         start_date: formData.start_date,
//         end_date: formData.end_date,
//         check_in_time: formData.check_in_time,
//         check_out_time: formData.check_out_time,
//       };

//       await bookingApi.create(payload);
//       alert("✅ Đặt xe thành công! Chúng tôi sẽ liên hệ sớm.");

//       // Reset form
//       setFormData(prev => ({
//         ...prev,
//         start_date: "",
//         end_date: "",
//         check_in_time: "",
//         check_out_time: "",
//       }));
//     } catch (err: any) {
//       setError(err.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-16 px-6 flex flex-col items-center">
//       <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-10">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-800">Đặt Xe Ngay</h1>
//           <p className="text-gray-500 mt-2">
//             Đặt xe trực tiếp từ nhà cung cấp đã được xác minh
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Ngày đi / ngày về */}
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Ngày bắt đầu *
//               </label>
//               <input
//                 type="date"
//                 name="start_date"
//                 value={formData.start_date}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Ngày kết thúc *
//               </label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={formData.end_date}
//                 onChange={handleChange}
//                 required
//                 min={formData.start_date}
//                 className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
//               />
//             </div>
//           </div>

//           {/* Giờ check in / check out */}
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Giờ Check In *
//               </label>
//               <input
//                 type="time"
//                 name="check_in_time"
//                 value={formData.check_in_time}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Giờ Check Out *
//               </label>
//               <input
//                 type="time"
//                 name="check_out_time"
//                 value={formData.check_out_time}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
//               />
//             </div>
//           </div>

//           {/* Thông báo lỗi */}
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           {/* Nút gửi */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`font-semibold px-16 py-3 rounded-lg text-white transition-all ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-[#36b6cf] hover:bg-[#2ea3ba]"
//               }`}
//             >
//               {loading ? "Đang gửi..." : "Gửi yêu cầu"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
