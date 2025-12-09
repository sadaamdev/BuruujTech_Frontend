"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import {
    LayoutDashboard,
    BookOpen,
    Newspaper,
    Image as ImageIcon,
    Users,
    Mail,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Programs", href: "/admin/programs", icon: BookOpen },
    { name: "News", href: "/admin/news", icon: Newspaper },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Partners", href: "/admin/partners", icon: Users },
    { name: "Messages", href: "/admin/messages", icon: Mail },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = auth.getCurrentUser();

    const handleLogout = () => {
        auth.logout();
    };

    return (
        <>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-20 px-4 border-b border-slate-800">
                        <Link href="/admin" className="flex items-center gap-3">
                            <div className="relative w-10 h-10 bg-white rounded-full p-1 overflow-hidden shrink-0">
                                <NextImage
                                    src="/logo_buruuj-removebg-preview.png"
                                    alt="Buruuj Admin"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-xl font-bold">Buruuj Admin</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                        isActive
                                            ? "bg-primary text-white"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    )}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User info and logout */}
                    <div className="p-4 border-t border-slate-800">
                        <div className="mb-3 px-4">
                            <p className="text-sm font-medium text-white">{user?.name}</p>
                            <p className="text-xs text-slate-400">{user?.email}</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
