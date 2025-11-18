// src/app/history-analysis-service/components/PromptInput.tsx
import React from "react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-shadow shadow-sm resize-none"
      rows={5}
      placeholder="Ví dụ: Phân tích xu hướng sử dụng theo giờ trong ngày, vẽ biểu đồ top 10 user active nhất, so sánh với tuần trước..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default PromptInput;   