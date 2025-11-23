import { Save, Edit3, X } from "lucide-react";

interface Props {
  editing: boolean;
  saving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfileEditActions = ({ editing, saving, onEdit, onSave, onCancel }: Props) => {
  if (!editing) {
    return (
      <button
        onClick={onEdit}
        className="flex items-center gap-4 px-8 py-4 bg-linear-to-r from-teal-500 to-cyan-500 text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
      >
        <Edit3 className="w-6 h-6" />
        Chỉnh sửa hồ sơ
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-3 px-8 py-4 bg-green-500 text-white text-lg font-bold rounded-2xl hover:bg-green-600 disabled:opacity-70 transition shadow-lg"
      >
        <Save className="w-6 h-6" />
        {saving ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
      <button
        onClick={onCancel}
        className="p-4 bg-gray-200 rounded-2xl hover:bg-gray-300 transition shadow-md"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};