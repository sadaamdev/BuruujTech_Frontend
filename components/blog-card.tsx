import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

interface BlogCardProps {
    title: string;
    slug: string;
    excerpt: string;
    image?: string;
    date: string;
}

export function BlogCard({ title, slug, excerpt, image, date }: BlogCardProps) {
    return (
        <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-secondary/30 flex items-center justify-center text-secondary-foreground/40 font-bold">
                    {image ? <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 hover:scale-105" /> : "News Image"}
                </div>
            </div>
            <CardHeader>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                    {excerpt}
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="link" asChild className="px-0 text-primary">
                    <Link href={`/news/${slug}`}>Read More</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
