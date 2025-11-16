// app/history/components/HistoryList.tsx
"use client";
import HistoryCard from './HistoryCard';
import EmptyState from './EmptyState';

interface HistoryListProps {
  history: any[];
}

export default function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) return <EmptyState />;

  return (
    <div className="space-y-6">
      {history.map((item) => (
        <HistoryCard key={item._id} item={item} />
      ))}
    </div>
  );
}