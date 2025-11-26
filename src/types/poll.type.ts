// src/types/poll.ts
export interface PollOption {
  optionId: number;
  content: string;
  voteCount: number;
}

export interface Poll {
  pollId: number;
  groupId: number;
  costId?: number | null;
  description: string;
  createdBy: number;                    // backend trả về số (userId)
  createdAt: string;                    // ISO string: "2025-04-05T10:30:00"
  expiresAt?: string | null;            // ISO string hoặc null
  endAt?: string | number | Date | null; // chấp nhận linh hoạt (backend có thể trả string hoặc timestamp)
  closedAt?: string | null;             // khi đóng bình chọn
  status: 'active' | 'CLOSED';            // chuẩn với backend của bạn (OPEN/CLOSED)
  title?: string;                       // nếu PollCard cần hiển thị tiêu đề riêng
  totalVotes?: number;                  // tổng số phiếu
  options?: PollOption[];               // danh sách lựa chọn (Yes/No hoặc tùy chọn)
}

export interface CreatePollRequest {
  groupId: number;
  description: string;
  costId?: number | null;
  expiresAt?: string | null; // gửi dưới dạng ISO string hoặc null
}