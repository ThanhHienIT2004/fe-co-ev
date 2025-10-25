'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, UserCircle, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<{ email: string } | null>(null);

    // Nav links
    const navLinks = [
        { label: 'Trang Chủ', href: '/' },
        { label: 'Danh sách Xe', href: '/vehicles' },
        { label: 'Đặt lịch', href: '/booking' },
        { label: 'Liên Hệ', href: '/contact' },
        { label: 'Giới thiệu', href: '/about' },
        { label: 'Blog', href: '/post' }
    ];

    // Giả lập fetch session từ localStorage hoặc API
    useEffect(() => {
        const session = localStorage.getItem('session');
        if (session) {
            setUser(JSON.parse(session));
        }
    }, []);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('session');
        setUser(null);
    };

    return (
        <header className="fixed w-full top-0 z-50 bg-gradient-to-tr from-black via-gray-700 to-gray-900 transition-all duration-140">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="text-white font-bold text-white flex items-center gap-2">
                    <span className="text-white">🚗EVSharing</span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {navLinks.map(link => (
                        <Link
                            key={`${link.label}-${link.href}`} // key duy nhất
                            href={link.href}
                            className="text-white hover:text-gray-400 font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Auth Section */}
                    {!user ? (
                        <Link
                            href="/login"
                            className="text-white hover:text-gray-400 font-medium px-4 py-1 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md transition"
                        >
                            Đăng nhập
                        </Link>
                    ) : (
                        <div className="relative group ml-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-md text-sm font-medium text-gray-700 hover:bg-white/20 transition cursor-pointer">
                                <UserCircle className="w-5 h-5 text-white/90" />
                                {user.email}
                            </div>

                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white/10 backdrop-blur-md ring-1 ring-white/20 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150">
                                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Thông tin cá nhân
                                </Link>
                                <Link href="/profile/appointment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Lịch đặt xe của tôi
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <nav className="md:hidden bg-white/10 backdrop-blur-md flex flex-col px-4 py-3 space-y-2">
                    {navLinks.map(link => (
                        <Link
                            key={`mobile-${link.label}-${link.href}`}
                            href={link.href}
                            className="text-black hover:text-white font-medium block"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {!user ? (
                        <Link
                            href="/login"
                            className="text-teal-400 hover:text-white font-medium px-4 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
                        >
                            Đăng nhập
                        </Link>
                    ) : (
                        <div className="flex flex-col">
                            <span className="px-4 py-2 text-sm text-gray-700">{user.email}</span>
                            <Link href="/profile" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Thông tin cá nhân</Link>
                            <Link href="/profile/appointment" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Lịch đặt xe của tôi</Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </nav>
            )}
        </header>
    );
}
