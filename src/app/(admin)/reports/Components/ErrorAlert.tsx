import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  message?: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div className="animate-in slide-in-from-top-2 duration-500">
      <div className="flex items-center gap-3 p-5 bg-red-50 border-2 border-red-300 rounded-xl text-red-800 shadow-sm">
        <AlertCircle className="w-6 h-6 flex-shrink-0" />
        <div>
          <p className="font-semibold">Oops! Có lỗi xảy ra</p>
          <p className="text-sm mt-1 opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
}