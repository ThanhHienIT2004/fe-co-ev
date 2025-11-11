import React from "react";
import { UserProfile } from "@/types/profile.type";

export const EditInput = ({
  icon: Icon,
  label,
  value,
  name,
  onChange,
  type = "text",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  name: keyof UserProfile;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="py-3">
    <label className="flex items-center text-sm font-medium text-gray-500 mb-1">
      <Icon className="w-4 h-4 mr-2 text-teal-600" />
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
    />
  </div>
);
