import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-muted/20">
            <div className="container py-10  w-[90%] mx-auto   md:py-16">
                <div className="grid grid-cols-1  justify-center  gap-6 md:grid-cols-4 text-center">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-primary">BuruujTech</h3>
                        <p className="text-sm text-muted-foreground">
                            Empowering the next generation with world-class education and technology.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/programs" className="hover:text-primary">Programs</Link></li>
                            <li><Link href="/news" className="hover:text-primary">Latest News</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Programs</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/programs/software-dev" className="hover:text-primary">Software Development</Link></li>
                            <li><Link href="/programs/data-science" className="hover:text-primary">Data Science</Link></li>
                            <li><Link href="/programs/cyber-security" className="hover:text-primary">Cyber Security</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Contact Us</h3>
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>info@buruujtech.com</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>+123 456 7890</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>123 Tech Street, City</span>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} BuruujTech. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
