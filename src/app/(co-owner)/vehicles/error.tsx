'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center py-10">
      <p className="text-red-600 text-xl mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Thử lại
      </button>
    </div>
  );
}