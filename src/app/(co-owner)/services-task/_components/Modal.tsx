// app/service-tasks/_components/Modal.tsx
import { XCircle } from 'lucide-react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black flex items-center gap-2 text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
            aria-label="Đóng"
          >
            <XCircle className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}