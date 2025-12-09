interface PageHeaderProps {
    title: string;
    description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="bg-muted/30 py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-4 md:text-5xl">{title}</h1>
                {description && <p className="text-lg text-muted-foreground">{description}</p>}
            </div>
        </div>
    );
}
