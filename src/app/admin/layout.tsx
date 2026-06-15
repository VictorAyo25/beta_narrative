'use client';

/**
 * Admin Layout
 * 
 * Wraps admin pages with authentication check.
 */

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (typeof window === 'undefined') return;
        // Use sessionStorage so this flag is tab-scoped and never bleeds
        // over to the main site after the admin tab is closed.
        sessionStorage.setItem('ignore_analytics', 'true');
        return () => {
            sessionStorage.removeItem('ignore_analytics');
        };
    }, []);

    useEffect(() => {
        // Don't redirect if on login page
        if (isLoginPage) return;

        // Redirect to login if not authenticated
        if (!loading && !user) {
            router.push('/admin/login');
        }
    }, [user, loading, router, isLoginPage]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#E5DAF5] flex items-center justify-center">
                <div className="text-[#8A86B8]">Loading...</div>
            </div>
        );
    }

    // Allow access to login page without auth
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Redirect if not authenticated
    if (!user) {
        return (
            <div className="min-h-screen bg-[#E5DAF5] flex items-center justify-center">
                <div className="text-[#8A86B8]">Redirecting...</div>
            </div>
        );
    }

    return <>{children}</>;
}
