"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGroupFund } from "@/libs/hooks/useGroupFund";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { deposit } = useGroupFund();

  const fundId = Number(searchParams.get("fundId"));

  // amount phải là string
  const amount = String(searchParams.get("amount") || "0");

  // gateway cố định là VNPAY
  const gateway: "VNPAY" = "VNPAY";

  useEffect(() => {
    const processPayment = async () => {
      try {
        await deposit(fundId, {
          amount,     // string
          gateway,    // chỉ VNPAY
          fake: true,
        });

        setTimeout(() => {
          router.push(`/group-funds/fund/${fundId}`);
        }, 1500);
      } catch {
        alert("Lỗi xử lý thanh toán");
      }
    };

    processPayment();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-3">
          Thanh toán thành công!
        </h1>

        <p className="text-gray-700 text-lg mb-2">
          Bạn đã nạp{" "}
          <strong className="text-green-600">
            {parseInt(amount).toLocaleString("vi-VN")}đ
          </strong>
        </p>

        <p className="text-gray-500 mt-3">Đang chuyển về trang quỹ...</p>
      </div>
    </div>
  );
}
