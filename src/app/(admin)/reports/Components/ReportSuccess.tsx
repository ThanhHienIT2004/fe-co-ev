export default function ReportSuccess({ pdfUrl }: { pdfUrl: string }) {
  if (!pdfUrl) return null;

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300 rounded-2xl text-center animate-pulse">
      <p className="text-2xl font-bold text-green-800 mb-4">Report đã sẵn sàng!</p>
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition"
      >
        Mở PDF ngay
      </a>
    </div>
  );
}