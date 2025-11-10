import React from "react";

export const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) => (
  <div className="flex items-start justify-between py-4 border-b border-gray-100">
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-teal-600 flex-shrink-0" />
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
    <span className="text-sm font-semibold text-gray-900 text-right">
      {value || <span className="text-gray-400 italic">Chưa cập nhật</span>}
    </span>
  </div>
);
