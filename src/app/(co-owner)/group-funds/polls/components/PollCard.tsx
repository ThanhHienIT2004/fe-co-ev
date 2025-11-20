import Link from 'next/link';
import { Poll } from '@/types/poll.type';
import { format } from 'date-fns';

interface Props {
  poll: Poll;
  onClose?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function PollCard({ poll, onClose, onDelete }: Props) {
  const isActive = poll.status === 'active';
  const expires = poll.expiresAt ? new Date(poll.expiresAt) : null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold flex-1 pr-2 line-clamp-2">{poll.description}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {isActive ? 'Mở' : 'Đóng'}
        </span>
      </div>
      <div className="space-y-1 text-sm mb-4 text-black">
        {poll.costId && <p className="text-orange-600 text-xs">Chi phí #{poll.costId}</p>}
        <p className="text-xs">Tạo: {format(new Date(poll.createdAt), 'dd/MM HH:mm')}</p>
        {expires && <p className="text-red-600 text-xs">Hết hạn: {format(expires, 'dd/MM HH:mm')}</p>}
      </div>
      <div className="flex gap-2">
        <Link
          href={`/group-funds/polls/${poll.pollId}`}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm text-center hover:bg-blue-700"
        >
          Xem
        </Link>
        {isActive && onClose && (
          <button onClick={() => onClose(poll.pollId)} className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200">Đóng</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(poll.pollId)} className="px-3 py-2 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">Xóa</button>
        )}
      </div>
    </div>
  );
}
