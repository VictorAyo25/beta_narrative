'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { ContactFormData } from '@/types';
import { CheckCircle, AlertCircle, ChevronDown, Check } from 'lucide-react';
import CalendlyEmbed from '../CalendlyEmbed';
import { trackEvent } from '@/lib/analytics';

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

const STEPS = ['Your details', 'Pick a time'] as const;

const inputClasses =
    'w-full px-5 py-4 rounded-md bg-[#E6DBF6] border border-[#2A2342]/12 text-sm text-[#2A2342] placeholder-[#6E6587] focus:border-[#E8721A] focus:bg-white/60 focus:outline-none transition-colors duration-200';

export default function ContactSection() {
    const { content } = useContent();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [booked, setBooked] = useState(false);
    // Payload of the last successful send, so going back and resubmitting
    // unchanged details doesn't email Favour a second copy.
    const lastSent = useRef<string | null>(null);

    useEffect(() => {
        const handleCalendlyEvent = (e: MessageEvent) => {
            // Anything on the page can postMessage, including strings and null.
            const fromCalendly =
                e.origin === 'https://calendly.com' || e.origin.endsWith('.calendly.com');
            if (!fromCalendly || typeof e.data !== 'object' || e.data === null) return;

            if ((e.data as { event?: string }).event === 'calendly.event_scheduled') {
                setBooked(true);
                trackEvent('booking_complete');
            }
        };
        window.addEventListener('message', handleCalendlyEvent);
        return () => window.removeEventListener('message', handleCalendlyEvent);
    }, []);

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
        formState: { errors },
        watch,
        setValue,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const selectedJourney = watch('journey');
    const calendlyUrl = contact.calendlyUrl || 'https://calendly.com/egbogunfavour/30min';

    const onSubmit = async (data: ContactFormData) => {
        const payload = JSON.stringify(data);

        // Returning from step 2 without editing anything: no need to resend.
        if (payload === lastSent.current) {
            setStep(calendlyUrl ? 2 : 3);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmittedData(data);
                lastSent.current = payload;
                trackEvent('form_submit', `journey:${data.journey}`);
                setStep(calendlyUrl ? 2 : 3);
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

    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section id="contact" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-[#E9DFF8] border-t border-[#2A2342]/10 overflow-hidden">
            <div className="max-w-2xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center">
                        <SectionLabel>{contact.sectionLabel}</SectionLabel>
                    </div>
                    <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)] text-[#2A2342] mt-6 mb-5" style={{ lineHeight: 1.12 }}>
                        {contact.title}{' '}
                        <span className="text-[#E8721A]">{contact.titleEmphasis}</span>
                    </h2>
                    <p className="font-sans text-[15px] text-[#6E6587] max-w-md mx-auto leading-relaxed whitespace-pre-line">
                        {contact.subtitle}
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.12, ease }}
                    className="relative rounded-xl border border-[#2A2342]/10 bg-[#F1EBFB] p-7 sm:p-10"
                >
                    {/* Step Progress Tracker */}
                    {calendlyUrl && (
                        <div className="relative mb-12 max-w-md mx-auto select-none">
                            <div className="flex items-center justify-between">
                                {STEPS.map((label, i) => {
                                    const stepNum = i + 1;
                                    const reached = booked ? 3 : step;
                                    const isDone = reached > stepNum;
                                    const isActive = reached === stepNum;
                                    return (
                                        <div key={label} className="flex items-center gap-3">
                                            <div
                                                className={`w-9 h-9 rounded-md flex items-center justify-center font-sans text-[13px] font-semibold border transition-all duration-300 ${
                                                    isDone
                                                        ? 'bg-[#6B3FC0] text-white border-[#6B3FC0]'
                                                        : isActive
                                                        ? 'bg-[#E8721A] text-white border-[#E8721A]'
                                                        : 'bg-[#E6DBF6] text-[#6E6587] border-[#2A2342]/15'
                                                }`}
                                            >
                                                {isDone ? <Check size={14} className="stroke-[3px]" /> : <span>{stepNum}</span>}
                                            </div>
                                            <span className={`font-sans text-[12px] hidden sm:block ${
                                                isActive ? 'text-[#E8721A]' : isDone ? 'text-[#6B3FC0]' : 'text-[#6E6587]'
                                            }`}>
                                                {label}
                                            </span>
                                            {i < STEPS.length - 1 && (
                                                <span className={`block w-8 sm:w-12 h-px ${isDone ? 'bg-[#6B3FC0]' : 'bg-[#2A2342]/15'}`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                            >
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <input {...register('fullName')} type="text" placeholder="Full name" className={inputClasses} />
                                        {errors.fullName && <p className="font-sans text-[12px] text-red-500 mt-1.5">{errors.fullName.message}</p>}
                                    </div>
                                    <div>
                                        <input {...register('email')} type="email" placeholder="Email address" className={inputClasses} />
                                        {errors.email && <p className="font-sans text-[12px] text-red-500 mt-1.5">{errors.email.message}</p>}
                                    </div>
                                    <div>
                                        <input {...register('role')} type="text" placeholder="Current role and organisation" className={inputClasses} />
                                        {errors.role && <p className="font-sans text-[12px] text-red-500 mt-1.5">{errors.role.message}</p>}
                                    </div>

                                    {/* Leadership Journey */}
                                    <div className="relative">
                                        <input type="hidden" {...register('journey')} />
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className={`w-full px-5 py-4 rounded-md bg-[#E6DBF6] border ${isDropdownOpen ? 'border-[#E8721A] bg-white/60' : 'border-[#2A2342]/12'} text-sm flex items-center justify-between focus:outline-none transition-colors duration-200`}
                                        >
                                            <span className={selectedJourney ? 'text-[#2A2342]' : 'text-[#6E6587]'}>
                                                {selectedJourney ? journeyOptions.find(o => o.value === selectedJourney)?.label : 'Where are you in your leadership journey?'}
                                            </span>
                                            <ChevronDown size={16} className={`text-[#6E6587] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#E8721A]' : ''}`} />
                                        </button>
                                        {isDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                                                <div className="absolute z-50 w-full mt-1 rounded-md bg-[#F1EBFB] border border-[#2A2342]/12 shadow-[0_20px_50px_-20px_rgba(42,35,66,0.25)] overflow-hidden">
                                                    <div className="max-h-60 overflow-y-auto">
                                                        {journeyOptions.filter(o => o.value !== '').map((option) => (
                                                            <button
                                                                key={option.value}
                                                                type="button"
                                                                onClick={() => {
                                                                    setValue('journey', option.value, { shouldValidate: true });
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                className={`w-full text-left px-5 py-3.5 text-sm hover:bg-[#E1D3F2] transition-colors duration-200 border-b border-[#2A2342]/[0.08] last:border-0 ${selectedJourney === option.value ? 'bg-[#E8721A]/10 text-[#E8721A] font-medium' : 'text-[#4A4163]'}`}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {errors.journey && <p className="font-sans text-[12px] text-red-500 mt-1.5">{errors.journey.message}</p>}
                                    </div>

                                    <div>
                                        <input {...register('challenge')} type="text" placeholder="Your biggest visibility challenge (optional)" className={inputClasses} />
                                    </div>

                                    <button
                                        id="contact-submit-btn"
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 py-4 rounded-md bg-[#E8721A] text-white font-sans text-[14px] font-semibold hover:bg-[#C05A0E] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            <span>Continue to Booking</span>
                                        )}
                                    </button>

                                    {submitStatus === 'error' && (
                                        <div className="flex items-center justify-center gap-2 text-red-500 font-sans text-[13px]">
                                            <AlertCircle size={14} />
                                            Something went wrong. Please try again.
                                        </div>
                                    )}

                                    <p className="font-sans text-[12px] text-[#6E6587] text-center pt-2 leading-relaxed whitespace-pre-line">
                                        {contact.finePrint}
                                    </p>
                                </form>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="text-center"
                            >
                                <h3 className="display text-2xl text-[#2A2342] mb-2">
                                    {booked ? 'Your call is booked' : 'Add a discovery call'}
                                </h3>
                                <p className="font-sans text-sm text-[#6E6587] max-w-md mx-auto leading-relaxed mb-6">
                                    {booked ? (
                                        <>
                                            Your application is with Favour and your call is confirmed. To move it,
                                            use the reschedule link in your calendar invitation.
                                        </>
                                    ) : (
                                        <>
                                            Thanks <span className="font-semibold text-[#E8721A]">{submittedData?.fullName.split(' ')[0]}</span>,
                                            your application is in. Pick a time below to talk it through, or apply without a call.
                                        </>
                                    )}
                                </p>
                                <CalendlyEmbed
                                    url={calendlyUrl}
                                    prefillName={submittedData?.fullName}
                                    prefillEmail={submittedData?.email}
                                    height="650px"
                                    className="rounded-lg border border-[#2A2342]/12"
                                />
                                {!booked && (
                                    <div className="mt-6 flex flex-col items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            className="font-sans text-[13.5px] font-medium text-[#2A2342] underline underline-offset-4 decoration-[#2A2342]/25 hover:text-[#E8721A] hover:decoration-[#E8721A]/40 transition-colors"
                                        >
                                            I&apos;ll just apply for now
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="font-sans text-[13px] text-[#6E6587] hover:text-[#E8721A] transition-colors"
                                        >
                                            Edit my details
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', damping: 22 }}
                                className="text-center py-8"
                            >
                                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                                    <CheckCircle size={26} className="text-green-500" />
                                </div>
                                <h3 className="display text-2xl text-[#2A2342] mb-3">Application received</h3>
                                <p className="font-sans text-sm text-[#6E6587] max-w-md mx-auto leading-relaxed mb-6">
                                    Thank you, <span className="font-semibold text-[#E8721A]">{submittedData?.fullName.split(' ')[0]}</span>. Your application is with Favour, and she will follow up at <span className="text-[#2A2342]">{submittedData?.email}</span>.
                                </p>
                                {calendlyUrl && (
                                    <p className="font-sans text-[13px] text-[#6E6587] max-w-xs mx-auto leading-relaxed border-t border-[#2A2342]/[0.08] pt-5">
                                        Would a call help?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="font-medium text-[#E8721A] underline underline-offset-4 decoration-[#E8721A]/40 hover:text-[#C05A0E] transition-colors"
                                        >
                                            Pick a time
                                        </button>
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
