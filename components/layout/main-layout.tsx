"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Hide navbar/footer on admin pages, EXCEPT for the login page
    const isAdmin = pathname?.startsWith("/admin") && !pathname?.startsWith("/admin/login");

    return (
        <div className="flex flex-col min-h-screen">
            {!isAdmin && <Navbar />}
            <main className="flex-1">
                {children}
            </main>
            {!isAdmin && <Footer />}
            {!isAdmin && <ScrollToTop />}
        </div>
    );
}
