'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'; // Added SheetTitle import
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'News', href: '/news' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] h-16 items-center px-4 md:px-8">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center justify-start space-x-2 w-fit">
                    <Image
                        src="/logo_buruuj-removebg-preview.png"
                        alt="BuruujTech Logo"
                        width={60}
                        height={60}
                        className="object-contain"
                    />
                    <span className="text-xl font-bold text-primary">BuruujTech</span>
                </Link>

                {/* Center: Navigation */}
                <div className="hidden lg:flex justify-center">
                    <nav className="flex items-center space-x-2 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 rounded-full transition-colors hover:bg-accent hover:text-accent-foreground",
                                    (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                                        ? "bg-accent/50 text-foreground font-semibold"
                                        : "text-foreground/60"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right: Buttons */}
                <div className="flex items-center justify-end space-x-2">
                    <Link href="/admin/login">
                        <Button variant="ghost" size="sm" className="hidden lg:flex">
                            Login
                        </Button>
                    </Link>
                    <Button variant="outline" className="hidden lg:flex">Apply Now</Button>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetTitle className="text-center">Menu</SheetTitle> {/* Added SheetTitle for accessibility */}
                            <div className="flex flex-col space-y-4 mt-4 items-center text-center">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-primary",
                                            pathname === link.href ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/admin/login"
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium transition-colors hover:text-primary text-muted-foreground"
                                >
                                    Login
                                </Link>
                                <Button className="w-full mt-4">Apply Now</Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
