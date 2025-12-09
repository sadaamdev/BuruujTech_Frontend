import { jwtDecode } from 'jwt-decode';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

interface DecodedToken {
    email: string;
    sub: number;
    role: string;
    iat: number;
    exp: number;
}

const TOKEN_KEY = 'admin_token';

export const auth = {
    // Store token
    setToken(token: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, token);
        }
    },

    // Get token
    getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    },

    // Remove token
    removeToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY);
        }
    },

    // Check if authenticated
    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            // Check if token is expired
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        } catch {
            return false;
        }
    },

    // Get current user from token
    getCurrentUser(): User | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            return {
                id: decoded.sub,
                email: decoded.email,
                name: decoded.email.split('@')[0], // Extract name from email
                role: decoded.role,
            };
        } catch {
            return null;
        }
    },

    // Check if user is admin
    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user?.role === 'ADMIN';
    },

    // Logout
    logout() {
        this.removeToken();
        if (typeof window !== 'undefined') {
            window.location.href = '/admin/login';
        }
    },
};
