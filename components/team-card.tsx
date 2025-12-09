import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NextImage from 'next/image';

interface TeamCardProps {
    name: string;
    role: string;
    image?: string;
    bio?: string;
}

export function TeamCard({ name, role, image, bio }: TeamCardProps) {
    return (
        <Card className="text-center hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-col items-center pb-2">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-muted relative">
                    {image ? (
                        <NextImage
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>
                <CardTitle className="text-xl">{name}</CardTitle>
                <p className="text-sm text-primary font-medium">{role}</p>
            </CardHeader>
            <CardContent>
                {bio && <p className="text-sm text-muted-foreground">{bio}</p>}
            </CardContent>
        </Card>
    );
}
