import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface ProgramCardProps {
    title: string;
    slug: string;
    shortDescription: string;
    image?: string;
    duration?: string; // Optional for now
    level?: string;   // Optional for now
}

export function ProgramCard({ title, slug, shortDescription, image, duration = "3 Months", level = "Beginner" }: ProgramCardProps) {
    return (
        <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                {/* Placeholder or actual image */}
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-primary/40 font-bold text-lg">
                    {image ? <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 hover:scale-105" /> : "Program Image"}
                </div>
                <Badge className="absolute top-4 right-4">{level}</Badge>
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-2 text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground mb-4">
                    {shortDescription}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {duration}
                    </div>
                    <div className="flex items-center">
                        <BookOpen className="mr-1 h-3 w-3" />
                        On-site
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/programs/${slug}`}>
                        View Program <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
