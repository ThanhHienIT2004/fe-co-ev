// components/profile/ProfileInfoItem.tsx
import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  label: string;
  value: string | ReactNode;
  className?: string;
};

export default function ProfileInfoItem({ icon, label, value, className = '' }: Props) {
  return (
    <div className={className}>
      <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
      <p className="text-lg text-gray-900 font-medium">{value}</p>
    </div>
  );
}