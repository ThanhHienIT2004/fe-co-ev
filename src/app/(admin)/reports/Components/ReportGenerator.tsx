// ReportGenerator.tsx - PHIÊN BẢN XANH LÁ CÂY NHẠT HOÀN HẢO NHẤT VIỆT NAM 2025
"use client";

import { useState, useEffect } from "react";
import PromptInput from "./PromptInput";
import DateRangeSection from "./DateRangeSection";
import GenerateButton from "./GenerateButton";
import ErrorAlert from "./ErrorAlert";

export default function ReportGenerator() {
  const [prompt, setPrompt] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [excelUrl, setExcelUrl] = useState("");
  const [error, setError] = useState("");

  const isFormValid = prompt.trim() !== "" && startTime && endTime;

  const downloadFile = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      window.open(url, "_blank");
    }
  };

  const handleGenerate = async () => {
    if (!isFormValid) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setPdfUrl("");
    setExcelUrl("");
    setError("");

    try {
      const payload = {
        prompt: prompt.trim(),
        startTime: startTime,
        endTime: endTime,
        startTimeVN: startTime.split("-").reverse().join("/"),
        endTimeVN: endTime.split("-").reverse().join("/"),
      };

      const res = await fetch("http://localhost:8083/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Lỗi ${res.status}: ${text}`);
      }

      const raw = await res.json();
      let data = typeof raw.data === "string" ? JSON.parse(raw.data) : (raw.data || raw);

      if (!data.pdfUrl) throw new Error("Không có link PDF");

      setPdfUrl(data.pdfUrl);
      if (data.excelUrl) setExcelUrl(data.excelUrl);

    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header xanh lá nhạt siêu đẹp */}
        <h1 className="text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent drop-shadow-2xl">
          AI Report Generator
        </h1>

        {/* Card chính - xanh lá nhạt dịu mắt */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 space-y-12 border-4 border-green-200">
          <PromptInput value={prompt} onChange={setPrompt} />
          <DateRangeSection onChange={(s, e) => { setStartTime(s); setEndTime(e); }} />
          <GenerateButton loading={loading} disabled={!isFormValid || loading} onClick={handleGenerate} />

          {error && <ErrorAlert message={error} />}

          {/* Khu vực thành công - xanh lá cây tươi mát */}
          {(pdfUrl || excelUrl) && (
            <div className="p-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl border-4 border-green-400 text-center animate-pulse">
              <p className="text-4xl font-bold text-green-800 mb-10">
                BÁO CÁO ĐÃ SẴN SÀNG!
              </p>
              <p className="text-xl text-green-700 mb-10">
                Bấm nút bên dưới để tải về máy bạn nhé
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button
                  onClick={() => downloadFile(pdfUrl, `Bao_cao_${startTime}_den_${endTime}.pdf`)}
                  className="px-12 py-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
                >
                  TẢI PDF VỀ MÁY
                </button>

                {excelUrl && (
                  <button
                    onClick={() => downloadFile(excelUrl, `Du_lieu_${startTime}_den_${endTime}.xlsx`)}
                    className="px-12 py-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
                  >
                    TẢI EXCEL VỀ MÁY
                  </button>
                )}
              </div>

              <p className="mt-10 text-lg text-green-600 font-medium">
                File sẽ nằm trong thư mục Downloads của bạn
              </p>
            </div>
          )}
        </div>

        {/* Footer xanh lá dễ thương */}
        <footer className="text-center mt-20 text-green-700">
          <p className="text-xl font-medium">Chỉ quản trị viên mới được lấy báo cáo</p>
        </footer>
      </div>
    </div>
  );
}