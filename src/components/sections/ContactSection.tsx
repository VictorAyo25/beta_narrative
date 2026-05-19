'use client';

/**
 * Contact Section Component
 * 
 * Contact form with validation and submission handling.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import Divider from '../Divider';
import { ContactFormData } from '@/types';

// Form validation schema
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
        subtitle: 'We work with a limited number of leaders per cohort.',
        finePrint: 'Limited spots available at beta pricing.',
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
        <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#13103A] border-t border-[#534AB7]/25">
            <div className="max-w-xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionLabel className="justify-center">{contact.sectionLabel}</SectionLabel>
                    <Divider className="mx-auto" />
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#FAF9FF] mb-4">
                        {contact.title} <em className="italic text-[#E8721A]">{contact.titleEmphasis}</em>
                    </h2>
                    <p className="text-sm text-[#AFA9EC]/60 font-light mb-10">
                        {contact.subtitle}
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="text-left space-y-4"
                >
                    {/* Full Name */}
                    <div>
                        <input
                            {...register('fullName')}
                            type="text"
                            placeholder="Full name"
                            className="w-full px-4 py-3.5 bg-[#534AB7]/10 border border-[#534AB7]/35 rounded text-sm text-[#FAF9FF] placeholder-[#AFA9EC]/40 focus:border-[#E8721A] focus:outline-none transition-colors"
                        />
                        {errors.fullName && (
                            <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-3.5 bg-[#534AB7]/10 border border-[#534AB7]/35 rounded text-sm text-[#FAF9FF] placeholder-[#AFA9EC]/40 focus:border-[#E8721A] focus:outline-none transition-colors"
                        />
                        {errors.email && (
                            <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <input
                            {...register('role')}
                            type="text"
                            placeholder="Current role and organisation"
                            className="w-full px-4 py-3.5 bg-[#534AB7]/10 border border-[#534AB7]/35 rounded text-sm text-[#FAF9FF] placeholder-[#AFA9EC]/40 focus:border-[#E8721A] focus:outline-none transition-colors"
                        />
                        {errors.role && (
                            <p className="text-xs text-red-400 mt-1">{errors.role.message}</p>
                        )}
                    </div>

                    {/* Leadership Journey */}
                    <div>
                        <select
                            {...register('journey')}
                            className="w-full px-4 py-3.5 bg-[#534AB7]/10 border border-[#534AB7]/35 rounded text-sm text-[#FAF9FF] focus:border-[#E8721A] focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                            {journeyOptions.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    className="bg-[#13103A] text-[#FAF9FF]"
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.journey && (
                            <p className="text-xs text-red-400 mt-1">{errors.journey.message}</p>
                        )}
                    </div>

                    {/* Challenge (Optional) */}
                    <div>
                        <input
                            {...register('challenge')}
                            type="text"
                            placeholder="Your biggest visibility challenge (optional)"
                            className="w-full px-4 py-3.5 bg-[#534AB7]/10 border border-[#534AB7]/35 rounded text-sm text-[#FAF9FF] placeholder-[#AFA9EC]/40 focus:border-[#E8721A] focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#E8721A] text-[#FAF9FF] text-sm font-medium tracking-[0.14em] uppercase rounded hover:bg-[#F5A96A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {isSubmitting ? 'Submitting...' : 'Secure My Spot →'}
                    </button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <p className="text-sm text-green-400 text-center mt-4">
                            Thank you! Your application has been submitted successfully.
                        </p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="text-sm text-red-400 text-center mt-4">
                            Something went wrong. Please try again.
                        </p>
                    )}

                    {/* Fine Print */}
                    <p className="text-xs text-[#AFA9EC]/35 text-center mt-4">
                        {contact.finePrint}
                    </p>
                </motion.form>
            </div>
        </section>
    );
}
