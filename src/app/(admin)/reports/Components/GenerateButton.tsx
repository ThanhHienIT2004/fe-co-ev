// src/app/history-analysis-service/components/GenerateButton.tsx
import React from "react";

interface GenerateButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ loading, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-5 rounded-xl font-bold text-xl transition-all transform hover:scale-105 ${
        disabled || loading
          ? "bg-gray-400 cursor-not-allowed text-gray-200"
          : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl"
      }`}
    >
      {loading ? "Đang tạo báo cáo..." : "Generate Report"}
    </button>
  );
};

export default GenerateButton;  