"use client";
import React from "react";

export const ProfileSkeleton = () => (
  <div className="bg-gray-100 min-h-screen p-4 md:p-8">
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 animate-pulse">
      {/* Cột trái: Avatar */}
      <div className="lg:w-1/3">
        <div className="bg-gray-300 rounded-2xl shadow-lg p-8 h-64"></div>
      </div>

      {/* Cột phải: Info */}
      <div className="lg:w-2/3 space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-1/2 h-8 bg-gray-300 rounded-md mb-8"></div>
          <div className="space-y-4">
            <div className="w-full h-5 bg-gray-200 rounded-md"></div>
            <div className="w-full h-5 bg-gray-200 rounded-md"></div>
            <div className="w-2/3 h-5 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-1/3 h-8 bg-gray-300 rounded-md mb-6"></div>
          <div className="space-y-4">
            <div className="w-full h-5 bg-gray-200 rounded-md"></div>
            <div className="w-2/3 h-5 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
