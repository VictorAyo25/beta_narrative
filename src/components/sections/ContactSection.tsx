'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { ContactFormData } from '@/types';
import { Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const contactSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    role: z.string().min(2, 'Please enter your current role'),
    journey: z.string().min(1, 'Please select your leadership journey stage'),
    challenge: z.string().optional(),
});

const journeyOptions = [
    { value: '', label: 'Where are you in your leadership journey?' },
    { value: 'mid-level', label: 'Mid-level professional moving into leadership' },
    { value: 'senior', label: 'Senior leader / Director' },
    { value: 'c-suite', label: 'C-Suite Executive' },
    { value: 'founder', label: 'Founder / Entrepreneur' },
];

export default function ContactSection() {
    const { content } = useContent();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const contact = content?.contact || {
        sectionLabel: 'Apply Now',
        title: 'Ready to be',
        titleEmphasis: 'found?',
        subtitle: 'We work with a limited number of leaders per cohort to ensure every brand gets the depth it deserves.',
        finePrint: 'Limited spots available at beta pricing. Once the cohort is full, the offer closes.',
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-[#15112E] overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#E8721A]/5 blur-[120px] pointer-events-none" />

            <div className="max-w-2xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center">
                        <SectionLabel>{contact.sectionLabel}</SectionLabel>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] text-[#FAF9FF] mt-5 mb-5">
                        {contact.title}{' '}
                        <em className="italic text-[#E8721A]">{contact.titleEmphasis}</em>
                    </h2>
                    <p className="text-sm text-[#B8A4E8]/60 font-light max-w-md mx-auto leading-relaxed">
                        {contact.subtitle}
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-3xl border border-[#6B4FAD]/20 bg-gradient-to-br from-[#1C1740]/80 to-[#15112E] p-7 sm:p-10"
                >
                    {/* Top accent */}
                    <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#E8721A]/40 to-transparent" />

                    {submitStatus === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={28} className="text-green-400" />
                            </div>
                            <h3 className="font-serif text-2xl text-[#FAF9FF] mb-3">Application Received</h3>
                            <p className="text-sm text-[#B8A4E8]/60 max-w-sm mx-auto leading-relaxed">
                                Thank you for your interest. We'll review your application and get back to you within 48 hours.
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <input
                                    {...register('fullName')}
                                    type="text"
                                    placeholder="Full name"
                                    className="w-full px-5 py-4 bg-[#6B4FAD]/8 border border-[#6B4FAD]/20 rounded-xl text-sm text-[#FAF9FF] placeholder-[#B8A4E8]/30 focus:border-[#E8721A]/50 focus:bg-[#6B4FAD]/12 focus:outline-none transition-all duration-300"
                                />
                                {errors.fullName && (
                                    <p className="text-xs text-red-400/80 mt-1.5 ml-1">{errors.fullName.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full px-5 py-4 bg-[#6B4FAD]/8 border border-[#6B4FAD]/20 rounded-xl text-sm text-[#FAF9FF] placeholder-[#B8A4E8]/30 focus:border-[#E8721A]/50 focus:bg-[#6B4FAD]/12 focus:outline-none transition-all duration-300"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-400/80 mt-1.5 ml-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Role */}
                            <div>
                                <input
                                    {...register('role')}
                                    type="text"
                                    placeholder="Current role and organisation"
                                    className="w-full px-5 py-4 bg-[#6B4FAD]/8 border border-[#6B4FAD]/20 rounded-xl text-sm text-[#FAF9FF] placeholder-[#B8A4E8]/30 focus:border-[#E8721A]/50 focus:bg-[#6B4FAD]/12 focus:outline-none transition-all duration-300"
                                />
                                {errors.role && (
                                    <p className="text-xs text-red-400/80 mt-1.5 ml-1">{errors.role.message}</p>
                                )}
                            </div>

                            {/* Leadership Journey */}
                            <div>
                                <select
                                    {...register('journey')}
                                    className="w-full px-5 py-4 bg-[#6B4FAD]/8 border border-[#6B4FAD]/20 rounded-xl text-sm text-[#FAF9FF] focus:border-[#E8721A]/50 focus:bg-[#6B4FAD]/12 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23AFA9CC' fill-opacity='0.3' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                                >
                                    {journeyOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            className="bg-[#15112E] text-[#FAF9FF]"
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.journey && (
                                    <p className="text-xs text-red-400/80 mt-1.5 ml-1">{errors.journey.message}</p>
                                )}
                            </div>

                            {/* Challenge (Optional) */}
                            <div>
                                <input
                                    {...register('challenge')}
                                    type="text"
                                    placeholder="Your biggest visibility challenge (optional)"
                                    className="w-full px-5 py-4 bg-[#6B4FAD]/8 border border-[#6B4FAD]/20 rounded-xl text-sm text-[#FAF9FF] placeholder-[#B8A4E8]/30 focus:border-[#E8721A]/50 focus:bg-[#6B4FAD]/12 focus:outline-none transition-all duration-300"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#E8721A] to-[#F5A96A] text-[#0D0B1F] text-sm font-semibold tracking-[0.12em] uppercase rounded-full hover:shadow-[0_0_40px_rgba(232,114,26,0.35)] transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    <>
                                        <Send size={15} />
                                        Secure My Spot
                                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </button>

                            {/* Error Message */}
                            {submitStatus === 'error' && (
                                <div className="flex items-center justify-center gap-2 text-red-400/80 text-sm">
                                    <AlertCircle size={14} />
                                    Something went wrong. Please try again.
                                </div>
                            )}

                            {/* Fine Print */}
                            <p className="text-[11px] text-[#B8A4E8]/25 text-center pt-2 leading-relaxed">
                                {contact.finePrint}
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
