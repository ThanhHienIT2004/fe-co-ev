// components/profile/ProfileCard.tsx
import { ProfileDTO } from '@/types/profile';

import {
  User,
  Phone,
  MapPin,
  IdCard,
  Calendar,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import LicenseImages from '../_components/LicenseImages';
import ProfileInfoItem from '../_components/ProfileInfoItem';

type Props = {
  profile: ProfileDTO;
};
  const { user_id} = useParams();
  console.log('idd', user_id)

export default function ProfileCard({ profile }: Props) {
  // const licenseImages = profile.license_image_url
  //   .split(',')
  //   .map((s) => s.trim())
  //   .filter(Boolean);

  // Tính thời gian còn lại của GPLX
  // const expiryDate = new Date(profile.driver_license_expiry);
  // const today = new Date();
  // const diffTime = Math.abs(expiryDate.getTime() - today.getTime());
  // const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  // const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header gradient */}
      <div className="bg-linear-to-r from-emerald-500 to-teal-600 h-32 relative">
        <div className="absolute -bottom-16 left-8">
          <div className="w-32 h-32 bg-white rounded-full p-2 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gray-200 border-4 border-white flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung */}
      <div className="pt-20 pb-10 px-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.full_name}</h1>
            <p className="text-gray-500 mt-1">Thành viên từ 2024 • Đã xác minh</p>
          </div>
          <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1" />
            Đã xác minh GPLX
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Cột trái */}
          <div className="space-y-7">
            <ProfileInfoItem
              icon={<IdCard className="w-5 h-5 text-emerald-600" />}
              label="Mã người dùng"
              value={`#${profile.userId.toString().padStart(5, '0')}`}
            />
            <ProfileInfoItem
              icon={<User className="w-5 h-5 text-emerald-600" />}
              label="Họ và tên"
              value={profile.full_name}
            />
            <ProfileInfoItem
              icon={<Phone className="w-5 h-5 text-emerald-600" />}
              label="Số điện thoại"
              value={profile.phone_number}
            />
            <ProfileInfoItem
              icon={<MapPin className="w-5 h-5 text-emerald-600" />}
              label="Địa chỉ"
              value={profile.address}
            />
          </div>

          {/* Cột phải */}
          <div className="space-y-7">
            <ProfileInfoItem
              icon={<IdCard className="w-5 h-5 text-emerald-600" />}
              label="Số giấy phép lái xe"
              value={profile.driver_license_number}
              className="font-mono"
            />
            <div>
              <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                <span>Ngày hết hạn</span>
              </div>
              {/* <p className="text-lg font-medium text-gray-900">
                {new Date(profile.driver_license_expiry).toLocaleDateString('vi-VN')}
                <span className="ml-3 text-green-600 font-medium">
                  Còn ~{diffYears} năm {diffMonths} tháng
                </span>
              </p> */}
            </div>

            {/* <LicenseImages urls={licenseImages.length > 0 ? licenseImages : ['/placeholder-license.jpg']} /> */}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="mt-10 flex gap-4">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-xl transition flex items-center">
            <Edit3 className="w-5 h-5 mr-2" />
            Chỉnh sửa hồ sơ
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-8 rounded-xl transition">
            Tải xuống thông tin
          </button>
        </div>
      </div>
    </div>
  );
}