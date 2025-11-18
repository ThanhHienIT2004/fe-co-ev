// components/profile/LicenseImages.tsx
import { Image } from 'lucide-react';

type Props = {
  urls: string[]; // mảng các URL ảnh (thường 1-2)
};

export default function LicenseImages({ urls }: Props) {
  return (
    <div>
      <div className="flex items-center text-sm font-medium text-gray-500 mb-3">
        <Image className="w-5 h-5 mr-2 text-emerald-600" />
        <span>Hình giấy phép lái xe</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {urls.map((url, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl shadow-lg cursor-zoom-in hover:shadow-2xl transition-shadow"
          >
            <img
              src={url}
              alt={`GPLX mặt ${idx === 0 ? 'trước' : 'sau'}`}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
              <Image className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition" />
            </div>
            <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-center py-2 text-sm">
              Mặt {idx === 0 ? 'trước' : 'sau'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}