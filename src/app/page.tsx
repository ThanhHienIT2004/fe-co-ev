"use client";

import React, { useState } from "react";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [vehicles, setVehicles] = useState([
    { id: "EV001", model: "Tesla Model 3", owner: "Alice", status: "Active", battery: 88 },
    { id: "EV002", model: "Nissan Leaf", owner: "Bob", status: "Charging", battery: 54 },
    { id: "EV003", model: "Hyundai Ioniq 5", owner: "Charlie", status: "Inactive", battery: 12 },
    { id: "EV004", model: "VinFast VF8", owner: "David", status: "Active", battery: 97 },
  ]);

  const filtered = vehicles.filter(v =>
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🚗 EV Co-Ownership Dashboard
            </h1>
            <p className="text-gray-600">
              Quản lý xe điện, trạng thái sạc, và chủ sở hữu.
            </p>
          </header>

          <div className="mb-4 flex items-center gap-2">
            <input
                type="text"
                placeholder="🔍 Tìm kiếm xe..."
                className="flex-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
                onClick={() => alert("Thêm xe mới (demo)")}>
              + Thêm xe
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="w-full border-collapse">
              <thead className="bg-blue-100 text-left">
              <tr>
                <th className="p-3">Mã xe</th>
                <th className="p-3">Model</th>
                <th className="p-3">Chủ sở hữu</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3 text-center">Pin (%)</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {filtered.length > 0 ? (
                  filtered.map(v => (
                      <tr key={v.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-medium">{v.id}</td>
                        <td className="p-3">{v.model}</td>
                        <td className="p-3">{v.owner}</td>
                        <td className={`p-3 font-semibold ${
                            v.status === "Active"
                                ? "text-green-600"
                                : v.status === "Charging"
                                    ? "text-blue-500"
                                    : "text-gray-400"
                        }`}>
                          {v.status}
                        </td>
                        <td className="p-3 text-center">
                          <div
                              className={`inline-block px-3 py-1 rounded-full ${
                                  v.battery > 70
                                      ? "bg-green-100 text-green-700"
                                      : v.battery > 30
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-red-100 text-red-700"
                              }`}>
                            {v.battery}%
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <button
                              onClick={() => alert(`Chi tiết xe ${v.id}`)}
                              className="text-blue-600 hover:underline">
                            Xem
                          </button>
                          <button
                              onClick={() => alert(`Xóa xe ${v.id}`)}
                              className="text-red-500 hover:underline ml-3">
                            Xóa
                          </button>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      Không tìm thấy xe nào.
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
  );
}
