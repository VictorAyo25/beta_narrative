'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
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
        <div className="min-h-screen bg-[#0D0B1F] flex items-center justify-center px-5 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#6B4FAD]/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#E8721A]/6 blur-[80px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block">
                        <span className="font-serif text-2xl tracking-wide">
                            <span className="text-[#FAF9FF]">Beta</span>
                            <span className="text-[#E8721A]"> </span>
                            <span className="text-[#B8A4E8]">Narrative</span>
                        </span>
                    </Link>
                    <p className="text-[#9B8EC4] text-sm mt-3">Admin Dashboard</p>
                </div>

                {/* Card */}
                <div className="relative rounded-3xl border border-[#6B4FAD]/20 bg-gradient-to-br from-[#1C1740]/80 to-[#15112E] p-8 sm:p-10">
                    {/* Top accent */}
                    <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#E8721A]/40 to-transparent" />

                    {isResetMode ? (
                        <div>
                            <h2 className="font-serif text-2xl text-[#FAF9FF] mb-2">Reset Password</h2>
                            <p className="text-[#9B8EC4] text-sm mb-8">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            {resetSent ? (
                                <div className="text-center py-8">
                                    <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle size={24} className="text-green-400" />
                                    </div>
                                    <p className="text-[#FAF9FF] mb-2 font-medium">Check your email</p>
                                    <p className="text-[#9B8EC4] text-sm">
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
                                <form onSubmit={handleResetPassword} className="space-y-5">
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B8EC4]" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            className="w-full pl-11 pr-4 py-4 bg-[#6B4FAD]/8 border border-[#6B4FAD]/20 rounded-xl text-sm text-[#FAF9FF] placeholder-[#B8A4E8]/30 focus:border-[#E8721A]/50 focus:outline-none transition-all duration-300"
                                        />
                                    </div>

                                    {displayError && (
                                        <div className="flex items-center gap-2 text-red-400/80 text-sm">
                                            <AlertCircle size={14} />
                                            {displayError}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-gradient-to-r from-[#E8721A] to-[#F5A96A] text-[#0D0B1F] text-sm font-semibold tracking-[0.12em] uppercase rounded-full hover:shadow-[0_0_30px_rgba(232,114,26,0.3)] transition-all duration-300 disabled:opacity-50"
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
                                        className="w-full flex items-center justify-center gap-2 text-[#9B8EC4] text-sm hover:text-[#FAF9FF] transition-colors"
                                    >
                                        <ArrowLeft size={14} />
                                        Back to login
                                    </button>
                                </form>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h2 className="font-serif text-2xl text-[#FAF9FF] mb-2">Welcome Back</h2>
                            <p className="text-[#9B8EC4] text-sm mb-8">
                                Sign in to manage your site content
                            </p>

                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B8EC4]" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email address"
                                        className="w-full pl-11 pr-4 py-4 bg-[#6B4FAD]/8 border border-[#6B4FAD]/20 rounded-xl text-sm text-[#FAF9FF] placeholder-[#B8A4E8]/30 focus:border-[#E8721A]/50 focus:outline-none transition-all duration-300"
                                    />
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B8EC4]" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full pl-11 pr-4 py-4 bg-[#6B4FAD]/8 border border-[#6B4FAD]/20 rounded-xl text-sm text-[#FAF9FF] placeholder-[#B8A4E8]/30 focus:border-[#E8721A]/50 focus:outline-none transition-all duration-300"
                                    />
                                </div>

                                {displayError && (
                                    <div className="flex items-center gap-2 text-red-400/80 text-sm">
                                        <AlertCircle size={14} />
                                        {displayError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-[#E8721A] to-[#F5A96A] text-[#0D0B1F] text-sm font-semibold tracking-[0.12em] uppercase rounded-full hover:shadow-[0_0_30px_rgba(232,114,26,0.3)] transition-all duration-300 disabled:opacity-50"
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
                                    className="w-full text-[#9B8EC4] text-sm hover:text-[#E8721A] transition-colors text-center"
                                >
                                    Forgot your password?
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Back to Site */}
                <div className="text-center mt-8">
                    <Link href="/" className="text-[#9B8EC4] text-sm hover:text-[#E8721A] transition-colors link-underline inline-block">
                        ← Back to website
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
