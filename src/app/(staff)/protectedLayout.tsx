"use client";

import useLocalAuthStaff from "@/libs/hooks/auth/useLocalAuthStaff";
import { ReactNode } from "react";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
    const { token, loading } = useLocalAuthStaff();

    if (loading) return <div></div>;

    if (!token) return null;  // Chưa login → không render gì

    return (
        <div className='bg-gray-100 items-center justify-center'>
            {children}
        </div>
    );
};

export default ProtectedLayout;
