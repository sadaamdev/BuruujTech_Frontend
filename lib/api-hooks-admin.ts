import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { auth } from './auth';

interface ProgramData {
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    image?: string;
    requirements?: string[];
}

interface NewsData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string;
    published?: boolean;
}

interface GalleryData {
    title: string;
    imageUrl: string;
    category?: string;
}

interface PartnerData {
    name: string;
    logoUrl: string;
    website?: string;
}

// Programs
export const useCreateProgram = () => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (data: ProgramData) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/programs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create program');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['programs'] });
        },
    });
};

export const useUpdateProgram = (slug: string) => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (data: Partial<ProgramData>) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/programs/${slug}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update program');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['programs'] });
            queryClient.invalidateQueries({ queryKey: ['program', slug] });
        },
    });
};

export const useDeleteProgram = () => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (slug: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/programs/${slug}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete program');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['programs'] });
        },
    });
};

// News
export const useCreateNews = () => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (data: NewsData) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/news`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create news');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};

export const useUpdateNews = (slug: string) => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (data: Partial<NewsData>) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/news/${slug}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update news');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
            queryClient.invalidateQueries({ queryKey: ['news', slug] });
        },
    });
};

export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (slug: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/news/${slug}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete news');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] });
        },
    });
};

// Gallery
export const useCreateGalleryItem = () => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (data: GalleryData) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/gallery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create gallery item');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};

export const useDeleteGalleryItem = () => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/gallery/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete gallery item');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};

// Partners
export const useCreatePartner = () => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (data: PartnerData) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/partners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to create partner');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners'] });
        },
    });
};

export const useDeletePartner = () => {
    const queryClient = useQueryClient();
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/partners/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete partner');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners'] });
        },
    });
};

// Contact Messages
export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    read?: boolean;
}

export const useContactMessages = () => {
    const token = auth.getToken();

    return useQuery({
        queryKey: ['contact-messages'],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/contact`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch messages');
            return response.json();
        },
    });
};

// Image Upload
export const useUploadImage = () => {
    const token = auth.getToken();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Content-Type is set automatically by the browser for FormData
                },
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to upload image');
            return response.json();
        },
    });
};
