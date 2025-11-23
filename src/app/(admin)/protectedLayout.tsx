"use client";

import { ReactNode } from "react";
import useLocalAuth from "@/libs/hooks/auth/useLocalAuth";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
    const { token, loading } = useLocalAuth();

    if (loading) return <div></div>;

    if (!token) return null;  // Chưa login → không render gì

    return (
        <div className='bg-gray-100 items-center justify-center'>
            {children}
        </div>
    );
};

export default ProtectedLayout;
