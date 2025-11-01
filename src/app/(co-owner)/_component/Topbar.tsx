import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="fixed top-0 left-64 right-0 bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-3">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="border-none focus:ring-0 outline-none text-sm"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
