import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-medium text-foreground">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
