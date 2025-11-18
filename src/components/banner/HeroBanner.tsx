'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background image */}
            <Image
                src="/images/herobanner.png"
                alt="Vehicle Banner"
                fill
                className="object-cover brightness-75"
                priority
            />  

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">EVSharing xin chào quý khách</h1>
                <p className="max-w-xl mb-6 text-lg">
                    EV Co-ownership & Cost-sharing System – nền tảng quản lý đồng sở hữu và chia sẻ chi phí xe điện, giúp các cộng đồng chủ xe tối ưu hoá việc sử dụng, bảo dưỡng và chi phí vận hành.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4">

                    <Link href="/ownership-groups">
                        <button className="bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-full font-semibold cursor-pointer transition-colors duration-300">
                            Vào nhóm đồng sở hữu ngay
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
}
