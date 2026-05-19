'use client';

/**
 * Admin Login Page
 * 
 * Handles admin authentication with email/password and password reset.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
    const { login, resetPassword, loading, error, clearError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isResetMode, setIsResetMode] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        clearError();

        if (!email || !password) {
            setLocalError('Please fill in all fields');
            return;
        }

        try {
            await login(email, password);
        } catch (err) {
            // Error is handled by AuthContext
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        clearError();

        if (!email) {
            setLocalError('Please enter your email address');
            return;
        }

        try {
            await resetPassword(email);
            setResetSent(true);
        } catch (err) {
            // Error is handled by AuthContext
        }
    };

    const displayError = localError || error;

    return (
        <div className="min-h-screen bg-[#0D0B1F] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <span className="font-serif text-2xl text-[#E8721A]">Beta Narrative</span>
                    </Link>
                    <p className="text-[#8A86B8] text-sm mt-2">Admin Dashboard</p>
                </div>

                {/* Login/Reset Card */}
                <div className="bg-[#13103A] border border-[#534AB7]/30 rounded-lg p-8">
                    {isResetMode ? (
                        // Password Reset Form
                        <div>
                            <h2 className="font-serif text-2xl text-[#FAF9FF] mb-2">Reset Password</h2>
                            <p className="text-[#8A86B8] text-sm mb-6">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            {resetSent ? (
                                <div className="text-center py-8">
                                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                                    <p className="text-[#FAF9FF] mb-2">Check your email</p>
                                    <p className="text-[#8A86B8] text-sm">
                                        We've sent a password reset link to {email}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsResetMode(false);
                                            setResetSent(false);
                                        }}
                                        className="mt-6 text-[#E8721A] text-sm hover:underline"
                                    >
                                        Back to login
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A86B8]" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email address"
                                                className="w-full pl-10 pr-4 py-3 bg-[#534AB7]/10 border border-[#534AB7]/35 rounded text-sm text-[#FAF9FF] placeholder-[#AFA9EC]/40 focus:border-[#E8721A] focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {displayError && (
                                        <p className="text-red-400 text-sm">{displayError}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-[#E8721A] text-[#FAF9FF] text-sm font-medium tracking-wider uppercase rounded hover:bg-[#F5A96A] transition-colors disabled:opacity-50"
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsResetMode(false);
                                            setLocalError('');
                                            clearError();
                                        }}
                                        className="w-full flex items-center justify-center gap-2 text-[#8A86B8] text-sm hover:text-[#FAF9FF] transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to login
                                    </button>
                                </form>
                            )}
                        </div>
                    ) : (
                        // Login Form
                        <div>
                            <h2 className="font-serif text-2xl text-[#FAF9FF] mb-2">Welcome Back</h2>
                            <p className="text-[#8A86B8] text-sm mb-6">
                                Sign in to manage your site content
                            </p>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A86B8]" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            className="w-full pl-10 pr-4 py-3 bg-[#534AB7]/10 border border-[#534AB7]/35 rounded text-sm text-[#FAF9FF] placeholder-[#AFA9EC]/40 focus:border-[#E8721A] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A86B8]" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            className="w-full pl-10 pr-4 py-3 bg-[#534AB7]/10 border border-[#534AB7]/35 rounded text-sm text-[#FAF9FF] placeholder-[#AFA9EC]/40 focus:border-[#E8721A] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {displayError && (
                                    <p className="text-red-400 text-sm">{displayError}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[#E8721A] text-[#FAF9FF] text-sm font-medium tracking-wider uppercase rounded hover:bg-[#F5A96A] transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsResetMode(true);
                                        setLocalError('');
                                        clearError();
                                    }}
                                    className="w-full text-[#8A86B8] text-sm hover:text-[#E8721A] transition-colors"
                                >
                                    Forgot your password?
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Back to Site */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-[#8A86B8] text-sm hover:text-[#E8721A] transition-colors">
                        ← Back to website
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
