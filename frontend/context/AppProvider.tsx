"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

interface AppProviderType {
    isLoading: boolean;
    authToken: string | null;
    user: any | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
    logout: () => void;
}

const AppContext = createContext<AppProviderType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const initialized = useRef(false);

    // بررسی توکن فقط یک بار در زمان mount
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const token = cookies.get('authToken');
        const userData = localStorage.getItem('user');
        
        if (token) {
            setAuthToken(token);
            if (userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (e) {
                    console.error("Error parsing user data:", e);
                }
            }
        }
        
        setIsLoading(false);
    }, []);

    // محافظت از مسیرها - با استفاده از useCallback و وابستگی‌های مناسب
    useEffect(() => {
        if (!isLoading) {
            const publicPaths = ['/auth'];
            const isPublicPath = publicPaths.includes(pathname);
            
            if (!authToken && !isPublicPath) {
                router.push('/auth');
            }
            
            if (authToken && pathname === '/auth') {
                router.push('/dashboard');
            }
        }
    }, [authToken, isLoading, pathname, router]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });

            if (response.data.status) {
                cookies.set("authToken", response.data.token, { expires: 7 });
                
                if (response.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    setUser(response.data.user);
                }
                
                setAuthToken(response.data.token);
                toast.success("Login Successful");
            } else {
                toast.error(response.data.message || "Invalid login details");
            }
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string, password_confirmation: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
                password_confirmation
            });

            if (response.data.status) {
                toast.success("Registration successful! Please login.");
            } else {
                toast.error(response.data.message || "Registration failed");
            }
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = useCallback(() => {
        // پاک کردن همه داده‌ها
        setAuthToken(null);
        setUser(null);
        cookies.remove("authToken");
        localStorage.removeItem('user');
        toast.success("Logged out successfully");
        
        // هدایت به صفحه auth
        router.push('/auth');
    }, [router]);

    const contextValue: AppProviderType = {
        isLoading,
        authToken,
        user,
        login,
        register,
        logout
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const myAppHook = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("myAppHook must be used within AppProvider");
    }
    return context;
};