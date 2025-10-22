// app/book-now/page.tsx
"use client";

import { useState } from "react";

export default function BookNowPage() {
  const [formData, setFormData] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    user_id: "",
    pickup: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Booking form submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">BOOK NOW</h1>
          <p className="text-gray-500 mt-2">Book directly from verified supplier</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Trip start / end */}
          <div className="grid md:grid-cols-2 gap-8">
           <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Trip Date *</label>
              <div className="flex gap-3">
            <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
                />
               </div>
            </div>
            {/* Trip start */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start time *</label>
              <div className="flex gap-3">
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
                />
              
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
                />
                
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="grid md:grid-cols-2 gap-8">
            <input
              type="text"
              name="USER ID"
              placeholder="USER ID"
              value={formData.user_id}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-300"
            />
      
            <input
              type="text"
              name="pickup"
              placeholder="Pick up Location"
              value={formData.pickup}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#36b6cf] text-white font-semibold px-16 py-3 rounded-lg hover:bg-[#2ea3ba] transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
