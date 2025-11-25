"use client";

interface Props {
  editing: boolean;
  saving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileEditActions({
  editing,
  saving,
  onEdit,
  onSave,
  onCancel,
}: Props) {
  return (
    <div className="flex gap-3">
      {!editing && (
        <button onClick={onEdit}>Chỉnh sửa</button>
      )}

      {editing && (
        <>
          <button disabled={saving} onClick={onSave}>
            {saving ? "Đang lưu..." : "Lưu"}
          </button>

          <button onClick={onCancel}>
            Hủy
          </button>
        </>
      )}
    </div>
  );
}
