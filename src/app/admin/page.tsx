'use client';

/**
 * Admin Dashboard Page
 * 
 * Allows editing of all site content stored in Firestore.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { SiteContent } from '@/types';
import { defaultSiteContent } from '@/lib/default-content';
import { LogOut, Save, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Editable section component
function EditableSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-[#6B4FAD]/30 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-[#272336] hover:bg-[#272336]/80 transition-colors"
            >
                <span className="font-medium text-[#FAF9FF]">{title}</span>
                <span className="text-[#9B8EC4]">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
                <div className="p-4 bg-[#1E1B29] border-t border-[#6B4FAD]/20">
                    {children}
                </div>
            )}
        </div>
    );
}

// Form field component
function FormField({
    label,
    value,
    onChange,
    multiline = false,
    placeholder = '',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    placeholder?: string;
}) {
    const baseClasses =
        'w-full px-3 py-2 bg-[#6B4FAD]/10 border border-[#6B4FAD]/35 rounded text-sm text-[#FAF9FF] placeholder-[#B8A4E8]/40 focus:border-[#E8721A] focus:outline-none transition-colors';

    return (
        <div className="mb-4">
            <label className="block text-xs font-medium text-[#9B8EC4] mb-1.5 uppercase tracking-wider">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                    className={`${baseClasses} resize-none`}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={baseClasses}
                />
            )}
        </div>
    );
}

export default function AdminDashboardPage() {
    const { user, logout } = useAuth();
    const [content, setContent] = useState<SiteContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Fetch content on mount
    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/content');
            const data = await response.json();
            if (data.success) {
                setContent(data.content);
            }
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!content) return;

        try {
            setSaving(true);
            setSaveStatus('idle');

            // Get the Firebase ID token
            const token = await user?.getIdToken();

            const response = await fetch('/api/content', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content: {
                        hero: content.hero,
                        pain: content.pain,
                        value: content.value,
                        results: content.results,
                        offer: content.offer,
                        contact: content.contact,
                    },
                }),
            });

            if (response.ok) {
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch (error) {
            console.error('Error saving content:', error);
            setSaveStatus('error');
        } finally {
            setSaving(false);
        }
    };

    const updateHero = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            hero: { ...content.hero, [field]: value },
        });
    };

    const updatePain = (field: string, value: string | string[]) => {
        if (!content) return;
        setContent({
            ...content,
            pain: { ...content.pain, [field]: value },
        });
    };

    const updateValue = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            value: { ...content.value, [field]: value },
        });
    };

    const updateResults = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            results: { ...content.results, [field]: value },
        });
    };

    const updateOffer = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            offer: { ...content.offer, [field]: value },
        });
    };

    const updateContact = (field: string, value: string) => {
        if (!content) return;
        setContent({
            ...content,
            contact: { ...content.contact, [field]: value },
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1E1B29] flex items-center justify-center">
                <div className="text-[#9B8EC4]">Loading content...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1E1B29]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#1E1B29]/95 backdrop-blur-sm border-b border-[#6B4FAD]/30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="font-serif text-xl text-[#E8721A]">
                                Beta Narrative
                            </Link>
                            <span className="text-[#9B8EC4] text-sm">Admin Dashboard</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[#9B8EC4] text-sm hidden sm:block">
                                {user?.email}
                            </span>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-[#9B8EC4] hover:text-[#E8721A] transition-colors text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Page Title */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="font-serif text-3xl text-[#FAF9FF]">Content Editor</h1>
                            <p className="text-[#9B8EC4] text-sm mt-1">
                                Edit your site content. Changes will be reflected immediately after saving.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={fetchContent}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-[#9B8EC4] hover:text-[#FAF9FF] border border-[#6B4FAD]/30 rounded hover:border-[#6B4FAD]/50 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-[#FAF9FF] bg-[#E8721A] rounded hover:bg-[#F5A96A] transition-colors disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                    {/* Save Status */}
                    {saveStatus === 'success' && (
                        <div className="mb-6 flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            Content saved successfully!
                        </div>
                    )}
                    {saveStatus === 'error' && (
                        <div className="mb-6 flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                            <AlertCircle className="w-5 h-5" />
                            Failed to save content. Please try again.
                        </div>
                    )}

                    {/* Content Sections */}
                    <div className="space-y-4">
                        {/* Hero Section */}
                        <EditableSection title="Hero Section">
                            <FormField
                                label="Eyebrow"
                                value={content?.hero?.eyebrow || ''}
                                onChange={(v) => updateHero('eyebrow', v)}
                            />
                            <FormField
                                label="Title"
                                value={content?.hero?.title || ''}
                                onChange={(v) => updateHero('title', v)}
                            />
                            <FormField
                                label="Title Emphasis (italic)"
                                value={content?.hero?.titleEmphasis || ''}
                                onChange={(v) => updateHero('titleEmphasis', v)}
                            />
                            <FormField
                                label="Title Highlight"
                                value={content?.hero?.titleHighlight || ''}
                                onChange={(v) => updateHero('titleHighlight', v)}
                            />
                            <FormField
                                label="Subtitle"
                                value={content?.hero?.subtitle || ''}
                                onChange={(v) => updateHero('subtitle', v)}
                                multiline
                            />
                            <FormField
                                label="CTA Button Text"
                                value={content?.hero?.ctaText || ''}
                                onChange={(v) => updateHero('ctaText', v)}
                            />
                        </EditableSection>

                        {/* Pain Section */}
                        <EditableSection title="Pain Section">
                            <FormField
                                label="Section Label"
                                value={content?.pain?.sectionLabel || ''}
                                onChange={(v) => updatePain('sectionLabel', v)}
                            />
                            <FormField
                                label="Title"
                                value={content?.pain?.title || ''}
                                onChange={(v) => updatePain('title', v)}
                            />
                            <FormField
                                label="Title Emphasis (italic)"
                                value={content?.pain?.titleEmphasis || ''}
                                onChange={(v) => updatePain('titleEmphasis', v)}
                            />
                            <FormField
                                label="Lead Text"
                                value={content?.pain?.lead || ''}
                                onChange={(v) => updatePain('lead', v)}
                                multiline
                            />
                        </EditableSection>

                        {/* Value Section */}
                        <EditableSection title="Value Section">
                            <FormField
                                label="Section Label"
                                value={content?.value?.sectionLabel || ''}
                                onChange={(v) => updateValue('sectionLabel', v)}
                            />
                            <FormField
                                label="Title"
                                value={content?.value?.title || ''}
                                onChange={(v) => updateValue('title', v)}
                            />
                            <FormField
                                label="Title Emphasis (italic)"
                                value={content?.value?.titleEmphasis || ''}
                                onChange={(v) => updateValue('titleEmphasis', v)}
                            />
                            <FormField
                                label="Body Text"
                                value={content?.value?.body || ''}
                                onChange={(v) => updateValue('body', v)}
                                multiline
                            />
                        </EditableSection>

                        {/* Results Section */}
                        <EditableSection title="Results Section">
                            <FormField
                                label="Section Label"
                                value={content?.results?.sectionLabel || ''}
                                onChange={(v) => updateResults('sectionLabel', v)}
                            />
                            <FormField
                                label="Title"
                                value={content?.results?.title || ''}
                                onChange={(v) => updateResults('title', v)}
                            />
                            <FormField
                                label="Title Emphasis (italic)"
                                value={content?.results?.titleEmphasis || ''}
                                onChange={(v) => updateResults('titleEmphasis', v)}
                            />
                        </EditableSection>

                        {/* Offer Section */}
                        <EditableSection title="Offer Section">
                            <FormField
                                label="Section Label"
                                value={content?.offer?.sectionLabel || ''}
                                onChange={(v) => updateOffer('sectionLabel', v)}
                            />
                            <FormField
                                label="Title"
                                value={content?.offer?.title || ''}
                                onChange={(v) => updateOffer('title', v)}
                            />
                            <FormField
                                label="Title Emphasis (italic)"
                                value={content?.offer?.titleEmphasis || ''}
                                onChange={(v) => updateOffer('titleEmphasis', v)}
                            />
                            <FormField
                                label="Badge Text"
                                value={content?.offer?.badge || ''}
                                onChange={(v) => updateOffer('badge', v)}
                            />
                            <FormField
                                label="Package Name"
                                value={content?.offer?.packageName || ''}
                                onChange={(v) => updateOffer('packageName', v)}
                            />
                            <FormField
                                label="Price"
                                value={content?.offer?.price || ''}
                                onChange={(v) => updateOffer('price', v)}
                            />
                            <FormField
                                label="Price Note"
                                value={content?.offer?.priceNote || ''}
                                onChange={(v) => updateOffer('priceNote', v)}
                            />
                            <FormField
                                label="Description"
                                value={content?.offer?.description || ''}
                                onChange={(v) => updateOffer('description', v)}
                                multiline
                            />
                        </EditableSection>

                        {/* Contact Section */}
                        <EditableSection title="Contact Section">
                            <FormField
                                label="Section Label"
                                value={content?.contact?.sectionLabel || ''}
                                onChange={(v) => updateContact('sectionLabel', v)}
                            />
                            <FormField
                                label="Title"
                                value={content?.contact?.title || ''}
                                onChange={(v) => updateContact('title', v)}
                            />
                            <FormField
                                label="Title Emphasis (italic)"
                                value={content?.contact?.titleEmphasis || ''}
                                onChange={(v) => updateContact('titleEmphasis', v)}
                            />
                            <FormField
                                label="Subtitle"
                                value={content?.contact?.subtitle || ''}
                                onChange={(v) => updateContact('subtitle', v)}
                                multiline
                            />
                            <FormField
                                label="Fine Print"
                                value={content?.contact?.finePrint || ''}
                                onChange={(v) => updateContact('finePrint', v)}
                            />
                        </EditableSection>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
