import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Programs API
export const usePrograms = () => {
    return useQuery({
        queryKey: ['programs'],
        queryFn: async () => {
            const { data } = await api.get('/programs');
            return data;
        },
    });
};

export const useProgram = (slug: string) => {
    return useQuery({
        queryKey: ['program', slug],
        queryFn: async () => {
            const { data } = await api.get(`/programs/${slug}`);
            return data;
        },
        enabled: !!slug,
    });
};

// News/Blog API
export const useNews = () => {
    return useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const { data } = await api.get('/news');
            return data;
        },
    });
};

export const useNewsPost = (slug: string) => {
    return useQuery({
        queryKey: ['news', slug],
        queryFn: async () => {
            const { data } = await api.get(`/news/${slug}`);
            return data;
        },
        enabled: !!slug,
    });
};

// Gallery API
export const useGallery = () => {
    return useQuery({
        queryKey: ['gallery'],
        queryFn: async () => {
            const { data } = await api.get('/gallery');
            return data;
        },
    });
};

// Partners API
export const usePartners = () => {
    return useQuery({
        queryKey: ['partners'],
        queryFn: async () => {
            const { data } = await api.get('/partners');
            return data;
        },
    });
};

// Contact API
export const useContactMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            name: string;
            email: string;
            subject: string;
            message: string;
        }) => {
            const response = await api.post('/contact', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contact'] });
        },
    });
};

// Auth API
export const useLogin = () => {
    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const { data } = await api.post('/auth/login', credentials);
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
            }
            return data;
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: async (userData: {
            email: string;
            password: string;
            name?: string;
        }) => {
            const { data } = await api.post('/auth/register', userData);
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
            }
            return data;
        },
    });
};

export default api;
