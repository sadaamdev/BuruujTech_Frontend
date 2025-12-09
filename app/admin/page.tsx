"use client";

import { usePrograms, useNews, useGallery, usePartners } from "@/lib/api-hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Newspaper, Image as ImageIcon, Users, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function StatCard({ title, value, icon: Icon, isLoading }: { title: string; value: number; icon: any; isLoading: boolean }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="h-8 w-16" />
                ) : (
                    <div className="text-2xl font-bold">{value}</div>
                )}
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard() {
    const { data: programs, isLoading: programsLoading } = usePrograms();
    const { data: news, isLoading: newsLoading } = useNews();
    const { data: gallery, isLoading: galleryLoading } = useGallery();
    const { data: partners, isLoading: partnersLoading } = usePartners();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to your admin dashboard
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Programs"
                    value={programs?.length || 0}
                    icon={BookOpen}
                    isLoading={programsLoading}
                />
                <StatCard
                    title="News Posts"
                    value={news?.length || 0}
                    icon={Newspaper}
                    isLoading={newsLoading}
                />
                <StatCard
                    title="Gallery Items"
                    value={gallery?.length || 0}
                    icon={ImageIcon}
                    isLoading={galleryLoading}
                />
                <StatCard
                    title="Partners"
                    value={partners?.length || 0}
                    icon={Users}
                    isLoading={partnersLoading}
                />
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    <a
                        href="/admin/programs/new"
                        className="flex items-center justify-center p-6 border rounded-lg hover:bg-accent transition-colors"
                    >
                        <BookOpen className="mr-2 h-5 w-5" />
                        Add New Program
                    </a>
                    <a
                        href="/admin/news/new"
                        className="flex items-center justify-center p-6 border rounded-lg hover:bg-accent transition-colors"
                    >
                        <Newspaper className="mr-2 h-5 w-5" />
                        Create News Post
                    </a>
                    <a
                        href="/admin/gallery"
                        className="flex items-center justify-center p-6 border rounded-lg hover:bg-accent transition-colors"
                    >
                        <ImageIcon className="mr-2 h-5 w-5" />
                        Upload Images
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}
