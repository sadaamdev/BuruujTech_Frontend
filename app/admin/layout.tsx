"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Don't check auth on login page
        if (isLoginPage || !isClient) return;

        // Check authentication on mount
        if (!auth.isAuthenticated() || !auth.isAdmin()) {
            router.push("/admin/login");
        }
    }, [router, isLoginPage, isClient]);

    // Render login page without layout
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Show loading during hydration
    if (!isClient) {
        return null;
    }

    // Don't render anything if not authenticated
    if (!auth.isAuthenticated() || !auth.isAdmin()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <AdminSidebar />
            <main className="lg:pl-64">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

