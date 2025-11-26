"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useLocalAuth = () => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("role");

        if (savedToken != 'STAFF') {
            router.push("/");      // ❌ Chưa login → đá về trang chủ
        } else {
            setToken(savedToken);  // ✅ Có token → cho vào trang
        }

        setLoading(false);
    }, [router]);

    return { token, loading };
};

export default useLocalAuth;
