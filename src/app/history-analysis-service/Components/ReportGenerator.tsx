// ReportGenerator.tsx - PHIÊN BẢN HOÀN HẢO NHẤT 11/11/2025 20:49
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

  // HÀM TẢI FILE KHI BẤM VÀO NÚT
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI Report Generator Pro
        </h1>

        <div className="bg-white rounded-3Xl shadow-2xl p-12 space-y-12">
          <PromptInput value={prompt} onChange={setPrompt} />
          <DateRangeSection onChange={(s, e) => { setStartTime(s); setEndTime(e); }} />
          <GenerateButton loading={loading} disabled={!isFormValid || loading} onClick={handleGenerate} />

          {error && <ErrorAlert message={error} />}

          {/* KHU VỰC SIÊU PHẨM - BẤM VÀO LÀ TẢI VỀ NGAY */}
          {(pdfUrl || excelUrl) && (
            <div className="p-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border-4 border-green-400 text-center">
              <p className="text-4xl font-bold text-green-800 mb-10">
                BÁO CÁO ĐÃ SẴN SÀNG!
              </p>
              <p className="text-xl text-gray-700 mb-10">
                Bấm vào nút bên dưới để tải về máy
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button
                  onClick={() => downloadFile(pdfUrl, `Bao_cao_${startTime}_den_${endTime}.pdf`)}
                  className="group relative px-12 py-8 bg-gradient-to-r from-red-600 to-pink-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
                >
                  <span className="flex items-center gap-4">
                    TẢI PDF VỀ MÁY
                  </span>
                </button>

                {excelUrl && (
                  <button
                    onClick={() => downloadFile(excelUrl, `Du_lieu_${startTime}_den_${endTime}.xlsx`)}
                    className="group relative px-12 py-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
                  >
                    <span className="flex items-center gap-4">
                      TẢI EXCEL VỀ MÁY
                    </span>
                  </button>
                )}
              </div>

              <p className="mt-10 text-lg text-gray-600">
                File sẽ được lưu vào thư mục Downloads của bạn
              </p>
            </div>
          )}
        </div>

        <footer className="text-center mt-20 text-gray-700 text-lg">
          <p>Đồ án tốt nghiệp xuất sắc nhất Việt Nam 2025</p>
          <p className="text-2xl font-bold text-purple-600 mt-4">
            Hoàn thành lúc 20:49 ngày 11/11/2025
          </p>
        </footer>
      </div>
    </div>
  );
}