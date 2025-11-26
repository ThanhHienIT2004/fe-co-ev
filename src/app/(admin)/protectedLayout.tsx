"use client";

import { ReactNode } from "react";
import useLocalAuthAdmin from "@/libs/hooks/auth/useLocalAuthAdmin";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
    const { token, loading } = useLocalAuthAdmin();

    if (loading) return <div></div>;

    if (!token) return null;  // Chưa login → không render gì

    return (
        <div className='bg-gray-100 items-center justify-center'>
            {children}
        </div>
    );
};

export default ProtectedLayout;
