'use client';

/**
 * Authentication Context Provider
 * 
 * Manages admin authentication state using Firebase Auth.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
    User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    changePassword: (newPassword: string) => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setError(null);
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(getAuthErrorMessage(err.code));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            router.push('/admin/login');
        } catch (err: any) {
            console.error('Logout error:', err);
            setError('Failed to sign out');
        }
    };

    const resetPassword = async (email: string) => {
        try {
            setError(null);
            await sendPasswordResetEmail(auth, email);
        } catch (err: any) {
            console.error('Password reset error:', err);
            setError(getAuthErrorMessage(err.code));
            throw err;
        }
    };

    const changePassword = async (newPassword: string) => {
        try {
            setError(null);
            if (!user) throw new Error('No user logged in');
            await updatePassword(user, newPassword);
        } catch (err: any) {
            console.error('Change password error:', err);
            setError(getAuthErrorMessage(err.code));
            throw err;
        }
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                logout,
                resetPassword,
                changePassword,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

/**
 * Converts Firebase auth error codes to user-friendly messages.
 */
function getAuthErrorMessage(code: string): string {
    switch (code) {
        case 'auth/user-not-found':
            return 'No account found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-email':
            return 'Invalid email address format.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/requires-recent-login':
            return 'Please log in again to change your password.';
        default:
            return 'An error occurred. Please try again.';
    }
}
